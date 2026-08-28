import { Link, useNavigate } from 'react-router-dom';
import { Bell, Settings, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    : user?.email?.slice(0, 2).toUpperCase() ?? 'U';

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="border-b border-line bg-white">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg text-ink">
          PataDev <span className="text-amber-dark">Ke</span>
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link to="/projects" className="text-slate hover:text-ink">Browse Projects</Link>

          {isAuthenticated ? (
            <>
              <Link to="/messages" className="text-slate hover:text-ink">Messages</Link>
              <Link to="/dashboard" className="text-slate hover:text-ink">Dashboard</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate hover:text-ink">Log in</Link>
              <Link
                to="/register"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#1769FF] hover:bg-blue-600 transition-colors shadow-xs"
              >
                Get started
              </Link>
            </>
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
                onClick={handleLogout}
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
