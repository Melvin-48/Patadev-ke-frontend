import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className = '',
}: EmptyStateProps) {
  return (
    <div
      className={`text-center py-16 border border-dashed border-line rounded ${className}`}
    >
      {icon && (
        <div className="flex justify-center mb-4">
          {icon}
        </div>
      )}

      <p className="font-display font-semibold text-ink">
        {title}
      </p>

      {description && (
        <p className="text-slate text-sm mt-1">
          {description}
        </p>
      )}

      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}

export default EmptyState;
