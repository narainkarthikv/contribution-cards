/**
 * GitHub API Types & Domain Models
 * Separation of concerns: Types here are used across Models, Services, and Controllers
 */

// ============================================================================
// DOMAIN MODELS (Business Logic)
// ============================================================================

/**
 * Repository Contribution - represents contributions to a specific repository
 */
export interface RepoContrib {
  repo: string;
  commitsCount?: number;
}

/**
 * Contributor Domain Model - represents an aggregated contributor across multiple repos
 */
export interface Contributor {
  login: string;
  name?: string;
  avatarUrl: string;
  profileUrl: string;
  bio?: string;
  contributions: RepoContrib[];
  totalContributions: number;
}

// ============================================================================
// API RESPONSE TYPES (from GitHub API)
// ============================================================================

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

// ============================================================================
// CONTROLLER/STATE TYPES
// ============================================================================

/**
 * Filter Options - used for filtering contributors in the UI
 */
export interface FilterOptions {
  repositories: string[];
  contributionType: 'all' | 'commits';
  searchTerm: string;
}

/**
 * Sort Option - used for sorting contributors
 */
export interface SortOption {
  field: 'totalContributions' | 'name';
  order: 'asc' | 'desc';
}
