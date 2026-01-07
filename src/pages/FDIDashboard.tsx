import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, TrendingUp, DollarSign, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fdiSourceCountries, fdiSectorsByCapital, fdiSectorsByProjects, fdiBusinessFunctions, fdiInvestmentTypes, dubaiGlobalRankings } from '../data/mockData';

export default function FDIDashboard() {
  const [selectedView, setSelectedView] = useState<'capital' | 'projects'>('capital');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const COLORS = ['#8B1538', '#C5A572', '#D4AF37', '#7a1230', '#67122c', '#cc2f5a'];

  const fdiRankings = dubaiGlobalRankings.filter(r => r.category.includes('FDI'));

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
            <h1 className="text-3xl font-bold text-det-primary">FDI Dashboard</h1>
            <p className="text-gray-600">Foreign Direct Investment Performance & Analysis</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setSelectedView('capital')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'capital'
                ? 'bg-det-primary text-white'
                : 'bg-white text-det-primary border border-gray-300 hover:bg-gray-50'
            }`}
          >
            By Capital
          </button>
          <button
            onClick={() => setSelectedView('projects')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedView === 'projects'
                ? 'bg-det-primary text-white'
                : 'bg-white text-det-primary border border-gray-300 hover:bg-gray-50'
            }`}
          >
            By Projects
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total FDI Projects', value: '1,826', change: '+11%', icon: Building2 },
          { label: 'Greenfield Projects', value: '1,117', change: '+0.2%', icon: TrendingUp, subtitle: '#1 Globally' },
          { label: 'FDI Capital', value: 'AED 52.3B', change: '+33%', icon: DollarSign },
          { label: 'Jobs Created', value: '58,680', change: '+31%', icon: Users },
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
              <span className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-gray-600'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-det-primary">{stat.value}</p>
            {stat.subtitle && <p className="text-xs text-det-secondary font-semibold mt-1">{stat.subtitle}</p>}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {fdiRankings.map((ranking, index) => (
          <motion.div
            key={ranking.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="bg-gradient-to-br from-det-primary to-primary-800 rounded-xl p-6 text-white shadow-lg"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 text-white font-bold text-xl">
                #{ranking.rank}
              </div>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">{ranking.region}</span>
            </div>
            <h3 className="text-lg font-bold mb-2">{ranking.category}</h3>
            <p className="text-3xl font-bold">{ranking.value}</p>
          </motion.div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {selectedView === 'capital' ? (
          <motion.div
            key="capital"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-det-primary mb-4">Top 5 Sectors by FDI Capital</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={fdiSectorsByCapital} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="sector" type="category" stroke="#6b7280" width={150} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number) => [`${value}%`, 'Capital Share']}
                />
                <Bar dataKey="capitalShare" fill="#8B1538" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        ) : (
          <motion.div
            key="projects"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
          >
            <h2 className="text-xl font-bold text-det-primary mb-4">Top 5 Sectors by FDI Projects</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={fdiSectorsByProjects} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" stroke="#6b7280" />
                <YAxis dataKey="sector" type="category" stroke="#6b7280" width={150} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  formatter={(value: number, name: string, props: any) => [
                    `${value}% (${props.payload.projectCount} projects)`,
                    'Project Share'
                  ]}
                />
                <Bar dataKey="projectsShare" fill="#C5A572" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-det-primary mb-4">Top 5 Source Countries</h2>
          <div className="space-y-3">
            {fdiSourceCountries.map((country, index) => (
              <motion.div
                key={country.country}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                onClick={() => setSelectedCountry(country.country)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-det-primary text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium text-det-dark">{country.country}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-det-primary">{country.capitalShare}%</p>
                  <p className="text-xs text-gray-600">{country.projectsShare}% projects</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
        >
          <h2 className="text-xl font-bold text-det-primary mb-4">FDI Investment Types</h2>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={fdiInvestmentTypes}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, share }) => `${type.split(' ')[0]} ${share}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="share"
              >
                {fdiInvestmentTypes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                formatter={(value: number, name, props: any) => [
                  `${value}% - ${props.payload.description}`,
                  props.payload.type
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm"
      >
        <h2 className="text-xl font-bold text-det-primary mb-4">FDI by Business Function</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={fdiBusinessFunctions}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="function" stroke="#6b7280" angle={-45} textAnchor="end" height={100} />
            <YAxis stroke="#6b7280" />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
            <Bar dataKey="capitalShare" name="Capital Share %" fill="#8B1538" radius={[8, 8, 0, 0]} />
            <Bar dataKey="projectsShare" name="Projects Share %" fill="#C5A572" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <AnimatePresence>
        {selectedCountry && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCountry(null)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              exit={{ y: 50 }}
              className="bg-white rounded-xl p-8 max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-det-primary mb-4">{selectedCountry} - FDI Analysis</h2>
              {fdiSourceCountries.find(c => c.country === selectedCountry) && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Capital Share</p>
                      <p className="text-3xl font-bold text-det-primary">
                        {fdiSourceCountries.find(c => c.country === selectedCountry)?.capitalShare}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Rank #{fdiSourceCountries.find(c => c.country === selectedCountry)?.capitalRank}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-1">Projects Share</p>
                      <p className="text-3xl font-bold text-det-secondary">
                        {fdiSourceCountries.find(c => c.country === selectedCountry)?.projectsShare}%
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Rank #{fdiSourceCountries.find(c => c.country === selectedCountry)?.projectsRank}</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gradient-to-r from-det-primary/10 to-transparent rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Key Insights</p>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li>• Strategic investment partner for Dubai's economic growth</li>
                      <li>• Focus on high-value sectors including technology and hospitality</li>
                      <li>• Strong year-over-year growth in investment activity</li>
                    </ul>
                  </div>
                  <button
                    onClick={() => setSelectedCountry(null)}
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
