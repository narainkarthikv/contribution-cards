/**
 * FiltersBar — Filtering, sorting, and search controls.
 * Uses ref-based debounce to avoid stale closures.
 */

import React, { useCallback, useEffect, useRef } from 'react';
import { Search, ArrowUp, ArrowDown } from 'lucide-react';
import type { FilterOptions, SortOption } from '../types/github';
import { FilterDropdown } from './FilterDropdown';

interface FiltersBarProps {
  repositories: string[];
  selectedRepositories: string[];
  filters: FilterOptions;
  sortBy: SortOption;
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

    const selectedRepoValue = selectedRepositories[0] ?? repositories[0] ?? '';
    const repositoryOptions = repositories.map((repo) => ({
      value: repo,
      label: repo.split('/')[1],
    }));
    const sortOptions: Array<{ value: SortOption['field']; label: string }> = [
      { value: 'totalContributions', label: 'Contributions' },
      { value: 'name', label: 'Name' },
    ];

    return (
      <section className='w-full rounded-lg border border-[var(--color-border-primary)] bg-[linear-gradient(165deg,color-mix(in_srgb,var(--color-surface-primary)_96%,var(--color-bg-secondary)_4%),color-mix(in_srgb,var(--color-bg-secondary)_92%,var(--color-surface-primary)_8%))] p-4 shadow-[0_12px_36px_-28px_color-mix(in_srgb,var(--color-text-primary)_55%,transparent)] sm:p-5'>
        <div className='mb-4 flex flex-wrap items-center justify-between gap-2'>
          <p className='text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-text-muted)]'>
            Contributor Explorer
          </p>
          <p className='rounded-full border border-[color-mix(in_srgb,var(--color-action-default)_35%,transparent)] bg-[color-mix(in_srgb,var(--color-action-default)_18%,transparent)] px-3 py-1 text-xs font-semibold text-[var(--color-action-default)]'>
            {totalContributors} profiles live
          </p>
        </div>

        <div className='flex flex-col flex-wrap gap-3 sm:flex-row sm:items-stretch sm:justify-between'>
          <FilterDropdown
            ariaLabel='Repository filter'
            listboxLabel='Select repository'
            options={repositoryOptions}
            value={selectedRepoValue}
            onChange={onRepositorySelect}
            prefix='Repo:'
          />

          <div className='h-10 min-w-48 flex-1 sm:min-w-56'>
            <div className='relative flex h-full items-center'>
              <Search
                className='pointer-events-none absolute left-3 h-4 w-4 flex-shrink-0 text-[var(--color-text-muted)]'
                aria-hidden='true'
              />
              <input
                type='search'
                placeholder='Search by name...'
                onChange={(e) => handleSearchChange(e.target.value)}
                className='h-full w-full rounded-md border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] pl-10 pr-3 text-sm text-[var(--color-text-primary)] transition-all placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-default)]'
                aria-label='Search contributors'
              />
            </div>
          </div>

          <FilterDropdown
            ariaLabel='Sort by'
            listboxLabel='Sort contributors by'
            options={sortOptions}
            value={sortBy.field}
            prefix='Filter by:'
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
            aria-label='Sort direction'>
            <button
              type='button'
              role='radio'
              aria-checked={sortBy.order === 'asc'}
              onClick={() => onSortChange({ ...sortBy, order: 'asc' })}
              className={`flex items-center justify-center rounded-md border px-3 py-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] ${
                sortBy.order === 'asc'
                  ? 'border-[var(--color-action-default)] bg-[var(--color-action-default)] text-white'
                  : 'border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
              aria-label='Sort ascending'>
              <ArrowUp size={18} />
            </button>

            <button
              type='button'
              role='radio'
              aria-checked={sortBy.order === 'desc'}
              onClick={() => onSortChange({ ...sortBy, order: 'desc' })}
              className={`flex items-center justify-center rounded-md border px-3 py-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] ${
                sortBy.order === 'desc'
                  ? 'border-[var(--color-action-default)] bg-[var(--color-action-default)] text-white'
                  : 'border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
              aria-label='Sort descending'>
              <ArrowDown size={18} />
            </button>
          </div>
        </div>
      </section>
    );
  }
);

FiltersBar.displayName = 'FiltersBar';
