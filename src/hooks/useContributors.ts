/**
 * Custom hook for fetching and managing contributors data
 * Implements stale-while-revalidate pattern with advanced caching
 */

import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import type {
  Contributor,
  ContributorResponse,
} from '../types/github';
import { fetchRepositoryContributors } from '../lib/github';
import { aggregateContributors } from '../utils/aggregateContributors';
import { getCache, setCache } from '../lib/cache';

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
 * Fetch all contributors from the given repositories
 */
const fetchAllContributors = async (
  repos: string[]
): Promise<Contributor[] | null> => {
  if (!repos || repos.length === 0) {
    return null;
  }

  const contributorsByRepo = new Map<string, ContributorResponse[]>();

  try {
    const fetchPromises = repos.map(async (repo) => {
      const [owner, repoName] = repo.split('/');
      try {
        const contributors = await fetchRepositoryContributors(
          owner,
          repoName
        );
        return { repo, contributors };
      } catch (error) {
        return { repo, contributors: [] };
      }
    });

    const results = await Promise.all(fetchPromises);

    results.forEach(({ repo, contributors }) => {
      contributorsByRepo.set(repo, contributors);
    });

    const aggregated = await aggregateContributors(repos, contributorsByRepo);
    return aggregated;
  } catch (error) {
    throw error;
  }
};

/**
 * Fetch with stale-while-revalidate pattern
 */
const fetchWithSWR = async (
  repos: string[]
): Promise<{ data: Contributor[] | null; isStale: boolean }> => {
  const cacheKey = `contributors-${repos.sort().join(',')}`;
  
  const cachedData = getCache<Contributor[]>(cacheKey);
  if (cachedData) {
    return { data: cachedData, isStale: true };
  }

  const freshData = await fetchAllContributors(repos);
  
  if (freshData) {
    setCache(cacheKey, freshData, { ttl: 86400000 });
  }
  
  return { data: freshData, isStale: false };
};

/**
 * Hook to fetch and manage contributors data with advanced caching
 */
export const useContributors = ({
  repositories,
  enableAutoFetch = true,
  revalidateInterval,
}: UseContributorsOptions): UseContributorsResult => {
  const [manualRefetch, setManualRefetch] = useState(0);
  const [cacheStatus, setCacheStatus] = useState<{
    isCached: boolean;
    age: number;
  } | undefined>();

  const repoKey = repositories.sort().join(',');
  const cacheKey = enableAutoFetch && repositories.length > 0 ? `contributors-${repoKey}` : null;

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
        focusThrottleInterval: revalidateInterval 
      }),
    }
  );

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

  const refetch = useCallback(() => {
    setManualRefetch((prev) => prev + 1);
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (!enableAutoFetch && manualRefetch > 0 && repositories.length > 0) {
      fetchAllContributors(repositories).then((result) => {
        if (result && cacheKey) {
          setCache(cacheKey, result, { ttl: 86400000 });
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
