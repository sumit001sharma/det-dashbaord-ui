import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const data = [
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

export default function HotelOccupancyChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
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
          <Line 
            type="monotone" 
            dataKey="occupancy" 
            stroke="#8B1538" 
            strokeWidth={3}
            dot={{ fill: '#8B1538', r: 4 }}
            name="Occupancy Rate (%)"
          />
          <Line 
            type="monotone" 
            dataKey="adr" 
            stroke="#C5A572" 
            strokeWidth={3}
            dot={{ fill: '#C5A572', r: 4 }}
            name="ADR (AED)"
          />
          <Line 
            type="monotone" 
            dataKey="revpar" 
            stroke="#D4AF37" 
            strokeWidth={3}
            dot={{ fill: '#D4AF37', r: 4 }}
            name="RevPAR (AED)"
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
