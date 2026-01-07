import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { monthlyRevenue } from '../../data/mockData';
import { FilterState } from '../../App';

interface RevenueBreakdownChartProps {
  filters: FilterState;
  onDrillDown: (data: any) => void;
}

export default function RevenueBreakdownChart({ filters, onDrillDown }: RevenueBreakdownChartProps) {
  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={monthlyRevenue} onClick={(data) => data && onDrillDown(data)}>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis dataKey="month" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" label={{ value: 'AED Billions', angle: -90, position: 'insideLeft', fill: '#94a3b8' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend />
          <Bar dataKey="retail" stackId="a" fill="#3b82f6" name="Retail" radius={[0, 0, 0, 0]} />
          <Bar dataKey="hospitality" stackId="a" fill="#8b5cf6" name="Hospitality" radius={[0, 0, 0, 0]} />
          <Bar dataKey="entertainment" stackId="a" fill="#ec4899" name="Entertainment" radius={[0, 0, 0, 0]} />
          <Bar dataKey="transport" stackId="a" fill="#10b981" name="Transport" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
