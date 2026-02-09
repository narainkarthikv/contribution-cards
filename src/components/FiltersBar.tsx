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
      <div className='w-full rounded-lg p-4 sm:p-5 border border-[var(--color-border-primary)] bg-[var(--color-surface-primary)] shadow-sm'>
        <div className='flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between flex-wrap'>
          {/* Repository Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setShowRepoDropdown((prev) => !prev)}
              aria-expanded={showRepoDropdown}
              aria-haspopup='listbox'
              className='flex items-center justify-center gap-2 px-4 py-0 border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] rounded-lg transition-colors text-sm font-medium whitespace-nowrap h-10 w-full sm:w-auto'>
              <span className='hidden sm:inline text-[var(--color-text-secondary)] text-xs'>
                Repo:
              </span>
              <span className='font-semibold text-[var(--color-text-primary)]'>
                {selectedRepoDisplay}
              </span>
              <ChevronDown
                size={16}
                className={`transition-transform flex-shrink-0 ${showRepoDropdown ? 'rotate-180' : ''}`}
              />
            </button>

            {showRepoDropdown && (
              <ul
                role='listbox'
                aria-label='Select repository'
                className='absolute top-full left-0 mt-2 bg-[var(--color-surface-primary)] border border-[var(--color-border-primary)] rounded-lg shadow-lg z-50 min-w-48'>
                {repositories.map((repo) => {
                  const isSelected = selectedRepositories.includes(repo);
                  return (
                    <li key={repo} role='option' aria-selected={isSelected}>
                      <button
                        onClick={() => {
                          onRepositorySelect(repo);
                          setShowRepoDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
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
                className='absolute left-3 w-4 h-4 text-[var(--color-text-muted)] flex-shrink-0 pointer-events-none'
                aria-hidden='true'
              />
              <input
                type='search'
                placeholder='Search by name...'
                onChange={(e) => handleSearchChange(e.target.value)}
                className='w-full h-full pl-10 pr-3 border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-action-default)] transition-all text-sm'
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
              className='w-full h-full px-4 py-0 border border-[var(--color-border-primary)] bg-[var(--color-bg-secondary)] text-[var(--color-text-primary)] rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[var(--color-action-default)] cursor-pointer'
              aria-label='Sort by'>
              <option value='totalContributions'>Contributions</option>
              <option value='name'>Name</option>
            </select>
          </div>

          {/* Sort Direction */}
          <div
            className='flex gap-1.5 h-10'
            role='radiogroup'
            aria-label='Sort direction'>
            <button
              role='radio'
              aria-checked={sortBy.order === 'asc'}
              onClick={() => onSortChange({ ...sortBy, order: 'asc' })}
              className={`flex items-center justify-center px-3 py-0 rounded-lg transition-colors border border-[var(--color-border-primary)] ${
                sortBy.order === 'asc'
                  ? 'bg-[var(--color-action-default)] text-white border-[var(--color-action-default)]'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
              aria-label='Sort ascending'>
              <ArrowUp size={18} />
            </button>

            <button
              role='radio'
              aria-checked={sortBy.order === 'desc'}
              onClick={() => onSortChange({ ...sortBy, order: 'desc' })}
              className={`flex items-center justify-center px-3 py-0 rounded-lg transition-colors border border-[var(--color-border-primary)] ${
                sortBy.order === 'desc'
                  ? 'bg-[var(--color-action-default)] text-white border-[var(--color-action-default)]'
                  : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
              }`}
              aria-label='Sort descending'>
              <ArrowDown size={18} />
            </button>
          </div>
        </div>

        {/* Summary */}
        <p className='text-xs sm:text-sm font-medium text-[var(--color-text-secondary)] mt-3 pt-3 border-t border-[var(--color-border-primary)]'>
          Showing{' '}
          <span className='font-semibold text-[var(--color-action-default)]'>
            {totalContributors}
          </span>{' '}
          contributors
        </p>
      </div>
    );
  }
);

FiltersBar.displayName = 'FiltersBar';
