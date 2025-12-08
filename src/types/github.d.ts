/**
 * GitHub API Types
 */

export interface RepoContrib {
  repo: string;
  commitsCount?: number;
  prsCount?: number;
  issuesCount?: number;
  lastContribution?: string;
}

export interface Contributor {
  login: string;
  name?: string;
  avatarUrl: string;
  profileUrl: string;
  bio?: string;
  contributions: RepoContrib[];
  totalContributions: number;
}

export interface GitHubUser {
  login: string;
  name?: string;
  avatar_url: string;
  html_url: string;
  bio?: string;
}

export interface ContributorResponse {
  login: string;
  contributions: number;
  avatar_url: string;
  html_url: string;
}

export interface GraphQLError {
  message: string;
  extensions?: {
    value?: string;
    problems?: Array<{
      explanation: string;
      locations?: Array<{
        line: number;
        column: number;
      }>;
    }>;
  };
}

export interface GraphQLResponse<T> {
  data?: T;
  errors?: GraphQLError[];
}

export interface FilterOptions {
  repositories: string[];
  contributionType: 'all' | 'commits' | 'prs' | 'issues';
  searchTerm: string;
}

export interface SortOption {
  field: 'totalContributions' | 'name' | 'lastContribution';
  order: 'asc' | 'desc';
}
