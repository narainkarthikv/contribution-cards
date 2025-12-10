/**
 * Main App Component
 * Root application component with routing and layout
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, Moon, Sun, X } from 'lucide-react';
import { Home } from './pages/Home';
import { ContributorsPage } from './pages/Contributors';
import { validateGitHubToken } from './lib/github';

export const REPOSITORIES = [
  'narainkarthikv/contribution-cards',
  'narainkarthikv/fit-track',
  'narainkarthikv/GLIS',
  'narainkarthikv/nmoji',
  'narainkarthikv/readme-shop',
  'narainkarthikv/sticky-memo',
];

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showTokenWarning, setShowTokenWarning] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
      htmlElement.style.backgroundColor = '#0f172a';
      htmlElement.style.color = '#f1f5f9';
    } else {
      htmlElement.classList.remove('dark');
      htmlElement.style.backgroundColor = '#f9fafb';
      htmlElement.style.color = '#111827';
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const checkToken = async () => {
      const isValid = await validateGitHubToken();
      setTokenValid(isValid);
      if (!isValid) {
        setShowTokenWarning(true);
      }
    };
    checkToken();
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <Router>
      <div className="w-full h-full flex flex-col bg-gray-50 dark:bg-slate-950">
        {showTokenWarning && !tokenValid && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-700 px-4 py-3 flex-shrink-0"
          >
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="text-sm text-amber-800 dark:text-amber-200 flex-1">
                <span className="font-semibold">⚠️ GitHub Token Not Found:</span> Set VITE_GITHUB_TOKEN in .env.local for higher API limits (60 → 5,000 requests/hour)
              </div>
              <button
                onClick={() => setShowTokenWarning(false)}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex-shrink-0 transition-colors"
                aria-label="Dismiss warning"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}

        <header className="sticky top-0 z-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800 flex-shrink-0">
          <nav className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 max-w-full">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <Github className="w-6 h-6 text-blue-600 dark:text-cyan-400 flex-shrink-0" />
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white truncate">
                Contribution Cards
              </h1>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <a
                href="https://github.com/narainkarthikv/contribution-cards"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors duration-200"
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
            </div>
          </nav>
        </header>

        <main className="flex-1 w-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contributors" element={<ContributorsPage />} />
          </Routes>
        </main>

        <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8 flex-shrink-0">
          <div className="w-full max-w-7xl mx-auto text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <p>
              &copy; 2025 Contribution Cards — An open-source project by{' '}
              <a
                href="https://github.com/narainkarthikv"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-cyan-400 hover:underline font-medium"
              >
                Wisdom Fox Community
              </a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
