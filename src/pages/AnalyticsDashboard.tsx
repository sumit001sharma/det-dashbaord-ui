import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Building2, DollarSign, Globe, Calendar } from 'lucide-react';
import DashboardCard from '../components/DashboardCard';
import FilterPanel from '../components/FilterPanel';
import RevenueChart from '../components/charts/RevenueChart';
import VisitorStatsChart from '../components/charts/VisitorStatsChart';
import InvestmentPieChart from '../components/charts/InvestmentPieChart';
import HotelOccupancyChart from '../components/charts/HotelOccupancyChart';
import { FilterState } from '../App';
import { exportToCSV, exportToJSON } from '../utils/dataExport';

export default function AnalyticsDashboard() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'year',
    region: 'all',
    category: 'all',
  });

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleExportAll = () => {
    const allData = {
      revenue: revenueData,
      visitors: visitorData,
      investment: investmentData,
      hotel: hotelData,
      filters
    };
    exportToJSON([allData], 'det_analytics_complete');
  };

  // Chart data for exports
  const revenueData = [
    { month: 'Jan', revenue: 12500000000, target: 12000000000 },
    { month: 'Feb', revenue: 13200000000, target: 12500000000 },
    { month: 'Mar', revenue: 14800000000, target: 13000000000 },
    { month: 'Apr', revenue: 13900000000, target: 13500000000 },
    { month: 'May', revenue: 15200000000, target: 14000000000 },
    { month: 'Jun', revenue: 16500000000, target: 15000000000 }
  ];

  const visitorData = [
    { month: 'Jan', international: 1250000, domestic: 450000 },
    { month: 'Feb', international: 1320000, domestic: 480000 },
    { month: 'Mar', international: 1480000, domestic: 520000 },
    { month: 'Apr', international: 1390000, domestic: 490000 },
    { month: 'May', international: 1520000, domestic: 550000 },
    { month: 'Jun', international: 1650000, domestic: 600000 }
  ];

  const investmentData = [
    { sector: 'Tourism & Hospitality', value: 35, amount: 18270000000 },
    { sector: 'Real Estate', value: 28, amount: 14616000000 },
    { sector: 'Technology', value: 15, amount: 7830000000 },
    { sector: 'Retail & Trade', value: 14, amount: 7308000000 },
    { sector: 'Others', value: 8, amount: 4176000000 }
  ];

  const hotelData = [
    { month: 'Jan', occupancy: 75, adr: 850, revpar: 638 },
    { month: 'Feb', occupancy: 78, adr: 880, revpar: 686 },
    { month: 'Mar', occupancy: 82, adr: 920, revpar: 754 },
    { month: 'Apr', occupancy: 79, adr: 890, revpar: 703 },
    { month: 'May', occupancy: 84, adr: 950, revpar: 798 },
    { month: 'Jun', occupancy: 87, adr: 980, revpar: 853 }
  ];

  const handleDelete = (chartName: string) => {
    console.log(`Delete ${chartName}`);
  };

  const handleEdit = (chartName: string) => {
    console.log(`Edit ${chartName}`);
  };

  const kpiCards = [
    {
      title: 'Total Revenue',
      value: 'AED 86.1B',
      change: '+12.5%',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'International Visitors',
      value: '8.61M',
      change: '+8.3%',
      icon: Users,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Hotel Occupancy',
      value: '80.8%',
      change: '+2.4pp',
      icon: Building2,
      color: 'from-purple-500 to-pink-600'
    },
    {
      title: 'FDI Projects',
      value: '1,826',
      change: '+33%',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-det-primary flex items-center gap-3">
            <BarChart3 size={32} />
            Analytics Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-2">
            Comprehensive view of all key metrics and performance indicators
          </p>
        </div>
        <button
          onClick={handleExportAll}
          className="px-4 py-2 bg-det-primary text-white rounded-lg hover:bg-primary-800 transition-colors text-sm font-medium"
        >
          Export All Data
        </button>
      </motion.div>

      {/* Filter Panel */}
      <FilterPanel 
        filters={filters} 
        setFilters={setFilters}
        onApply={handleApplyFilters}
      />

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {kpiCards.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className={`bg-gradient-to-br ${kpi.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
          >
            <div className="flex items-center justify-between mb-4">
              <kpi.icon size={32} className="opacity-80" />
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                {kpi.change}
              </span>
            </div>
            <h3 className="text-sm font-medium opacity-90 mb-1">{kpi.title}</h3>
            <p className="text-3xl font-bold">{kpi.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Revenue Chart */}
        <DashboardCard
          title="Tourism Revenue Trends"
          subtitle="Monthly revenue vs targets"
          onDelete={() => handleDelete('Revenue Chart')}
          onEdit={() => handleEdit('Revenue Chart')}
          exportData={revenueData}
        >
          <RevenueChart />
        </DashboardCard>

        {/* Visitor Stats Chart */}
        <DashboardCard
          title="Visitor Statistics"
          subtitle="International vs domestic arrivals"
          onDelete={() => handleDelete('Visitor Chart')}
          onEdit={() => handleEdit('Visitor Chart')}
          exportData={visitorData}
        >
          <VisitorStatsChart />
        </DashboardCard>

        {/* Investment Pie Chart */}
        <DashboardCard
          title="FDI Distribution by Sector"
          subtitle="Investment allocation across industries"
          onDelete={() => handleDelete('Investment Chart')}
          onEdit={() => handleEdit('Investment Chart')}
          exportData={investmentData}
        >
          <InvestmentPieChart />
        </DashboardCard>

        {/* Hotel Performance Chart */}
        <DashboardCard
          title="Hotel Performance Metrics"
          subtitle="Occupancy, ADR, and RevPAR trends"
          onDelete={() => handleDelete('Hotel Chart')}
          onEdit={() => handleEdit('Hotel Chart')}
          exportData={hotelData}
        >
          <HotelOccupancyChart />
        </DashboardCard>
      </motion.div>

      {/* Additional Insights Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="text-det-primary" size={24} />
            <h3 className="text-lg font-bold text-det-primary">Top Markets</h3>
          </div>
          <div className="space-y-3">
            {[
              { country: 'India', visitors: '2.1M', share: '22%' },
              { country: 'Saudi Arabia', visitors: '1.5M', share: '16%' },
              { country: 'United Kingdom', visitors: '1.2M', share: '13%' },
              { country: 'Russia', visitors: '0.9M', share: '10%' },
              { country: 'China', visitors: '0.8M', share: '9%' }
            ].map((market) => (
              <div key={market.country} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{market.country}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-det-primary">{market.visitors}</span>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{market.share}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="text-det-secondary" size={24} />
            <h3 className="text-lg font-bold text-det-primary">Seasonal Trends</h3>
          </div>
          <div className="space-y-3">
            {[
              { season: 'Q1 2025', performance: 'Strong', growth: '+12%' },
              { season: 'Q2 2025', performance: 'Excellent', growth: '+15%' },
              { season: 'Q3 2025', performance: 'Moderate', growth: '+8%' },
              { season: 'Q4 2024', performance: 'Strong', growth: '+11%' }
            ].map((trend) => (
              <div key={trend.season} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{trend.season}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-600">{trend.performance}</span>
                  <span className="text-sm font-semibold text-green-600">{trend.growth}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-det-accent" size={24} />
            <h3 className="text-lg font-bold text-det-primary">Key Highlights</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <p className="text-xs text-gray-600 mb-1">Record Visitors</p>
              <p className="text-sm font-semibold text-gray-800">18.72M visitors in 2025</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <p className="text-xs text-gray-600 mb-1">Hotel Supply</p>
              <p className="text-sm font-semibold text-gray-800">153,292 rooms available</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <p className="text-xs text-gray-600 mb-1">FDI Growth</p>
              <p className="text-sm font-semibold text-gray-800">+33% year-over-year</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
