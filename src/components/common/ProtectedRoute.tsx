import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, Role } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  allowedRoles: Array<'CLIENT' | 'DEVELOPER' | 'ADMIN'>;
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
  if (!user.role || !allowedRoles.includes(user.role as Role)) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
}
