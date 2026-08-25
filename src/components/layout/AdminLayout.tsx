import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function AdminLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex gap-8">
        <aside className="hidden md:block w-52 shrink-0 space-y-1 text-sm">
          <Link to="/admin/dashboard" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Dashboard</Link>
          <Link to="/admin/users" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Users</Link>
          <Link to="/admin/projects" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Projects</Link>
          <Link to="/admin/disputes" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Disputes</Link>
          <Link to="/admin/payouts" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Payouts</Link>
        </aside>
        <main className="flex-1"><Outlet /></main>
      </div>
    </div>
  );
}