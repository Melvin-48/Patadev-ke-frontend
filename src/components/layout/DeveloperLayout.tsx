import { Outlet, NavLink } from 'react-router-dom';
import { Compass, FileCheck2, MessageSquare, CreditCard, LayoutDashboard } from 'lucide-react';
import Navbar from './Navbar';

export default function DeveloperLayout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50/40 to-blue-50 text-[#07152F] font-sans antialiased">
      <Navbar />
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8 items-start">
        <aside className="hidden md:block w-56 shrink-0 bg-white/70 backdrop-blur-xl border border-slate-200/70 rounded-2xl p-4 shadow-sm space-y-1 text-sm font-semibold sticky top-24">
          <span className="block px-3 py-1.5 text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
            Developer Hub
          </span>
          <NavLink
            to="/developer/dashboard"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#1769FF] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#07152F]'
              }`
            }
          >
            <LayoutDashboard size={17} />
            <span>Overview</span>
          </NavLink>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#1769FF] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#07152F]'
              }`
            }
          >
            <Compass size={17} />
            <span>Browse Projects</span>
          </NavLink>
          <NavLink
            to="/bids"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#1769FF] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#07152F]'
              }`
            }
          >
            <FileCheck2 size={17} />
            <span>My Proposals</span>
          </NavLink>
          <NavLink
            to="/messages"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#1769FF] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#07152F]'
              }`
            }
          >
            <MessageSquare size={17} />
            <span>Messages</span>
          </NavLink>
          <NavLink
            to="/developer/payments"
            className={({ isActive }) =>
              `flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#1769FF] text-white shadow-xs font-bold'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#07152F]'
              }`
            }
          >
            <CreditCard size={17} />
            <span>Earnings</span>
          </NavLink>
        </aside>
        <main className="flex-1 w-full">{children || <Outlet />}</main>
      </div>
    </div>
  );
}