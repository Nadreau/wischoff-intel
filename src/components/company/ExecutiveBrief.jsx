import React from 'react';
import { motion } from 'framer-motion';
import {
  Zap, TrendingUp, AlertTriangle, Target,
  ChevronRight, Lightbulb, Shield, BarChart3
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

export default function ExecutiveBrief({ company, alerts = [] }) {
  const insights = company.ai_insights || {};
  const analysis = company.analysis || {};
  const market = company.market || {};

  // Get company-specific alerts
  const companyAlerts = alerts.filter(a => a.company_name === company.name);
  const highPriorityAlert = companyAlerts.find(a => a.priority === 'high') || companyAlerts[0];

  // Parse opportunities for top recommendation
  const rawOpportunities = company.strategic_opportunities || [];
  const opportunities = rawOpportunities.map(item => {
    if (typeof item === 'string') {
      try { return JSON.parse(item); } catch { return null; }
    }
    return item;
  }).filter(Boolean);
  const topOpportunity = opportunities.find(o => o.potential_impact?.toLowerCase() === 'high') || opportunities[0];

  // Parse threats for top risk
  const rawThreats = company.threats || [];
  const threats = rawThreats.map(item => {
    if (typeof item === 'string') {
      try { return JSON.parse(item); } catch { return null; }
    }
    return item;
  }).filter(Boolean);
  const topThreat = threats.find(t => ['critical', 'high'].includes(t.severity?.toLowerCase())) || threats[0];

  const hasData = insights.investment_thesis || analysis.growth_trajectory || topOpportunity || topThreat;

  if (!hasData && companyAlerts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-slate-700 mx-auto mb-4 flex items-center justify-center">
          <Zap className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Briefing Available</h3>
        <p className="text-slate-400 max-w-md mx-auto">
          Run "Update Company Intelligence" and "Generate Daily Alerts" to create your daily briefing.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm mb-1">Daily Brief</p>
              <h2 className="text-2xl font-bold text-white">{company.name}</h2>
            </div>
            <p className="text-slate-400 text-sm">{format(new Date(), 'EEEE, MMMM d')}</p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-4 divide-x divide-white/10">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{opportunities.length}</div>
            <p className="text-xs text-slate-400">Opportunities</p>
          </div>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{threats.length}</div>
            <p className="text-xs text-slate-400">Active Risks</p>
          </div>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{companyAlerts.length}</div>
            <p className="text-xs text-slate-400">Alerts</p>
          </div>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{company.competitors?.length || 0}</div>
            <p className="text-xs text-slate-400">Competitors</p>
          </div>
        </div>
      </motion.div>

      {/* Priority Action - If there's a high priority alert */}
      {highPriorityAlert && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl p-5 ${
            highPriorityAlert.type === 'threat'
              ? 'bg-gradient-to-r from-red-50 to-orange-50 border border-red-200'
              : 'bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${
              highPriorityAlert.type === 'threat' ? 'bg-red-100' : 'bg-emerald-100'
            }`}>
              {highPriorityAlert.type === 'threat'
                ? <AlertTriangle className="w-6 h-6 text-red-600" />
                : <Zap className="w-6 h-6 text-emerald-600" />
              }
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge className={highPriorityAlert.type === 'threat' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}>
                  Priority Action
                </Badge>
                {highPriorityAlert.date && (
                  <span className="text-xs text-slate-400">
                    {format(new Date(highPriorityAlert.date), 'MMM d')}
                  </span>
                )}
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{highPriorityAlert.title}</h3>
              <p className="text-sm text-slate-600">{highPriorityAlert.description}</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Top Opportunity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl border border-slate-200 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-emerald-100">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Top Growth Opportunity</h3>
          </div>
          {topOpportunity ? (
            <div>
              <h4 className="font-medium text-slate-900 mb-2">{topOpportunity.title}</h4>
              <p className="text-sm text-slate-600 mb-3">{topOpportunity.description}</p>
              {topOpportunity.action_items?.[0] && (
                <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                  <ChevronRight className="w-4 h-4" />
                  <span>{topOpportunity.action_items[0]}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No opportunities identified yet.</p>
          )}
        </motion.div>

        {/* Top Risk */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl border border-slate-200 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-amber-100">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Key Risk to Watch</h3>
          </div>
          {topThreat ? (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium text-slate-900">{topThreat.title}</h4>
                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                  {topThreat.severity}
                </Badge>
              </div>
              <p className="text-sm text-slate-600 mb-3">{topThreat.description}</p>
              {topThreat.mitigation && (
                <div className="flex items-start gap-2 text-sm text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">
                  <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <span>{topThreat.mitigation}</span>
                </div>
              )}
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No significant risks identified.</p>
          )}
        </motion.div>
      </div>

      {/* Investment Thesis Summary */}
      {insights.investment_thesis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-2xl border border-violet-200 p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-violet-100">
              <Lightbulb className="w-4 h-4 text-violet-600" />
            </div>
            <h3 className="font-semibold text-slate-900">Investment Thesis</h3>
          </div>
          <p className="text-slate-700 leading-relaxed">{insights.investment_thesis}</p>
        </motion.div>
      )}

      {/* Market & Growth Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {analysis.growth_trajectory && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-2xl border border-slate-200 p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-blue-500" />
              <h3 className="font-semibold text-slate-900">Growth Trajectory</h3>
            </div>
            <p className="text-slate-600">{analysis.growth_trajectory}</p>
          </motion.div>
        )}

        {market.growth && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl border border-slate-200 p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-emerald-500" />
              <h3 className="font-semibold text-slate-900">Market Opportunity</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-900">{market.size || 'N/A'}</span>
              {market.growth && (
                <span className="text-sm text-emerald-600 font-medium">{market.growth}</span>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Recommendation */}
      {insights.recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-5"
        >
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-emerald-400" />
            <h3 className="font-semibold text-white">Strategic Recommendation</h3>
          </div>
          <p className="text-white/90 leading-relaxed">{insights.recommendation}</p>
        </motion.div>
      )}
    </div>
  );
}
