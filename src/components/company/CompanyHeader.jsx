import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Briefcase, Newspaper } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CompanyHeader({ company, alerts = [] }) {
  const getCategory = (description) => {
    if (description.toLowerCase().includes('fintech') || description.toLowerCase().includes('financial') || description.toLowerCase().includes('mortgage') || description.toLowerCase().includes('banking') || description.toLowerCase().includes('payment')) return 'FinTech';
    if (description.toLowerCase().includes('healthcare') || description.toLowerCase().includes('medical') || description.toLowerCase().includes('diagnostic') || description.toLowerCase().includes('pharma')) return 'Healthcare';
    if (description.toLowerCase().includes('ai') || description.toLowerCase().includes('talent') || description.toLowerCase().includes('recruiting') || description.toLowerCase().includes('saas')) return 'AI/SaaS';
    if (description.toLowerCase().includes('design') || description.toLowerCase().includes('web')) return 'DevTools';
    if (description.toLowerCase().includes('insurance') || description.toLowerCase().includes('claim')) return 'InsurTech';
    return 'Technology';
  };

  const unreadAlertsCount = alerts.filter(a => a.company_name === company.name && !a.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200 p-8"
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center text-2xl font-bold text-slate-600">
          {company.name.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-900 mb-1">{company.name}</h1>
          <a 
            href={company.website} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-blue-600 transition-colors inline-flex items-center gap-1.5 text-sm"
          >
            {company.website?.replace('https://', '')}
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
      
      <p className="text-slate-600 leading-relaxed mb-4">
        {company.description}
      </p>
      
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="text-xs font-medium px-3 py-1.5 bg-slate-50">
          <Briefcase className="w-3 h-3 mr-1.5" />
          {getCategory(company.description)}
        </Badge>
        {company.funding?.total && (
          <Badge variant="outline" className="text-xs font-medium px-3 py-1.5 bg-emerald-50 text-emerald-700 border-emerald-200">
            💰 {company.funding.total} Raised
          </Badge>
        )}
        {unreadAlertsCount > 0 && (
          <Badge variant="outline" className="text-xs font-medium px-3 py-1.5 bg-blue-50 text-blue-700 border-blue-200">
            <Newspaper className="w-3 h-3 mr-1.5" />
            {unreadAlertsCount} {unreadAlertsCount === 1 ? 'Update' : 'Updates'}
          </Badge>
        )}
      </div>
    </motion.div>
  );
}