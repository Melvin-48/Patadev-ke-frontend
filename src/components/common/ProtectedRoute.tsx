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

  return <Outlet />;
}
