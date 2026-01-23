/**
 * Theme State Controller
 * CONTROLLER layer - manages theme state and persistence
 */

import { useCallback, useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'theme';
const THEME_CLASS = 'dark';
const THEME_BACKGROUND_DARK = '#0f172a';
const THEME_BACKGROUND_LIGHT = '#f9fafb';
const THEME_TEXT_DARK = '#f1f5f9';
const THEME_TEXT_LIGHT = '#111827';

export type Theme = 'light' | 'dark';

export interface UseThemeResult {
  isDark: boolean;
  theme: Theme;
  toggleTheme: () => void;
}

/**
 * Initialize theme from localStorage or system preference
 */
const initializeTheme = (): boolean => {
  if (typeof window === 'undefined') return false;

  const saved = localStorage.getItem(THEME_STORAGE_KEY);
  if (saved) return saved === 'dark';

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
};

/**
 * Apply theme to DOM
 */
const applyTheme = (isDark: boolean): void => {
  const htmlElement = document.documentElement;

  if (isDark) {
    htmlElement.classList.add(THEME_CLASS);
    htmlElement.style.backgroundColor = THEME_BACKGROUND_DARK;
    htmlElement.style.color = THEME_TEXT_DARK;
  } else {
    htmlElement.classList.remove(THEME_CLASS);
    htmlElement.style.backgroundColor = THEME_BACKGROUND_LIGHT;
    htmlElement.style.color = THEME_TEXT_LIGHT;
  }

  localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
};

/**
 * Hook to manage theme state
 * This is the CONTROLLER for theme/appearance
 */
export const useTheme = (): UseThemeResult => {
  const [isDark, setIsDark] = useState(() => initializeTheme());

  /**
   * Apply theme whenever it changes
   */
  useEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  /**
   * Toggle theme
   */
  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  return {
    isDark,
    theme: isDark ? 'dark' : 'light',
    toggleTheme,
  };
};
