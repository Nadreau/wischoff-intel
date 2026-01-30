import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ExternalLink, ChevronRight, Newspaper } from 'lucide-react';
import { format, differenceInDays } from 'date-fns';
import { Badge } from '@/components/ui/badge';

export default function PortfolioTable({ companies, compact = false, alerts = [] }) {
  const getCategory = (description) => {
    if (description.toLowerCase().includes('fintech') || description.toLowerCase().includes('financial') || description.toLowerCase().includes('mortgage') || description.toLowerCase().includes('banking') || description.toLowerCase().includes('payment')) return 'FinTech';
    if (description.toLowerCase().includes('healthcare') || description.toLowerCase().includes('medical') || description.toLowerCase().includes('diagnostic') || description.toLowerCase().includes('pharma')) return 'Healthcare';
    if (description.toLowerCase().includes('ai') || description.toLowerCase().includes('talent') || description.toLowerCase().includes('recruiting') || description.toLowerCase().includes('saas')) return 'AI/SaaS';
    if (description.toLowerCase().includes('design') || description.toLowerCase().includes('web')) return 'DevTools';
    if (description.toLowerCase().includes('insurance') || description.toLowerCase().includes('claim')) return 'InsurTech';
    return 'Technology';
  };

  const getUnreadAlertsCount = (companyName) => {
    return alerts.filter(a => a.company_name === companyName && !a.read).length;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-100">
            <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</th>
            <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Market</th>
            {!compact && (
              <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Funding</th>
            )}
            <th className="text-left py-4 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Recent News</th>
            <th className="text-right py-4 px-4"></th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, index) => {
            const unreadCount = getUnreadAlertsCount(company.name);
            return (
              <motion.tr
                key={company.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group"
              >
                <td className="py-4 px-4">
                  <Link 
                    to={createPageUrl(`CompanyDetail?company=${encodeURIComponent(company.name)}`)}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
                      {company.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                        {company.name}
                      </p>
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-blue-500 flex items-center gap-1"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {company.website?.replace('https://', '')}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-4">
                  <Badge variant="outline" className="text-xs font-medium">
                    {getCategory(company.description)}
                  </Badge>
                </td>
                {!compact && (
                  <td className="py-4 px-4">
                    <span className="text-sm text-slate-600">
                      {company.funding?.total || company.funding?.history?.[company.funding.history.length - 1]?.amount || 'Not disclosed'}
                    </span>
                  </td>
                )}
                <td className="py-4 px-4">
                  {unreadCount > 0 ? (
                    <Link to={createPageUrl(`Alerts?company=${encodeURIComponent(company.name)}`)}>
                      <Badge variant="outline" className="text-xs font-medium bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100 cursor-pointer">
                        <Newspaper className="w-3 h-3 mr-1" />
                        {unreadCount} {unreadCount === 1 ? 'update' : 'updates'}
                      </Badge>
                    </Link>
                  ) : (
                    <span className="text-xs text-slate-400">No recent news</span>
                  )}
                </td>
                <td className="py-4 px-4 text-right">
                  <Link 
                    to={createPageUrl(`CompanyDetail?company=${encodeURIComponent(company.name)}`)}
                    className="inline-flex items-center gap-1 text-sm text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    View
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </td>
              </motion.tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}