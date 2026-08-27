import { ReactNode } from 'react';

interface ActivityProps {
  icon: ReactNode;
  title: string;
  detail: string;
  time: string;
  color: 'blue' | 'green' | 'coral';
}

// Single row inside the "Recent updates" activity panel on the overview.
export default function Activity({ icon, title, detail, time, color }: ActivityProps) {
  return (
    <div className="activity">
      <div className={`activity-icon ${color}`}>{icon}</div>
      <div>
        <strong>{title}</strong>
        <span>{detail}</span>
      </div>
      <time>{time}</time>
    </div>
  );
}