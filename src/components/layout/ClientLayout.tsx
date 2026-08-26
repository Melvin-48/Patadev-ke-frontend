import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

export default function ClientLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-white via-blue-50/40 to-blue-50 text-[#07152F] font-sans antialiased">
      <Navbar />
      <main className="w-full flex-1">
        <Outlet />
      </main>
    </div>
  );
}