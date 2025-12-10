import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Copy } from 'lucide-react';
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
      className="h-full w-full"
    >
      <div
        className="relative h-full w-full bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer border border-gray-200 dark:border-slate-700 flex flex-col"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={() => onViewDetails(contributor)}
      >
        <div className="absolute top-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full blur-3xl opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

        <div className="relative z-10 p-4 sm:p-6 flex flex-col flex-1">
          <div className="flex justify-center mb-3 sm:mb-4 flex-shrink-0">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={contributor.avatarUrl}
              alt={contributor.login}
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800 object-cover"
              loading="lazy"
            />
          </div>

          <div className="text-center mb-3 min-h-14 flex flex-col justify-center flex-shrink-0">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white truncate">
              {contributor.name || contributor.login}
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 truncate">
              @{contributor.login}
            </p>
          </div>

          {contributor.bio && (
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center mb-3 line-clamp-2">
              {contributor.bio}
            </p>
          )}

          <div className="text-center mb-4 py-3 border-t border-b border-gray-200 dark:border-slate-700">
            <div className="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalCommits}
            </div>
            <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Total Contributions
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovering ? 1 : 0, height: isHovering ? 'auto' : 0 }}
            className="mb-4 text-xs sm:text-sm hidden md:block"
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
                  <span className="w-1 h-1 bg-blue-500 rounded-full mr-2 flex-shrink-0" />
                  <span className="truncate">{contrib.repo} ({contrib.commitsCount})</span>
                </div>
              ))}
              {contributor.contributions.length > 3 && (
                <p className="text-xs text-gray-500 italic">
                  +{contributor.contributions.length - 3} more
                </p>
              )}
            </div>
          </motion.div>

          <div className="flex gap-2 mt-auto pt-4 flex-wrap sm:flex-nowrap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyProfile}
              className="flex-1 min-w-0 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-gray-200 py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center gap-1 transition-colors text-xs sm:text-sm font-medium touch-none"
              title="Copy profile link"
            >
              <Copy size={12} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy'}</span>
              <span className="sm:hidden">{copied ? '✓' : 'Copy'}</span>
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={contributor.profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-0 bg-blue-600 hover:bg-blue-700 text-white py-2 px-2 sm:px-3 rounded-lg flex items-center justify-center gap-1 transition-colors text-xs sm:text-sm font-medium touch-none"
              title="Open GitHub profile"
            >
              <Github size={12} className="sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Profile</span>
            </motion.a>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewDetails(contributor)}
            className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white py-2 px-4 rounded-lg transition-all font-medium text-xs sm:text-sm touch-none"
          >
            View Details
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
