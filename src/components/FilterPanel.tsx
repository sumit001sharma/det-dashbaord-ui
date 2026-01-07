import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MapPin, Tag, Filter, X, RefreshCw, Download } from 'lucide-react';
import { FilterState } from '../App';

interface FilterPanelProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  onApply?: () => void;
  onReset?: () => void;
  onExport?: () => void;
  showExport?: boolean;
}

export default function FilterPanel({ 
  filters, 
  setFilters, 
  onApply, 
  onReset,
  onExport,
  showExport = true 
}: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = async () => {
    setIsApplying(true);
    if (onApply) {
      await onApply();
    }
    setTimeout(() => setIsApplying(false), 500);
  };

  const handleReset = () => {
    setFilters({
      dateRange: 'year',
      region: 'all',
      category: 'all'
    });
    if (onReset) {
      onReset();
    }
  };

  const activeFiltersCount = [
    filters.dateRange !== 'year',
    filters.region !== 'all',
    filters.category !== 'all'
  ].filter(Boolean).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
    >
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 sm:p-6 bg-gradient-to-r from-det-primary/5 to-det-secondary/5 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-det-primary rounded-lg">
            <Filter className="text-white" size={20} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-det-primary">Dashboard Filters</h3>
            <p className="text-xs sm:text-sm text-gray-600">
              {activeFiltersCount > 0 ? `${activeFiltersCount} active filter${activeFiltersCount > 1 ? 's' : ''}` : 'No filters applied'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {showExport && onExport && (
            <button
              onClick={onExport}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-det-primary hover:bg-det-primary/10 rounded-lg transition-colors"
              title="Export Data"
            >
              <Download size={16} />
              <span className="hidden lg:inline">Export</span>
            </button>
          )}
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isExpanded ? <X size={20} /> : <Filter size={20} />}
          </button>
        </div>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Date Range Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Calendar size={16} className="text-det-primary" />
                    Date Range
                  </label>
                  <select
                    value={filters.dateRange}
                    onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-det-primary focus:border-det-primary transition-all"
                  >
                    <option value="week">Last Week</option>
                    <option value="month">Last Month</option>
                    <option value="quarter">Last Quarter</option>
                    <option value="year">Last Year</option>
                    <option value="ytd">Year to Date</option>
                    <option value="custom">Custom Range</option>
                  </select>
                </div>

                {/* Region Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={16} className="text-det-primary" />
                    Region
                  </label>
                  <select
                    value={filters.region}
                    onChange={(e) => setFilters({ ...filters, region: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-det-primary focus:border-det-primary transition-all"
                  >
                    <option value="all">All Regions</option>
                    <option value="gcc">GCC Countries</option>
                    <option value="europe">Europe</option>
                    <option value="asia">Asia Pacific</option>
                    <option value="americas">Americas</option>
                    <option value="africa">Africa</option>
                    <option value="middle-east">Middle East</option>
                  </select>
                </div>

                {/* Category Filter */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <Tag size={16} className="text-det-primary" />
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-det-primary focus:border-det-primary transition-all"
                  >
                    <option value="all">All Categories</option>
                    <option value="tourism">Tourism</option>
                    <option value="hotels">Hotels & Accommodation</option>
                    <option value="fdi">Foreign Direct Investment</option>
                    <option value="retail">Retail & Shopping</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="events">Events & Conferences</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleApply}
                  disabled={isApplying}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-det-primary hover:bg-primary-800 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isApplying ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <RefreshCw size={18} />
                      </motion.div>
                      <span>Applying...</span>
                    </>
                  ) : (
                    <>
                      <Filter size={18} />
                      <span>Apply Filters</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  <RefreshCw size={18} />
                  <span>Reset</span>
                </button>

                {showExport && onExport && (
                  <button
                    onClick={onExport}
                    className="sm:hidden flex items-center justify-center gap-2 px-6 py-2.5 bg-det-secondary hover:bg-det-accent text-white rounded-lg font-medium transition-colors"
                  >
                    <Download size={18} />
                    <span>Export Data</span>
                  </button>
                )}
              </div>

              {/* Active Filters Summary */}
              {activeFiltersCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-det-primary/5 rounded-lg"
                >
                  <p className="text-xs font-medium text-gray-700 mb-2">Active Filters:</p>
                  <div className="flex flex-wrap gap-2">
                    {filters.dateRange !== 'year' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-det-primary/20 rounded text-xs text-det-primary">
                        <Calendar size={12} />
                        {filters.dateRange}
                      </span>
                    )}
                    {filters.region !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-det-primary/20 rounded text-xs text-det-primary">
                        <MapPin size={12} />
                        {filters.region}
                      </span>
                    )}
                    {filters.category !== 'all' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-white border border-det-primary/20 rounded text-xs text-det-primary">
                        <Tag size={12} />
                        {filters.category}
                      </span>
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
