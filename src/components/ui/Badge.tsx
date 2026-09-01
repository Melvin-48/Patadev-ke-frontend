import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  tone?: 'neutral' | 'success' | 'danger' | 'amber';
}

// Used for project/bid/milestone status - keeps status colour meaning
// consistent everywhere it appears instead of each page picking its own.
export function Badge({ children, tone = 'neutral' }: BadgeProps) {
  const tones = {
    neutral: 'bg-line text-slate',
    success: 'bg-success/10 text-success',
    danger: 'bg-danger/10 text-danger',
    amber: 'bg-amber/15 text-amber-dark',
  };

  return (
    <span className={cn('px-2 py-0.5 rounded text-xs font-medium', tones[tone])}>
      {children}
    </span>
  );
}

export default Badge;
