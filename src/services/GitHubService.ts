/**
 * GitHub API Service Layer
 * Provides abstraction over GitHub API interactions with caching and rate limiting
 * This service is part of the MODEL layer in MVC architecture
 */

import type {
  ContributorResponse,
  GitHubUser,
  GraphQLResponse,
  RepositoryDetails,
} from '../types/github';
import { getCache, setCache } from '../lib/cache';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

/**
 * Rate limiting configuration
 */
const RATE_LIMIT_CONFIG = {
  maxConcurrentRequests: 6,
  delayBetweenRequests: 150,
  baseBackoffDelay: 1000,
  maxBackoffDelay: 60000,
  maxRetries: 3,
  deduplicationWindow: 5000,
};

/**
 * Rate limit state management
 */
interface RateLimitState {
  requestQueue: Array<{
    fn: () => Promise<unknown>;
    resolve: (value: unknown) => void;
    reject: (reason?: unknown) => void;
    retries: number;
  }>;
  activeRequests: number;
  lastRequestTime: number;
  pendingRequests: Map<string, Promise<unknown>>;
}

const rateLimitState: RateLimitState = {
  requestQueue: [],
  activeRequests: 0,
  lastRequestTime: 0,
  pendingRequests: new Map(),
};

/**
 * Calculate exponential backoff delay
 */
const getBackoffDelay = (retryCount: number): number => {
  const delay = RATE_LIMIT_CONFIG.baseBackoffDelay * Math.pow(2, retryCount);
  return Math.min(delay, RATE_LIMIT_CONFIG.maxBackoffDelay);
};

/**
 * Process request queue with rate limiting
 */
const processRequestQueue = async () => {
  while (
    rateLimitState.requestQueue.length > 0 &&
    rateLimitState.activeRequests < RATE_LIMIT_CONFIG.maxConcurrentRequests
  ) {
    const now = Date.now();
    const timeSinceLastRequest = now - rateLimitState.lastRequestTime;

    if (timeSinceLastRequest < RATE_LIMIT_CONFIG.delayBetweenRequests) {
      await new Promise((resolve) =>
        setTimeout(
          resolve,
          RATE_LIMIT_CONFIG.delayBetweenRequests - timeSinceLastRequest
        )
      );
    }

    const requestItem = rateLimitState.requestQueue.shift();
    if (!requestItem) break;

    rateLimitState.activeRequests++;
    rateLimitState.lastRequestTime = Date.now();

    (async () => {
      try {
        const result = await requestItem.fn();
        requestItem.resolve(result);
      } catch (error) {
        if (requestItem.retries < RATE_LIMIT_CONFIG.maxRetries) {
          requestItem.retries++;
          const backoffDelay = getBackoffDelay(requestItem.retries - 1);

          console.warn(
            `Request failed. Retrying after ${backoffDelay}ms (attempt ${requestItem.retries}/${RATE_LIMIT_CONFIG.maxRetries}):`,
            error
          );

          await new Promise((resolve) => setTimeout(resolve, backoffDelay));
          rateLimitState.requestQueue.push(requestItem);
        } else {
          console.error('Request failed after max retries:', error);
          requestItem.reject(error);
        }
      } finally {
        rateLimitState.activeRequests--;
        if (rateLimitState.requestQueue.length > 0) {
          processRequestQueue();
        }
      }
    })();
  }
};

/**
 * Execute a request with rate limiting and deduplication
 */
const executeWithRateLimit = async <T>(
  fn: () => Promise<T>,
  dedupeKey?: string
): Promise<T> => {
  if (dedupeKey && rateLimitState.pendingRequests.has(dedupeKey)) {
    return rateLimitState.pendingRequests.get(dedupeKey) as Promise<T>;
  }

  const promise = new Promise<T>((resolve, reject) => {
    rateLimitState.requestQueue.push({
      fn,
      resolve: resolve as (value: unknown) => void,
      reject,
      retries: 0,
    });

    processRequestQueue();
  });

  if (dedupeKey) {
    rateLimitState.pendingRequests.set(dedupeKey, promise);

    promise.finally(() => {
      setTimeout(() => {
        rateLimitState.pendingRequests.delete(dedupeKey);
      }, RATE_LIMIT_CONFIG.deduplicationWindow);
    });
  }

  return promise;
};

/**
 * Get authorization headers
 */
const getAuthHeaders = (): HeadersInit => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/vnd.github.v3+json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
};

/**
 * GitHub Service - Facade for all GitHub API interactions
 */
export const GitHubService = {
  /**
   * Fetch contributors from a repository
   */
  async fetchRepositoryContributors(
    owner: string,
    repo: string
  ): Promise<ContributorResponse[]> {
    const cacheKey = `contributors:${owner}/${repo}`;

    const cached = getCache<ContributorResponse[]>(cacheKey);
    if (cached) {
      return cached;
    }

    return executeWithRateLimit(async () => {
      try {
        const response = await fetch(
          `${GITHUB_API_URL}/repos/${owner}/${repo}/contributors?per_page=100`,
          {
            headers: getAuthHeaders(),
          }
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.statusText}`);
        }

        const data = await response.json();

        // Cache for 24 hours
        setCache(cacheKey, data, { ttl: 86400000 });

        return data;
      } catch {
        return [];
      }
    }, cacheKey);
  },

  /**
   * Fetch user profile data
   */
  async fetchUserProfile(login: string): Promise<GitHubUser | null> {
    const cacheKey = `user:${login}`;

    const cached = getCache<GitHubUser>(cacheKey);
    if (cached) {
      return cached;
    }

    return executeWithRateLimit(async () => {
      try {
        const response = await fetch(`${GITHUB_API_URL}/users/${login}`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) {
          return null;
        }

        const data = await response.json();

        // Cache for 7 days
        setCache(cacheKey, data, { ttl: 604800000 });

        return data;
      } catch {
        return null;
      }
    }, cacheKey);
  },

  /**
   * Fetch repository details using GraphQL
   */
  async fetchRepositoryDetails(
    owner: string,
    name: string
  ): Promise<RepositoryDetails | null> {
    const cacheKey = `repo-details:${owner}/${name}`;

    const cached = getCache<RepositoryDetails>(cacheKey);
    if (cached) {
      return cached;
    }

    const query = `
      query {
        repository(owner: "${owner}", name: "${name}") {
          name
          description
          url
          stargazerCount
          forkCount
          primaryLanguage {
            name
          }
        }
      }
    `;

    try {
      const response = await fetch(GITHUB_GRAPHQL_URL, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`GraphQL API error: ${response.statusText}`);
      }

      const result: GraphQLResponse<{ repository: RepositoryDetails }> =
        await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const repoData = result.data?.repository || null;

      if (repoData) {
        setCache(cacheKey, repoData, { ttl: 604800000 });
      }

      return repoData;
    } catch {
      return null;
    }
  },

  /**
   * Validate GitHub token
   */
  async validateToken(): Promise<boolean> {
    const cacheKey = 'github-token-valid';

    const cached = getCache<boolean>(cacheKey);
    if (cached !== null) {
      return cached;
    }

    const token = import.meta.env.VITE_GITHUB_TOKEN;

    if (!token) {
      return false;
    }

    try {
      const response = await fetch(`${GITHUB_API_URL}/user`, {
        headers: getAuthHeaders(),
      });

      const isValid = response.ok;

      // Cache for 1 hour
      setCache(cacheKey, isValid, { ttl: 3600000 });

      return isValid;
    } catch {
      return false;
    }
  },

  /**
   * Get rate limit information
   */
  async getRateLimit(): Promise<{ limit: number; remaining: number }> {
    const cacheKey = 'rate-limit';

    const cached = getCache<{ limit: number; remaining: number }>(cacheKey);
    if (cached) {
      return cached;
    }

    try {
      const response = await fetch(`${GITHUB_API_URL}/rate_limit`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        return { limit: 0, remaining: 0 };
      }

      const data = await response.json();
      const rateLimitInfo = {
        limit: data.rate_limit.limit,
        remaining: data.rate_limit.remaining,
      };

      // Cache for 5 minutes
      setCache(cacheKey, rateLimitInfo, { ttl: 300000 });

      return rateLimitInfo;
    } catch {
      return { limit: 0, remaining: 0 };
    }
  },
};
