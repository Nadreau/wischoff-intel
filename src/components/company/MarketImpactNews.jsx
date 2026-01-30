import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, AlertTriangle, Bell, Calendar, ExternalLink, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function MarketImpactNews({ company, alerts = [] }) {
  // Filter alerts for this company
  const companyAlerts = alerts.filter(a => a.company_name === company.name);

  // Get recent news
  const recentNews = company.news || [];

  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'bg-red-100 text-red-700 border-red-200';
    if (priority === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const getTypeIcon = (type) => {
    return type === 'threat' ? AlertTriangle : TrendingUp;
  };

  const getTypeColor = (type) => {
    return type === 'threat' ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50';
  };

  const hasContent = companyAlerts.length > 0 || recentNews.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6"
      >
        <h2 className="text-xl font-bold text-white mb-1">Daily Brief: {company.name}</h2>
        <p className="text-slate-400 text-sm">
          {hasContent
            ? `${companyAlerts.length} alert${companyAlerts.length !== 1 ? 's' : ''} • ${recentNews.length} news items`
            : 'No updates available'
          }
        </p>
      </motion.div>

      {!hasContent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200"
        >
          <div className="w-16 h-16 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
            <Bell className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">No Updates Today</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-4">
            Run the intelligence functions in Settings to generate alerts and refresh company news.
          </p>
          <div className="text-xs text-slate-400">
            <p>• "Generate Daily Alerts" - for market alerts</p>
            <p>• "Refresh Company News" - for recent news</p>
          </div>
        </motion.div>
      )}

      {/* Alerts Section */}
      {companyAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-slate-900">Alerts Requiring Attention</h3>
            <Badge className="bg-amber-100 text-amber-700">{companyAlerts.length}</Badge>
          </div>

          <div className="space-y-3">
            {companyAlerts.map((alert, i) => {
              const Icon = getTypeIcon(alert.type);
              const iconColor = getTypeColor(alert.type);
              return (
                <motion.div
                  key={alert.id || i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-slate-900">{alert.title}</h4>
                        <Badge variant="outline" className={`text-[10px] flex-shrink-0 ${getPriorityColor(alert.priority)}`}>
                          {alert.priority}
                        </Badge>
                      </div>
                      {alert.date && (
                        <p className="text-xs text-slate-400 mb-2 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {format(new Date(alert.date), 'MMM d, yyyy')}
                        </p>
                      )}
                      <p className="text-sm text-slate-600 mb-3">{alert.description}</p>
                      {alert.article_content && (
                        <div className="bg-slate-50 rounded-lg p-3 text-sm text-slate-600 whitespace-pre-line">
                          {alert.article_content}
                        </div>
                      )}
                      {alert.source_url && (
                        <a
                          href={alert.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-2"
                        >
                          View Source <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Recent News Section */}
      {recentNews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Newspaper className="w-5 h-5 text-blue-500" />
            <h3 className="font-semibold text-slate-900">Recent News</h3>
            <Badge className="bg-blue-100 text-blue-700">{recentNews.length}</Badge>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
            {recentNews.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="p-4 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-16 text-center">
                    <div className="text-xs font-medium text-slate-500">
                      {item.date ? format(new Date(item.date), 'MMM d') : 'Recent'}
                    </div>
                    {item.category && (
                      <Badge variant="outline" className="text-[9px] mt-1 px-1.5 py-0.5 capitalize">
                        {item.category}
                      </Badge>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-slate-900 mb-1">{item.title}</h4>
                    <p className="text-sm text-slate-600 line-clamp-2">{item.summary}</p>
                    {item.source_url && (
                      <a
                        href={item.source_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 mt-1"
                      >
                        Source <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
