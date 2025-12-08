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
import { useContributors } from './hooks/useContributors';
import { validateGitHubToken } from './lib/github';

// Default repository to display - showing only sticky-memo by default for better UX
const DEFAULT_REPOSITORIES = ['narainkarthikv/sticky-memo'];

export const App: React.FC = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [showTokenWarning, setShowTokenWarning] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  const { data: contributors, isLoading, isError, refetch } = useContributors({
    repositories: DEFAULT_REPOSITORIES,
    enableAutoFetch: true,
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
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
      <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
        {/* Token Warning Banner */}
        {showTokenWarning && !tokenValid && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 px-4 py-3"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="text-sm text-yellow-800 dark:text-yellow-200">
                <span className="font-semibold">⚠️ GitHub Token Not Found:</span> Set VITE_GITHUB_TOKEN in .env.local for higher API limits (60 → 5,000 requests/hour)
              </div>
              <button
                onClick={() => setShowTokenWarning(false)}
                className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-300"
                aria-label="Dismiss warning"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Navigation Header */}
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="w-6 h-6 text-blue-600 dark:text-cyan-400" />
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                Contribution Cards
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
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
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full bg-gray-50 dark:bg-gray-950">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  contributors={contributors}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/contributors"
              element={
                <ContributorsPage
                  contributors={contributors}
                  isLoading={isLoading}
                  isError={isError}
                  refetch={refetch}
                />
              }
            />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-600 dark:text-gray-400">
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
