import { useState } from 'react';
import { motion } from 'framer-motion';
import { FilterState } from '../App';
import TourismTrendsChart from './charts/TourismTrendsChart';
import HotelPerformanceChart from './charts/HotelPerformanceChart';
import VisitorOriginsChart from './charts/VisitorOriginsChart';
import RevenueBreakdownChart from './charts/RevenueBreakdownChart';
import EconomicIndicatorsChart from './charts/EconomicIndicatorsChart';

interface DashboardProps {
  filters: FilterState;
}

export default function Dashboard({ filters }: DashboardProps) {
  const [selectedChart, setSelectedChart] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Tourism Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-det-primary mb-1">Tourism Trends</h3>
            <p className="text-sm text-gray-600">Monthly visitor statistics and hotel occupancy rates</p>
          </div>
        </div>
        <TourismTrendsChart filters={filters} onDrillDown={(data) => setSelectedChart('tourism')} />
      </motion.div>

      {/* Hotel Performance & Visitor Origins */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-det-primary mb-1">Hotel Performance</h3>
            <p className="text-sm text-gray-600">Occupancy and ADR by category</p>
          </div>
          <HotelPerformanceChart filters={filters} onDrillDown={(data) => setSelectedChart('hotel')} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-det-primary mb-1">Visitor Origins</h3>
            <p className="text-sm text-gray-600">Top source markets and growth rates</p>
          </div>
          <VisitorOriginsChart filters={filters} onDrillDown={(data) => setSelectedChart('visitors')} />
        </motion.div>
      </div>

      {/* Revenue Breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-det-primary mb-1">Revenue Breakdown by Sector</h3>
            <p className="text-sm text-gray-600">Monthly revenue across key economic sectors (AED Billions)</p>
          </div>
        </div>
        <RevenueBreakdownChart filters={filters} onDrillDown={(data) => setSelectedChart('revenue')} />
      </motion.div>

      {/* Economic Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-det-primary mb-1">Key Economic Indicators</h3>
            <p className="text-sm text-gray-600">Performance metrics and year-over-year changes</p>
          </div>
        </div>
        <EconomicIndicatorsChart filters={filters} />
      </motion.div>
    </div>
  );
}
