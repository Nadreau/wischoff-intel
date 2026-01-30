import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatsCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = 'emerald' }) {
  const colorClasses = {
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100',
    blue: 'bg-blue-50 text-blue-600 border-blue-100',
    amber: 'bg-amber-50 text-amber-600 border-amber-100',
    rose: 'bg-rose-50 text-rose-600 border-rose-100',
    violet: 'bg-violet-50 text-violet-600 border-violet-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-100 p-6 hover:shadow-lg hover:shadow-slate-100/50 transition-all duration-300 h-full min-h-[140px] flex flex-col justify-between"
    >
      <div className="flex items-start justify-between flex-1">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900 tracking-tight leading-tight">{value}</p>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>
        {Icon && (
          <div className={`p-3 rounded-xl border flex-shrink-0 ${colorClasses[color]}`}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
      {trend && (
        <div className="mt-4 flex items-center gap-2">
          {trend === 'up' ? (
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          ) : (
            <TrendingDown className="w-4 h-4 text-rose-500" />
          )}
          <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trendValue}
          </span>
        </div>
      )}
    </motion.div>
  );
}