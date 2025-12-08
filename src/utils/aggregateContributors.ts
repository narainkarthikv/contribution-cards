/**
 * Utility functions for aggregating contributor data
 */

import type {
  Contributor,
  ContributorResponse,
  RepoContrib,
} from '../types/github';
import {
  fetchUserProfile,
} from '../lib/github';

/**
 * Aggregate contributors from multiple repositories
 * Merges data by login and totals contributions across repos
 */
export const aggregateContributors = async (
  repos: string[],
  contributorsByRepo: Map<string, ContributorResponse[]>
): Promise<Contributor[]> => {
  const contributorMap = new Map<string, Contributor>();

  // Iterate through each repository and its contributors
  for (const repo of repos) {
    const contributors = contributorsByRepo.get(repo) || [];

    for (const contrib of contributors) {
      const existingContributor = contributorMap.get(contrib.login);

      // Build repo contribution data
      const repoContrib: RepoContrib = {
        repo,
        commitsCount: contrib.contributions,
      };

      if (existingContributor) {
        // Merge with existing contributor
        existingContributor.contributions.push(repoContrib);
        existingContributor.totalContributions += contrib.contributions;
      } else {
        // Create new contributor entry
        const userProfile = await fetchUserProfile(contrib.login);

        const newContributor: Contributor = {
          login: contrib.login,
          name: userProfile?.name || contrib.login,
          avatarUrl: contrib.avatar_url,
          profileUrl: contrib.html_url,
          bio: userProfile?.bio,
          contributions: [repoContrib],
          totalContributions: contrib.contributions,
        };

        contributorMap.set(contrib.login, newContributor);
      }
    }
  }

  // Return aggregated contributors without additional async data fetching
  return Array.from(contributorMap.values());
};

/**
 * Filter contributors based on criteria
 */
export const filterContributors = (
  contributors: Contributor[],
  {
    repositories,
    contributionType,
    searchTerm,
  }: {
    repositories: string[];
    contributionType: 'all' | 'commits' | 'prs' | 'issues';
    searchTerm: string;
  }
): Contributor[] => {
  return contributors.filter((contributor) => {
    // Search filter
    if (
      searchTerm &&
      !contributor.login.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !contributor.name?.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Repository filter
    if (repositories.length > 0) {
      const hasContribution = contributor.contributions.some((contrib) =>
        repositories.includes(contrib.repo)
      );
      if (!hasContribution) {
        return false;
      }
    }

    // Contribution type filter
    if (contributionType !== 'all') {
      let hasType = false;

      for (const contrib of contributor.contributions) {
        if (contributionType === 'commits' && contrib.commitsCount) {
          hasType = true;
          break;
        }
        if (contributionType === 'prs' && contrib.prsCount) {
          hasType = true;
          break;
        }
        if (contributionType === 'issues' && contrib.issuesCount) {
          hasType = true;
          break;
        }
      }

      if (!hasType) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort contributors based on criteria
 */
export const sortContributors = (
  contributors: Contributor[],
  field: 'totalContributions' | 'name' | 'lastContribution',
  order: 'asc' | 'desc' = 'desc'
): Contributor[] => {
  const sorted = [...contributors].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (field) {
      case 'totalContributions':
        aValue = a.totalContributions;
        bValue = b.totalContributions;
        break;
      case 'name':
        aValue = (a.name || a.login).toLowerCase();
        bValue = (b.name || b.login).toLowerCase();
        break;
      case 'lastContribution':
        aValue = a.contributions[0]?.lastContribution || '';
        bValue = b.contributions[0]?.lastContribution || '';
        break;
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return order === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return order === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return sorted;
};

/**
 * Export contributors to CSV format
 */
export const exportToCSV = (contributors: Contributor[]): string => {
  const headers = [
    'Username',
    'Name',
    'Avatar URL',
    'Profile URL',
    'Bio',
    'Total Contributions',
    'Repositories',
    'Commits',
    'Pull Requests',
    'Issues',
  ];

  const rows = contributors.map((contributor) => [
    contributor.login,
    contributor.name || '',
    contributor.avatarUrl,
    contributor.profileUrl,
    contributor.bio || '',
    contributor.totalContributions.toString(),
    contributor.contributions.map((c) => c.repo).join(';'),
    contributor.contributions
      .reduce((sum, c) => sum + (c.commitsCount || 0), 0)
      .toString(),
    contributor.contributions
      .reduce((sum, c) => sum + (c.prsCount || 0), 0)
      .toString(),
    contributor.contributions
      .reduce((sum, c) => sum + (c.issuesCount || 0), 0)
      .toString(),
  ]);

  const csvContent = [
    headers.map((h) => `"${h}"`).join(','),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  return csvContent;
};

/**
 * Debounce utility function
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};
