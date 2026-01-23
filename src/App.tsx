/**
 * Main App Component
 * Root application component with routing, layout, and global theme management
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, X } from 'lucide-react';
import { Home } from './pages/Home';
import { ContributorsPage } from './pages/Contributors';
import { useTheme } from './controllers/useTheme';
import { GitHubService } from './services/GitHubService';
import { 
  APP_NAME, 
  APP_REPOSITORY, 
  APP_AUTHOR,
  APP_AUTHOR_URL 
} from './constants/repositories';

export const App: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [showTokenWarning, setShowTokenWarning] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);

  /**
   * Validate GitHub token on mount
   */
  useEffect(() => {
    const checkToken = async () => {
      const isValid = await GitHubService.validateToken();
      setTokenValid(isValid);
      if (!isValid) {
        setShowTokenWarning(true);
      }
    };
    checkToken();
  }, []);

  return (
    <Router>
      <div className="w-full h-full flex flex-col">
        {/* Token Warning Banner */}
        {showTokenWarning && !tokenValid && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40 border-b-2 border-amber-300 dark:border-amber-700 px-4 py-4 flex-shrink-0 backdrop-blur-sm"
          >
            <div className="w-full max-w-7xl mx-auto flex items-center justify-between gap-4">
              <div className="text-sm text-amber-900 dark:text-amber-200 flex-1">
                <span className="font-bold">⚠️ GitHub Token Not Found:</span> Set VITE_GITHUB_TOKEN in .env.local for higher API limits (60 → 5,000 requests/hour)
              </div>
              <button
                onClick={() => setShowTokenWarning(false)}
                className="text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 flex-shrink-0 transition-colors p-1"
                aria-label="Dismiss warning"
              >
                <X size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Header - Modern Glassmorphism */}
        <header className="sticky top-0 z-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50 flex-shrink-0 shadow-sm">
          <nav className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 max-w-full">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition" />
                <Github className="w-7 h-7 text-white relative flex-shrink-0" />
              </div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 truncate">
                {APP_NAME}
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 border border-gray-200/50 dark:border-slate-700/50"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg className="w-5 h-5 text-yellow-500 animate-spin" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.415 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm11.313 0a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 7a3 3 0 100 6 3 3 0 000-6zm0-2a1 1 0 011 1v1a1 1 0 11-2 0V6a1 1 0 011-1zM4 10a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm12 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>

              <motion.a
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                href={`https://github.com/${APP_REPOSITORY}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-200 border border-gray-200/50 dark:border-slate-700/50 group"
                aria-label="View on GitHub"
              >
                <Github className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </motion.a>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <main className="flex-1 w-full overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contributors" element={<ContributorsPage />} />
          </Routes>
        </main>

        {/* Footer - Modern */}
        <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-slate-800/50 py-8 px-4 sm:px-6 lg:px-8 flex-shrink-0">
          <div className="w-full max-w-7xl mx-auto text-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <p className="font-medium">
              &copy; 2025 <span className="font-bold text-gray-900 dark:text-white">{APP_NAME}</span> — An open-source project by{' '}
              <motion.a
                whileHover={{ scale: 1.05 }}
                href={APP_AUTHOR_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-bold transition-colors"
              >
                {APP_AUTHOR} ⭐
              </motion.a>
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
};

export default App;
