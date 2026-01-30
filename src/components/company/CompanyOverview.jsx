import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Calendar, Building2, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

export default function CompanyOverview({ company }) {
  const fundingHistory = company.funding?.history || [];

  // Handle both old format (total, last_round.amount) and new format (total_raised, latest_round)
  const totalFunding = company.funding?.total_raised || company.funding?.total || 'Not disclosed';
  const lastRound = company.funding?.latest_round || company.funding?.last_round?.amount || 'N/A';
  const valuation = company.funding?.valuation || 'Not disclosed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden"
    >
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
              <DollarSign className="w-4 h-4" />
              <span>Total Funding</span>
            </div>
            <p className="text-xl font-semibold text-slate-900">
              {totalFunding}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
              <Calendar className="w-4 h-4" />
              <span>Last Round</span>
            </div>
            <p className="text-xl font-semibold text-slate-900">
              {lastRound}
            </p>
          </div>
          <div className="p-5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-500 text-sm mb-2">
              <Building2 className="w-4 h-4" />
              <span>Valuation</span>
            </div>
            <p className="text-xl font-semibold text-slate-900">
              {valuation}
            </p>
          </div>
        </div>
        
        {fundingHistory.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Funding Timeline</h3>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-200" />
              {fundingHistory.map((round, index) => (
                <div key={index} className="relative flex items-start gap-4 pb-6 last:pb-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-blue-500 flex items-center justify-center z-10">
                    <TrendingUp className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-slate-900">{round.round}</span>
                      {round.amount && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-sm font-medium">
                          {round.amount}
                        </span>
                      )}
                    </div>
                    {round.date && (
                      <p className="text-sm text-slate-500 mt-1">
                        {format(new Date(round.date), 'MMMM yyyy')}
                      </p>
                    )}
                    {round.investors?.length > 0 && (
                      <p className="text-sm text-slate-600 mt-1">
                        Led by {round.investors.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}