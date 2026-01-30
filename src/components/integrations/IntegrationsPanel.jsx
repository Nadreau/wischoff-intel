import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Lock, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';

const integrations = [
  {
    name: 'Gmail',
    logo: 'https://cdn.worldvectorlogo.com/logos/gmail-icon.svg',
    description: 'Track email communications with founders to auto-update early stage profiles',
    features: ['Email threads', 'Response tracking', 'Auto-update profiles', 'Communication frequency'],
  },
  {
    name: 'HubSpot',
    logo: 'https://cdn.worldvectorlogo.com/logos/hubspot-1.svg',
    description: 'Import deals with touchpoint history and communication records',
    features: ['Deal sync', 'Meeting history', 'Email tracking', 'Contact notes'],
  },
  {
    name: 'Salesforce',
    logo: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',
    description: 'Import CRM data including opportunities, activities, and touchpoints',
    features: ['Opportunity sync', 'Activity timeline', 'Contact history', 'Deal stages'],
  },
];

function DemoModal({ integration, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ type: "spring", duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
      >
        {/* Top accent */}
        <div className="h-1 bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500" />
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-8 text-center">
          {/* Icon */}
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 border border-slate-200 flex items-center justify-center mb-6">
            <Monitor className="w-7 h-7 text-slate-400" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            Demo Instance
          </h3>

          {/* Body */}
          <p className="text-slate-500 leading-relaxed mb-2">
            You're viewing a demo of the portfolio intelligence platform.
          </p>
          <p className="text-slate-500 leading-relaxed mb-6">
            Live integrations — including <span className="font-medium text-slate-700">{integration.name}</span> — are available in the full platform. Reach out to the system owner to learn more.
          </p>

          {/* Feature preview */}
          <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
            <div className="flex items-center gap-2 mb-3">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                Full platform features
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {integration.features.map((feature, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-md bg-white text-slate-500 text-xs border border-slate-200"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={onClose}
            variant="outline"
            className="w-full"
          >
            Got it
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function IntegrationsPanel() {
  const [selectedIntegration, setSelectedIntegration] = useState(null);

  return (
    <>
      <div className="space-y-4">
        {integrations.map((integration, index) => (
          <motion.div
            key={integration.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-slate-100 p-6 hover:border-slate-200 hover:shadow-md transition-all"
          >
            <div className="flex items-start gap-4">
              <img 
                src={integration.logo} 
                alt={integration.name} 
                className="w-12 h-12 object-contain"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-slate-900">{integration.name}</h3>
                  <Button 
                    size="sm" 
                    className="gap-2"
                    onClick={() => setSelectedIntegration(integration)}
                  >
                    Connect
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-slate-600 mb-4">{integration.description}</p>
                <div className="flex flex-wrap gap-2">
                  {integration.features.map((feature, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-xs"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIntegration && (
          <DemoModal
            integration={selectedIntegration}
            onClose={() => setSelectedIntegration(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
