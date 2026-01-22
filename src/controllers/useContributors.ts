/**
 * Contributors State Controller
 * CONTROLLER layer - orchestrates data fetching, caching, and state management
 * Implements SWR pattern with service abstraction
 */

import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import type { Contributor } from '../types/github';
import { ContributorAggregationService } from '../services/ContributorAggregationService';
import { getCache, setCache } from '../lib/cache';
import { CONTRIBUTORS_CACHE_KEY_PREFIX, CONTRIBUTORS_CACHE_TTL } from '../constants/repositories';

export interface UseContributorsOptions {
  repositories: string[];
  enableAutoFetch?: boolean;
  revalidateInterval?: number;
}

export interface UseContributorsResult {
  data: Contributor[] | null;
  isLoading: boolean;
  isValidating?: boolean;
  isError: boolean;
  error?: Error;
  refetch: () => void;
  cacheStatus?: {
    isCached: boolean;
    age: number;
  };
}

/**
 * Fetch all contributors from repositories with SWR pattern
 */
const fetchAllContributors = async (
  repos: string[]
): Promise<Contributor[] | null> => {
  if (!repos || repos.length === 0) {
    return null;
  }

  try {
    const aggregated = await ContributorAggregationService.aggregateContributors(repos);
    return aggregated;
  } catch (error) {
    console.error('Failed to fetch contributors:', error);
    throw error;
  }
};

/**
 * Fetch with stale-while-revalidate pattern
 * Returns cached data if available, or fetches fresh data
 */
const fetchWithSWR = async (
  repos: string[]
): Promise<{ data: Contributor[] | null; isStale: boolean }> => {
  const cacheKey = `${CONTRIBUTORS_CACHE_KEY_PREFIX}-${repos.sort().join(',')}`;

  const cachedData = getCache<Contributor[]>(cacheKey);
  if (cachedData) {
    return { data: cachedData, isStale: true };
  }

  const freshData = await fetchAllContributors(repos);

  if (freshData) {
    setCache(cacheKey, freshData, { ttl: CONTRIBUTORS_CACHE_TTL });
  }

  return { data: freshData, isStale: false };
};

/**
 * Hook to fetch and manage contributors data with advanced caching and SWR
 * This is the CONTROLLER for contributors data
 */
export const useContributors = ({
  repositories,
  enableAutoFetch = true,
  revalidateInterval,
}: UseContributorsOptions): UseContributorsResult => {
  const [manualRefetch, setManualRefetch] = useState(0);
  const [cacheStatus, setCacheStatus] = useState<
    {
      isCached: boolean;
      age: number;
    } | undefined
  >();

  const repoKey = repositories.sort().join(',');
  const cacheKey = enableAutoFetch && repositories.length > 0 
    ? `${CONTRIBUTORS_CACHE_KEY_PREFIX}-${repoKey}` 
    : null;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    cacheKey,
    () => fetchWithSWR(repositories),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000,
      focusThrottleInterval: 300000,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      ...(revalidateInterval && {
        focusThrottleInterval: revalidateInterval,
      }),
    }
  );

  // Track cache status
  useEffect(() => {
    if (cacheKey) {
      const cacheEntry = getCache<Contributor[]>(cacheKey);
      if (cacheEntry) {
        setCacheStatus({ isCached: true, age: 0 });
      } else {
        setCacheStatus({ isCached: false, age: 0 });
      }
    }
  }, [cacheKey, data]);

  /**
   * Manual refetch function
   */
  const refetch = useCallback(() => {
    setManualRefetch((prev) => prev + 1);
    mutate();
  }, [mutate]);

  /**
   * Handle manual refetch when auto-fetch is disabled
   */
  useEffect(() => {
    if (!enableAutoFetch && manualRefetch > 0 && repositories.length > 0) {
      fetchAllContributors(repositories).then((result) => {
        if (result && cacheKey) {
          setCache(cacheKey, result, { ttl: CONTRIBUTORS_CACHE_TTL });
        }
        mutate({ data: result, isStale: false });
      });
    }
  }, [manualRefetch, enableAutoFetch, repositories, mutate, cacheKey]);

  return {
    data: data?.data || null,
    isLoading,
    isValidating,
    isError: !!error,
    error,
    refetch,
    cacheStatus,
  };
};
