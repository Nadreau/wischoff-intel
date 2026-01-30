import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Shield, Users, Scale, Cpu, Target, TrendingDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function Threats({ company }) {
  // Parse threats from JSON strings (Base44 stores as string array)
  const rawThreats = company.threats || [];
  const threats = rawThreats.map(item => {
    if (typeof item === 'string') {
      try {
        return JSON.parse(item);
      } catch (e) {
        return { title: item, description: '', category: 'market', severity: 'medium' };
      }
    }
    return item;
  }).filter(Boolean);

  const getSeverityColor = (severity) => {
    const sev = severity?.toLowerCase();
    if (sev === 'critical') return 'bg-red-100 text-red-700 border-red-200';
    if (sev === 'high') return 'bg-orange-100 text-orange-700 border-orange-200';
    if (sev === 'medium') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-slate-100 text-slate-600 border-slate-200';
  };

  const getLikelihoodColor = (likelihood) => {
    const lh = likelihood?.toLowerCase();
    if (lh === 'high') return 'bg-red-50 text-red-600';
    if (lh === 'medium') return 'bg-amber-50 text-amber-600';
    return 'bg-slate-50 text-slate-500';
  };

  const getCategoryIcon = (category) => {
    switch(category?.toLowerCase()) {
      case 'competitive': return Users;
      case 'regulatory': return Scale;
      case 'market': return TrendingDown;
      case 'technology': return Cpu;
      case 'execution': return Target;
      default: return AlertTriangle;
    }
  };

  const getCategoryColor = (category) => {
    switch(category?.toLowerCase()) {
      case 'competitive': return 'text-orange-600 bg-orange-50';
      case 'regulatory': return 'text-purple-600 bg-purple-50';
      case 'market': return 'text-red-600 bg-red-50';
      case 'technology': return 'text-blue-600 bg-blue-50';
      case 'execution': return 'text-amber-600 bg-amber-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  if (!threats || threats.length === 0) {
    return (
      <div className="text-center py-12 bg-gradient-to-br from-red-50 to-white rounded-2xl border border-red-200">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500/10 to-red-600/10 mx-auto mb-4 flex items-center justify-center border border-red-200">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Threats Data</h3>
        <p className="text-slate-600 max-w-md mx-auto">
          Run the "Update Company Intelligence" function to generate threat analysis.
        </p>
      </div>
    );
  }

  // Group by category
  const grouped = threats.reduce((acc, threat) => {
    const cat = threat.category || 'market';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(threat);
    return acc;
  }, {});

  const categoryOrder = ['competitive', 'market', 'regulatory', 'technology', 'execution'];
  const categoryLabels = {
    competitive: 'Competitive Threats',
    regulatory: 'Regulatory Risks',
    market: 'Market Risks',
    technology: 'Technology Threats',
    execution: 'Execution Risks'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-red-500 to-red-600">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Threat Analysis</h2>
            <p className="text-sm text-slate-500">{threats.length} threats identified</p>
          </div>
        </div>
      </div>

      {categoryOrder.map(cat => {
        const catThreats = grouped[cat];
        if (!catThreats || catThreats.length === 0) return null;

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

            <div className="space-y-4">
              {catThreats.map((threat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-900 flex-1">{threat.title}</h4>
                    <div className="flex gap-1.5 ml-2">
                      <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </Badge>
                      {threat.likelihood && (
                        <Badge variant="outline" className={`text-[10px] px-2 py-0.5 ${getLikelihoodColor(threat.likelihood)}`}>
                          {threat.likelihood} likelihood
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{threat.description}</p>

                  {threat.mitigation && (
                    <div className="bg-emerald-50 rounded-lg p-3 border border-emerald-100">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-emerald-800 mb-1">Mitigation Strategy</p>
                          <p className="text-xs text-emerald-700">{threat.mitigation}</p>
                        </div>
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
