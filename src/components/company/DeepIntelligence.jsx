import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles, TrendingUp, AlertTriangle, Target, Shield,
  Users, ChevronRight, Zap, BarChart3, ArrowRight,
  Activity, Globe, AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function DeepIntelligence({ company }) {
  const insights = company.ai_insights || {};
  const market = company.market || {};

  // Parse opportunities from JSON strings
  const rawOpportunities = company.strategic_opportunities || [];
  const opportunities = rawOpportunities.map(item => {
    if (typeof item === 'string') {
      try { return JSON.parse(item); } catch { return null; }
    }
    return item;
  }).filter(Boolean);

  // Parse threats from JSON strings
  const rawThreats = company.threats || [];
  const threats = rawThreats.map(item => {
    if (typeof item === 'string') {
      try { return JSON.parse(item); } catch { return null; }
    }
    return item;
  }).filter(Boolean);

  // Parse competitor details from JSON strings
  const rawCompetitorDetails = company.competitor_details || [];
  const competitorDetails = rawCompetitorDetails.map(item => {
    if (typeof item === 'string') {
      try { return JSON.parse(item); } catch { return null; }
    }
    return item;
  }).filter(Boolean);

  const hasData = opportunities.length > 0 || threats.length > 0 || competitorDetails.length > 0 || insights.competitive_position;

  if (!hasData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-violet-500/20 mx-auto mb-4 flex items-center justify-center">
          <Sparkles className="w-8 h-8 text-violet-400" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">No Intelligence Data Yet</h3>
        <p className="text-slate-400 max-w-md mx-auto">
          Run the "Update Company Intelligence" function in Settings to generate portfolio strategy and competitive analysis.
        </p>
      </motion.div>
    );
  }

  const getImpactColor = (impact) => {
    const imp = impact?.toLowerCase();
    if (imp === 'high') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (imp === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const getSeverityColor = (severity) => {
    const sev = severity?.toLowerCase();
    if (sev === 'critical') return 'bg-red-100 text-red-700 border-red-200';
    if (sev === 'high') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (sev === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-violet-500/20">
            <Sparkles className="w-5 h-5 text-violet-400" />
          </div>
          <h2 className="text-xl font-bold text-white">Portfolio Strategy & Intelligence</h2>
        </div>
        <p className="text-slate-400">Actionable insights and strategic recommendations for {company.name}</p>
      </motion.div>

      {/* Strategic Action Plan */}
      {insights.recommendation && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200 p-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-emerald-100">
              <Target className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Strategic Action Plan</h3>
          </div>
          <p className="text-slate-700 leading-relaxed text-lg">{insights.recommendation}</p>
        </motion.div>
      )}

      {/* Growth Opportunities - Full List */}
      {opportunities.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-emerald-100">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Growth Opportunities</h3>
            <Badge className="bg-emerald-100 text-emerald-700">{opportunities.length}</Badge>
          </div>

          <div className="space-y-4">
            {opportunities.map((opp, i) => (
              <div
                key={i}
                className={`rounded-xl border p-5 ${
                  opp.potential_impact?.toLowerCase() === 'high'
                    ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="font-semibold text-slate-900">{opp.title}</h4>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <Badge variant="outline" className={getImpactColor(opp.potential_impact)}>
                      {opp.potential_impact} impact
                    </Badge>
                    {opp.timeframe && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {opp.timeframe}
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{opp.description}</p>
                {opp.action_items && opp.action_items.length > 0 && (
                  <div className="bg-white/60 rounded-lg p-4 border border-emerald-100">
                    <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-3">Action Items</p>
                    <div className="space-y-2">
                      {opp.action_items.map((item, j) => (
                        <div key={j} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-slate-700">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Risk Management - Full List */}
      {threats.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-amber-100">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Risk Management</h3>
            <Badge className="bg-amber-100 text-amber-700">{threats.length}</Badge>
          </div>

          <div className="space-y-4">
            {threats.map((threat, i) => (
              <div
                key={i}
                className={`rounded-xl border p-5 ${
                  ['critical', 'high'].includes(threat.severity?.toLowerCase())
                    ? 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h4 className="font-semibold text-slate-900">{threat.title}</h4>
                  <div className="flex gap-1.5 flex-shrink-0">
                    <Badge variant="outline" className={getSeverityColor(threat.severity)}>
                      {threat.severity}
                    </Badge>
                    {threat.likelihood && (
                      <Badge variant="outline" className="bg-slate-100 text-slate-600 border-slate-200">
                        {threat.likelihood} likelihood
                      </Badge>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 mb-4">{threat.description}</p>
                {threat.mitigation && (
                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-200">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wider mb-1">Mitigation Strategy</p>
                        <p className="text-sm text-slate-700">{threat.mitigation}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Competitive Landscape */}
      {(competitorDetails.length > 0 || insights.competitive_position) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-blue-100">
              <Users className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Competitive Landscape</h3>
          </div>

          {/* Competitive Position */}
          {insights.competitive_position && (
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-5 mb-4">
              <h4 className="font-semibold text-slate-900 mb-2">Market Position</h4>
              <p className="text-slate-700 leading-relaxed">{insights.competitive_position}</p>
            </div>
          )}

          {/* Competitor Cards */}
          {competitorDetails.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4">
              {competitorDetails.map((comp, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">{comp.name}</h4>
                    <Globe className="w-4 h-4 text-slate-400" />
                  </div>
                  {comp.description && (
                    <p className="text-sm text-slate-600 mb-3">{comp.description}</p>
                  )}
                  {comp.positioning && (
                    <div className="mb-3">
                      <span className="text-xs font-medium text-slate-500 uppercase">Positioning</span>
                      <p className="text-sm text-slate-700 mt-1">{comp.positioning}</p>
                    </div>
                  )}
                  {comp.recent_moves && (
                    <div className="bg-amber-50 rounded-lg p-3 border border-amber-200">
                      <div className="flex items-start gap-2">
                        <Activity className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs font-medium text-amber-800">Recent Activity</span>
                          <p className="text-sm text-amber-900 mt-0.5">{comp.recent_moves}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Market Intelligence */}
      {(market.trends?.length > 0 || market.challenges?.length > 0) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 rounded-lg bg-violet-100">
              <BarChart3 className="w-5 h-5 text-violet-600" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Market Intelligence</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Trends */}
            {market.trends && market.trends.length > 0 && (
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <h4 className="font-semibold text-slate-900">Market Tailwinds</h4>
                </div>
                <div className="space-y-2">
                  {market.trends.map((trend, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{trend}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges */}
            {market.challenges && market.challenges.length > 0 && (
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <h4 className="font-semibold text-slate-900">Market Headwinds</h4>
                </div>
                <div className="space-y-2">
                  {market.challenges.map((challenge, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <ArrowRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{challenge}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Key Risks to Monitor (from AI insights) */}
      {insights.key_risks && insights.key_risks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl border border-slate-200 p-5"
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-slate-900">Additional Risks to Monitor</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-3">
            {insights.key_risks.map((risk, i) => (
              <div key={i} className="flex items-start gap-2 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-slate-700">{risk}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Market Impact */}
      {insights.market_impact && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-6"
        >
          <div className="flex items-center gap-2 mb-3">
            <Globe className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">Market Impact Assessment</h3>
          </div>
          <p className="text-white/90 leading-relaxed">{insights.market_impact}</p>
        </motion.div>
      )}
    </div>
  );
}
