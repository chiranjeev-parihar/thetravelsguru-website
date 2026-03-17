import React from 'react';
import { Package } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface Props {
  data: Package['budgetBreakdown'];
  total: number;
}

export const BudgetBreakdown: React.FC<Props> = ({ data, total }) => {
  const chartData = [
    { name: 'Accommodation', value: data.accommodation, color: '#1e40af' },
    { name: 'Transportation', value: data.transportation, color: '#3b82f6' },
    { name: 'Meals', value: data.meals, color: '#f97316' },
    { name: 'Activities', value: data.activities, color: '#fbbf24' },
    { name: 'Service & Tax', value: data.service, color: '#10b981' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="w-full lg:w-1/2 h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="w-full lg:w-1/2 space-y-4">
          <h4 className="text-xl font-bold text-gray-800">Where your money goes</h4>
          <p className="text-gray-500 text-sm">We believe in 100% price transparency. No hidden charges.</p>
          
          <div className="space-y-3 pt-4">
            {chartData.map((item) => (
              <div key={item.name} className="flex justify-between items-center text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-gray-600 font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-gray-800">₹{((item.value / 100) * total).toLocaleString()}</span>
                  <span className="text-gray-400 ml-1">({item.value}%)</span>
                </div>
              </div>
            ))}
            <div className="pt-4 border-t border-dashed flex justify-between items-center">
              <span className="font-bold text-gray-800">Total Package Cost</span>
              <span className="text-2xl font-black text-blue-800">₹{total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start space-x-3">
        <div className="bg-blue-600 text-white p-1 rounded-full text-[10px] font-bold mt-1">✓</div>
        <p className="text-blue-800 text-xs font-medium leading-relaxed">
          The percentages shown are for our 'Standard' variant. Prices may vary based on customization and seasonal availability.
        </p>
      </div>
    </div>
  );
};
