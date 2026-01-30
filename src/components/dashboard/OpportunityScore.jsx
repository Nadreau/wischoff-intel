import React from 'react';
import { cn } from '@/lib/utils';

export default function OpportunityScore({ score, showLabel = true, size = 'default' }) {
  const getScoreColor = (score) => {
    if (score >= 7.5) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 6) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-rose-600 bg-rose-50 border-rose-200';
  };

  const getProgressColor = (score) => {
    if (score >= 7.5) return 'bg-emerald-500';
    if (score >= 6) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className={cn('flex items-center gap-3', size === 'large' && 'flex-col items-start gap-2')}>
      <div className={cn(
        'flex items-center justify-center rounded-lg border font-semibold',
        getScoreColor(score),
        size === 'large' ? 'w-16 h-16 text-2xl' : 'w-10 h-10 text-sm'
      )}>
        {score?.toFixed(1)}
      </div>
      {showLabel && size === 'large' && (
        <div className="w-full">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-500">Opportunity Score</span>
            <span className="text-slate-700 font-medium">{score}/10</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className={cn('h-full rounded-full transition-all duration-500', getProgressColor(score))}
              style={{ width: `${(score / 10) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}