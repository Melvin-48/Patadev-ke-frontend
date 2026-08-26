import { ReactNode } from 'react';
import { FileText, CheckCircle2, DollarSign, MessageCircle, FolderPlus } from 'lucide-react';
import { ActivityItemData } from '../../features/projects/types/project.types';

interface ActivityItemProps {
  activity: ActivityItemData;
}

export default function ActivityItem({ activity }: ActivityItemProps) {
  const getIcon = (type: ActivityItemData['type']): ReactNode => {
    switch (type) {
      case 'proposal':
        return <FileText size={15} className="text-blue-600" />;
      case 'milestone':
        return <CheckCircle2 size={15} className="text-emerald-600" />;
      case 'payment':
        return <DollarSign size={15} className="text-amber-600" />;
      case 'message':
        return <MessageCircle size={15} className="text-indigo-600" />;
      case 'project':
        return <FolderPlus size={15} className="text-primary" />;
      default:
        return <FileText size={15} className="text-slate-500" />;
    }
  };

  return (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
        {getIcon(activity.type)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-xs font-bold text-[#07152F] truncate">
            {activity.title}
          </h4>
          <span className="text-[10px] font-medium text-slate-400 shrink-0">
            {activity.timestamp}
          </span>
        </div>

        <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-2 leading-relaxed">
          {activity.description}
        </p>
      </div>
    </div>
  );
}
