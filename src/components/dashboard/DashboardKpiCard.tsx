import { ReactNode } from 'react';
import { Briefcase, FolderKanban, FileText, CreditCard } from 'lucide-react';
import { ClientDashboardMetrics } from '../../features/projects/types/project.types';

interface DashboardKpiCardProps {
  metrics: ClientDashboardMetrics;
  isLoading?: boolean;
}

interface KpiItemProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  subtext?: string;
}

function KpiItem({ icon, label, value, subtext }: KpiItemProps) {
  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-sm rounded-2xl p-5 transition-all duration-200 hover:shadow-md hover:border-slate-300/80">
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          {label}
        </span>
        <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
          {icon}
        </span>
      </div>

      <div className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
        {value}
      </div>

      {subtext && (
        <div className="text-[11px] font-medium text-slate-400 mt-1">
          {subtext}
        </div>
      )}
    </div>
  );
}

export default function DashboardKpiCard({ metrics, isLoading }: DashboardKpiCardProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white/60 backdrop-blur-md rounded-2xl p-5 h-28 animate-pulse border border-slate-200/50" />
        ))}
      </div>
    );
  }

  const formattedSpent = `${metrics.currency} ${metrics.totalSpent.toLocaleString()}`;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <KpiItem
        icon={<Briefcase size={18} strokeWidth={2.2} />}
        label="Active Projects"
        value={metrics.activeProjects}
        subtext="In progress"
      />

      <KpiItem
        icon={<FolderKanban size={18} strokeWidth={2.2} />}
        label="Total Projects"
        value={metrics.totalProjects}
        subtext="Lifetime posted"
      />

      <KpiItem
        icon={<FileText size={18} strokeWidth={2.2} />}
        label="Proposals Received"
        value={metrics.proposalsReceived}
        subtext="Across all projects"
      />

      <KpiItem
        icon={<CreditCard size={18} strokeWidth={2.2} />}
        label="Total Spent"
        value={formattedSpent}
        subtext="Secured in escrow"
      />
    </div>
  );
}
