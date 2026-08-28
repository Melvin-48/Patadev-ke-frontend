import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

/**
 * PublicLayout wraps all public routes.
 * On landing page ("/") and auth/onboarding pages, the standard top Navbar is hidden.
 */
export default function PublicLayout() {
  const { pathname } = useLocation();
  const HIDE_NAVBAR_ROUTES = [
    '/',
    '/login',
    '/register',
    '/signup',
    '/forgot-password',
    '/onboarding',
    '/onboarding/client',
    '/onboarding/developer',
  ];
  const hideNavbar = HIDE_NAVBAR_ROUTES.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbar && <Navbar />}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
