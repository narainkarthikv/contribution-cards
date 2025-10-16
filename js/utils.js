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
  return (
    window.matchMedia?.("(prefers-color-scheme: dark)")?.matches || false
  );
}

/**
 * Apply theme to document and update icons/buttons
 * @param {boolean} isDark - Whether dark mode is enabled
 * @param {boolean} [persist=true] - Whether to save theme preference
 */
export function setTheme(isDark, persist = true) {
  document.body.classList.toggle("dark-mode", isDark);

  const themeIconSun = document.getElementById("themeIconSun");
  const themeIconMoon = document.getElementById("themeIconMoon");
  const themeToggleBtn = document.getElementById("themeToggleBtn");

  // Toggle icon visibility
  if (themeIconSun && themeIconMoon) {
    themeIconSun.classList.toggle("hidden", isDark);
    themeIconMoon.classList.toggle("hidden", !isDark);
  }

  // Update accessibility attributes
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute("aria-pressed", isDark ? "true" : "false");
    themeToggleBtn.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  }

  // Persist preference
  if (persist) {
    try {
      localStorage.setItem("darkMode", isDark ? "enabled" : "disabled");
    } catch {
      console.warn("⚠️ Unable to access localStorage for theme persistence.");
    }
  }
}

/**
 * Retrieve saved theme preference from localStorage
 * @returns {"enabled"|"disabled"|null}
 */
export function getSavedTheme() {
  try {
    return localStorage.getItem("darkMode");
  } catch {
    console.warn("⚠️ Unable to read theme preference from localStorage.");
    return null;
  }
}
