/**
 * Global Stats Controller
 * Fetches and manages overall statistics across all repositories.
 * Uses SWR with a stable cache key — `mutate()` for revalidation, not key mutation.
 */

import { useCallback } from 'react';
import useSWR from 'swr';
import type { Contributor } from '../types/github';
import { ContributorAggregationService } from '../services/ContributorAggregationService';
import { getCache, setCache } from '../lib/cache';
import { REPOSITORY_LIST } from '../constants/repositories';

export interface GlobalStats {
  uniqueContributors: Contributor[];
  totalContributions: number;
  totalRepositories: number;
  uniqueContributorCount: number;
}

export interface UseGlobalStatsResult {
  stats: GlobalStats | null;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  refetch: () => void;
}

const GLOBAL_STATS_CACHE_KEY = 'global_stats_all_repos';
const GLOBAL_STATS_CACHE_TTL = 6 * 3600000; // 6 hours

/**
 * Fetcher: aggregates contributors across all repos and computes stats.
 */
const fetchGlobalStats = async (): Promise<GlobalStats> => {
  // Check our manual cache layer first
  const cached = getCache<GlobalStats>(GLOBAL_STATS_CACHE_KEY);
  if (cached) return cached;

  const allRepos = [...REPOSITORY_LIST];
  const aggregated =
    await ContributorAggregationService.aggregateContributors(allRepos);

  const stats: GlobalStats = {
    uniqueContributors: aggregated,
    totalContributions: aggregated.reduce(
      (sum, c) => sum + c.totalContributions,
      0
    ),
    totalRepositories: allRepos.length,
    uniqueContributorCount: aggregated.length,
  };

  setCache(GLOBAL_STATS_CACHE_KEY, stats, { ttl: GLOBAL_STATS_CACHE_TTL });
  return stats;
};

/**
 * Hook to fetch global statistics across all repositories.
 * Stable SWR key — revalidation happens via `mutate()`, not key changes.
 */
export const useGlobalStats = (): UseGlobalStatsResult => {
  const { data, error, isLoading, mutate } = useSWR(
    GLOBAL_STATS_CACHE_KEY,
    fetchGlobalStats,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: GLOBAL_STATS_CACHE_TTL,
      errorRetryCount: 2,
    }
  );

  const refetch = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    stats: data ?? null,
    isLoading,
    isError: !!error,
    error: error instanceof Error ? error : undefined,
    refetch,
  };
};
