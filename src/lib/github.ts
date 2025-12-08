/**
 * GitHub API Service Layer
 * Handles GraphQL and REST API interactions with rate limiting
 */

import type {
  ContributorResponse,
  GitHubUser,
  GraphQLResponse,
} from '../types/github';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

// Rate limiting configuration
const RATE_LIMIT_CONFIG = {
  maxRequests: 50, // Maximum requests per time window
  timeWindow: 60000, // Time window in milliseconds (60 seconds)
  delayBetweenRequests: 100, // Minimum delay between requests (100ms)
};

// Rate limit state
let requestQueue: Array<() => Promise<any>> = [];
let isProcessing = false;
let lastRequestTime = 0;

/**
 * Process request queue with rate limiting
 */
const processRequestQueue = async () => {
  if (isProcessing || requestQueue.length === 0) return;
  
  isProcessing = true;
  
  while (requestQueue.length > 0) {
    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTime;
    
    if (timeSinceLastRequest < RATE_LIMIT_CONFIG.delayBetweenRequests) {
      await new Promise(resolve => 
        setTimeout(resolve, RATE_LIMIT_CONFIG.delayBetweenRequests - timeSinceLastRequest)
      );
    }
    
    const request = requestQueue.shift();
    if (request) {
      try {
        await request();
      } catch (error) {
        console.error('Request queue error:', error);
      }
    }
    
    lastRequestTime = Date.now();
  }
  
  isProcessing = false;
};

/**
 * Execute a request with rate limiting
 */
const executeWithRateLimit = async <T>(
  fn: () => Promise<T>
): Promise<T> => {
  return new Promise((resolve, reject) => {
    requestQueue.push(async () => {
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
    
    processRequestQueue();
  });
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
 * Fetch contributors from a repository using REST API with rate limiting
 */
export const fetchRepositoryContributors = async (
  owner: string,
  repo: string
): Promise<ContributorResponse[]> => {
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

      return await response.json();
    } catch (error) {
      console.error(
        `Failed to fetch contributors for ${owner}/${repo}:`,
        error
      );
      return [];
    }
  });
};

/**
 * Fetch user profile data using REST API with rate limiting
 */
export const fetchUserProfile = async (
  login: string
): Promise<GitHubUser | null> => {
  return executeWithRateLimit(async () => {
    try {
      const response = await fetch(`${GITHUB_API_URL}/users/${login}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch user profile for ${login}:`, error);
      return null;
    }
  });
};

/**
 * Fetch pull requests count for a repository with rate limiting
 */
export const fetchPullRequestsCount = async (
  owner: string,
  repo: string,
  login: string
): Promise<number> => {
  return executeWithRateLimit(async () => {
    try {
      const response = await fetch(
        `${GITHUB_API_URL}/search/issues?q=repo:${owner}/${repo}+is:pr+author:${login}&per_page=1`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        return 0;
      }

      const data = await response.json();
      return data.total_count || 0;
    } catch (error) {
      console.error(
        `Failed to fetch PRs count for ${login} in ${owner}/${repo}:`,
        error
      );
      return 0;
    }
  });
};

/**
 * Fetch issues count for a repository with rate limiting
 */
export const fetchIssuesCount = async (
  owner: string,
  repo: string,
  login: string
): Promise<number> => {
  return executeWithRateLimit(async () => {
    try {
      const response = await fetch(
        `${GITHUB_API_URL}/search/issues?q=repo:${owner}/${repo}+is:issue+author:${login}&per_page=1`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        return 0;
      }

      const data = await response.json();
      return data.total_count || 0;
    } catch (error) {
      console.error(
        `Failed to fetch issues count for ${login} in ${owner}/${repo}:`,
        error
      );
      return 0;
    }
  });
};

/**
 * Fetch the latest contribution date for a user in a repository with rate limiting
 */
export const fetchLatestContribution = async (
  owner: string,
  repo: string,
  login: string
): Promise<string | null> => {
  return executeWithRateLimit(async () => {
    try {
      const response = await fetch(
        `${GITHUB_API_URL}/search/commits?q=repo:${owner}/${repo}+author:${login}&sort=author-date&order=desc&per_page=1`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      if (data.items && data.items.length > 0) {
        return data.items[0].commit.author.date;
      }

      return null;
    } catch (error) {
      console.error(
        `Failed to fetch latest contribution for ${login} in ${owner}/${repo}:`,
        error
      );
      return null;
    }
  });
};

/**
 * Fetch repository details using GraphQL
 */
export const fetchRepositoryDetailsGraphQL = async (
  owner: string,
  name: string
): Promise<any> => {
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

    return result.data?.repository || null;
  } catch (error) {
    console.error(`Failed to fetch repository details for ${owner}/${name}:`, error);
    return null;
  }
};

/**
 * Check if GitHub token is valid
 */
export const validateGitHubToken = async (): Promise<boolean> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;

  if (!token) {
    return false;
  }

  try {
    const response = await fetch(`${GITHUB_API_URL}/user`, {
      headers: getAuthHeaders(),
    });

    return response.ok;
  } catch {
    return false;
  }
};

/**
 * Get remaining API rate limit
 */
export const getRateLimit = async (): Promise<{ limit: number; remaining: number }> => {
  try {
    const response = await fetch(`${GITHUB_API_URL}/rate_limit`, {
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      return { limit: 0, remaining: 0 };
    }

    const data = await response.json();
    return {
      limit: data.rate_limit.limit,
      remaining: data.rate_limit.remaining,
    };
  } catch (error) {
    console.error('Failed to fetch rate limit:', error);
    return { limit: 0, remaining: 0 };
  }
};
