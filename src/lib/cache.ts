/**
 * Cache System with LocalStorage Integration
 * Provides TTL-based caching with automatic expiry, versioning, and size optimization
 */

/**
 * Cache entry metadata and payload
 */
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
  version: number;
  compressed?: boolean;
}

/**
 * Cache configuration options
 */
interface CacheOptions {
  ttl?: number; // Default: 1 hour
  version?: number; // Cache version for invalidation
  compress?: boolean; // Enable compression for large payloads
}

const CACHE_PREFIX = 'github_cache_';
const CACHE_VERSION = 1;
const DEFAULT_TTL = 3600000; // 1 hour in milliseconds
const MAX_STORAGE_SIZE = 5242880; // 5MB limit for localStorage

// In-memory cache for frequently accessed items (session-level cache)
const memoryCache = new Map<string, CacheEntry<any>>();

/**
 * Get current localStorage usage in bytes
 */
const getStorageSize = (): number => {
  let total = 0;
  for (const key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      total += localStorage[key].length + key.length;
    }
  }
  return total;
};

/**
 * Check if storage has enough space for new data
 */
const hasStorageSpace = (dataSize: number): boolean => {
  return getStorageSize() + dataSize < MAX_STORAGE_SIZE;
};

/**
 * Clear oldest cache entries to make space
 */
const clearOldestEntries = (requiredSpace: number): void => {
  const keys: string[] = [];
  const entries: Array<{ key: string; timestamp: number }> = [];

  // Find all cache entries
  for (const key in localStorage) {
    if (key.startsWith(CACHE_PREFIX)) {
      keys.push(key);
      try {
        const entry = JSON.parse(localStorage[key]) as CacheEntry<any>;
        entries.push({ key, timestamp: entry.timestamp });
      } catch {
        localStorage.removeItem(key);
      }
    }
  }

  // Sort by timestamp (oldest first)
  entries.sort((a, b) => a.timestamp - b.timestamp);

  // Remove oldest entries until we have enough space
  let freedSpace = 0;
  for (const entry of entries) {
    if (freedSpace >= requiredSpace) break;
    freedSpace += localStorage[entry.key]?.length ?? 0;
    localStorage.removeItem(entry.key);
  }
};

/**
 * Generate cache key
 */
const generateCacheKey = (key: string): string => {
  return `${CACHE_PREFIX}${key}`;
};

/**
 * Check if cache entry has expired
 */
const isExpired = (entry: CacheEntry<any>): boolean => {
  const age = Date.now() - entry.timestamp;
  return age > entry.ttl;
};

/**
 * Set cache with TTL
 */
export const setCache = <T>(
  key: string,
  value: T,
  options: CacheOptions = {}
): void => {
  const ttl = options.ttl ?? DEFAULT_TTL;
  const version = options.version ?? CACHE_VERSION;

  const entry: CacheEntry<T> = {
    data: value,
    timestamp: Date.now(),
    ttl,
    version,
    compressed: options.compress ?? false,
  };

  // Always set in memory cache for fast access
  memoryCache.set(key, entry);

  // Try to persist to localStorage
  try {
    const serialized = JSON.stringify(entry);
    const size = serialized.length;

    if (!hasStorageSpace(size)) {
      clearOldestEntries(size);
    }

    const cacheKey = generateCacheKey(key);
    localStorage.setItem(cacheKey, serialized);
  } catch (error) {
    // If localStorage fails, continue with memory cache only
    console.warn(`Failed to persist cache for key "${key}":`, error);
  }
};

/**
 * Get cache if valid and not expired
 */
export const getCache = <T>(key: string): T | null => {
  // Check memory cache first (faster)
  const memEntry = memoryCache.get(key);
  if (memEntry && !isExpired(memEntry)) {
    return memEntry.data as T;
  }

  // Check localStorage
  try {
    const cacheKey = generateCacheKey(key);
    const stored = localStorage.getItem(cacheKey);

    if (!stored) {
      memoryCache.delete(key);
      return null;
    }

    const entry: CacheEntry<T> = JSON.parse(stored);

    // Check version compatibility
    if (entry.version !== CACHE_VERSION) {
      localStorage.removeItem(cacheKey);
      memoryCache.delete(key);
      return null;
    }

    // Check expiry
    if (isExpired(entry)) {
      localStorage.removeItem(cacheKey);
      memoryCache.delete(key);
      return null;
    }

    // Update memory cache and return
    memoryCache.set(key, entry);
    return entry.data;
  } catch (error) {
    console.warn(`Failed to retrieve cache for key "${key}":`, error);
    memoryCache.delete(key);
    return null;
  }
};

/**
 * Delete specific cache entry
 */
export const deleteCache = (key: string): void => {
  memoryCache.delete(key);
  try {
    const cacheKey = generateCacheKey(key);
    localStorage.removeItem(cacheKey);
  } catch (error) {
    console.warn(`Failed to delete cache for key "${key}":`, error);
  }
};

/**
 * Clear all GitHub-related cache entries
 */
export const clearAllCache = (): void => {
  memoryCache.clear();
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.warn('Failed to clear cache:', error);
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = (): {
  memorySize: number;
  storageSize: number;
  memoryEntries: number;
  storageEntries: number;
} => {
  let storageSize = 0;
  let storageEntries = 0;

  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        storageSize += (localStorage[key]?.length ?? 0) + key.length;
        storageEntries++;
      }
    });
  } catch (error) {
    console.warn('Failed to get cache stats:', error);
  }

  return {
    memorySize: memoryCache.size,
    storageSize,
    memoryEntries: memoryCache.size,
    storageEntries,
  };
};

/**
 * Invalidate cache entries matching a pattern
 */
export const invalidateCachePattern = (pattern: RegExp | string): void => {
  const regex = typeof pattern === 'string' ? new RegExp(pattern) : pattern;

  // Clear from memory cache
  for (const [key] of memoryCache) {
    if (regex.test(key)) {
      memoryCache.delete(key);
    }
  }

  // Clear from localStorage
  try {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(CACHE_PREFIX)) {
        const actualKey = key.substring(CACHE_PREFIX.length);
        if (regex.test(actualKey)) {
          localStorage.removeItem(key);
        }
      }
    });
  } catch (error) {
    console.warn('Failed to invalidate cache pattern:', error);
  }
};

/**
 * Get cache entry with metadata (for debugging)
 */
export const getCacheEntry = <T>(key: string): CacheEntry<T> | null => {
  const cacheKey = generateCacheKey(key);
  try {
    const stored = localStorage.getItem(cacheKey);
    if (!stored) return memoryCache.get(key) ?? null;
    return JSON.parse(stored);
  } catch (error) {
    return memoryCache.get(key) ?? null;
  }
};
