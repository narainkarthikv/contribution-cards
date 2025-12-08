/**
 * FiltersBar Component
 * Provides filtering, sorting, and search capabilities
 */

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download } from 'lucide-react';
import type { FilterOptions, SortOption } from '../types/github';
import { debounce } from '../utils/aggregateContributors';

interface FiltersBarProps {
  repositories: string[];
  filters: FilterOptions;
  sortBy: SortOption;
  onFilterChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  onExport: () => void;
  totalContributors: number;
}

export const FiltersBar: React.FC<FiltersBarProps> = ({
  repositories,
  filters,
  sortBy,
  onFilterChange,
  onSortChange,
  onExport,
  totalContributors,
}) => {
  const handleSearchChange = useCallback(
    debounce((searchTerm: string) => {
      onFilterChange({
        ...filters,
        searchTerm,
      });
    }, 300),
    [filters, onFilterChange]
  );

  const toggleRepository = (repo: string) => {
    const newRepos = filters.repositories.includes(repo)
      ? filters.repositories.filter((r) => r !== repo)
      : [...filters.repositories, repo];

    onFilterChange({
      ...filters,
      repositories: newRepos,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8 border border-gray-200 dark:border-gray-700"
    >
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search contributors by name or username..."
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Repository Filter */}
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-3">
            <Filter size={16} />
            Repositories
          </label>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {repositories.map((repo) => (
              <label
                key={repo}
                className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={filters.repositories.includes(repo)}
                  onChange={() => toggleRepository(repo)}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer"
                />
                <span className="truncate">{repo}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="text-sm font-semibold text-gray-900 dark:text-white mb-3 block">
            Sort By
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <select
                value={sortBy.field}
                onChange={(e) =>
                  onSortChange({
                    ...sortBy,
                    field: e.target.value as any,
                  })
                }
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="totalContributions">
                  Total Contributions
                </option>
                <option value="name">Name</option>
                <option value="lastContribution">Last Contribution</option>
              </select>
            </div>

            <div className="flex gap-2">
              {(['asc', 'desc'] as const).map((order) => (
                <button
                  key={order}
                  onClick={() => onSortChange({ ...sortBy, order })}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    sortBy.order === order
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {order === 'asc' ? '↑ Ascending' : '↓ Descending'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Summary and Export */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Showing <span className="font-bold text-blue-600 dark:text-blue-400">{totalContributors}</span> contributors
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExport}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors font-semibold text-sm"
        >
          <Download size={16} />
          Export CSV
        </motion.button>
      </div>
    </motion.div>
  );
};
