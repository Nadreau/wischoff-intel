import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, Star, Zap, Building2, TrendingUp, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function CompetitiveLandscape({ company }) {
  // Parse competitor_details from JSON strings (Base44 stores as string array)
  const rawCompetitorDetails = company.competitor_details || [];
  const competitorDetails = rawCompetitorDetails.map(item => {
    if (typeof item === 'string') {
      try {
        return JSON.parse(item);
      } catch (e) {
        return { name: item };
      }
    }
    return item;
  }).filter(Boolean);

  const competitors = company.competitors || [];
  const positioning = company.competitive_positioning || {};

  // Merge data: use details if available, otherwise create basic entries from names
  const displayCompetitors = competitorDetails.length > 0
    ? competitorDetails
    : competitors.map(name => ({
        name: typeof name === 'string' ? name : name.name,
        description: null,
        positioning: null,
        recent_moves: null
      }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-100">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Competitive Landscape</h2>
            <p className="text-sm text-slate-500">{displayCompetitors.length} competitors tracked</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Your Company's Position */}
        {positioning.unique_value_prop && (
          <div className="mb-6 p-5 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <Star className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Your Unique Position</h3>
            </div>
            <p className="text-slate-700 leading-relaxed">{positioning.unique_value_prop}</p>
          </div>
        )}

        {/* Competitive Advantages */}
        {positioning.advantages?.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider">Key Advantages</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {positioning.advantages.map((adv, index) => (
                <Badge key={index} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 px-3 py-1">
                  {adv}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Competitors */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-4">Competitors</h3>
          {displayCompetitors.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 rounded-full bg-slate-100 mx-auto mb-4 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-500">No competitors tracked yet</p>
              <p className="text-xs text-slate-400 mt-2">Run "Update Company Intelligence" in Settings</p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayCompetitors.map((competitor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
                      {competitor.name?.charAt(0) || '?'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900">{competitor.name}</h4>

                      {competitor.description && (
                        <p className="text-sm text-slate-600 mt-1">{competitor.description}</p>
                      )}

                      {competitor.positioning && (
                        <div className="mt-2 flex items-start gap-2">
                          <Shield className="w-3.5 h-3.5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-slate-500">{competitor.positioning}</p>
                        </div>
                      )}

                      {competitor.recent_moves && (
                        <div className="mt-2 p-2 bg-amber-50 rounded-lg border border-amber-100">
                          <div className="flex items-start gap-2">
                            <TrendingUp className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                            <p className="text-xs text-amber-800">{competitor.recent_moves}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
