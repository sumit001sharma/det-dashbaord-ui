import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Building2, DollarSign, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { dubaiGlobalRankings, detServiceMetrics, hotelEconomicKPIs, detPublications } from '../data/mockData';
import DashboardCard from '../components/DashboardCard';
import FilterPanel from '../components/FilterPanel';
import PublicationsSection from '../components/PublicationsSection';
import RevenueChart from '../components/charts/RevenueChart';
import VisitorStatsChart from '../components/charts/VisitorStatsChart';
import InvestmentPieChart from '../components/charts/InvestmentPieChart';
import HotelOccupancyChart from '../components/charts/HotelOccupancyChart';
import { exportToCSV, exportToJSON } from '../utils/dataExport';
import { FilterState } from '../App';

export default function Overview() {
  const [filters, setFilters] = useState<FilterState>({
    dateRange: 'year',
    region: 'all',
    category: 'all'
  });
  const stats = [
    {
      title: 'Total Visitors 2024',
      value: '18.72M',
      change: '+9%',
      icon: Users,
      color: 'from-det-primary to-primary-600',
      link: '/tourism',
    },
    {
      title: 'FDI Projects',
      value: '1,826',
      change: '+11%',
      icon: TrendingUp,
      color: 'from-det-secondary to-det-accent',
      link: '/fdi',
    },
    {
      title: 'Hotel Occupancy',
      value: '80.4%',
      change: '+2.4pp',
      icon: Building2,
      color: 'from-det-accent to-det-secondary',
      link: '/hotel-performance',
    },
    {
      title: 'FDI Capital',
      value: 'AED 52.3B',
      change: '+33%',
      icon: DollarSign,
      color: 'from-primary-600 to-det-primary',
      link: '/fdi',
    },
  ];

  const rankings = dubaiGlobalRankings.slice(0, 4);
  const latestHotelKPIs = hotelEconomicKPIs[0];

  // Chart data for exports
  const revenueData = [
    { month: 'Jan', revenue: 45000, target: 40000 },
    { month: 'Feb', revenue: 52000, target: 45000 },
    { month: 'Mar', revenue: 48000, target: 47000 },
    { month: 'Apr', revenue: 61000, target: 50000 },
    { month: 'May', revenue: 55000, target: 52000 },
    { month: 'Jun', revenue: 67000, target: 55000 },
    { month: 'Jul', revenue: 72000, target: 60000 },
    { month: 'Aug', revenue: 68000, target: 62000 },
    { month: 'Sep', revenue: 75000, target: 65000 },
    { month: 'Oct', revenue: 82000, target: 70000 },
    { month: 'Nov', revenue: 78000, target: 72000 },
    { month: 'Dec', revenue: 85000, target: 75000 }
  ];

  const visitorData = [
    { quarter: 'Q1 2023', domestic: 2400000, international: 4200000 },
    { quarter: 'Q2 2023', domestic: 2800000, international: 4800000 },
    { quarter: 'Q3 2023', domestic: 3200000, international: 5400000 },
    { quarter: 'Q4 2023', domestic: 3600000, international: 6200000 }
  ];

  const investmentData = [
    { sector: 'Real Estate', value: 35, amount: 18270000000 },
    { sector: 'Technology', value: 25, amount: 13050000000 },
    { sector: 'Finance', value: 20, amount: 10440000000 },
    { sector: 'Tourism', value: 12, amount: 6264000000 },
    { sector: 'Others', value: 8, amount: 4176000000 }
  ];

  const hotelData = [
    { month: 'Jan', occupancy: 75, adr: 850, revpar: 638 },
    { month: 'Feb', occupancy: 78, adr: 880, revpar: 686 },
    { month: 'Mar', occupancy: 82, adr: 920, revpar: 754 },
    { month: 'Apr', occupancy: 85, adr: 950, revpar: 808 },
    { month: 'May', occupancy: 80, adr: 900, revpar: 720 },
    { month: 'Jun', occupancy: 77, adr: 870, revpar: 670 },
    { month: 'Jul', occupancy: 73, adr: 840, revpar: 613 },
    { month: 'Aug', occupancy: 76, adr: 860, revpar: 654 },
    { month: 'Sep', occupancy: 81, adr: 910, revpar: 737 },
    { month: 'Oct', occupancy: 86, adr: 960, revpar: 826 },
    { month: 'Nov', occupancy: 88, adr: 980, revpar: 862 },
    { month: 'Dec', occupancy: 90, adr: 1000, revpar: 900 }
  ];

  const handleDelete = (item: string) => {
    console.log(`Delete ${item}`);
    alert(`Delete action for ${item} (Super Admin only)`);
  };

  const handleEdit = (item: string) => {
    console.log(`Edit ${item}`);
    alert(`Edit action for ${item}`);
  };

  const handleExport = (item: string) => {
    console.log(`Export ${item}`);
    alert(`Exporting ${item} data...`);
  };

  const handleFilterApply = async () => {
    console.log('Applying filters:', filters);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));
    alert(`Filters applied: ${filters.dateRange}, ${filters.region}, ${filters.category}`);
  };

  const handleFilterReset = () => {
    console.log('Filters reset');
  };

  const handleExportDashboard = () => {
    const dashboardData = {
      stats,
      rankings,
      metrics: detServiceMetrics,
      hotelKPIs: latestHotelKPIs,
      filters
    };
    exportToJSON([dashboardData], 'det_dashboard_overview');
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        onApply={handleFilterApply}
        onReset={handleFilterReset}
        onExport={handleExportDashboard}
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-det-primary mb-2">Dubai Economy & Tourism</h1>
        <p className="text-sm sm:text-base lg:text-lg text-gray-600">External Stakeholder BI Dashboard - Performance Overview</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <Link to={stat.link} key={stat.title}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="relative overflow-hidden rounded-xl bg-white border border-gray-200 p-6 cursor-pointer hover:shadow-xl transition-all"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 rounded-full -mr-16 -mt-16`}></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="text-white" size={24} />
                  </div>
                  <span className={`text-sm font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.title}</h3>
                <p className="text-3xl font-bold text-det-dark">{stat.value}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
      >
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
          <h3 className="text-base sm:text-lg font-bold text-det-primary mb-4">Dubai Global Rankings</h3>
          <div className="space-y-3">
            {rankings.map((ranking, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-det-primary text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                    {ranking.rank}
                  </div>
                  <span className="text-xs sm:text-sm font-medium">{ranking.category}</span>
                </div>
                <span className="text-xs text-gray-500 ml-2">{ranking.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
          <h3 className="text-base sm:text-lg font-bold text-det-primary mb-4">Key Metrics</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-det-secondary pl-4">
              <p className="text-xs sm:text-sm text-gray-600">Total Services</p>
              <p className="text-xl sm:text-2xl font-bold text-det-primary">{detServiceMetrics.totalServices}</p>
              <p className="text-xs text-gray-500 mt-1">Active DET services</p>
            </div>
            <div className="border-l-4 border-det-secondary pl-4">
              <p className="text-xs sm:text-sm text-gray-600">Active Permits</p>
              <p className="text-xl sm:text-2xl font-bold text-det-primary">{detServiceMetrics.activePermits.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Current valid permits</p>
            </div>
            <div className="border-l-4 border-det-secondary pl-4">
              <p className="text-xs sm:text-sm text-gray-600">Registered Operators</p>
              <p className="text-xl sm:text-2xl font-bold text-det-primary">{detServiceMetrics.registeredOperators.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Tourism operators</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md">
          <h3 className="text-base sm:text-lg font-bold text-det-primary mb-4">Latest Performance</h3>
          <div className="space-y-4">
            <div className="p-3 sm:p-4 bg-gradient-to-r from-det-primary/10 to-det-secondary/10 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Hotel Occupancy Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-det-primary">{latestHotelKPIs.occupancyRate}%</p>
              <p className="text-xs text-gray-500 mt-2">Year: {latestHotelKPIs.year}</p>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-det-secondary/10 to-det-accent/10 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Average Daily Rate</p>
              <p className="text-2xl sm:text-3xl font-bold text-det-secondary">AED {latestHotelKPIs.adr}</p>
            </div>
            <div className="p-3 sm:p-4 bg-gradient-to-r from-det-accent/10 to-det-primary/10 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Revenue Per Available Room</p>
              <p className="text-2xl sm:text-3xl font-bold text-det-accent">AED {latestHotelKPIs.revpar}</p>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Link to="/tourism" className="group">
          <div className="bg-gradient-to-br from-det-primary to-primary-800 rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1">
            <Users size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">Tourism Dashboard</h3>
            <p className="text-white/80 mb-4">Explore visitor statistics, regional performance, and tourism trends</p>
            <div className="flex items-center gap-2 text-sm font-medium">
              View Dashboard <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        <Link to="/fdi" className="group">
          <div className="bg-gradient-to-br from-det-secondary to-det-accent rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1">
            <TrendingUp size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">FDI Dashboard</h3>
            <p className="text-white/80 mb-4">Analyze foreign investment projects, capital flows, and source markets</p>
            <div className="flex items-center gap-2 text-sm font-medium">
              View Dashboard <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        <Link to="/hotel-performance" className="group">
          <div className="bg-gradient-to-br from-det-accent to-det-secondary rounded-xl p-6 text-white hover:shadow-xl transition-all transform hover:-translate-y-1">
            <Building2 size={32} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">Hotel Performance</h3>
            <p className="text-white/80 mb-4">Monitor occupancy rates, ADR, RevPAR, and accommodation supply</p>
            <div className="flex items-center gap-2 text-sm font-medium">
              View Dashboard <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Dashboard Charts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-8"
      >
        <h2 className="text-2xl font-bold text-det-primary mb-6">Performance Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <DashboardCard
            title="Revenue Trends"
            subtitle="Monthly revenue vs target comparison"
            onDelete={() => handleDelete('Revenue Chart')}
            onEdit={() => handleEdit('Revenue Chart')}
            exportData={revenueData}
          >
            <RevenueChart />
          </DashboardCard>

          <DashboardCard
            title="Visitor Statistics"
            subtitle="Quarterly domestic vs international visitors"
            onDelete={() => handleDelete('Visitor Chart')}
            onEdit={() => handleEdit('Visitor Chart')}
            exportData={visitorData}
          >
            <VisitorStatsChart />
          </DashboardCard>

          <DashboardCard
            title="Investment Distribution"
            subtitle="FDI by sector breakdown"
            onDelete={() => handleDelete('Investment Chart')}
            onEdit={() => handleEdit('Investment Chart')}
            exportData={investmentData}
          >
            <InvestmentPieChart />
          </DashboardCard>

          <DashboardCard
            title="Hotel Performance Metrics"
            subtitle="Occupancy, ADR, and RevPAR trends"
            onDelete={() => handleDelete('Hotel Chart')}
            onEdit={() => handleEdit('Hotel Chart')}
            exportData={hotelData}
          >
            <HotelOccupancyChart />
          </DashboardCard>
        </div>
      </motion.div>

      {/* DET Publications Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <PublicationsSection publications={detPublications} />
      </motion.div>
    </div>
  );
}
