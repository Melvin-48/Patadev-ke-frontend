import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * PublicLayout wraps all public routes.
 * On the landing page ("/") the Navbar is intentionally hidden because
 * LandingPage renders its own <LandingNavbar />.
 * All other public routes still get the standard <Navbar />.
 */
export default function PublicLayout() {
  const { pathname } = useLocation();
  const isLanding = pathname === '/';

  return (
    <div className="min-h-screen flex flex-col">
      {!isLanding && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}