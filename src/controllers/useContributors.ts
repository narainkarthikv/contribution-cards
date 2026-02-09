/**
 * Contributors Controller
 * Orchestrates data fetching with SWR pattern and service-layer caching.
 */

import { useCallback } from 'react';
import useSWR from 'swr';
import type { Contributor } from '../types/github';
import { ContributorAggregationService } from '../services/ContributorAggregationService';
import { setCache } from '../lib/cache';
import {
  CONTRIBUTORS_CACHE_KEY_PREFIX,
  CONTRIBUTORS_CACHE_TTL,
} from '../constants/repositories';

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
}

/**
 * Fetcher: aggregates contributors from the given repos and persists to cache.
 */
const fetchContributors = async (repos: string[]): Promise<Contributor[]> => {
  const aggregated =
    await ContributorAggregationService.aggregateContributors(repos);
  const cacheKey = `${CONTRIBUTORS_CACHE_KEY_PREFIX}-${[...repos].sort().join(',')}`;
  setCache(cacheKey, aggregated, { ttl: CONTRIBUTORS_CACHE_TTL });
  return aggregated;
};

/**
 * Hook to fetch and manage contributors data.
 * Stable SWR key based on sorted repository list.
 */
export const useContributors = ({
  repositories,
  enableAutoFetch = true,
  revalidateInterval,
}: UseContributorsOptions): UseContributorsResult => {
  const repoKey = [...repositories].sort().join(',');
  const swrKey =
    enableAutoFetch && repositories.length > 0
      ? `${CONTRIBUTORS_CACHE_KEY_PREFIX}-${repoKey}`
      : null;

  const { data, error, isLoading, isValidating, mutate } = useSWR(
    swrKey,
    () => fetchContributors(repositories),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60_000,
      errorRetryCount: 3,
      errorRetryInterval: 5_000,
      ...(revalidateInterval ? { refreshInterval: revalidateInterval } : {}),
    }
  );

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    data: data ?? null,
    isLoading,
    isValidating,
    isError: !!error,
    error: error instanceof Error ? error : undefined,
    refetch,
  };
};
