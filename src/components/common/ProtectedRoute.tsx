import { Outlet } from 'react-router-dom';

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