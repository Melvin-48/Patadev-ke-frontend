import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { useAuth } from '../contexts/AuthContext';
import { Loader2 } from 'lucide-react';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import ClientLayout from '../components/layout/ClientLayout';
import DeveloperLayout from '../components/layout/DeveloperLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Public & Marketing Pages
import LandingPage from '../features/projects/pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import TermsPage from '../features/projects/pages/TermsPage';
import PrivacyPage from '../features/projects/pages/PrivacyPage';
import AuthCallbackPage from '../features/auth/pages/AuthCallbackPage';

// Onboarding Pages
import RoleSelectionPage from '../features/users/pages/RoleSelectionPage';
import ClientOnboardingPage from '../features/users/pages/ClientOnboardingPage';
import DeveloperOnboardingPage from '../features/users/pages/DeveloperOnboardingPage';

// Client Workspace Pages
import ClientDashboard from '../features/projects/pages/ClientDashboard';
import MyProjectsPage from '../features/projects/pages/MyProjectsPage';
import PostProjectPage from '../features/projects/pages/PostProjectPage';
import ProjectBidsPage from '../features/projects/pages/ProjectBidsPage';

// Developer Workspace Pages
import DevDashboard from '../features/bids/pages/DevDashboard';
import BrowseProjectsPage from '../features/projects/pages/BrowseProjectsPage';
import MyBidsPage from '../features/bids/pages/MyBidsPage';

// Shared & Engagement Pages
import EngagementDetailPage from '../features/engagements/pages/EngagementDetailPage';
import SettingsPage from '../features/users/pages/SettingsPage';
import NotificationsPage from '../features/notifications/pages/NotificationsPage';

// Admin Pages
import AdminDashboard from '../features/admin/pages/AdminDashboard';
import AdminAccountsPage from '../features/admin/pages/AdminAccountsPage';
import AdminProjectsPage from '../features/admin/pages/AdminProjectsPage';
import AdminPayouts from '../features/admin/pages/AdminPayouts';
import DisputesPage from '../features/admin/pages/DisputesPage';

/**
 * Full-screen loading screen while auth state is being resolved.
 */
function AuthLoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={32} className="text-[#2563EB] animate-spin" />
        <p className="text-slate-600 font-medium text-sm">Loading...</p>
      </div>
    </div>
  );
}

/**
 * Onboarding guard – redirects already-registered users to their dashboard.
 * Unauthenticated users and users without a role may proceed to /onboarding.
 */
function OnboardingGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <AuthLoadingScreen />;

  // Not authenticated: allow access to onboarding (they'll register first)
  if (!isAuthenticated || !user) return <>{children}</>;

  // Already have a role – redirect to their correct dashboard
  if (user.role === 'CLIENT') return <Navigate to="/dashboard" replace />;
  if (user.role === 'DEVELOPER') return <Navigate to="/dashboard" replace />;

  // Has session but no role yet – legitimate onboarding case
  return <>{children}</>;
}

/**
 * Dynamic /dashboard router that strictly locks the user into their selected role.
 * All role-checking is authoritative from the backend user record (via AuthContext).
 */
function DashboardRouter() {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Wait for auth to resolve before making any routing decisions.
  if (isLoading) return <AuthLoadingScreen />;

  if (!isAuthenticated || !user) return <Navigate to="/login" replace />;

  // No role means incomplete registration
  if (!user.role) return <Navigate to="/onboarding" replace />;

  if (user.role === 'CLIENT') {
    return (
      <ClientLayout>
        <ClientDashboard />
      </ClientLayout>
    );
  }

  if (user.role === 'DEVELOPER') {
    return (
      <DeveloperLayout>
        <DevDashboard />
      </DeveloperLayout>
    );
  }

  // Unknown role – send to onboarding
  return <Navigate to="/onboarding" replace />;
}

import AdminLoginPage from '../features/admin/pages/AdminLoginPage';

function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) return <AuthLoadingScreen />;

  if (!isAuthenticated || !user) {
    return <Navigate to="/admin/login" replace />;
  }

  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    // Instead of redirecting to /dashboard (which might go to /onboarding and cause loops/confusion),
    // we explicitly block them here and allow them to log out to switch to an admin account.
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Access Denied</h1>
          <p className="text-slate-600 mb-6">
            You are currently logged in as a {user.role ? user.role.toLowerCase() : 'new user'}, which does not have administrator privileges.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/" className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg font-medium hover:bg-slate-300 transition-colors">
              Go to Homepage
            </a>
            <button 
              onClick={() => logout()}
              className="px-4 py-2 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Log out & Switch Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default function AppRouter() {
  const { isLoading } = useAuth();

  // Show global loading screen during initial auth resolution so no route
  // decisions are made against stale/null state.
  if (isLoading) return <AuthLoadingScreen />;

  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/signup" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/callback" element={<AuthCallbackPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/privacy" element={<PrivacyPage />} />

      {/* Onboarding Flow – guarded so registered users are redirected to dashboard */}
      <Route
        path="/onboarding"
        element={
          <OnboardingGuard>
            <RoleSelectionPage />
          </OnboardingGuard>
        }
      />
      <Route
        path="/onboarding/client"
        element={
          <OnboardingGuard>
            <ClientOnboardingPage />
          </OnboardingGuard>
        }
      />
      <Route
        path="/onboarding/developer"
        element={
          <OnboardingGuard>
            <DeveloperOnboardingPage />
          </OnboardingGuard>
        }
      />

      {/* Dynamic Role-Locked Dashboard – handles CLIENT, DEVELOPER, and ADMIN redirects */}
      <Route path="/dashboard" element={<DashboardRouter />} />

      {/* Client-Only Routes */}
      <Route element={<ProtectedRoute allowedRoles={['CLIENT']} />}>
        <Route element={<ClientLayout />}>
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/projects" element={<MyProjectsPage />} />
          <Route path="/client/projects/new" element={<PostProjectPage />} />
          <Route path="/client/projects/:id/bids" element={<ProjectBidsPage />} />
          <Route path="/client/engagements/:bidId" element={<EngagementDetailPage />} />
          <Route path="/client/settings" element={<SettingsPage />} />
          <Route path="/client/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      {/* Developer-Only Routes */}
      <Route element={<ProtectedRoute allowedRoles={['DEVELOPER']} />}>
        <Route element={<DeveloperLayout />}>
          <Route path="/developer/dashboard" element={<DevDashboard />} />
          <Route path="/projects" element={<BrowseProjectsPage />} />
          <Route path="/browse" element={<BrowseProjectsPage />} />
          <Route path="/bids" element={<MyBidsPage />} />
          <Route path="/developer/engagements/:bidId" element={<EngagementDetailPage />} />
          <Route path="/developer/payments" element={<EngagementDetailPage />} />
          <Route path="/developer/settings" element={<SettingsPage />} />
          <Route path="/developer/notifications" element={<NotificationsPage />} />
        </Route>
      </Route>

      {/* Shared Authenticated Routes */}
      <Route element={<ProtectedRoute allowedRoles={['CLIENT', 'DEVELOPER']} />}>
        <Route path="/messages" element={<DashboardRouter />} />
        <Route path="/messages/:bidId" element={<EngagementDetailPage />} />
      </Route>

      {/* Admin Login Route */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* Admin Routes – Protected by AdminGuard */}
      <Route element={<AdminGuard><AdminLayout /></AdminGuard>}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/accounts" element={<AdminAccountsPage />} />
        <Route path="/admin/projects" element={<AdminProjectsPage />} />
        <Route path="/admin/disputes" element={<DisputesPage />} />
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}