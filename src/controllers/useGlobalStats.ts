/**
 * Global Stats Controller
 * CONTROLLER layer - fetches and manages overall statistics across all repositories
 * Implements efficient caching and deduplication without redundant data
 */

import { useCallback, useState } from 'react';
import useSWR from 'swr';
import type { Contributor } from '../types/github';
import { ContributorAggregationService } from '../services/ContributorAggregationService';
import { getCache, setCache } from '../lib/cache';
import { REPOSITORY_LIST } from '../constants/repositories';

interface GlobalStats {
  uniqueContributors: Contributor[];
  totalContributions: number;
  totalRepositories: number;
  uniqueContributorCount: number;
}

interface UseGlobalStatsResult {
  stats: GlobalStats | null;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  refetch: () => void;
}

const GLOBAL_STATS_CACHE_KEY = 'global_stats_all_repos';
// Longer TTL for global stats (6 hours) since they change less frequently
const GLOBAL_STATS_CACHE_TTL = 6 * 3600000;

/**
 * Fetch all contributors from all repositories
 * Deduplicates by login to show unique contributors only
 */
const fetchGlobalContributors = async (): Promise<GlobalStats | null> => {
  try {
    // Fetch all repos in parallel
    const allRepos = REPOSITORY_LIST.map(repo => repo);
    
    // Use aggregation service which already handles deduplication
    const aggregatedContributors = await ContributorAggregationService.aggregateContributors(allRepos);

    // Calculate total contributions across all unique contributors
    const totalContributions = aggregatedContributors.reduce(
      (sum, contributor) => sum + contributor.totalContributions,
      0
    );

    return {
      uniqueContributors: aggregatedContributors,
      totalContributions,
      totalRepositories: allRepos.length,
      uniqueContributorCount: aggregatedContributors.length,
    };
  } catch (error) {
    console.error('Failed to fetch global stats:', error);
    throw error;
  }
};

/**
 * Hook to fetch global statistics across all repositories
 * Uses aggressive caching and SWR to minimize API calls
 */
export const useGlobalStats = (): UseGlobalStatsResult => {
  const [refetchTrigger, setRefetchTrigger] = useState(0);

  // Check if we have cached data
  const getCachedStats = useCallback((): GlobalStats | null => {
    return getCache<GlobalStats>(GLOBAL_STATS_CACHE_KEY);
  }, []);

  const { data, error, isLoading, mutate } = useSWR(
    `${GLOBAL_STATS_CACHE_KEY}-${refetchTrigger}`,
    async () => {
      const cachedStats = getCachedStats();
      if (cachedStats) {
        return cachedStats;
      }

      const freshStats = await fetchGlobalContributors();
      if (freshStats) {
        setCache(GLOBAL_STATS_CACHE_KEY, freshStats, { 
          ttl: GLOBAL_STATS_CACHE_TTL 
        });
      }
      return freshStats;
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      // Only revalidate if cache is older than 6 hours
      dedupingInterval: GLOBAL_STATS_CACHE_TTL,
    }
  );

  const refetch = useCallback(() => {
    setRefetchTrigger(prev => prev + 1);
    mutate();
  }, [mutate]);

  return {
    stats: data || null,
    isLoading,
    isError: !!error,
    error: error as Error | undefined,
    refetch,
  };
};
