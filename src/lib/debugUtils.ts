/**
 * Cache and Rate Limiting Utilities
 * Provides helper functions to manage, monitor, and debug the caching and rate limiting system
 */

import {
  getCacheStats,
  clearAllCache,
  invalidateCachePattern,
  getCacheEntry,
} from './cache';
import { GitHubService } from '../services/GitHubService';

/**
 * Cache management utilities
 */
export const CacheManager = {
  /**
   * Get detailed cache statistics
   */
  getStats: () => getCacheStats(),

  /**
   * Clear all cached data
   */
  clearAll: () => clearAllCache(),

  /**
   * Invalidate cache entries matching a pattern
   */
  invalidatePattern: (pattern: RegExp | string) =>
    invalidateCachePattern(pattern),

  /**
   * Invalidate all user-related cache
   */
  invalidateUsers: () => invalidateCachePattern(/^user:/),

  /**
   * Invalidate all contributor cache
   */
  invalidateContributors: () => invalidateCachePattern(/^contributors:/),

  /**
   * Invalidate all PR and issue counts
   */
  invalidateContributionCounts: () => {
    invalidateCachePattern(/^pr-count:/);
    invalidateCachePattern(/^issue-count:/);
  },

  /**
   * Invalidate all repository-related cache
   */
  invalidateRepositories: () => invalidateCachePattern(/^repo-details:/),

  /**
   * Get entry metadata for debugging
   */
  getEntry: <T = unknown>(key: string) => getCacheEntry<T>(key),

  /**
   * Export cache data for backup
   */
  exportData: (): string => {
    const stats = getCacheStats();
    return JSON.stringify(stats, null, 2);
  },
};

/**
 * Rate limiting monitoring utilities
 */
export const RateLimitMonitor = {
  /**
   * Get current GitHub API rate limit status
   */
  getStatus: async () => {
    return GitHubService.getRateLimit();
  },

  /**
   * Check if rate limit is critically low
   */
  isCritical: async (threshold: number = 10) => {
    const { remaining } = await GitHubService.getRateLimit();
    return remaining < threshold;
  },

  /**
   * Get formatted rate limit status for display
   */
  getDisplayStatus: async () => {
    const { limit, remaining } = await GitHubService.getRateLimit();
    const percentage = limit > 0 ? (remaining / limit) * 100 : 0;

    return {
      limit,
      remaining,
      used: limit - remaining,
      percentage: Math.round(percentage),
      status:
        percentage > 50 ? 'good' : percentage > 20 ? 'warning' : 'critical',
    };
  },
};

/**
 * Performance and optimization utilities
 */
export const OptimizationMetrics = {
  /**
   * Analyze cache hit/miss efficiency
   */
  analyzeCacheEfficiency: (): {
    totalCacheEntries: number;
    storageUsageBytes: number;
    estimatedSavings: number; // Estimated API calls saved
  } => {
    const stats = getCacheStats();

    // Rough estimation of API calls saved
    const estimatedApiCallsSaved = stats.storageEntries;

    return {
      totalCacheEntries: stats.storageEntries,
      storageUsageBytes: stats.storageSize,
      estimatedSavings: estimatedApiCallsSaved,
    };
  },

  /**
   * Estimate monthly cost savings with caching
   */
  estimateCostSavings: (costPerApiCall: number = 0.0001) => {
    const metrics = OptimizationMetrics.analyzeCacheEfficiency();
    return {
      savedApiCalls: metrics.estimatedSavings,
      estimatedMonthlySavings: metrics.estimatedSavings * costPerApiCall,
      bandwidthSavedKB: Math.round(metrics.storageUsageBytes / 1024),
    };
  },
};

/**
 * Debug utilities - exposed for development console
 */
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__GITHUB_CACHE_DEBUG__ = {
    cache: CacheManager,
    rateLimit: RateLimitMonitor,
    metrics: OptimizationMetrics,
    help: () => {
      console.log(`
GitHub Cache & Rate Limiting Debug Tools:

Cache Management:
  __GITHUB_CACHE_DEBUG__.cache.getStats()        - Get cache statistics
  __GITHUB_CACHE_DEBUG__.cache.clearAll()        - Clear all cache
  __GITHUB_CACHE_DEBUG__.cache.invalidateUsers() - Clear user cache
  __GITHUB_CACHE_DEBUG__.cache.invalidateContributors() - Clear contributor cache

Rate Limiting:
  __GITHUB_CACHE_DEBUG__.rateLimit.getStatus()   - Get GitHub API rate limit
  __GITHUB_CACHE_DEBUG__.rateLimit.isCritical()  - Check if rate limit is critical

Performance Metrics:
  __GITHUB_CACHE_DEBUG__.metrics.analyzeCacheEfficiency() - Analyze cache efficiency
  __GITHUB_CACHE_DEBUG__.metrics.estimateCostSavings()   - Estimate cost savings
      `);
    },
  };
}

export default {
  CacheManager,
  RateLimitMonitor,
  OptimizationMetrics,
};
