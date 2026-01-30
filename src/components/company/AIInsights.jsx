import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MessageSquare, TrendingUp, AlertTriangle, Target, Lightbulb, FileText } from 'lucide-react';

export default function AIInsights({ company }) {
  const insights = company.ai_insights;

  if (!insights || !insights.competitive_position) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">AI Insights & Recommendations</h2>
              <p className="text-sm text-slate-400">VC-grade due diligence analysis</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-600/20 mx-auto mb-4 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">No AI Insights Yet</h3>
            <p className="text-slate-400 max-w-sm mx-auto">
              Run the "Update Company Intelligence" function to generate VC-grade analysis.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl overflow-hidden"
    >
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">AI Insights & Recommendations</h2>
              <p className="text-sm text-slate-400">VC-grade due diligence analysis</p>
            </div>
          </div>
          {insights.last_updated && (
            <span className="text-xs text-slate-500">
              Updated: {new Date(insights.last_updated).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Competitive Position */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Competitive Position</h3>
          </div>
          <p className="text-white/90 leading-relaxed">{insights.competitive_position}</p>
        </div>

        {/* Key Risks */}
        {insights.key_risks && insights.key_risks.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Key Risks to Watch</h3>
            </div>
            <div className="space-y-2">
              {insights.key_risks.map((risk, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 text-xs text-amber-400 font-medium">
                    {i + 1}
                  </span>
                  <span className="text-sm text-white/80">{risk}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Market Impact */}
        {insights.market_impact && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Market Impact</h3>
            </div>
            <p className="text-white/90 leading-relaxed">{insights.market_impact}</p>
          </div>
        )}

        {/* Founder Questions */}
        {insights.founder_questions && insights.founder_questions.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-4 h-4 text-violet-400" />
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Questions for Next Check-in</h3>
            </div>
            <div className="space-y-2">
              {insights.founder_questions.map((question, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-violet-500/10 border border-violet-500/20">
                  <span className="text-violet-400 font-medium text-sm">Q{i + 1}</span>
                  <span className="text-sm text-white/80">{question}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Red Flags */}
        {insights.red_flags && insights.red_flags.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">Due Diligence Red Flags</h3>
            </div>
            <div className="space-y-2">
              {insights.red_flags.map((flag, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-white/80">{flag}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Investment Thesis & Recommendation */}
        <div className="pt-4 border-t border-slate-700 space-y-4">
          {insights.investment_thesis && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/20 to-cyan-600/20 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Investment Thesis</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{insights.investment_thesis}</p>
            </div>
          )}

          {insights.recommendation && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/20 to-purple-600/20 border border-violet-500/20">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-violet-400" />
                <h3 className="text-sm font-semibold text-white">Strategic Recommendation</h3>
              </div>
              <p className="text-white/90 leading-relaxed">{insights.recommendation}</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
