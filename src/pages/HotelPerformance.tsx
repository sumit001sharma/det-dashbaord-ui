import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Building2, TrendingUp, DollarSign, Bed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import { accommodationSupply, accommodationSummary, hotelEconomicKPIs, monthlyTourismReports } from '../data/mockData';

export default function HotelPerformance() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'current' | 'comparison'>('current');

  const latestKPIs = hotelEconomicKPIs[0];
  const previousKPIs = hotelEconomicKPIs[1];
  const latestAccommodation = accommodationSummary[0];

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
            <h1 className="text-3xl font-bold text-det-primary">Hotel Performance</h1>
            <p className="text-gray-600">Accommodation supply, demand, and economic indicators</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedPeriod('current')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPeriod === 'current'
                ? 'bg-det-primary text-white'
                : 'bg-white text-det-primary border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Current Period
          </button>
          <button
            onClick={() => setSelectedPeriod('comparison')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPeriod === 'comparison'
                ? 'bg-det-primary text-white'
                : 'bg-white text-det-primary border border-gray-300 hover:bg-gray-50'
            }`}
          >
            YoY Comparison
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Average Occupancy', value: `${latestKPIs.averageOccupancy}%`, change: `+${(latestKPIs.averageOccupancy - previousKPIs.averageOccupancy).toFixed(1)}pp`, icon: Building2 },
          { label: 'Average Daily Rate', value: `AED ${latestKPIs.averageDailyRate}`, change: `+${latestKPIs.adrGrowth}%`, icon: DollarSign },
          { label: 'RevPAR', value: `AED ${latestKPIs.revPAR}`, change: `+${latestKPIs.revPARGrowth}%`, icon: TrendingUp },
          { label: 'Room Nights', value: `${latestKPIs.occupiedRoomNights}M`, change: `+${latestKPIs.occupiedRoomNightsGrowth}%`, icon: Bed },
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
              <span className="text-xs font-semibold text-green-600">{stat.change}</span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-det-primary">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedPeriod === 'current' ? (
          <motion.div
            key="current"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-det-primary mb-4">Hotel Inventory by Category (2025)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={accommodationSupply}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="category" stroke="#6b7280" angle={-15} textAnchor="end" height={100} />
                <YAxis yAxisId="left" stroke="#6b7280" />
                <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="rooms2025" name="Total Rooms" fill="#8B1538" radius={[8, 8, 0, 0]} />
                <Line yAxisId="right" type="monotone" dataKey="occupancy2025" name="Occupancy %" stroke="#C5A572" strokeWidth={3} />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <motion.div
            key="comparison"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-det-primary mb-4">Economic KPIs Comparison (2024 vs 2025)</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={[
                { metric: 'ADR', 2024: previousKPIs.averageDailyRate, 2025: latestKPIs.averageDailyRate },
                { metric: 'RevPAR', 2024: previousKPIs.revPAR, 2025: latestKPIs.revPAR },
                { metric: 'Occupancy', 2024: previousKPIs.averageOccupancy, 2025: latestKPIs.averageOccupancy },
                { metric: 'Room Nights (M)', 2024: previousKPIs.occupiedRoomNights, 2025: latestKPIs.occupiedRoomNights },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="metric" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                />
                <Legend />
                <Bar dataKey="2024" fill="#9ca3af" radius={[8, 8, 0, 0]} />
                <Bar dataKey="2025" fill="#8B1538" radius={[8, 8, 0, 0]} />
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
          <h2 className="text-xl font-bold text-det-primary mb-4">Accommodation Supply Summary</h2>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-det-primary/10 to-transparent rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Establishments</p>
              <p className="text-3xl font-bold text-det-primary">{latestAccommodation.totalEstablishments}</p>
              <p className="text-xs text-gray-500 mt-1">Hotels & Apartments</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-det-secondary/10 to-transparent rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Available Rooms</p>
              <p className="text-3xl font-bold text-det-primary">{latestAccommodation.totalRooms.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">Across all categories</p>
            </div>
            <div className="p-4 bg-gradient-to-r from-det-accent/10 to-transparent rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Average Occupancy Rate</p>
              <p className="text-3xl font-bold text-det-primary">{latestAccommodation.averageOccupancy}%</p>
              <p className="text-xs text-green-600 mt-1">+{latestAccommodation.averageOccupancy - accommodationSummary[1].averageOccupancy}pp YoY</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-det-primary mb-4">Category Performance</h2>
          <div className="space-y-3">
            {accommodationSupply.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                onClick={() => setSelectedCategory(category.category)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-det-dark">{category.category}</span>
                  <span className="text-sm font-bold text-det-primary">{category.inventoryShare}%</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500 text-xs">Establishments</p>
                    <p className="font-semibold text-det-dark">{category.establishments2025}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Rooms</p>
                    <p className="font-semibold text-det-dark">{category.rooms2025.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Occupancy</p>
                    <p className="font-semibold text-green-600">{category.occupancy2025}%</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold text-det-primary mb-4">Monthly Performance Trends (2025)</h2>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={monthlyTourismReports}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Line type="monotone" dataKey="economicKPIs.averageDailyRate" name="ADR (AED)" stroke="#8B1538" strokeWidth={3} />
            <Line type="monotone" dataKey="economicKPIs.revPAR" name="RevPAR (AED)" stroke="#C5A572" strokeWidth={3} />
            <Line type="monotone" dataKey="accommodationData.averageOccupancy" name="Occupancy %" stroke="#D4AF37" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCategory(null)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-det-primary mb-4">{selectedCategory} - Detailed Analysis</h2>
              {accommodationSupply.find(c => c.category === selectedCategory) && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Establishments (2025)</p>
                      <p className="text-3xl font-bold text-det-primary">
                        {accommodationSupply.find(c => c.category === selectedCategory)?.establishments2025}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Total Rooms (2025)</p>
                      <p className="text-3xl font-bold text-det-primary">
                        {accommodationSupply.find(c => c.category === selectedCategory)?.rooms2025.toLocaleString()}
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Occupancy Rate (2025)</p>
                      <p className="text-3xl font-bold text-green-600">
                        {accommodationSupply.find(c => c.category === selectedCategory)?.occupancy2025}%
                      </p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Market Share</p>
                      <p className="text-3xl font-bold text-det-primary">
                        {accommodationSupply.find(c => c.category === selectedCategory)?.inventoryShare}%
                      </p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-det-primary/10 to-transparent rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Performance Insights</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Strong occupancy performance indicating high demand</li>
                      <li>• Consistent inventory levels supporting market stability</li>
                      <li>• Competitive positioning in Dubai's hospitality sector</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setSelectedCategory(null)}
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
