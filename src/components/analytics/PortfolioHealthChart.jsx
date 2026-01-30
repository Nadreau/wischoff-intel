import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function PortfolioHealthChart({ companies }) {
  const getHealthStatus = (health) => {
    const lower = health?.toLowerCase() || '';
    if (lower.includes('healthy') || lower.includes('strong')) return 'Healthy';
    if (lower.includes('cautious') || lower.includes('moderate') || lower.includes('concerning')) return 'Caution';
    return 'At Risk';
  };

  const healthCounts = companies.reduce((acc, company) => {
    const status = getHealthStatus(company.analysis?.health_assessment);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const data = [
    { name: 'Healthy', value: healthCounts['Healthy'] || 0, color: '#10B981' },
    { name: 'Caution', value: healthCounts['Caution'] || 0, color: '#F59E0B' },
    { name: 'At Risk', value: healthCounts['At Risk'] || 0, color: '#EF4444' },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-medium text-slate-900">{payload[0].name}</p>
          <p className="text-sm text-slate-600">{payload[0].value} companies</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Portfolio Health Distribution</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center gap-6 mt-4">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-sm text-slate-600">{item.name} ({item.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}