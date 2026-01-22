/**
 * Contributors Page - VIEW
 * Main page displaying all contributors with filtering and sorting
 * Orchestrates UI using controllers (hooks) for state management
 */

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import type { Contributor } from '../types/github';
import { ContributorCard } from '../components/ContributorCard';
import { ContributorModal } from '../components/ContributorModal';
import { FiltersBar } from '../components/FiltersBar';
import { LoadingSkeletons, ErrorState, EmptyState } from '../components/LoadingStates';
import { useContributors } from '../controllers/useContributors';
import { useContributorsPageState } from '../controllers/useContributorsPageState';
import { REPOSITORY_LIST } from '../constants/repositories';

export const ContributorsPage: React.FC = () => {
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

  /**
   * Handle CSV export
   */
  const handleExport = useCallback(() => {
    pageState.handleExport(pageState.filteredContributors);
  }, [pageState]);

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
              onExport={handleExport}
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
