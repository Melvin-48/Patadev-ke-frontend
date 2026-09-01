import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string;
  trend: string;
  icon: ReactNode;
  tone: 'blue' | 'green' | 'gold' | 'coral';
}

export default function MetricCard({ label, value, trend, icon, tone }: MetricCardProps) {
  return (
    <div className="metric-card">
      <div className={`metric-icon ${tone}`}>{icon}</div>
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
      <span className="metric-trend">{trend}</span>
    </div>
  );
}