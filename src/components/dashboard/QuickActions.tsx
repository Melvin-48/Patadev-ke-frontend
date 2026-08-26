import { Link } from 'react-router-dom';
import { Plus, Users, MessageCircle } from 'lucide-react';

export default function QuickActions() {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-8">
      <Link
        to="/client/projects/new"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-xs font-bold text-[#07152F] shadow-xs hover:bg-white hover:border-primary/40 hover:text-primary transition-all"
      >
        <Plus size={15} strokeWidth={2.5} className="text-primary" />
        <span>Post a Project</span>
      </Link>

      <Link
        to="/projects"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-xs font-bold text-[#07152F] shadow-xs hover:bg-white hover:border-primary/40 hover:text-primary transition-all"
      >
        <Users size={15} strokeWidth={2} className="text-blue-500" />
        <span>Browse Developers</span>
      </Link>

      <Link
        to="/messages"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/80 backdrop-blur-md border border-slate-200/80 text-xs font-bold text-[#07152F] shadow-xs hover:bg-white hover:border-primary/40 hover:text-primary transition-all"
      >
        <MessageCircle size={15} strokeWidth={2} className="text-indigo-500" />
        <span>View Messages</span>
      </Link>
    </div>
  );
}
