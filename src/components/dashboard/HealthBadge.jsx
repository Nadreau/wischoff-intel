import React from 'react';
import { cn } from '@/lib/utils';

export default function HealthBadge({ health, size = 'default' }) {
  const getHealthConfig = (health) => {
    const lower = health?.toLowerCase() || '';
    if (lower.includes('healthy') || lower.includes('strong')) {
      return {
        label: 'Healthy',
        color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
        dot: 'bg-emerald-500'
      };
    } else if (lower.includes('cautious') || lower.includes('moderate') || lower.includes('concerning')) {
      return {
        label: 'Caution',
        color: 'bg-amber-50 text-amber-700 border-amber-200',
        dot: 'bg-amber-500'
      };
    } else {
      return {
        label: 'At Risk',
        color: 'bg-rose-50 text-rose-700 border-rose-200',
        dot: 'bg-rose-500'
      };
    }
  };

  const config = getHealthConfig(health);

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 rounded-full border font-medium',
      config.color,
      size === 'small' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
    )}>
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
      {config.label}
    </span>
  );
}