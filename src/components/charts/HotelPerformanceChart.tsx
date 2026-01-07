import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { hotelCategories } from '../../data/mockData';
import { FilterState } from '../../App';

interface HotelPerformanceChartProps {
  filters: FilterState;
  onDrillDown: (data: any) => void;
}

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'];

export default function HotelPerformanceChart({ filters, onDrillDown }: HotelPerformanceChartProps) {
  return (
    <div className="h-[350px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={hotelCategories} onClick={(data) => data && onDrillDown(data)}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="category" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend />
          <Bar dataKey="occupancy" name="Occupancy %" radius={[8, 8, 0, 0]}>
            {hotelCategories.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
