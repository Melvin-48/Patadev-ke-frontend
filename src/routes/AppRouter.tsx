import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import ClientLayout from '../components/layout/ClientLayout';
import DeveloperLayout from '../components/layout/DeveloperLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Pages
import LandingPage from '../features/projects/pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ClientOnboardingPage from '../features/users/pages/ClientOnboardingPage';
import DeveloperOnboardingPage from '../features/users/pages/DeveloperOnboardingPage';

// Mock Dashboard from origin/main (full self-contained SPA shell)
import MockDashboard from '../App';

import ClientDashboard from '../features/projects/pages/ClientDashboard';
import PostProjectPage from '../features/projects/pages/PostProjectPage';

import DevDashboard from '../features/bids/pages/DevDashboard';
import BrowseProjectsPage from '../features/projects/pages/BrowseProjectsPage';

import MessagesPage from '../features/messages/pages/MessagesPage';

import AdminDashboard from '../features/admin/pages/AdminDashboard';
import DisputesPage from '../features/admin/pages/DisputesPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        {/* Your landing page stays at / */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<BrowseProjectsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/onboarding/client" element={<ClientOnboardingPage />} />
        <Route path="/onboarding/developer" element={<DeveloperOnboardingPage />} />
      </Route>

      {/*
       * /dashboard — the mock frontend pulled from origin/main.
       * Rendered outside any layout wrapper since it's a fully
       * self-contained shell with its own sidebar + topbar.
       * Auth guard is bypassed for design/preview phase.
       */}
      <Route path="/dashboard" element={<MockDashboard />} />

      {/* Client Routes (real authenticated dashboard) */}
      <Route element={<ProtectedRoute allowedRoles={['CLIENT', 'ADMIN']} />}>
        <Route element={<ClientLayout />}>
          <Route path="/client/dashboard" element={<ClientDashboard />} />
          <Route path="/client/projects/new" element={<PostProjectPage />} />
          <Route path="/dashboard/projects/new" element={<PostProjectPage />} />
        </Route>
      </Route>

      {/* Developer Routes */}
      <Route element={<ProtectedRoute allowedRoles={['DEVELOPER', 'ADMIN']} />}>
        <Route element={<DeveloperLayout />}>
          <Route path="/developer/dashboard" element={<DevDashboard />} />
        </Route>
      </Route>

      {/* Shared Authenticated Routes */}
      <Route element={<ProtectedRoute allowedRoles={['CLIENT', 'DEVELOPER', 'ADMIN']} />}>
        <Route path="/messages" element={<MessagesPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/disputes" element={<DisputesPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}