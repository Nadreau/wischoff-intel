import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Calendar } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';

export default function RecentNews({ company }) {
  // Use company.news array directly
  const newsItems = company.news || [];

  const getTimeLabel = (dateStr) => {
    try {
      const days = differenceInDays(new Date(), new Date(dateStr));
      if (days === 0) return 'Today';
      if (days === 1) return 'Yesterday';
      if (days < 7) return `${days} days ago`;
      return format(new Date(dateStr), 'MMM d, yyyy');
    } catch {
      return dateStr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
            <Newspaper className="w-5 h-5 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Recent News & Activity</h2>
            <p className="text-sm text-slate-500">
              {newsItems.length > 0 ? `${newsItems.length} recent ${newsItems.length === 1 ? 'update' : 'updates'}` : 'No recent news'}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
        {newsItems.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500">No recent news available</p>
            <p className="text-xs text-slate-400 mt-2">Run "Refresh Company News" in Settings to fetch updates</p>
          </div>
        ) : (
          newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="p-5 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-4 h-4 text-slate-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-slate-500">
                      {getTimeLabel(item.date)}
                    </span>
                    {item.category && (
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-medium capitalize">
                        {item.category}
                      </span>
                    )}
                  </div>
                  <h3 className="font-medium text-slate-900 mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                  {item.source_url && (
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-2 text-xs text-blue-600 hover:text-blue-700"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-3 h-3" />
                      View source
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}
