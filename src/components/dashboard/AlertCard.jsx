import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Newspaper, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { format } from 'date-fns';

export default function AlertCard({ alert, index }) {
  const getAlertIcon = (type) => {
    switch (type) {
      case 'funding':
        return <TrendingUp className="w-4 h-4" />;
      case 'news':
        return <Newspaper className="w-4 h-4" />;
      case 'competitor':
        return <Users className="w-4 h-4" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Newspaper className="w-4 h-4" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'funding':
        return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'news':
        return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'competitor':
        return 'bg-violet-50 text-violet-600 border-violet-100';
      case 'warning':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      default:
        return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  return (
    <Link to={createPageUrl(`NewsDetail?id=${alert.id}`)}>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
      >
        <div className={`p-2.5 rounded-xl border ${getAlertColor(alert.type)}`}>
          {getAlertIcon(alert.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              {alert.company}
            </span>
            <span className="text-slate-300">•</span>
            <span className="text-xs text-slate-400">
              {format(new Date(alert.date), 'MMM d')}
            </span>
          </div>
          <p className="text-sm font-medium text-slate-900 group-hover:text-blue-600 line-clamp-2">
            {alert.title}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}