import { Navigate, Outlet } from 'react-router-dom';
import { useAuth, Role } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles: Array<'CLIENT' | 'DEVELOPER' | 'ADMIN' | 'SUPER_ADMIN'>;
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();

  // STATE 1: Auth is still being resolved (Supabase + /users/me).
  // Do NOT redirect yet – we don't know who the user is.
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 size={32} className="text-[#2563EB] animate-spin" />
          <p className="text-slate-600 font-medium text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // STATE 2: Definitively unauthenticated – no Supabase session.
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  // STATE 3: Authenticated but has no role yet (incomplete registration).
  // Only redirect to /onboarding when the route is truly role-restricted AND the
  // user has no role. Do NOT use this for role-mismatch (wrong role, right auth).
  if (!user.role) {
    return <Navigate to="/onboarding" replace />;
  }

  // STATE 4: Authenticated with a role, but not the right role for this route.
  // Redirect to their own dashboard rather than /onboarding (they are registered).
  const hasAllowedRole = allowedRoles.includes(user.role as Role);

  if (!hasAllowedRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
