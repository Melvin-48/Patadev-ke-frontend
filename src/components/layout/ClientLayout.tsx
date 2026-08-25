import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex gap-8">
        <aside className="hidden md:block w-48 shrink-0 space-y-1 text-sm">
          <Link to="/client/dashboard" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">My Projects</Link>
          <Link to="/client/projects/new" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Post a Project</Link>
          <Link to="/messages" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Messages</Link>
          <Link to="/client/payments" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Payments</Link>
        </aside>
        <main className="flex-1"><Outlet /></main>
      </div>
    </div>
  );
}