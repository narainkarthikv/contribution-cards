/**
 * FiltersBar Component - VIEW
 * Provides filtering, sorting, and search capabilities in a single optimized row
 * Pure presentation component that receives data and calls callbacks
 */

import React, { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Download, ChevronDown } from 'lucide-react';
import type { FilterOptions, SortOption } from '../types/github';
import { debounce } from '../utils/common';

interface FiltersBarProps {
  repositories: string[];
  selectedRepositories: string[];
  filters: FilterOptions;
  sortBy: SortOption;
  onRepositorySelect: (repo: string) => void;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  onExport: () => void;
  totalContributors: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  repositories,
  selectedRepositories,
  filters,
  sortBy,
  onRepositorySelect,
  onFilterChange,
  onSortChange,
  onExport,
  totalContributors,
}) => {
  const [showRepoDropdown, setShowRepoDropdown] = useState(false);

  const handleSearchChange = useCallback(
    debounce((searchTerm: string) => {
      onFilterChange({
        ...filters,
        searchTerm,
      });
    }, 300),
    [filters, onFilterChange]
  );

  const selectedRepoDisplay = selectedRepositories.length === 1 
    ? selectedRepositories[0].split('/')[1]
    : selectedRepositories.length > 1
    ? `${selectedRepositories.length} repos`
    : 'All Repos';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-5 border border-gray-200 dark:border-slate-700 shadow-sm"
    >
      {/* Single Row Filters - Responsive Layout */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between flex-wrap">
        
        {/* Repository Dropdown */}
        <div className="relative min-w-max">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowRepoDropdown(!showRepoDropdown)}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg hover:border-blue-400 dark:hover:border-blue-400 transition-colors text-sm font-medium whitespace-nowrap"
          >
            <span className="hidden sm:inline text-gray-600 dark:text-gray-400 text-xs">Repo:</span>
            <span className="font-semibold text-gray-900 dark:text-white">{selectedRepoDisplay}</span>
            <ChevronDown size={16} className={`transition-transform ${showRepoDropdown ? 'rotate-180' : ''}`} />
          </motion.button>

          {/* Dropdown Menu */}
          {showRepoDropdown && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-full left-0 mt-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg shadow-lg z-50 min-w-48"
            >
              {repositories.map((repo) => (
                <motion.button
                  key={repo}
                  whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                  onClick={() => {
                    onRepositorySelect(repo);
                    setShowRepoDropdown(false);
                  }}
                  className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors ${
                    selectedRepositories.includes(repo)
                      ? 'bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {selectedRepositories.includes(repo) && (
                      <span className="text-blue-600 dark:text-blue-400">✓</span>
                    )}
                    {repo.split('/')[1]}
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>

        {/* Search Bar */}
        <div className="flex-1 min-w-48 sm:min-w-56">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by name..."
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-10 pr-3 py-2 sm:py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
        </div>

        {/* Sort By Dropdown */}
        <div className="min-w-max">
          <select
            value={sortBy.field}
            onChange={(e) =>
              onSortChange({
                ...sortBy,
                field: e.target.value as any,
              })
            }
            className="px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
          >
            <option value="totalContributions">Contributions</option>
            <option value="name">Name</option>
          </select>
        </div>

        {/* Order Toggle Buttons */}
        <div className="flex gap-1.5">
          {(['asc', 'desc'] as const).map((order) => (
            <motion.button
              key={order}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSortChange({ ...sortBy, order })}
              className={`px-2.5 sm:px-3 py-2 sm:py-2.5 rounded-lg text-sm font-semibold transition-all touch-none whitespace-nowrap ${
                sortBy.order === order
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
              }`}
            >
              {order === 'asc' ? '↑ Asc' : '↓ Desc'}
            </motion.button>
          ))}
        </div>

        {/* Export Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExport}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg transition-colors font-semibold text-sm shadow-sm hover:shadow-md touch-none whitespace-nowrap"
        >
          <Download size={16} />
          <span className="hidden sm:inline">Export</span>
        </motion.button>
      </div>

      {/* Summary Line */}
      <div className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400 mt-3 pt-3 border-t border-gray-200 dark:border-slate-700">
        Showing <span className="font-semibold text-blue-600 dark:text-blue-400">{totalContributors}</span> contributors
      </div>
    </motion.div>
  );
};
