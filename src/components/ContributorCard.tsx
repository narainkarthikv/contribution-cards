/**
 * ContributorCard Component
 * Displays a single contributor with their profile info and stats
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Copy, Zap } from 'lucide-react';
import type { Contributor } from '../types/github';

interface ContributorCardProps {
  contributor: Contributor;
  onViewDetails: (contributor: Contributor) => void;
}

export const ContributorCard: React.FC<ContributorCardProps> = ({
  contributor,
  onViewDetails,
}) => {
  const [copied, setCopied] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleCopyProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(contributor.profileUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const totalCommits = contributor.contributions.reduce(
    (sum, c) => sum + (c.commitsCount || 0),
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <div
        className="relative h-full bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer border border-gray-200 dark:border-gray-700"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => onViewDetails(contributor)}
      >
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

        <div className="relative z-10 p-6">
          {/* Avatar */}
          <div className="flex justify-center mb-4">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={contributor.avatarUrl}
              alt={contributor.login}
              className="w-24 h-24 rounded-full ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800 object-cover"
              loading="lazy"
            />
          </div>

          {/* Name and Username */}
          <div className="text-center mb-3">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white truncate">
              {contributor.name || contributor.login}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              @{contributor.login}
            </p>
          </div>

          {/* Bio */}
          {contributor.bio && (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-4 line-clamp-2">
              {contributor.bio}
            </p>
          )}

          {/* Stats */}
          <div className="text-center mb-4 py-3 border-t border-b border-gray-200 dark:border-gray-700">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalCommits}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Contributions
            </div>
          </div>

          {/* Contribution Repos */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mb-4 text-sm"
            >
              <p className="text-gray-700 dark:text-gray-300 font-semibold mb-2">
                Contributed to:
              </p>
              <div className="space-y-1">
                {contributor.contributions.slice(0, 3).map((contrib) => (
                  <div
                    key={contrib.repo}
                    className="text-xs text-gray-600 dark:text-gray-400 flex items-center"
                  >
                    <span className="w-1 h-1 bg-blue-500 rounded-full mr-2" />
                    {contrib.repo} ({contrib.commitsCount} commits)
                  </div>
                ))}
                {contributor.contributions.length > 3 && (
                  <p className="text-xs text-gray-500 italic">
                    +{contributor.contributions.length - 3} more
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyProfile}
              className="flex-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm font-medium"
              title="Copy profile link"
            >
              <Copy size={16} />
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={contributor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg flex items-center justify-center gap-1 transition-colors text-sm font-medium"
              title="Open GitHub profile"
            >
              <Github size={16} />
              Profile
            </motion.a>
          </div>

          {/* View Details Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewDetails(contributor)}
            className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-all font-medium text-sm"
          >
            <Zap size={16} />
            View Contributions
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
