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

const REPOSITORIES = [
  'narainkarthikv/GLIS',
  'narainkarthikv/contribution-cards',
  'narainkarthikv/fit-track',
  'narainkarthikv/sticky-memo',
  'narainkarthikv/readme-shop',
];

interface ContributorsPageProps {
  contributors: Contributor[] | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}

export const ContributorsPage: React.FC<ContributorsPageProps> = ({
  contributors,
  isLoading,
  isError,
  refetch,
}) => {
  const [selectedContributor, setSelectedContributor] =
    useState<Contributor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Apply filters and sorting
  useEffect(() => {
    if (contributors) {
      let result = filterContributors(contributors, filters);
      result = sortContributors(result, sortBy.field, sortBy.order);
      setFilteredContributors(result);
    }
  }, [contributors, filters, sortBy]);

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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Meet Our Contributors
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Explore the amazing people contributing to our open-source projects
          </p>
        </motion.div>

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
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
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
                className="text-center py-8 text-gray-600 dark:text-gray-400"
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
