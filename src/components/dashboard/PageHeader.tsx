import { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}

// Standard dashboard page heading - eyebrow / title / description on the
// left, optional action button on the right. Mirrors the mock dashboard's
// .page-header pattern exactly.
export default function PageHeader({ eyebrow, title, description, action }: PageHeaderProps) {
  return (
    <div className="page-header">
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}