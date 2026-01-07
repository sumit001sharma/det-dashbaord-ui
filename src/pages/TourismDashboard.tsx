import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, Users, Globe, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { annualTourismData, visitorsByRegion2025, monthlyTourismReports, visitorOrigins } from '../data/mockData';

export default function TourismDashboard() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'annual' | 'monthly'>('annual');

  const COLORS = ['#8B1538', '#C5A572', '#D4AF37', '#7a1230', '#67122c', '#cc2f5a', '#ed7593', '#f4a8b9'];

  const latestReport = monthlyTourismReports[0];
  const previousYearData = annualTourismData.find(d => d.year === 2023);
  const currentYearData = annualTourismData.find(d => d.year === 2024);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="text-det-primary" size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-det-primary">Tourism Dashboard</h1>
            <p className="text-gray-600">Comprehensive visitor statistics and performance metrics</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('annual')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPeriod === 'annual'
                ? 'bg-det-primary text-white'
                : 'bg-white text-det-primary border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Annual View
          </button>
          <button
            onClick={() => setSelectedPeriod('monthly')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPeriod === 'monthly'
                ? 'bg-det-primary text-white'
                : 'bg-white text-det-primary border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Monthly View
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Visitors (2024)', value: '18.72M', change: '+9%', icon: Users },
          { label: 'YTD Nov 2025', value: '17.55M', change: '+5%', icon: TrendingUp },
          { label: 'Top Source Market', value: 'India', subvalue: '2.1M', icon: Globe },
          { label: 'Avg Length of Stay', value: '3.7 nights', change: 'Stable', icon: Calendar },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <stat.icon className="text-det-primary" size={20} />
              {stat.change && (
                <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-det-primary">{stat.value}</p>
            {stat.subvalue && <p className="text-xs text-gray-500 mt-1">{stat.subvalue}</p>}
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedPeriod === 'annual' ? (
          <motion.div
            key="annual"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-det-primary mb-4">Annual Visitor Trends (2018-2024)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={annualTourismData}>
                <defs>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B1538" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B1538" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="year" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [`${(value / 1000000).toFixed(2)}M visitors`, 'Total Visitors']}
                />
                <Area type="monotone" dataKey="visitors" stroke="#8B1538" strokeWidth={3} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <motion.div
            key="monthly"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-det-primary mb-4">2025 Monthly Progress</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={monthlyTourismReports}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [`${(value / 1000000).toFixed(2)}M visitors`, 'Visitors']}
                />
                <Bar dataKey="totalVisitors" fill="#8B1538" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-det-primary mb-4">Regional Distribution (Jan-Nov 2025)</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={latestReport.regionalBreakdown}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ region, percentage }) => `${region.split(' ')[0]} ${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="percentage"
                onClick={(data) => setSelectedRegion(data.region)}
                style={{ cursor: 'pointer' }}
              >
                {latestReport.regionalBreakdown.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number, name, props: any) => [
                  `${value}% (${(props.payload.visitors2025 / 1000000).toFixed(2)}M visitors)`,
                  props.payload.region
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-det-primary mb-4">Top Source Countries (2024)</h2>
          <div className="space-y-3">
            {visitorOrigins.map((origin, index) => (
              <motion.div
                key={origin.country}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-det-primary text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-det-dark">{origin.country}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-det-primary">{(origin.visitors / 1000000).toFixed(2)}M</p>
                  <p className="text-xs text-green-600">+{origin.growth}%</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedRegion && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedRegion(null)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-det-primary mb-4">{selectedRegion} - Detailed Analysis</h2>
              {latestReport.regionalBreakdown.find(r => r.region === selectedRegion) && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">2025 Visitors (Jan-Nov)</p>
                      <p className="text-2xl font-bold text-det-primary">
                        {((latestReport.regionalBreakdown.find(r => r.region === selectedRegion)?.visitors2025 || 0) / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">2024 Visitors (Jan-Nov)</p>
                      <p className="text-2xl font-bold text-gray-600">
                        {((latestReport.regionalBreakdown.find(r => r.region === selectedRegion)?.visitors2024 || 0) / 1000000).toFixed(2)}M
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Growth Rate</p>
                      <p className="text-2xl font-bold text-green-600">
                        {latestReport.regionalBreakdown.find(r => r.region === selectedRegion)?.growth.toFixed(1)}%
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Market Share</p>
                      <p className="text-2xl font-bold text-det-primary">
                        {latestReport.regionalBreakdown.find(r => r.region === selectedRegion)?.percentage}%
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRegion(null)}
                    className="w-full mt-4 px-6 py-3 bg-det-primary text-white rounded-lg hover:bg-primary-800 transition-colors font-medium"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
