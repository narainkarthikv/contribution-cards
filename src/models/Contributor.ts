/**
 * Contributor Domain Model
 * Contains business logic for contributor data and validation
 */

import type { Contributor, SortOption, RepoContrib } from '../types/github';

/**
 * Validates if a contributor object is well-formed
 */
export const validateContributor = (contributor: unknown): contributor is Contributor => {
  if (!contributor || typeof contributor !== 'object') return false;
  
  const c = contributor as Contributor;
  return (
    typeof c.login === 'string' &&
    typeof c.avatarUrl === 'string' &&
    typeof c.profileUrl === 'string' &&
    typeof c.totalContributions === 'number' &&
    Array.isArray(c.contributions)
  );
};

/**
 * Validates multiple contributors
 */
export const validateContributors = (
  contributors: unknown[]
): contributors is Contributor[] => {
  return Array.isArray(contributors) && contributors.every(validateContributor);
};

/**
 * Creates a Contributor domain model from partial data
 */
export const createContributor = (
  login: string,
  avatarUrl: string,
  profileUrl: string,
  name?: string,
  bio?: string,
  contributions: RepoContrib[] = [],
  totalContributions: number = 0
): Contributor => {
  return {
    login,
    name: name || login,
    avatarUrl,
    profileUrl,
    bio,
    contributions,
    totalContributions: totalContributions || contributions.reduce((sum, c) => sum + (c.commitsCount || 0), 0),
  };
};

/**
 * Merges two contributor records (for aggregation across repos)
 */
export const mergeContributors = (
  existing: Contributor,
  newData: {
    contribution: RepoContrib;
    name?: string;
    bio?: string;
  }
): Contributor => {
  return {
    ...existing,
    name: newData.name || existing.name,
    bio: newData.bio || existing.bio,
    contributions: [...existing.contributions, newData.contribution],
    totalContributions: existing.totalContributions + (newData.contribution.commitsCount || 0),
  };
};

/**
 * Calculates contributor statistics
 */
export const getContributorStats = (contributors: Contributor[]) => {
  return {
    total: contributors.length,
    totalContributions: contributors.reduce((sum, c) => sum + c.totalContributions, 0),
    averageContributions:
      contributors.length > 0
        ? Math.round(
            (contributors.reduce((sum, c) => sum + c.totalContributions, 0) /
              contributors.length) *
              100
          ) / 100
        : 0,
  };
};

/**
 * Filters contributors based on criteria
 */
export const filterContributors = (
  contributors: Contributor[],
  { searchTerm }: { searchTerm: string }
): Contributor[] => {
  const lowerSearch = searchTerm.toLowerCase();
  
  return contributors.filter((contributor) => {
    return (
      contributor.login.toLowerCase().includes(lowerSearch) ||
      (contributor.name && contributor.name.toLowerCase().includes(lowerSearch)) ||
      (contributor.bio && contributor.bio.toLowerCase().includes(lowerSearch))
    );
  });
};

/**
 * Sorts contributors based on criteria
 */
export const sortContributors = (
  contributors: Contributor[],
  field: SortOption['field'],
  order: SortOption['order']
): Contributor[] => {
  const sorted = [...contributors];
  
  sorted.sort((a, b) => {
    let aValue: any;
    let bValue: any;
    
    if (field === 'totalContributions') {
      aValue = a.totalContributions;
      bValue = b.totalContributions;
    } else if (field === 'name') {
      aValue = (a.name || a.login).toLowerCase();
      bValue = (b.name || b.login).toLowerCase();
    }
    
    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
  
  return sorted;
};
