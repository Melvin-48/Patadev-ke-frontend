interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

// Empty states are an invitation to act, not just an absence notice -
// per the project's writing convention, always paired with what to do next.
export default function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16 border border-dashed border-line rounded">
      <p className="font-display font-semibold text-ink">{title}</p>
      {description && <p className="text-slate text-sm mt-1">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
