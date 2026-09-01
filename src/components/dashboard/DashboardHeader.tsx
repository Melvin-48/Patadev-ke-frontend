import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardHeader() {
  const { user } = useAuth();

  // Extract first name cleanly or fallback to 'Client'
  const displayName = user?.name
    ? user.name.split(' ')[0]
    : user?.email
    ? user.email.split('@')[0]
    : 'Client';

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#07152F] tracking-tight">
          Good morning, {displayName}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
          Here&apos;s what&apos;s happening with your projects.
        </p>
      </div>

      <Link
        to="/client/projects/new"
        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white text-xs sm:text-sm shadow-md shadow-primary/25 bg-[#1769FF] hover:bg-blue-600 active:scale-[0.99] transition-all self-start sm:self-auto shrink-0"
      >
        <Plus size={16} strokeWidth={2.5} />
        <span>Post a Project</span>
      </Link>
    </div>
  );
}
