// utils.js - Shared utilities for Contribution Cards

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Delay in ms
 * @returns {Function}
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Theme management utilities
 */
export function getSystemPrefersDark() {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function setTheme(isDark, persist = true) {
  document.body.classList.toggle('dark-mode', isDark);
  const themeIconSun = document.getElementById('themeIconSun');
  const themeIconMoon = document.getElementById('themeIconMoon');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (themeIconSun && themeIconMoon) {
    themeIconSun.classList.toggle('hidden', isDark);
    themeIconMoon.classList.toggle('hidden', !isDark);
  }
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    themeToggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if (persist) {
    try {
      localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    } catch (e) {}
  }
}

export function getSavedTheme() {
  try {
    return localStorage.getItem('darkMode');
  } catch (e) {
    return null;
  }
}
