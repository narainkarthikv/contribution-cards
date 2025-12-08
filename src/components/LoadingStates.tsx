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
    className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 border border-gray-200 dark:border-gray-700"
  >
    <div className="space-y-4">
      {/* Avatar skeleton */}
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse" />
      </div>

      {/* Name skeleton */}
      <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2 mx-auto" />

      {/* Bio skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6" />
      </div>

      {/* Stats skeleton */}
      <div className="grid grid-cols-3 gap-3 py-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Button skeleton */}
      <div className="space-y-2">
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
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
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <ContributorCardSkeleton key={i} />
    ))}
  </div>
);

/**
 * Error State Component
 */
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
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="text-6xl mb-4">⚠️</div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      {title}
    </h2>
    <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
      {message}
    </p>
    {onRetry && (
      <button
        onClick={onRetry}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
      >
        Try Again
      </button>
    )}
  </div>
);

/**
 * Empty State Component
 */
interface EmptyStateProps {
  title: string;
  message: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ title, message }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4">
    <div className="text-6xl mb-4">🔍</div>
    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      {title}
    </h2>
    <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
      {message}
    </p>
  </div>
);
