import { Link } from 'react-router-dom';
import { Clock3, FileText, ArrowRight } from 'lucide-react';
import { Project, ProjectStatus } from '../../features/projects/types/project.types';
import { cn } from '../../lib/utils';

interface ProjectCardProps {
  project: Project;
}

function StatusBadge({ status }: { status: ProjectStatus }) {
  const styles: Record<ProjectStatus, string> = {
    'In Progress': 'bg-blue-50 text-blue-700 border-blue-200/80',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200/80',
    Submitted: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    Approved: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    Completed: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    'Action Required': 'bg-red-50 text-red-700 border-red-200/80',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0',
        styles[status] || styles.Pending,
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formattedBudget = `${project.currency} ${project.budget.toLocaleString()}`;

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-slate-200/70 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between gap-5">
      
      {/* Top Header */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            {project.category}
          </span>
          <StatusBadge status={project.status} />
        </div>

        <h3 className="text-lg font-extrabold text-[#07152F] tracking-tight leading-snug group-hover:text-primary transition-colors">
          {project.title}
        </h3>

        <p className="text-xs text-slate-500 font-medium mt-1.5 line-clamp-2 leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Details Row: Budget, Timeline, Proposals */}
      <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 text-xs">
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Budget</span>
          <span className="font-extrabold text-[#07152F]">{formattedBudget}</span>
        </div>

        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Timeline</span>
          <span className="font-semibold text-slate-700 inline-flex items-center gap-1">
            <Clock3 size={12} className="text-slate-400" />
            {project.timeline}
          </span>
        </div>

        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase">Proposals</span>
          <span className="font-semibold text-slate-700 inline-flex items-center gap-1">
            <FileText size={12} className="text-slate-400" />
            {project.proposalCount}
          </span>
        </div>
      </div>

      {/* Progress Bar & Current Milestone */}
      {project.currentMilestone && (
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-medium text-slate-500 truncate max-w-[70%]">
              {project.currentMilestone}
            </span>
            <span className="font-extrabold text-primary text-xs">
              {project.progressPercentage}%
            </span>
          </div>

          <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${project.progressPercentage}%` }}
            />
          </div>
        </div>
      )}

      {/* Bottom Footer Action */}
      <div className="pt-1 flex items-center justify-between">
        <span className="text-[11px] font-medium text-slate-400">
          Posted {project.createdAt}
        </span>

        <Link
          to={`/client/projects`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:text-blue-700 transition-colors"
        >
          <span>View Project</span>
          <ArrowRight size={14} strokeWidth={2.5} />
        </Link>
      </div>

    </div>
  );
}
