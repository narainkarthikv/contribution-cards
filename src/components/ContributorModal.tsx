/**
 * ContributorModal Component
 * Displays detailed contribution information for a contributor
 * Fully responsive modal with mobile and desktop support
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github } from 'lucide-react';
import type { Contributor } from '../types/github';

interface ContributorModalProps {
  contributor: Contributor | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContributorModal: React.FC<ContributorModalProps> = ({
  contributor,
  isOpen,
  onClose,
}) => {
  if (!contributor) return null;

  const totalCommits = contributor.contributions.reduce(
    (sum, c) => sum + (c.commitsCount || 0),
    0
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-2 sm:inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white dark:bg-slate-800 rounded-lg sm:rounded-2xl shadow-2xl z-50 overflow-y-auto max-h-[95vh] sm:max-h-[90vh]"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full transition-colors z-10 touch-none"
            >
              <X size={20} className="sm:w-6 sm:h-6 text-gray-700 dark:text-gray-300" />
            </motion.button>

            <div className="p-4 sm:p-6 md:p-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  src={contributor.avatarUrl}
                  alt={contributor.login}
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full ring-4 ring-blue-500 object-cover flex-shrink-0"
                  loading="lazy"
                />

                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {contributor.name || contributor.login}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 mb-3">
                    @{contributor.login}
                  </p>

                  {contributor.bio && (
                    <p className="text-xs sm:text-sm md:text-base text-gray-700 dark:text-gray-300 mb-4">
                      {contributor.bio}
                    </p>
                  )}

                  <div className="mb-4">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {totalCommits}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Total Contributions
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 sm:mb-8">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                  Contributions
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
                  {contributor.contributions.map((contrib, index) => (
                    <motion.div
                      key={contrib.repo}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-2 sm:mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate text-xs sm:text-sm md:text-base">
                          {contrib.repo}
                        </h4>
                      </div>

                      <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Commits:
                          </span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {contrib.commitsCount || 0}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 sm:gap-3">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={contributor.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white py-2 sm:py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-semibold text-xs sm:text-sm md:text-base touch-none"
                >
                  <Github size={16} className="sm:w-5 sm:h-5" />
                  View GitHub Profile
                </motion.a>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
