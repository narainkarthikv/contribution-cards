/**
 * FiltersBar Component
 * Provides filtering, sorting, and search capabilities
 * Fully responsive with mobile-first design
 */

import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Download } from 'lucide-react';
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

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white dark:bg-slate-800 rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-shadow p-4 sm:p-6 mb-6 sm:mb-8 border border-gray-200 dark:border-slate-700"
    >
      {/* Search Bar */}
      <div className="mb-4 sm:mb-6 w-full">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search by name or username..."
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 sm:py-3 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm sm:text-base"
          />
        </div>
      </div>

      {/* Sort Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
        <div className="w-full">
          <label className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 block">
            Sort By
          </label>
          <select
            value={sortBy.field}
            onChange={(e) =>
              onSortChange({
                ...sortBy,
                field: e.target.value as any,
              })
            }
            className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="totalContributions">
              Total Contributions
            </option>
            <option value="name">Name</option>
          </select>
        </div>

        <div className="w-full">
          <label className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-2 sm:mb-3 block">
            Order
          </label>
          <div className="flex gap-2">
            {(['asc', 'desc'] as const).map((order) => (
              <button
                key={order}
                onClick={() => onSortChange({ ...sortBy, order })}
                className={`flex-1 px-2 sm:px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors touch-none ${
                  sortBy.order === order
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                {order === 'asc' ? '↑ Asc' : '↓ Desc'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary and Export */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-gray-200 dark:border-slate-700">
        <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
          Showing <span className="font-bold text-blue-600 dark:text-blue-400">{totalContributors}</span> contributors
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExport}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 rounded-lg transition-colors font-semibold text-xs sm:text-sm touch-none"
        >
          <Download size={14} className="sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Export CSV</span>
          <span className="sm:hidden">Export</span>
        </motion.button>
      </div>
    </motion.div>
  );
};
