import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, AlertCircle, Link as LinkIcon, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function FinancialMetrics({ company }) {
  const hasFinancials = company.financials && Object.keys(company.financials).length > 0;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
    >
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-100">
            <DollarSign className="w-5 h-5 text-amber-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-900">Financial Metrics</h2>
        </div>
      </div>
      
      <div className="p-6">
        {!hasFinancials ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 mx-auto mb-4 flex items-center justify-center">
              <LinkIcon className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Connect Financial Data</h3>
            <p className="text-slate-500 mb-6 max-w-sm mx-auto">
              Link QuickBooks, Stripe, or other financial systems to view revenue, burn rate, and unit economics.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button variant="outline" className="gap-2">
                <img src="https://cdn.worldvectorlogo.com/logos/quickbooks-1.svg" className="w-5 h-5" alt="QuickBooks" />
                Connect QuickBooks
              </Button>
              <Button variant="outline" className="gap-2">
                <img src="https://cdn.worldvectorlogo.com/logos/stripe-4.svg" className="w-5 h-5" alt="Stripe" />
                Connect Stripe
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {company.financials.mrr && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">MRR</p>
                <p className="text-xl font-semibold text-slate-900">${company.financials.mrr.toLocaleString()}</p>
              </div>
            )}
            {company.financials.arr && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">ARR</p>
                <p className="text-xl font-semibold text-slate-900">${company.financials.arr.toLocaleString()}</p>
              </div>
            )}
            {company.financials.burn_rate && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Monthly Burn</p>
                <p className="text-xl font-semibold text-slate-900">${company.financials.burn_rate.toLocaleString()}</p>
              </div>
            )}
            {company.financials.runway && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
                <p className="text-xs text-slate-500 mb-1">Runway</p>
                <p className="text-xl font-semibold text-slate-900">{company.financials.runway} mo</p>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}