import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function OpportunityScoreChart({ companies }) {
  const data = companies
    .map(company => ({
      name: company.name,
      score: company.analysis?.opportunity_score || 0,
    }))
    .sort((a, b) => b.score - a.score);

  const getBarColor = (score) => {
    if (score >= 7.5) return '#10B981';
    if (score >= 6) return '#F59E0B';
    return '#EF4444';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-slate-200">
          <p className="font-medium text-slate-900">{payload[0].payload.name}</p>
          <p className="text-sm text-slate-600">Score: {payload[0].value.toFixed(1)}/10</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Opportunity Scores Across Portfolio</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <XAxis type="number" domain={[0, 10]} tickLine={false} axisLine={false} />
            <YAxis 
              type="category" 
              dataKey="name" 
              tickLine={false} 
              axisLine={false}
              width={100}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
            <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={24}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}