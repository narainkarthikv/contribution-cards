// utils.js - Shared utilities for Contribution Cards
// Provides debounce and theme management helpers

/**
 * Debounce function for performance optimization
 * Prevents a function from being called too frequently.
 *
 * @param {Function} func - The function to debounce
 * @param {number} wait - Delay in milliseconds
 * @returns {Function}
 */
export function debounce(func, wait = 300) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Check if system prefers dark mode
 * @returns {boolean}
 */
export function getSystemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches || false;
}
// Note: Theme management is handled centrally in `js/main.js` (themeManager).
// This utils module provides small helpers only. Avoid duplicating theme
// persistence or DOM-manipulation logic here to prevent conflicting keys.

/**
 * Retrieve saved theme preference from localStorage using canonical key.
 * Returns 'dark'|'light'|null
 */
export function getSavedThemeCanonical() {
  try {
    return localStorage.getItem("contribution-cards-theme");
  } catch {
    console.warn("⚠️ Unable to read theme preference from localStorage.");
    return null;
  }
}
