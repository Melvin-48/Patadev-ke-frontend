import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { cn } from '../../lib/utils';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const getDashboardPath = () => {
    if (user?.role === 'CLIENT') return '/client/dashboard';
    if (user?.role === 'DEVELOPER') return '/developer/dashboard';
    if (user?.role === 'ADMIN') return '/admin/dashboard';
    return '/client/dashboard';
  };

  const isActive = (path: string) => {
    return location.pathname === path || (path !== '/' && location.pathname.startsWith(path));
  };

  // Get user initials
  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : user?.email
    ? user.email.substring(0, 2).toUpperCase()
    : 'U';

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-xs select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 group transition-transform hover:scale-105 shrink-0"
          aria-label="PataDev Ke Home"
        >
          <span className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200 shadow-2xs">
            <Code2 size={18} strokeWidth={2.5} />
          </span>
          <span className="font-extrabold text-lg text-[#07152F] tracking-tight">
            PataDev <span className="text-primary">Ke</span>
          </span>
        </Link>

        {/* Center / Nav Items */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-semibold">
          {isAuthenticated && (
            <Link
              to={getDashboardPath()}
              className={cn(
                'px-3.5 py-1.5 rounded-xl transition-all duration-150',
                isActive('/client/dashboard') || isActive('/developer/dashboard') || isActive('/admin/dashboard')
                  ? 'bg-primary/10 text-primary font-extrabold'
                  : 'text-slate-600 hover:text-[#07152F] hover:bg-slate-100/60',
              )}
            >
              Dashboard
            </Link>
          )}

          <Link
            to="/projects"
            className={cn(
              'px-3.5 py-1.5 rounded-xl transition-all duration-150',
              isActive('/projects') && !isActive('/client/projects/new')
                ? 'bg-primary/10 text-primary font-extrabold'
                : 'text-slate-600 hover:text-[#07152F] hover:bg-slate-100/60',
            )}
          >
            Projects
          </Link>

          <Link
            to="/projects"
            className={cn(
              'px-3.5 py-1.5 rounded-xl transition-all duration-150',
              isActive('/developers')
                ? 'bg-primary/10 text-primary font-extrabold'
                : 'text-slate-600 hover:text-[#07152F] hover:bg-slate-100/60',
            )}
          >
            Browse Developers
          </Link>

          {isAuthenticated && (
            <Link
              to="/messages"
              className={cn(
                'px-3.5 py-1.5 rounded-xl transition-all duration-150',
                isActive('/messages')
                  ? 'bg-primary/10 text-primary font-extrabold'
                  : 'text-slate-600 hover:text-[#07152F] hover:bg-slate-100/60',
              )}
            >
              Messages
            </Link>
          )}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {isAuthenticated ? (
            <>
              {/* Notifications Icon with Badge */}
              <button
                type="button"
                className="relative p-2 rounded-xl text-slate-500 hover:text-[#07152F] hover:bg-slate-100/80 transition-colors"
                aria-label="Notifications"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white" />
              </button>

              {/* Settings Icon */}
              <button
                type="button"
                className="p-2 rounded-xl text-slate-500 hover:text-[#07152F] hover:bg-slate-100/80 transition-colors hidden sm:block"
                aria-label="Settings"
              >
                <Settings size={18} />
              </button>

              {/* User Avatar Initials */}
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-xs">
                {initials}
              </div>

              {/* Logout Button */}
              <button
                type="button"
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors ml-1"
                aria-label="Log out"
                title="Log out"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#07152F] hover:bg-slate-100 transition-colors"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1769FF] hover:bg-blue-600 transition-colors shadow-xs"
              >
                Get started
              </Link>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}