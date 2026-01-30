import React from 'react';
import { differenceInDays, format, subDays } from 'date-fns';

export default function ActivityHeatmap({ companies }) {
  // Generate last 30 days
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => subDays(today, 29 - i));
  
  // Count news per day per company
  const activityData = companies.map(company => {
    const dayActivity = days.map(day => {
      const dayStr = format(day, 'yyyy-MM-dd');
      const hasNews = company.news?.some(news => news.date === dayStr);
      return hasNews ? 1 : 0;
    });
    return {
      name: company.name,
      activity: dayActivity,
    };
  });

  const getActivityColor = (value) => {
    return value > 0 ? 'bg-emerald-500' : 'bg-slate-100';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-6">Activity Heatmap (Last 30 Days)</h3>
      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          {/* Header - Day labels */}
          <div className="flex items-center mb-2 pl-28">
            {days.filter((_, i) => i % 5 === 0).map((day, i) => (
              <div 
                key={i} 
                className="text-xs text-slate-400"
                style={{ width: `${(100 / 6)}%` }}
              >
                {format(day, 'MMM d')}
              </div>
            ))}
          </div>
          
          {/* Rows */}
          {activityData.map((company, companyIndex) => (
            <div key={companyIndex} className="flex items-center gap-2 mb-2">
              <div className="w-24 text-sm text-slate-600 truncate flex-shrink-0">
                {company.name}
              </div>
              <div className="flex-1 flex gap-1">
                {company.activity.map((value, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`flex-1 h-6 rounded ${getActivityColor(value)} transition-colors`}
                    title={`${company.name} - ${format(days[dayIndex], 'MMM d')}: ${value > 0 ? 'Active' : 'No activity'}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-slate-100" />
          <span className="text-xs text-slate-500">No activity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-emerald-500" />
          <span className="text-xs text-slate-500">News/Update</span>
        </div>
      </div>
    </div>
  );
}