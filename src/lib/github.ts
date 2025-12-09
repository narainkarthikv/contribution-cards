/**
 * GitHub API Service Layer
 * Handles GraphQL and REST API interactions with rate limiting and caching
 */

import type {
  ContributorResponse,
  GitHubUser,
  GraphQLResponse,
} from '../types/github';
import { getCache, setCache } from './cache';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

/**
 * Enhanced Rate limiting configuration
 * - Uses adaptive backoff strategy
 * - Respects GitHub API rate limits
 * - Supports concurrent request limiting
 */
const RATE_LIMIT_CONFIG = {
  maxConcurrentRequests: 6, // Maximum concurrent requests (respects GitHub limits)
  delayBetweenRequests: 150, // Minimum delay between requests (150ms)
  baseBackoffDelay: 1000, // Base delay for exponential backoff (1s)
  maxBackoffDelay: 60000, // Maximum backoff delay (1 minute)
  maxRetries: 3, // Maximum retry attempts
  deduplicationWindow: 5000, // Request deduplication window (5s)
};

/**
 * Rate limit state management
 */
interface RateLimitState {
  requestQueue: Array<{
    fn: () => Promise<any>;
    resolve: (value: any) => void;
    reject: (reason?: any) => void;
    retries: number;
  }>;
  activeRequests: number;
  lastRequestTime: number;
  pendingRequests: Map<string, Promise<any>>; // For deduplication
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
 * Process request queue with advanced rate limiting
 */
const processRequestQueue = async () => {
  while (rateLimitState.requestQueue.length > 0 && 
         rateLimitState.activeRequests < RATE_LIMIT_CONFIG.maxConcurrentRequests) {
    
    const now = Date.now();
    const timeSinceLastRequest = now - rateLimitState.lastRequestTime;
    
    // Respect minimum delay between requests
    if (timeSinceLastRequest < RATE_LIMIT_CONFIG.delayBetweenRequests) {
      await new Promise(resolve => 
        setTimeout(resolve, RATE_LIMIT_CONFIG.delayBetweenRequests - timeSinceLastRequest)
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
        // Implement retry logic with exponential backoff
        if (requestItem.retries < RATE_LIMIT_CONFIG.maxRetries) {
          requestItem.retries++;
          const backoffDelay = getBackoffDelay(requestItem.retries - 1);
          
          console.warn(
            `Request failed. Retrying after ${backoffDelay}ms (attempt ${requestItem.retries}/${RATE_LIMIT_CONFIG.maxRetries}):`,
            error
          );
          
          await new Promise(resolve => setTimeout(resolve, backoffDelay));
          
          // Re-queue the request
          rateLimitState.requestQueue.push(requestItem);
        } else {
          console.error('Request failed after max retries:', error);
          requestItem.reject(error);
        }
      } finally {
        rateLimitState.activeRequests--;
        // Process next request in queue
        if (rateLimitState.requestQueue.length > 0) {
          processRequestQueue();
        }
      }
    })();
  }
};

const executeWithRateLimit = async <T>(
  fn: () => Promise<T>,
  dedupeKey?: string
): Promise<T> => {
  // Check for pending request deduplication
  if (dedupeKey && rateLimitState.pendingRequests.has(dedupeKey)) {
    return rateLimitState.pendingRequests.get(dedupeKey) as Promise<T>;
  }

  const promise = new Promise<T>((resolve, reject) => {
    rateLimitState.requestQueue.push({
      fn,
      resolve,
      reject,
      retries: 0,
    });
    
    processRequestQueue();
  });

  // Store pending request for deduplication
  if (dedupeKey) {
    rateLimitState.pendingRequests.set(dedupeKey, promise);
    
    // Remove from pending after window expires
    promise.finally(() => {
      setTimeout(() => {
        rateLimitState.pendingRequests.delete(dedupeKey);
      }, RATE_LIMIT_CONFIG.deduplicationWindow);
    });
  }

  return promise;
};

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
 * Fetch contributors from a repository using REST API with rate limiting and caching
 */
export const fetchRepositoryContributors = async (
  owner: string,
  repo: string
): Promise<ContributorResponse[]> => {
  const cacheKey = `contributors:${owner}/${repo}`;
  
  // Check cache first (24 hour TTL for contributor lists)
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
    } catch (error) {
      return [];
    }
  }, cacheKey);
};

/**
 * Fetch user profile data using REST API with rate limiting and caching
 */
export const fetchUserProfile = async (
  login: string
): Promise<GitHubUser | null> => {
  const cacheKey = `user:${login}`;
  
  // Check cache first (7 day TTL for user profiles)
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
};



/**
 * Fetch repository details using GraphQL with caching
 */
export const fetchRepositoryDetailsGraphQL = async (
  owner: string,
  name: string
): Promise<any> => {
  const cacheKey = `repo-details:${owner}/${name}`;
  
  // Check cache first (7 day TTL for repo details)
  const cached = getCache(cacheKey);
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

    const result: GraphQLResponse<any> = await response.json();

    if (result.errors) {
      throw new Error(result.errors[0].message);
    }

    const repoData = result.data?.repository || null;
    
    // Cache for 7 days
    if (repoData) {
      setCache(cacheKey, repoData, { ttl: 604800000 });
    }
    
    return repoData;
  } catch {
    return null;
  }
};

/**
 * Check if GitHub token is valid with caching
 */
export const validateGitHubToken = async (): Promise<boolean> => {
  const cacheKey = 'github-token-valid';
  
  // Check cache (1 hour TTL)
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
};

/**
 * Get remaining API rate limit with caching
 */
export const getRateLimit = async (): Promise<{ limit: number; remaining: number }> => {
  const cacheKey = 'rate-limit';
  
  // Check cache (5 minute TTL for rate limit info)
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
  } catch (error) {
    return { limit: 0, remaining: 0 };
  }
};
