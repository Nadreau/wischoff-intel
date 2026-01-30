import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Target, AlertTriangle, Lightbulb, BarChart3, Info } from 'lucide-react';

export default function MarketIntelligence({ company }) {
  const market = company.market || {};

  // Handle both old format (context string) and new format (size, growth, trends, challenges)
  const hasStructuredData = market.size || market.growth || market.trends?.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-violet-50 border border-violet-100">
            <BarChart3 className="w-5 h-5 text-violet-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Market Intelligence</h2>
        </div>
      </div>

      <div className="p-6">
        {/* Show context if that's what we have (legacy format) */}
        {market.context && !hasStructuredData && (
          <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200">
            <div className="flex items-center gap-2 text-slate-700 text-sm font-medium mb-3">
              <Info className="w-4 h-4" />
              <span>Market Context</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">{market.context}</p>
          </div>
        )}

        {/* Structured data display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="flex items-center gap-2 text-blue-700 text-sm font-medium mb-2">
              <Target className="w-4 h-4" />
              <span>Market Size</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">{market.size || 'N/A'}</p>
          </div>
          <div className="p-5 rounded-xl bg-gradient-to-br from-emerald-50 to-green-50 border border-emerald-100">
            <div className="flex items-center gap-2 text-emerald-700 text-sm font-medium mb-2">
              <TrendingUp className="w-4 h-4" />
              <span>Growth Rate</span>
            </div>
            <p className="text-lg font-semibold text-slate-900">{market.growth || 'N/A'}</p>
          </div>
        </div>

        {market.trends?.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Key Trends</h3>
            </div>
            <div className="space-y-3">
              {market.trends.map((trend, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-blue-600">{index + 1}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{trend}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {market.challenges?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Market Challenges</h3>
            </div>
            <div className="space-y-3">
              {market.challenges.map((challenge, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-amber-50/50 border border-amber-100">
                  <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-3 h-3 text-amber-600" />
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {company.analysis?.growth_trajectory && (
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 text-white">
            <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider mb-3">Growth Trajectory</h3>
            <p className="text-white/90 leading-relaxed">{company.analysis.growth_trajectory}</p>
          </div>
        )}

        {/* Show empty state if no data */}
        {!market.context && !hasStructuredData && (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-slate-400" />
            </div>
            <p className="text-slate-500">No market intelligence available</p>
            <p className="text-xs text-slate-400 mt-2">Run "Update Company Intelligence" in Settings</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
