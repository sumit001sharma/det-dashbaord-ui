import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { economicIndicators } from '../../data/mockData';
import { FilterState } from '../../App';

interface EconomicIndicatorsChartProps {
  filters: FilterState;
}

export default function EconomicIndicatorsChart({ filters }: EconomicIndicatorsChartProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {economicIndicators.map((indicator, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-all cursor-pointer"
        >
          <div className="flex items-start justify-between mb-2">
            <h4 className="text-sm font-medium text-gray-700">{indicator.indicator}</h4>
            {indicator.trend === 'up' && <TrendingUp className="text-green-600" size={20} />}
            {indicator.trend === 'down' && <TrendingDown className="text-red-600" size={20} />}
            {indicator.trend === 'stable' && <Minus className="text-yellow-600" size={20} />}
          </div>
          <div className="flex items-end justify-between">
            <span className="text-2xl font-bold text-det-primary">{indicator.value}</span>
            <span className={`text-sm font-semibold ${
              indicator.change > 0 ? 'text-green-600' : indicator.change < 0 ? 'text-red-600' : 'text-yellow-600'
            }`}>
              {indicator.change > 0 ? '+' : ''}{indicator.change}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
