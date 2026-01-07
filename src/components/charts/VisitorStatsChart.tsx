import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { quarter: 'Q1 2023', domestic: 2400000, international: 4200000 },
  { quarter: 'Q2 2023', domestic: 2800000, international: 4800000 },
  { quarter: 'Q3 2023', domestic: 3200000, international: 5400000 },
  { quarter: 'Q4 2023', domestic: 3600000, international: 6200000 }
];

export default function VisitorStatsChart() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="quarter" stroke="#666" />
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
          <Bar dataKey="domestic" fill="#8B1538" name="Domestic Visitors" radius={[8, 8, 0, 0]} />
          <Bar dataKey="international" fill="#C5A572" name="International Visitors" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
