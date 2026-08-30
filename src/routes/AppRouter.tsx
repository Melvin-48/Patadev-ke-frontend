import { Routes, Route, Navigate } from 'react-router-dom';

// Dashboard Shell Layout (Exact Match of App.tsx Shell)
import DashboardLayout from '../components/layout/DashboardLayout';
import AdminLayout from '../components/layout/AdminLayout';

// Feature Pages (Exact Matches of App.tsx Views)
import DashboardOverviewPage from '../features/dashboard/pages/DashboardOverviewPage';
import MyProjectsPage from '../features/projects/pages/MyProjectsPage';
import PostProjectPage from '../features/projects/pages/PostProjectPage';
import BrowseProjectsPage from '../features/projects/pages/BrowseProjectsPage';
import ProjectBidsPage from '../features/projects/pages/ProjectBidsPage';
import MyBidsPage from '../features/bids/pages/MyBidsPage';
import EngagementDetailPage from '../features/engagements/pages/EngagementDetailPage';
import MilestonesPage from '../features/milestones/pages/MilestonesPage';
import PaymentHistoryPage from '../features/payments/pages/PaymentHistoryPage';
import NotificationsPage from '../features/notifications/pages/NotificationsPage';
import SettingsPage from '../features/users/pages/SettingsPage';
import ClientProfileSetupPage from '../features/users/pages/ClientProfileSetupPage';
import DeveloperProfileSetupPage from '../features/users/pages/DeveloperProfileSetupPage';
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

// Admin Pages
import AdminDashboardPage from '../features/admin/pages/AdminDashboardPage';
import ApproveAccountsPage from '../features/admin/pages/ApproveAccountsPage';
import ModerateListingsPage from '../features/admin/pages/ModerateListingsPage';
import ConfirmPayoutsPage from '../features/admin/pages/ConfirmPayoutsPage';
import ReviewReportsPage from '../features/admin/pages/ReviewReportsPage';
import DisputesPage from '../features/admin/pages/DisputesPage';
import UserModerationPage from '../features/admin/pages/UserModerationPage';

export default function AppRouter() {
  return (
    <Routes>
      {/* Workspace App Shell Routes */}
      <Route element={<DashboardLayout />}>
        {/* Default Landing & Dashboard */}
        <Route path="/" element={<DashboardOverviewPage />} />
        <Route path="/dashboard" element={<DashboardOverviewPage />} />

        {/* Client Projects Routes */}
        <Route path="/projects" element={<MyProjectsPage />} />
        <Route path="/dashboard/projects" element={<MyProjectsPage />} />
        <Route path="/projects/new" element={<PostProjectPage />} />
        <Route path="/dashboard/projects/new" element={<PostProjectPage />} />
        <Route path="/projects/:id/bids" element={<ProjectBidsPage />} />
        <Route path="/dashboard/projects/:id/bids" element={<ProjectBidsPage />} />

        {/* Developer Discovery & Bids Routes */}
        <Route path="/browse" element={<BrowseProjectsPage />} />
        <Route path="/dashboard/browse" element={<BrowseProjectsPage />} />
        <Route path="/bids" element={<MyBidsPage />} />
        <Route path="/dashboard/bids" element={<MyBidsPage />} />

        {/* Active Engagement Workspace */}
        <Route path="/engagement" element={<EngagementDetailPage />} />
        <Route path="/engagements" element={<EngagementDetailPage />} />
        <Route path="/dashboard/engagements/:bidId" element={<EngagementDetailPage />} />
        <Route path="/milestones" element={<MilestonesPage />} />
        <Route path="/dashboard/milestones" element={<MilestonesPage />} />
        <Route path="/payments" element={<PaymentHistoryPage />} />
        <Route path="/dashboard/payments" element={<PaymentHistoryPage />} />

        {/* Notifications & Settings */}
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/dashboard/notifications" element={<NotificationsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />

        {/* Profile Setup / Onboarding */}
        <Route path="/dashboard/profile/setup/client" element={<ClientProfileSetupPage />} />
        <Route path="/dashboard/profile/setup/developer" element={<DeveloperProfileSetupPage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Admin Center Routes */}
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/accounts" element={<ApproveAccountsPage />} />
        <Route path="/admin/listings" element={<ModerateListingsPage />} />
        <Route path="/admin/payouts" element={<ConfirmPayoutsPage />} />
        <Route path="/admin/reports" element={<ReviewReportsPage />} />
        <Route path="/admin/disputes" element={<DisputesPage />} />
        <Route path="/admin/users" element={<UserModerationPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}