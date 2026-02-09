/**
 * Contributors Page
 * Displays all contributors with filtering, sorting, and modal details.
 */

import React, { useCallback, useEffect } from 'react';
import { Users, Zap, GitFork } from 'lucide-react';
import type { Contributor } from '../types/github';
import { ContributorCard } from '../components/ContributorCard';
import { ContributorModal } from '../components/ContributorModal';
import { FiltersBar } from '../components/FiltersBar';
import {
  LoadingSkeletons,
  ErrorState,
  EmptyState,
} from '../components/LoadingStates';
import { useContributors } from '../controllers/useContributors';
import { useGlobalStats } from '../controllers/useGlobalStats';
import { useContributorsPageState } from '../controllers/useContributorsPageState';
import { REPOSITORY_LIST } from '../constants/repositories';

export const ContributorsPage: React.FC = () => {
  const { stats: globalStats, isLoading: globalStatsLoading } =
    useGlobalStats();

  const pageState = useContributorsPageState(null);

  const activeRepos =
    pageState.selectedRepositories.length > 0
      ? pageState.selectedRepositories
      : [REPOSITORY_LIST[0]];

  const {
    data: contributors,
    isLoading,
    isError,
    refetch,
  } = useContributors({
    repositories: activeRepos,
    enableAutoFetch: true,
  });

  // Sync fetched contributors into page state
  const { setContributors } = pageState;
  useEffect(() => {
    if (contributors) setContributors(contributors);
  }, [contributors, setContributors]);

  const handleViewDetails = useCallback(
    (contributor: Contributor) => {
      pageState.setSelectedContributor(contributor);
      pageState.setIsModalOpen(true);
    },
    [pageState]
  );

  if (isError) {
    return (
      <div className='w-full bg-[var(--color-bg-primary)] py-12 sm:py-20 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-7xl mx-auto'>
          <ErrorState
            title='Failed to Load Contributors'
            message='There was an error fetching the contributors data. Please check your GitHub token or try again later.'
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-[var(--color-bg-primary)] px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <div className='w-full max-w-7xl mx-auto'>
        {/* Global Stats */}
        {globalStats && (
          <div className='mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4'>
            <StatCard
              icon={
                <Users
                  size={20}
                  className='text-[var(--color-action-default)]'
                />
              }
              bgClass='bg-[color-mix(in_srgb,var(--color-action-default)_15%,transparent_85%)]'
              label='Across All Repos'
              value={
                globalStatsLoading ? '—' : globalStats.uniqueContributorCount
              }
              sublabel='Unique Contributors'
            />
            <StatCard
              icon={<Zap size={20} className='text-[var(--color-success)]' />}
              bgClass='bg-[color-mix(in_srgb,var(--color-success)_18%,transparent_82%)]'
              label='Total'
              value={globalStatsLoading ? '—' : globalStats.totalContributions}
              sublabel='Contributions'
            />
            <StatCard
              icon={
                <GitFork
                  size={20}
                  className='text-[var(--color-action-default)]'
                />
              }
              bgClass='bg-[color-mix(in_srgb,var(--color-action-default)_18%,transparent_82%)]'
              label='Active'
              value={globalStats.totalRepositories}
              sublabel='Repositories'
            />
          </div>
        )}

        {/* Filters */}
        {!isLoading && contributors && contributors.length > 0 && (
          <div className='mb-8 sm:mb-10'>
            <FiltersBar
              repositories={[...REPOSITORY_LIST]}
              selectedRepositories={pageState.selectedRepositories}
              filters={pageState.filters}
              sortBy={pageState.sortBy}
              onRepositorySelect={pageState.selectRepository}
              onFilterChange={pageState.updateFilters}
              onSortChange={pageState.updateSort}
              totalContributors={pageState.filteredContributors.length}
            />
          </div>
        )}

        {/* Grid */}
        <div className='space-y-8'>
          {isLoading ? (
            <LoadingSkeletons count={12} />
          ) : pageState.filteredContributors.length > 0 ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8'>
              {pageState.filteredContributors.map((contributor) => (
                <ContributorCard
                  key={contributor.login}
                  contributor={contributor}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <EmptyState
              title='No Contributors Found'
              message='Try adjusting your filters or search terms to find contributors.'
            />
          )}
        </div>
      </div>

      <ContributorModal
        contributor={pageState.selectedContributor}
        isOpen={pageState.isModalOpen}
        onClose={() => pageState.setIsModalOpen(false)}
      />
    </div>
  );
};

/* ─── Extracted StatCard component ──────────────────────────────────────── */

interface StatCardProps {
  icon: React.ReactNode;
  bgClass: string;
  label: string;
  value: string | number;
  sublabel: string;
}

const StatCard: React.FC<StatCardProps> = React.memo(
  ({ icon, bgClass, label, value, sublabel }) => (
    <div className='rounded-lg bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] p-4 shadow-sm'>
      <div className='flex items-center gap-3'>
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-lg ${bgClass}`}>
          {icon}
        </div>
        <div>
          <p className='text-xs font-medium text-[var(--color-text-secondary)]'>
            {label}
          </p>
          <p className='text-2xl font-bold text-[var(--color-text-primary)]'>
            {value}
          </p>
          <p className='text-xs text-[var(--color-text-muted)]'>{sublabel}</p>
        </div>
      </div>
    </div>
  )
);

StatCard.displayName = 'StatCard';
