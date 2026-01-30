import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Target, TrendingUp, Rocket, Zap, Users, Clock, CheckCircle2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function StrategicOpportunities({ company }) {
  // Parse opportunities from JSON strings (Base44 stores as string array)
  const rawOpportunities = company.strategic_opportunities || [];
  const opportunities = rawOpportunities.map(item => {
    if (typeof item === 'string') {
      try {
        return JSON.parse(item);
      } catch (e) {
        return { title: item, description: '', category: 'market', potential_impact: 'medium' };
      }
    }
    return item;
  }).filter(Boolean);

  const getImpactColor = (impact) => {
    const impactLower = impact?.toLowerCase();
    if (impactLower === 'high') return 'bg-violet-100 text-violet-700 border-violet-200';
    if (impactLower === 'medium') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const getTimeframeColor = (timeframe) => {
    const tfLower = timeframe?.toLowerCase();
    if (tfLower === 'immediate') return 'bg-emerald-100 text-emerald-700';
    if (tfLower === 'short_term') return 'bg-amber-100 text-amber-700';
    return 'bg-slate-100 text-slate-600';
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'expansion': return TrendingUp;
      case 'product': return Rocket;
      case 'partnership': return Users;
      case 'competitive': return Target;
      default: return Sparkles;
    }
  };

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'expansion': return 'text-emerald-600 bg-emerald-50';
      case 'product': return 'text-violet-600 bg-violet-50';
      case 'partnership': return 'text-amber-600 bg-amber-50';
      case 'competitive': return 'text-blue-600 bg-blue-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  if (!opportunities || opportunities.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-slate-50 to-white rounded-2xl border border-slate-200">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500/10 to-purple-600/10 mx-auto mb-4 flex items-center justify-center border border-violet-200">
          <Sparkles className="w-8 h-8 text-violet-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Opportunities Data</h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Run the "Update Company Intelligence" function to generate strategic opportunities analysis.
        </p>
      </div>
    );
  }

  // Group by category
  const grouped = opportunities.reduce((acc, opp) => {
    const cat = opp.category || 'market';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(opp);
    return acc;
  }, {});

  const categoryOrder = ['expansion', 'product', 'partnership', 'competitive', 'market'];
  const categoryLabels = {
    expansion: 'Market Expansion',
    product: 'Product Innovation',
    partnership: 'Strategic Partnerships',
    competitive: 'Competitive Positioning',
    market: 'Market Opportunities'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Strategic Opportunities</h2>
            <p className="text-sm text-slate-500">{opportunities.length} opportunities identified</p>
          </div>
        </div>
      </div>

      {categoryOrder.map(cat => {
        const catOpps = grouped[cat];
        if (!catOpps || catOpps.length === 0) return null;

        const Icon = getCategoryIcon(cat);
        const iconColor = getCategoryColor(cat);

        return (
          <div key={cat}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-1.5 rounded-lg ${iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
              <h4 className="font-semibold text-slate-900">{categoryLabels[cat]}</h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {catOpps.map((opp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 flex-1">{opp.title}</h4>
                    <div className="flex gap-1.5 ml-2">
                      <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${getImpactColor(opp.potential_impact)}`}>
                        {opp.potential_impact}
                      </Badge>
                      {opp.timeframe && (
                        <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${getTimeframeColor(opp.timeframe)}`}>
                          <Clock className="w-3 h-3 mr-1" />
                          {opp.timeframe?.replace('_', ' ')}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{opp.description}</p>

                  {opp.action_items && opp.action_items.length > 0 && (
                    <div className="bg-slate-50 rounded-lg p-3">
                      <p className="text-xs font-medium text-slate-500 mb-2">Action Items:</p>
                      <div className="space-y-1.5">
                        {opp.action_items.map((item, j) => (
                          <div key={j} className="flex items-start gap-2 text-xs text-slate-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        );
      })}
    </motion.div>
  );
}
