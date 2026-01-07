import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const data = [
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

export default function RevenueChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B1538" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8B1538" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C5A572" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#C5A572" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" stroke="#666" />
          <YAxis stroke="#666" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
            }}
          />
          <Legend />
          <Area 
            type="monotone" 
            dataKey="revenue" 
            stroke="#8B1538" 
            fillOpacity={1} 
            fill="url(#colorRevenue)"
            name="Actual Revenue (AED)"
          />
          <Area 
            type="monotone" 
            dataKey="target" 
            stroke="#C5A572" 
            fillOpacity={1} 
            fill="url(#colorTarget)"
            name="Target (AED)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
