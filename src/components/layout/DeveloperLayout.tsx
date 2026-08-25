import { Outlet, Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function DeveloperLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="max-w-6xl mx-auto w-full px-6 py-8 flex gap-8">
        <aside className="hidden md:block w-48 shrink-0 space-y-1 text-sm">
          <Link to="/developer/dashboard" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">My Bids</Link>
          <Link to="/projects" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Browse Projects</Link>
          <Link to="/messages" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Messages</Link>
          <Link to="/developer/payments" className="block px-3 py-2 rounded hover:bg-line/40 text-ink">Earnings</Link>
        </aside>
        <main className="flex-1"><Outlet /></main>
      </div>
    </div>
  );
}