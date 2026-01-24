/**
 * Contributors Page - VIEW
 * Main page displaying all contributors with filtering and sorting
 * Orchestrates UI using controllers (hooks) for state management
 */

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, Zap, GitFork } from 'lucide-react';
import type { Contributor } from '../types/github';
import { ContributorCard } from '../components/ContributorCard';
import { ContributorModal } from '../components/ContributorModal';
import { FiltersBar } from '../components/FiltersBar';
import { LoadingSkeletons, ErrorState, EmptyState } from '../components/LoadingStates';
import { useContributors } from '../controllers/useContributors';
import { useGlobalStats } from '../controllers/useGlobalStats';
import { useContributorsPageState } from '../controllers/useContributorsPageState';
import { REPOSITORY_LIST } from '../constants/repositories';

export const ContributorsPage: React.FC = () => {
  // Navigation
  const navigate = useNavigate();
  
  // Global stats hook (for summary display)
  const { stats: globalStats, isLoading: globalStatsLoading } = useGlobalStats();
  
  // Page state management (CONTROLLER)
  const pageState = useContributorsPageState(null);

  // Data fetching (MODEL - via Controller)
  const { data: contributors, isLoading, isError, refetch } = useContributors({
    repositories: pageState.selectedRepositories.length > 0 ? pageState.selectedRepositories : [REPOSITORY_LIST[0]],
    enableAutoFetch: true,
  });

  // Update page state when contributors change
  React.useEffect(() => {
    if (contributors) {
      pageState.setContributors(contributors);
    }
  }, [contributors, pageState]);

  /**
   * Handle repository selection
   */
  const handleSelectRepository = useCallback(
    (repo: string) => {
      pageState.selectRepository(repo);
    },
    [pageState]
  );

  /**
   * Handle contributor details view
   */
  const handleViewDetails = useCallback(
    (contributor: Contributor) => {
      pageState.setSelectedContributor(contributor);
      pageState.setIsModalOpen(true);
    },
    [pageState]
  );

  // Error state
  if (isError) {
    return (
      <div className="w-full bg-gray-50 dark:bg-slate-950 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <ErrorState
            title="Failed to Load Contributors"
            message="There was an error fetching the contributors data. Please check your GitHub token or try again later."
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="w-full max-w-7xl mx-auto">

        {/* Global Stats Summary */}
        {globalStats && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {/* Unique Contributors Summary */}
            <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                  <Users size={20} className="text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Across All Repos</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {globalStatsLoading ? '—' : globalStats.uniqueContributorCount}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Unique Contributors</p>
                </div>
              </div>
            </div>

            {/* Total Contributions Summary */}
            <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30">
                  <Zap size={20} className="text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Total</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {globalStatsLoading ? '—' : globalStats.totalContributions}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Contributions</p>
                </div>
              </div>
            </div>

            {/* Repositories Summary */}
            <div className="rounded-lg bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30">
                  <GitFork size={20} className="text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 dark:text-gray-400">Active</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {globalStats.totalRepositories}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">Repositories</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Consolidated Filters Bar - Single Row */}
        {!isLoading && contributors && contributors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8 sm:mb-10"
          >
            <FiltersBar
              repositories={Array.from(REPOSITORY_LIST)}
              selectedRepositories={pageState.selectedRepositories}
              filters={pageState.filters}
              sortBy={pageState.sortBy}
              onRepositorySelect={handleSelectRepository}
              onFilterChange={pageState.updateFilters}
              onSortChange={pageState.updateSort}
              totalContributors={pageState.filteredContributors.length}
            />
          </motion.div>
        )}

        {/* Contributors Grid - Modern Masonry */}
        <div className="space-y-8">
          {isLoading ? (
            <LoadingSkeletons count={12} />
          ) : pageState.filteredContributors.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, staggerChildren: 0.05 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {pageState.filteredContributors.map((contributor, index) => (
                <motion.div
                  key={contributor.login}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ContributorCard
                    contributor={contributor}
                    onViewDetails={handleViewDetails}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <EmptyState
              title="No Contributors Found"
              message="Try adjusting your filters or search terms to find contributors."
            />
          )}
        </div>
      </div>

      {/* Modal */}
      <ContributorModal
        contributor={pageState.selectedContributor}
        isOpen={pageState.isModalOpen}
        onClose={() => pageState.setIsModalOpen(false)}
      />
    </div>
  );
};
