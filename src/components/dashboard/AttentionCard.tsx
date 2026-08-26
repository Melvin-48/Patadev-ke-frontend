import { Link } from 'react-router-dom';
import { AlertCircle, ChevronRight } from 'lucide-react';
import { AttentionItemData } from '../../features/projects/types/project.types';

interface AttentionCardProps {
  items: AttentionItemData[];
}

export default function AttentionCard({ items }: AttentionCardProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="bg-amber-50/70 backdrop-blur-xl border border-amber-200/80 rounded-2xl p-5 shadow-xs mb-6">
      <div className="flex items-center gap-2 text-amber-800 font-extrabold text-sm mb-3">
        <AlertCircle size={17} className="text-amber-600 shrink-0" />
        <span>Needs Your Attention</span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white/90 backdrop-blur-md rounded-xl p-3.5 border border-amber-200/60 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div>
              <h4 className="text-xs font-bold text-[#07152F]">
                {item.title}
              </h4>
              <p className="text-[11px] text-slate-500 font-medium mt-0.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            <Link
              to={item.actionUrl}
              className="inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] transition-colors shrink-0 self-start sm:self-auto"
            >
              <span>{item.actionText}</span>
              <ChevronRight size={13} strokeWidth={2.5} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
