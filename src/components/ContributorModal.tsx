/**
 * ContributorModal Component
 * Displays detailed contribution information for a contributor
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, Mail } from 'lucide-react';
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

  const handleSendThankYou = () => {
    const issueTitle = `Thank you @${contributor.login}!`;
    const issueBody = `@${contributor.login} - Thank you for your valuable contributions!`;
    const githubUrl = `https://github.com/narainkarthikv/contribution-cards/issues/new?title=${encodeURIComponent(
      issueTitle
    )}&body=${encodeURIComponent(issueBody)}`;
    window.open(githubUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 dark:bg-black/70 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white dark:bg-gray-800 rounded-3xl shadow-2xl z-50 overflow-y-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors z-10"
            >
              <X size={24} className="text-gray-700 dark:text-gray-300" />
            </motion.button>

            <div className="p-6 md:p-10">
              {/* Header */}
              <div className="flex items-start gap-6 mb-8">
                <motion.img
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  src={contributor.avatarUrl}
                  alt={contributor.login}
                  className="w-32 h-32 rounded-full ring-4 ring-blue-500 object-cover flex-shrink-0"
                  loading="lazy"
                />

                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {contributor.name || contributor.login}
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                    @{contributor.login}
                  </p>

                  {contributor.bio && (
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      {contributor.bio}
                    </p>
                  )}

                  {/* Quick Stats */}
                  <div className="mb-4">
                    <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {totalCommits}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Contributions
                    </div>
                  </div>
                </div>
              </div>

              {/* Contributions by Repository */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Contributions by Repository
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {contributor.contributions.map((contrib, index) => (
                    <motion.div
                      key={contrib.repo}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 border border-gray-200 dark:border-gray-600"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-gray-900 dark:text-white truncate">
                          {contrib.repo}
                        </h4>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-400">
                            Contributions:
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

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={contributor.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors font-semibold"
                >
                  <Github size={18} />
                  View GitHub Profile
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSendThankYou}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all font-semibold"
                >
                  <Mail size={18} />
                  Send Thank You
                </motion.button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
