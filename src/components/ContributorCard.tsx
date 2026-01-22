/**
 * Contributor Card Component - VIEW
 * Pure presentation component that renders contributor information
 * No business logic or state management beyond UI interactions
 */

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Github, Copy, ArrowRight } from 'lucide-react';
import type { Contributor } from '../types/github';

interface ContributorCardProps {
  contributor: Contributor;
  onViewDetails: (contributor: Contributor) => void;
}

/**
 * Pure presentation component for displaying a single contributor
 */
export const ContributorCard: React.FC<ContributorCardProps> = ({
  contributor,
  onViewDetails,
}) => {

  /**
   * Copy profile URL to clipboard
   */
  const handleCopyProfile = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(contributor.profileUrl);
  }, [contributor.profileUrl]);

  /**
   * Calculate total contributions across all repos
   */
  const totalCommits = contributor.contributions.reduce(
    (sum, c) => sum + (c.commitsCount || 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full w-full"
    >
      <div
        className="relative h-full w-full bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-all overflow-hidden group cursor-pointer border border-gray-200 dark:border-slate-700 flex flex-col"
        onClick={() => onViewDetails(contributor)}
      >
        {/* Top Left - Contribution Badge Circle */}
        <div className="absolute top-4 left-4 flex items-center justify-center">
          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg ring-2 ring-white dark:ring-slate-800">
            <div className="text-center">
              <div className="text-lg font-bold text-white">
                {totalCommits}
              </div>
            </div>
          </div>
        </div>

        {/* Top Right Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handleCopyProfile(e as any);
            }}
            className="flex items-center justify-center w-9 h-9 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 rounded-lg transition-colors text-gray-700 dark:text-gray-300"
            title="Copy profile link"
          >
            <Copy size={16} />
          </motion.button>

          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            href={contributor.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center w-9 h-9 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            title="Open GitHub profile"
          >
            <Github size={16} />
          </motion.a>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(contributor);
            }}
            className="flex items-center justify-center w-9 h-9 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            title="View full profile"
          >
            <ArrowRight size={16} />
          </motion.button>
        </div>

        {/* Avatar Section */}
        <div className="flex justify-center mb-4 flex-shrink-0 mt-2">
          <img
            src={contributor.avatarUrl}
            alt={contributor.login}
            className="w-20 h-20 rounded-full ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-slate-800 object-cover shadow-md"
            loading="lazy"
          />
        </div>

        {/* Name Section */}
        <div className="text-center mb-3 flex flex-col justify-center flex-shrink-0">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
            {contributor.name || contributor.login}
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate font-medium">
            @{contributor.login}
          </p>
        </div>

        {/* Bio Section */}
        {contributor.bio && (
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-400 text-center line-clamp-3 flex-1">
            {contributor.bio}
          </p>
        )}
      </div>
    </motion.div>
  );
};
