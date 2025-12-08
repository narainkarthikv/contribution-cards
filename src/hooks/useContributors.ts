/**
 * Custom hook for fetching and managing contributors data
 */

import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import type {
  Contributor,
  ContributorResponse,
} from '../types/github';
import { fetchRepositoryContributors } from '../lib/github';
import { aggregateContributors } from '../utils/aggregateContributors';

export interface UseContributorsOptions {
  repositories: string[];
  enableAutoFetch?: boolean;
}

export interface UseContributorsResult {
  data: Contributor[] | null;
  isLoading: boolean;
  isError: boolean;
  error?: Error;
  refetch: () => void;
}

/**
 * Fetch all contributors from the given repositories
 */
const fetchAllContributors = async (
  repos: string[]
): Promise<Contributor[] | null> => {
  const contributorsByRepo = new Map<string, ContributorResponse[]>();

  try {
    // Fetch contributors from all repositories in parallel
    const fetchPromises = repos.map(async (repo) => {
      const [owner, repoName] = repo.split('/');
      try {
        const contributors = await fetchRepositoryContributors(
          owner,
          repoName
        );
        return { repo, contributors };
      } catch (error) {
        console.error(`Failed to fetch contributors for ${repo}:`, error);
        return { repo, contributors: [] };
      }
    });

    const results = await Promise.all(fetchPromises);

    results.forEach(({ repo, contributors }) => {
      contributorsByRepo.set(repo, contributors);
    });

    // Aggregate the data
    const aggregated = await aggregateContributors(repos, contributorsByRepo);
    return aggregated;
  } catch (error) {
    console.error('Failed to aggregate contributors:', error);
    throw error;
  }
};

/**
 * Hook to fetch and manage contributors data
 */
export const useContributors = ({
  repositories,
  enableAutoFetch = true,
}: UseContributorsOptions): UseContributorsResult => {
  const [manualRefetch, setManualRefetch] = useState(0);

  const repoKey = repositories.sort().join(',');
  const cacheKey = enableAutoFetch ? `contributors-${repoKey}` : null;

  const { data, error, isLoading, mutate } = useSWR(
    cacheKey,
    () => fetchAllContributors(repositories),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 3600000, // 1 hour
      focusThrottleInterval: 300000, // 5 minutes
      errorRetryCount: 2,
      errorRetryInterval: 5000,
    }
  );

  const refetch = useCallback(() => {
    setManualRefetch((prev) => prev + 1);
    mutate();
  }, [mutate]);

  useEffect(() => {
    if (!enableAutoFetch && manualRefetch > 0) {
      fetchAllContributors(repositories).then((result) => {
        mutate(result);
      });
    }
  }, [manualRefetch, enableAutoFetch, repositories, mutate]);

  return {
    data: data || null,
    isLoading,
    isError: !!error,
    error,
    refetch,
  };
};
