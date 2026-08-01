/**
 * FiltersBar — Filtering, sorting, and search controls.
 * Uses ref-based debounce to avoid stale closures.
 */

import React, { useCallback, useEffect, useRef } from 'react';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';
import type { Contributor, FilterOptions, SortOption } from '../types/github';
import { FilterDropdown } from './FilterDropdown';
import { ExportMenu } from './ExportMenu';
import { IconButton } from '../common';
import { useI18n } from '../i18n/useI18n';

interface FiltersBarProps {
  repositories: string[];
  selectedRepositories: string[];
  filters: FilterOptions;
  sortBy: SortOption;
  contributors: Contributor[];
  onRepositorySelect: (repo: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  totalContributors: number;
}

const DEBOUNCE_MS = 300;

export const FiltersBar: React.FC<FiltersBarProps> = React.memo(
  ({
    repositories,
    selectedRepositories,
    filters,
    sortBy,
    contributors,
    onRepositorySelect,
    onFilterChange,
    onSortChange,
    totalContributors,
  }) => {
    const debounceTimer = useRef<ReturnType<typeof setTimeout> | undefined>(
      undefined
    );

    // Keep refs in sync with latest props via effect (React 19 lint rule)
    const filtersRef = useRef(filters);
    const onFilterChangeRef = useRef(onFilterChange);
    useEffect(() => {
      filtersRef.current = filters;
      onFilterChangeRef.current = onFilterChange;
    });

    const handleSearchChange = useCallback((searchTerm: string) => {
      clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        onFilterChangeRef.current({
          ...filtersRef.current,
          searchTerm,
        });
      }, DEBOUNCE_MS);
    }, []);

    useEffect(() => () => clearTimeout(debounceTimer.current), []);

    const { t } = useI18n();
    const selectedRepoValue = selectedRepositories[0] ?? repositories[0] ?? '';
    const repositoryOptions = repositories.map((repo) => ({
      value: repo,
      label: repo.split('/')[1],
    }));
    const sortOptions: Array<{ value: SortOption['field']; label: string }> = [
      { value: 'totalContributions', label: t('contributors.contributions') },
      { value: 'name', label: t('contributors.total') },
    ];

    return (
      <section className='w-full rounded-lg border border-[var(--color-border-primary)] bg-[linear-gradient(165deg,color-mix(in_srgb,var(--color-surface-primary)_96%,var(--color-bg-secondary)_4%),color-mix(in_srgb,var(--color-bg-secondary)_92%,var(--color-surface-primary)_8%))] p-4 shadow-[0_12px_36px_-28px_color-mix(in_srgb,var(--color-text-primary)_55%,transparent)] sm:p-5'>
        <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
          <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]'>
            {t('filters.contributorExplorer')}
          </p>
          <p className='rounded-full border border-[color-mix(in_srgb,var(--color-action-default)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-action-default)_18%,transparent)] px-3 py-1 text-xs font-semibold text-[var(--color-action-default)]'>
            {t('filters.profilesLive', { count: totalContributors })}
          </p>
        </div>

        <div className='flex flex-col flex-wrap gap-3 sm:flex-row sm:items-stretch sm:justify-between'>
          <FilterDropdown
            ariaLabel={t('filters.repoFilter')}
            listboxLabel={t('filters.selectRepository')}
            options={repositoryOptions}
            value={selectedRepoValue}
            onChange={onRepositorySelect}
            prefix={t('filters.repoPrefix')}
          />

          <div className='h-10 min-w-48 flex-1 sm:min-w-56'>
            <div className='relative flex h-full items-center'>
              <Search
                className='pointer-events-none absolute left-3 h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]'
                aria-hidden='true'
              />
              <input
                type='search'
                placeholder={t('filters.searchPlaceholder')}
                onChange={(e) => handleSearchChange(e.target.value)}
                className='h-full w-full rounded-md border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] pl-10 pr-3 text-sm text-[var(--color-text-primary)] transition-all placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-default)]'
                aria-label={t('filters.searchAria')}
              />
            </div>
          </div>

          <FilterDropdown
            ariaLabel={t('filters.sortBy')}
            listboxLabel={t('filters.sortContributorsBy')}
            options={sortOptions}
            value={sortBy.field}
            prefix={t('filters.filterPrefix')}
            onChange={(field) =>
              onSortChange({
                ...sortBy,
                field: field as SortOption['field'],
              })
            }
          />

          <div
            className='flex h-10 gap-1.5'
            role='radiogroup'
            aria-label={t('filters.sortDirection')}>
            <IconButton
              role='radio'
              aria-checked={sortBy.order === 'asc'}
              onClick={() => onSortChange({ ...sortBy, order: 'asc' })}
              variant={sortBy.order === 'asc' ? 'active' : 'outline'}
              size='lg'
              aria-label={t('filters.sortAscending')}>
              <ArrowUp size={18} />
            </IconButton>

            <IconButton
              role='radio'
              aria-checked={sortBy.order === 'desc'}
              onClick={() => onSortChange({ ...sortBy, order: 'desc' })}
              variant={sortBy.order === 'desc' ? 'active' : 'outline'}
              size='lg'
              aria-label={t('filters.sortDescending')}>
              <ArrowDown size={18} />
            </IconButton>
          </div>

          <ExportMenu contributors={contributors} />
        </div>
      </section>
    );
  }
);

FiltersBar.displayName = 'FiltersBar';
