import { Outlet, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, DollarSign, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';

export default function AdminLayout() {
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Accounts', path: '/admin/accounts', icon: Users },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Disputes', path: '/admin/disputes', icon: AlertCircle },
  ];

  return (
    <div className="min-h-screen bg-slate/5 flex flex-col">
      <Navbar />
      <div className="container mx-auto w-full px-4 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-56 shrink-0 space-y-2">
          <div className="bg-white rounded-lg border border-line p-4">
            <h2 className="text-xs font-semibold text-slate uppercase tracking-wider mb-4 px-2">Admin Panel</h2>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname.startsWith(item.path);
                const Icon = item.icon;
                
                return (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-700 font-medium' 
                        : 'text-slate hover:bg-slate/5 hover:text-ink'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-primary-600' : 'text-slate'}`} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
