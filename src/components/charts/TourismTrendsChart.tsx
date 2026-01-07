import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { tourismTrends } from '../../data/mockData';
import { FilterState } from '../../App';

interface TourismTrendsChartProps {
  filters: FilterState;
  onDrillDown: (data: any) => void;
}

export default function TourismTrendsChart({ filters, onDrillDown }: TourismTrendsChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={tourismTrends} onClick={(data) => data && onDrillDown(data)}>
          <defs>
            <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis yAxisId="left" stroke="#94a3b8" />
          <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend />
          <Area
            yAxisId="left"
            type="monotone"
            dataKey="visitors"
            stroke="#3b82f6"
            fillOpacity={1}
            fill="url(#colorVisitors)"
            name="Visitors"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="hotelOccupancy"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 4 }}
            name="Hotel Occupancy %"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
