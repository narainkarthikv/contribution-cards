/**
 * Contributor Aggregation Service
 * Part of the MODEL/SERVICE layer - handles business logic for aggregating contributor data
 * from multiple repositories and enriching with user profile information
 */

import type {
  Contributor,
  ContributorResponse,
  RepoContrib,
} from '../types/github';
import { GitHubService } from './GitHubService';
import { createContributor, mergeContributors } from '../models/Contributor';

/**
 * Aggregates contributors from multiple repositories
 * Merges duplicate contributors across repos and enriches with profile data
 */
export const ContributorAggregationService = {
  /**
   * Fetch and aggregate all contributors from given repositories
   */
  async aggregateContributors(repos: string[]): Promise<Contributor[]> {
    if (!repos || repos.length === 0) {
      return [];
    }

    const contributorsByRepo = new Map<string, ContributorResponse[]>();

    try {
      // Fetch contributors from all repositories in parallel
      const fetchPromises = repos.map(async (repo) => {
        const [owner, repoName] = repo.split('/');
        try {
          const contributors = await GitHubService.fetchRepositoryContributors(
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

      // Aggregate and enrich contributors
      return await this.aggregateAndEnrichContributors(
        repos,
        contributorsByRepo
      );
    } catch (error) {
      console.error('Failed to aggregate contributors:', error);
      return [];
    }
  },

  /**
   * Internal: Aggregate contributors and enrich with user profile data
   */
  async aggregateAndEnrichContributors(
    repos: string[],
    contributorsByRepo: Map<string, ContributorResponse[]>
  ): Promise<Contributor[]> {
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
          // Merge with existing contributor (same login in multiple repos)
          const enrichedData = await GitHubService.fetchUserProfile(
            contrib.login
          );
          contributorMap.set(
            contrib.login,
            mergeContributors(existingContributor, {
              contribution: repoContrib,
              name: enrichedData?.name,
              bio: enrichedData?.bio,
            })
          );
        } else {
          // Fetch profile data for new contributor
          const userProfile = await GitHubService.fetchUserProfile(
            contrib.login
          );

          const newContributor: Contributor = createContributor(
            contrib.login,
            contrib.avatar_url,
            contrib.html_url,
            userProfile?.name,
            userProfile?.bio,
            [repoContrib],
            contrib.contributions
          );

          contributorMap.set(contrib.login, newContributor);
        }
      }
    }

    // Return aggregated contributors
    return Array.from(contributorMap.values());
  },

  /**
   * Export contributors to CSV format
   */
  exportToCSV(contributors: Contributor[]): string {
    const headers = [
      'Login',
      'Name',
      'Total Contributions',
      'Repositories',
      'Profile URL',
    ];

    const rows = contributors.map((contributor) => [
      contributor.login,
      contributor.name || '',
      contributor.totalContributions,
      contributor.contributions.map((c) => c.repo).join(';'),
      contributor.profileUrl,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ),
    ].join('\n');

    return csvContent;
  },
};
