/**
 * Contributors Page State Controller
 * CONTROLLER layer - manages state for the contributors page including filtering, sorting, and modal management
 */

import { useState, useCallback, useEffect } from 'react';
import type { Contributor, FilterOptions, SortOption } from '../types/github';
import { filterContributors as filterContributorsModel, sortContributors as sortContributorsModel } from '../models/Contributor';
import { REPOSITORY_LIST } from '../constants/repositories';

export interface UseContributorsPageState {
  selectedContributor: Contributor | null;
  isModalOpen: boolean;
  selectedRepositories: string[];
  filters: FilterOptions;
  sortBy: SortOption;
  filteredContributors: Contributor[];
  
  // Actions
  setSelectedContributor: (contributor: Contributor | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  selectRepository: (repo: string) => void;
  setContributors: (contributors: Contributor[]) => void;
  updateFilters: (filters: FilterOptions) => void;
  updateSort: (sort: SortOption) => void;
  resetFilters: () => void;
  handleExport: (contributors: Contributor[]) => void;
}

const DEFAULT_FILTERS: FilterOptions = {
  repositories: [],
  contributionType: 'all',
  searchTerm: '',
};

const DEFAULT_SORT: SortOption = {
  field: 'totalContributions',
  order: 'desc',
};

/**
 * Hook to manage contributors page state
 * This is the CONTROLLER for the contributors page
 */
export const useContributorsPageState = (
  initialContributors: Contributor[] | null
): UseContributorsPageState => {
  const [selectedContributor, setSelectedContributor] = useState<Contributor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRepositories, setSelectedRepositories] = useState<string[]>([REPOSITORY_LIST[0]]);
  const [contributors, setContributorsState] = useState<Contributor[]>(initialContributors || []);
  const [filters, setFilters] = useState<FilterOptions>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortOption>(DEFAULT_SORT);
  const [filteredContributors, setFilteredContributors] = useState<Contributor[]>([]);

  /**
   * Apply filters and sorting to contributors
   */
  useEffect(() => {
    if (contributors && contributors.length > 0) {
      let result = filterContributorsModel(contributors, {
        searchTerm: filters.searchTerm,
      });
      result = sortContributorsModel(result, sortBy.field, sortBy.order);
      setFilteredContributors(result);
    }
  }, [contributors, filters, sortBy]);

  /**
   * Set contributors
   */
  const setContributors = useCallback((newContributors: Contributor[]) => {
    setContributorsState(newContributors);
  }, []);

  /**
   * Handle repository selection
   */
  const selectRepository = useCallback((repo: string) => {
    setSelectedRepositories([repo]);
    setFilters(DEFAULT_FILTERS);
    setSortBy(DEFAULT_SORT);
  }, []);

  /**
   * Update filters
   */
  const updateFilters = useCallback((newFilters: FilterOptions) => {
    setFilters(newFilters);
  }, []);

  /**
   * Update sort
   */
  const updateSort = useCallback((sort: SortOption) => {
    setSortBy(sort);
  }, []);

  /**
   * Reset filters to default
   */
  const resetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setSortBy(DEFAULT_SORT);
  }, []);

  /**
   * Export contributors to CSV
   */
  const handleExport = useCallback((contributorsToExport: Contributor[]) => {
    // CSV export logic will be moved to ContributorAggregationService
    const csv = ContributorAggregationService.exportToCSV(contributorsToExport);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contributors-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, []);

  return {
    selectedContributor,
    isModalOpen,
    selectedRepositories,
    filters,
    sortBy,
    filteredContributors,
    setSelectedContributor,
    setIsModalOpen,
    selectRepository,
    setContributors,
    updateFilters,
    updateSort,
    resetFilters,
    handleExport,
  };
};

// Import here to avoid circular dependency
import { ContributorAggregationService } from '../services/ContributorAggregationService';
