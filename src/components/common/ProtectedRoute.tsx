import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: Array<'CLIENT' | 'DEVELOPER' | 'ADMIN'>;
}

// Route-level role guard - mirrors the backend's RolesGuard. Redirects to
// /login if not authenticated at all, or back to / if authenticated but
// the wrong role for this section (e.g. a developer hitting /admin/*).
export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user!.role)) return <Navigate to="/" replace />;

/**
 * ProtectedRoute Component
 * Bypassed during design & development phase so all dashboard routes
 * (/dashboard, /client/dashboard, /developer/dashboard, /admin/dashboard)
 * can be accessed directly without logging in.
 */
export default function ProtectedRoute({ allowedRoles: _allowedRoles }: { allowedRoles: Array<'CLIENT' | 'DEVELOPER' | 'ADMIN'> }) {
  // Directly render child routes for design preview
  return <Outlet />;
}
