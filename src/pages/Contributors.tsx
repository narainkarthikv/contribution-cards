/**
 * Contributors Page
 * Main page displaying all contributors with filtering and sorting
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import type { Contributor, FilterOptions, SortOption } from '../types/github';
import { ContributorCard } from '../components/ContributorCard';
import { ContributorModal } from '../components/ContributorModal';
import { FiltersBar } from '../components/FiltersBar';
import { LoadingSkeletons, ErrorState, EmptyState } from '../components/LoadingStates';
import {
  filterContributors,
  sortContributors,
  exportToCSV,
} from '../utils/aggregateContributors';
import { useContributors } from '../hooks/useContributors';
import { REPOSITORIES } from '../App';

export const ContributorsPage: React.FC = () => {
  const [selectedContributor, setSelectedContributor] =
    useState<Contributor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedRepositories, setSelectedRepositories] = useState<string[]>([
    REPOSITORIES[0],
  ]);

  const [filters, setFilters] = useState<FilterOptions>({
    repositories: [],
    contributionType: 'all',
    searchTerm: '',
  });

  const [sortBy, setSortBy] = useState<SortOption>({
    field: 'totalContributions',
    order: 'desc',
  });

  const [filteredContributors, setFilteredContributors] = useState<
    Contributor[]
  >([]);

  const { data: contributors, isLoading, isError, refetch } = useContributors({
    repositories: selectedRepositories,
    enableAutoFetch: true,
  });

  // Apply filters and sorting
  useEffect(() => {
    if (contributors) {
      let result = filterContributors(contributors, filters);
      result = sortContributors(result, sortBy.field, sortBy.order);
      setFilteredContributors(result);
    }
  }, [contributors, filters, sortBy]);

  const handleSelectRepository = (repo: string) => {
    setSelectedRepositories([repo]);
    setFilters({
      repositories: [],
      contributionType: 'all',
      searchTerm: '',
    });
    setSortBy({
      field: 'totalContributions',
      order: 'desc',
    });
  };

  const handleViewDetails = (contributor: Contributor) => {
    setSelectedContributor(contributor);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    const csv = exportToCSV(filteredContributors);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contributors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

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
    <div className="w-full bg-gray-50 dark:bg-slate-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-12"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
            Meet Our Contributors
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Explore the amazing people contributing to our open-source projects
          </p>
        </motion.div>

        {/* Repository Selection */}
        {!isLoading && contributors && contributors.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 sm:mb-8"
          >
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Select Repository
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {REPOSITORIES.map((repo) => (
                <motion.button
                  key={repo}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelectRepository(repo)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all border ${
                    selectedRepositories.includes(repo)
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400'
                  }`}
                >
                  {repo.split('/')[1]}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Filters Bar */}
        {!isLoading && contributors && contributors.length > 0 && (
          <FiltersBar
            repositories={REPOSITORIES}
            filters={filters}
            sortBy={sortBy}
            onFilterChange={setFilters}
            onSortChange={setSortBy}
            onExport={handleExport}
            totalContributors={filteredContributors.length}
          />
        )}

        {/* Contributors Grid */}
        <div className="space-y-8">
          {isLoading ? (
            <LoadingSkeletons count={12} />
          ) : filteredContributors.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
              >
                {filteredContributors.map((contributor) => (
                  <ContributorCard
                    key={contributor.login}
                    contributor={contributor}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </motion.div>

              {/* Pagination Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-gray-600 dark:text-gray-400 text-sm sm:text-base"
              >
                Showing {filteredContributors.length} of {contributors?.length ?? 0}{' '}
                contributors
              </motion.div>
            </>
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
        contributor={selectedContributor}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};
