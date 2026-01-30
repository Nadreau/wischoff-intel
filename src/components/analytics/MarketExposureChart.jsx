import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function MarketExposureChart({ companies }) {
  const marketCounts = companies.reduce((acc, company) => {
    const market = company.market?.size?.split('(')[1]?.replace(')', '')?.split(' ')[0] || 'Other';
    const shortMarket = market.length > 20 ? market.substring(0, 20) + '...' : market;
    acc[shortMarket] = (acc[shortMarket] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(marketCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-medium text-slate-900">{payload[0].payload.name}</p>
          <p className="text-sm text-slate-600">{payload[0].value} companies</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Market Exposure</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ left: 20, right: 20 }}>
            <XAxis 
              dataKey="name" 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 11 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
            <Bar dataKey="count" fill="#6366F1" radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}