import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft, Link as LinkIcon, Sparkles } from 'lucide-react';
import IntegrationsPanel from '@/components/integrations/IntegrationsPanel';

export default function Integrations() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Link 
            to={createPageUrl('Dashboard')} 
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 border border-blue-200">
              <LinkIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Integrations</h1>
              <p className="text-slate-500">Connect your tools to unlock deeper portfolio insights</p>
            </div>
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 mb-8 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-white/20">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Unlock AI-Powered Insights</h2>
              <p className="text-white/90 leading-relaxed">
                Connect your CRM and financial tools to combine internal data with our market intelligence. 
                Our AI will generate insights that neither system could provide alone—identifying patterns 
                across touchpoints, financials, and market movements.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Integrations List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <IntegrationsPanel />
        </motion.div>
      </div>
    </div>
  );
}