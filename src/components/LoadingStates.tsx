/**
 * Loading Skeleton Component
 * Shows loading state while data is being fetched
 */

import React from 'react';
import { motion } from 'framer-motion';

export const ContributorCardSkeleton: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 border border-gray-200 dark:border-slate-700 h-full"
  >
    <div className="space-y-3 sm:space-y-4">
      <div className="flex justify-center mb-3 sm:mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gray-200 dark:bg-slate-700 rounded-full animate-pulse" />
      </div>

      <div className="h-4 sm:h-6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
      <div className="h-3 sm:h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-1/2 mx-auto" />

      <div className="space-y-1 sm:space-y-2">
        <div className="h-3 sm:h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
        <div className="h-3 sm:h-4 bg-gray-200 dark:bg-slate-700 rounded animate-pulse w-5/6" />
      </div>

      <div className="grid grid-cols-3 gap-2 py-2 sm:py-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-1 sm:space-y-2">
            <div className="h-4 sm:h-6 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
            <div className="h-2 sm:h-3 bg-gray-200 dark:bg-slate-700 rounded animate-pulse" />
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="h-8 sm:h-10 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
        <div className="h-8 sm:h-10 bg-gray-200 dark:bg-slate-700 rounded-lg animate-pulse" />
      </div>
    </div>
  </motion.div>
);

interface LoadingSkeletonsProps {
  count?: number;
}

export const LoadingSkeletons: React.FC<LoadingSkeletonsProps> = ({
  count = 12,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ContributorCardSkeleton key={i} />
    ))}
  </div>
);

interface ErrorStateProps {
  title: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title,
  message,
  onRetry,
}) => (
  <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">⚠️</div>
    <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
      {title}
    </h2>
    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center max-w-md mb-4 sm:mb-6">
      {message}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-xs sm:text-sm"
      >
        Try Again
      </button>
    )}
  </div>
);

interface EmptyStateProps {
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => (
  <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
    <div className="text-4xl sm:text-6xl mb-3 sm:mb-4">🔍</div>
    <h2 className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 text-center">
      {title}
    </h2>
    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 text-center max-w-md">
      {message}
    </p>
  </div>
);
