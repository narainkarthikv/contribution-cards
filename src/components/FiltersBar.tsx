/**
 * FiltersBar — Filtering, sorting, and search controls.
 * Uses ref-based debounce to avoid stale closures. Click-outside closes dropdown.
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Search, ChevronDown, ArrowUp, ArrowDown } from 'lucide-react';
import type { FilterOptions, SortOption } from '../types/github';

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
    const [showRepoDropdown, setShowRepoDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
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

    // Cleanup debounce timer on unmount
    useEffect(() => () => clearTimeout(debounceTimer.current), []);

    // Close dropdown on click outside
    useEffect(() => {
      if (!showRepoDropdown) return;
      const handleClickOutside = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node)
        ) {
          setShowRepoDropdown(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () =>
        document.removeEventListener('mousedown', handleClickOutside);
    }, [showRepoDropdown]);

    const selectedRepoDisplay =
      selectedRepositories.length === 1
        ? selectedRepositories[0].split('/')[1]
        : selectedRepositories.length > 1
          ? `${selectedRepositories.length} repos`
          : 'All Repos';

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

        <div className='flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between flex-wrap'>
          {/* Repository Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setShowRepoDropdown((prev) => !prev)}
              aria-expanded={showRepoDropdown}
              aria-haspopup='listbox'
              className='group flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-md border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] px-4 py-0 text-sm font-medium transition-all hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--color-action-default)_35%,var(--color-border-primary))] hover:bg-[color-mix(in_srgb,var(--color-surface-secondary)_85%,var(--color-action-default)_15%)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] sm:w-auto'>
              <span className='hidden text-xs text-[var(--color-text-secondary)] sm:inline'>
                Repo:
              </span>
              <span className='font-semibold text-[var(--color-text-primary)]'>
                {selectedRepoDisplay}
              </span>
              <ChevronDown
                size={16}
                className={`flex-shrink-0 transition-transform ${showRepoDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {showRepoDropdown && (
              <ul
                role='listbox'
                aria-label='Select repository'
                className='absolute left-0 top-full z-50 mt-2 min-w-56 overflow-hidden rounded-md border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] shadow-2xl shadow-black/30'>
                {repositories.map((repo) => {
                  const isSelected = selectedRepositories.includes(repo);
                  return (
                    <li key={repo} role='option' aria-selected={isSelected}>
                      <button
                        onClick={() => {
                          onRepositorySelect(repo);
                          setShowRepoDropdown(false);
                        }}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-action-default)] ${
                          isSelected
                            ? 'bg-[color-mix(in_srgb,var(--color-action-default)_12%,transparent_88%)] text-[var(--color-action-default)]'
                            : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-secondary)]'
                        }`}>
                        <div className='flex items-center gap-2'>
                          {isSelected && (
                            <span
                              className='text-[var(--color-action-default)]'
                              aria-hidden='true'>
                              &#10003;
                            </span>
                          )}
                          {repo.split('/')[1]}
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Search */}
          <div className='flex-1 min-w-48 sm:min-w-56 h-10'>
            <div className='relative h-full flex items-center'>
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

          {/* Sort Field */}
          <div className='h-10 w-full sm:w-auto'>
            <select
              value={sortBy.field}
              onChange={(e) =>
                onSortChange({
                  ...sortBy,
                  field: e.target.value as SortOption['field'],
                })
              }
              className='h-full w-full cursor-pointer rounded-md border border-[var(--color-border-primary)] bg-[var(--color-surface-secondary)] px-4 py-0 text-sm font-medium text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-action-default)]'
              aria-label='Sort by'>
              <option value='totalContributions'>Contributions</option>
              <option value='name'>Name</option>
            </select>
          </div>

          {/* Sort Direction */}
          <div
            className='flex h-10 gap-1.5'
            role='radiogroup'
            aria-label='Sort direction'>
            <button
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
