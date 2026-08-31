import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from '../components/common/ProtectedRoute';

import ProjectDetailsPage from '../features/projects/pages/ProjectDetailsPage';
import PlaceBidPage from '../features/projects/pages/PlaceBidPage';
import MyProjectsPage from '../features/projects/pages/MyProjectsPage';
import EditProjectPage from '../features/projects/pages/EditProjectPage';
import MyBidsPage from '../features/bids/pages/MyBidsPage';
import ProjectBidsViewPage from '../features/bids/pages/ProjectBidsViewPage';
import EngagementsMilestonesPage from '../features/milestones/pages/EngagementsMilestonesPage';
import AdminAccountsPage from '../features/admin/pages/AdminAccountsPage';
import AdminProjectsPage from '../features/admin/pages/AdminProjectsPage';
import ForgotPasswordPage from '../features/auth/pages/ForgotPasswordPage';
import ClientOnboarding from '../features/onboarding/pages/ClientOnboarding';
import DeveloperOnboarding from '../features/onboarding/pages/DeveloperOnboarding';
import DeveloperDashboard from '../features/developer/pages/DeveloperDashboard';
import NotificationsPage from '../features/notifications/pages/NotificationsPage';
import AdminPayouts from '../features/admin/pages/AdminPayouts';

// Layouts
import PublicLayout from '../components/layout/PublicLayout';
import ClientLayout from '../components/layout/ClientLayout';
import DeveloperLayout from '../components/layout/DeveloperLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Pages (Placeholders - Devs will build these in their feature folders)
import LandingPage from '../features/projects/pages/LandingPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

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
        <Route path="/" element={<LandingPage />} />
                <Route path="/projects" element={<BrowseProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailsPage />} />
        <Route path="/projects/:id/place-bid" element={<PlaceBidPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Client Routes */}
      <Route element={<ProtectedRoute allowedRoles={['CLIENT', 'ADMIN']} />}>
        <Route element={<ClientLayout />}>
          <Route path="/client/dashboard" element={<ClientDashboard />} />
                    <Route path="/client/projects/new" element={<PostProjectPage />} />
          <Route path="/client/projects" element={<MyProjectsPage />} />
          <Route path="/client/projects/:id/edit" element={<EditProjectPage />} />
          <Route path="/client/projects/:id/bids" element={<ProjectBidsViewPage />} />
          <Route path="/onboarding/client" element={<ClientOnboarding />} />
        </Route>
      </Route>

      {/* Developer Routes */}
      <Route element={<ProtectedRoute allowedRoles={['DEVELOPER', 'ADMIN']} />}>
        <Route element={<DeveloperLayout />}>
                    <Route path="/developer/dashboard" element={<DevDashboard />} />
          <Route path="/developer/my-bids" element={<MyBidsPage />} />
          <Route path="/developer/dashboard" element={<DeveloperDashboard />} />
          <Route path="/onboarding/developer" element={<DeveloperOnboarding />} />
          <Route path="/developer/engagements/:bidId/milestones" element={<EngagementsMilestonesPage />} />
        </Route>
      </Route>

      {/* Shared Authenticated Routes */}
      <Route element={<ProtectedRoute allowedRoles={['CLIENT', 'DEVELOPER', 'ADMIN']} />}>
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin/disputes" element={<DisputesPage />} />
          <Route path="/admin/accounts" element={<AdminAccountsPage />} />
          <Route path="/admin/projects" element={<AdminProjectsPage />} />
          <Route path="/admin/payouts" element={<AdminPayouts />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}



