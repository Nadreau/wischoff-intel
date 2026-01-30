import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Monitor, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DemoModal({ open, onClose, featureName, features }) {
  if (!open) return null;
  
  return (
    <AnimatePresence>
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
              Live integrations — including <span className="font-medium text-slate-700">{featureName}</span> — are available in the full platform. Reach out to the system owner to learn more.
            </p>

            {/* Feature preview */}
            {features && features.length > 0 && (
              <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                <div className="flex items-center gap-2 mb-3">
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                    Full platform features
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-white text-slate-500 text-xs border border-slate-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}

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
    </AnimatePresence>
  );
}
