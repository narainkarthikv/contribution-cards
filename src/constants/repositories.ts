/**
 * Application Constants
 * Centralized configuration for the application
 */

export const REPOSITORY_LIST = [
  'narainkarthikv/contribution-cards',
  'narainkarthikv/fit-track',
  'narainkarthikv/GLIS',
  'narainkarthikv/nmoji',
  'narainkarthikv/readme-shop',
  'narainkarthikv/sticky-memo',
] as const;

export type RepositoryName = (typeof REPOSITORY_LIST)[number];

export const CONTRIBUTORS_CACHE_KEY_PREFIX = 'contributors';
export const CONTRIBUTORS_CACHE_TTL = 86400000; // 24 hours in milliseconds

export const APP_NAME = 'Contribution Cards';
export const APP_REPOSITORY = 'narainkarthikv/contribution-cards';
export const APP_AUTHOR = 'Wisdom Fox Community';
export const APP_AUTHOR_URL = 'https://github.com/narainkarthikv';
