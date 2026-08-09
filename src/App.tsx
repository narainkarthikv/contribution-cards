/**
 * Main App Component
 * Root application component with routing, layout, and global theme management
 */

import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Github, X } from 'lucide-react';
import { Home } from './pages/Home';
import { ContributorsPage } from './pages/Contributors';
import { useTheme } from './controllers/useTheme';
import { GitHubService } from './services/GitHubService';
import { APP_NAME, APP_REPOSITORY } from './constants/repositories';
import { IconButton } from './common';
import { I18nProvider } from './i18n/I18nProvider';
import { useI18n } from './i18n/useI18n';

export const AppContent: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const { language, changeLanguage, t } = useI18n();
  const [showTokenWarning, setShowTokenWarning] = useState(false);
  const [tokenValid, setTokenValid] = useState(true);
  const navigate = useNavigate();

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
    <div className='w-full h-full flex flex-col'>
      {/* Token Warning Banner */}
      {showTokenWarning && !tokenValid && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className='bg-[var(--color-bg-secondary)] border-b border-[var(--color-warning)] px-4 py-4 flex-shrink-0'>
          <div className='w-full max-w-7xl mx-auto flex items-center justify-between gap-4'>
            <div className='text-sm text-[var(--color-text-primary)] flex-1'>
              <span className='font-bold text-[var(--color-warning)]'>
                ⚠ {t('app.tokenWarningTitle')}
              </span>{' '}
              {t('app.tokenWarningMessage')}
            </div>
            <button
              onClick={() => setShowTokenWarning(false)}
              className='text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] rounded-md flex-shrink-0 transition-colors p-1'
              aria-label={t('app.dismissWarning')}>
              <X size={20} />
            </button>
          </div>
        </motion.div>
      )}

      <header className='sticky top-0 z-20 bg-[var(--color-surface-primary)] border-b border-[var(--color-border-primary)] flex-shrink-0'>
        <nav className='h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 max-w-full'>
          <button
            onClick={() => navigate('/')}
            className='flex items-center gap-3 flex-1 min-w-0 cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)]'
            aria-label={t('app.goToHome')}>
            <Github className='w-7 h-7 text-[var(--color-action-default)] flex-shrink-0' />
            <h1 className='text-xl sm:text-2xl md:text-3xl font-black text-[var(--color-action-default)] truncate'>
              {APP_NAME}
            </h1>
          </button>

          <div className='flex items-center gap-2 sm:gap-3 flex-shrink-0'>
            <IconButton
              onClick={() => changeLanguage(language === 'en' ? 'es' : 'en')}
              variant='ghost'
              aria-label={t('app.switchLanguage')}
              className='text-sm font-semibold'>
              {language === 'en' ? 'ES' : 'EN'}
            </IconButton>

            <IconButton
              onClick={toggleTheme}
              variant='ghost'
              aria-label={t('app.toggleTheme')}>
              {isDark ? (
                <svg
                  className='w-5 h-5 text-[var(--color-text-primary)]'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path d='M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4.22 4.22a1 1 0 011.415 0l.707.707a1 1 0 01-1.414 1.414l-.707-.707a1 1 0 010-1.414zm11.313 0a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 7a3 3 0 100 6 3 3 0 000-6zm0-2a1 1 0 011 1v1a1 1 0 11-2 0V6a1 1 0 011-1zM4 10a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm12 0a1 1 0 011-1h1a1 1 0 110 2h-1a1 1 0 01-1-1z' />
                </svg>
              ) : (
                <svg
                  className='w-5 h-5 text-[var(--color-action-default)]'
                  fill='currentColor'
                  viewBox='0 0 20 20'>
                  <path d='M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z' />
                </svg>
              )}
            </IconButton>

            <IconButton
              href={`https://github.com/${APP_REPOSITORY}`}
              target='_blank'
              rel='noopener noreferrer'
              variant='ghost'
              className='group'
              aria-label={t('app.viewOnGitHub')}>
              <Github className='w-5 h-5 text-[var(--color-text-secondary)] group-hover:text-[var(--color-action-default)] transition-colors' />
            </IconButton>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className='flex-1 w-full overflow-x-hidden'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/contributors' element={<ContributorsPage />} />
        </Routes>
      </main>

      {/* Footer - Modern */}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </Router>
  );
};

export default App;
