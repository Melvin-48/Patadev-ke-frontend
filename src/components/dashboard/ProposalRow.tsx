import { Link } from 'react-router-dom';
import { Proposal } from '../../features/projects/types/project.types';

interface ProposalRowProps {
  proposal: Proposal;
}

export default function ProposalRow({ proposal }: ProposalRowProps) {
  const formattedAmount = `${proposal.currency} ${proposal.proposedAmount.toLocaleString()}`;

  // Extract initials from developer name
  const initials = proposal.developerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/70 backdrop-blur-md border border-slate-200/60 shadow-2xs hover:bg-white hover:border-slate-300 transition-all duration-150">
      
      {/* Developer & Project Info */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/20">
          {initials}
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-[#07152F]">
              {proposal.developerName}
            </h4>
            <span className="text-[10px] font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
              {proposal.developerRole}
            </span>
          </div>

          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Proposal for <span className="font-semibold text-[#07152F]">{proposal.projectTitle}</span>
          </p>
        </div>
      </div>

      {/* Proposed Amount & Review CTA */}
      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
        <div className="text-left sm:text-right">
          <div className="text-xs font-extrabold text-[#07152F]">
            {formattedAmount}
          </div>
          <div className="text-[11px] font-medium text-slate-400">
            {proposal.expectedTimeline} • {proposal.submittedAt}
          </div>
        </div>

        <Link
          to="/client/dashboard"
          className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-primary bg-primary/10 hover:bg-primary hover:text-white transition-all duration-150 shrink-0"
        >
          Review
        </Link>
      </div>

    </div>
  );
}
