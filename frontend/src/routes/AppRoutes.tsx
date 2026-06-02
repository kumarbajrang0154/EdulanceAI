import { Outlet, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Unauthorized from '../pages/Unauthorized';
import AdminDashboard from '../pages/AdminDashboard';
import StudentDashboardHome from '../pages/StudentDashboardHome';
import AINotesPage from '../pages/AINotesPage';
import SummaryHistoryPage from '../pages/SummaryHistoryPage';
import AIToolsPage from '../pages/AIToolsPage';
import ResumeBuilderPage from '../pages/ResumeBuilderPage';
import PlacementPrepPage from '../pages/PlacementPrepPage';
import VideoLearningPage from '../pages/VideoLearningPage';
import SavedResourcesPage from '../pages/SavedResourcesPage';
import SettingsPage from '../pages/SettingsPage';
import MarketplaceHome from '../pages/MarketplaceHome';
import ServiceDetails from '../pages/ServiceDetails';
import FreelancerProfilePage from '../pages/FreelancerProfilePage';
import ProjectRequests from '../pages/ProjectRequests';
import UserRequestsDashboard from '../pages/UserRequestsDashboard';
import FreelancerDashboardLayout from '../components/dashboard/FreelancerDashboardLayout';
import FreelancerDashboardHome from '../pages/FreelancerDashboardHome';
import FreelancerPortfolio from '../pages/FreelancerPortfolio';
import FreelancerServices from '../pages/FreelancerServices';
import FreelancerProjects from '../pages/FreelancerProjects';
import FreelancerProposalGenerator from '../pages/FreelancerProposalGenerator';
import FreelancerProposalHistory from '../pages/FreelancerProposalHistory';
import FreelancerPricingSuggestions from '../pages/FreelancerPricingSuggestions';
import FreelancerProposalTemplates from '../pages/FreelancerProposalTemplates';
import FreelancerEarnings from '../pages/FreelancerEarnings';
import FreelancerSettings from '../pages/FreelancerSettings';
import AdminUsers from '../pages/AdminUsers';
import AdminVerifications from '../pages/AdminVerifications';
import AdminFeedback from '../pages/AdminFeedback';
import AdminVideoManagement from '../pages/AdminVideoManagement';
import AdminLayout from '../components/AdminLayout';
import ActivityHistory from '../pages/ActivityHistory';
import FeedbackCenter from '../pages/FeedbackCenter';
import NotificationsCenter from '../pages/NotificationsCenter';
import ReviewsDashboard from '../pages/ReviewsDashboard';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout><Landing /></Layout>} />
    <Route path="/login" element={<Layout><Login /></Layout>} />
    <Route path="/signup" element={<Layout><Signup /></Layout>} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Layout>
            <Dashboard />
          </Layout>
        </ProtectedRoute>
      }
    />

    {/* Student Dashboard Routes */}
    <Route
      path="/student"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <Outlet />
        </ProtectedRoute>
      }
    >
      <Route index element={<StudentDashboardHome />} />
      <Route path="dashboard" element={<StudentDashboardHome />} />
      <Route path="ai-notes" element={<AINotesPage />} />
      <Route path="summary-history" element={<SummaryHistoryPage />} />
      <Route path="ai-tools" element={<AIToolsPage />} />
      <Route path="resume" element={<ResumeBuilderPage />} />
      <Route path="placement" element={<PlacementPrepPage />} />
      <Route path="videos" element={<VideoLearningPage />} />
      <Route path="resources" element={<SavedResourcesPage />} />
      <Route path="settings" element={<SettingsPage />} />
    </Route>

    {/* Marketplace Routes */}
    <Route
      path="/marketplace"
      element={
        <ProtectedRoute>
          <Layout>
            <MarketplaceHome />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/marketplace/service/:id"
      element={
        <ProtectedRoute>
          <Layout>
            <ServiceDetails />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/marketplace/freelancer/:userId"
      element={
        <ProtectedRoute>
          <Layout>
            <FreelancerProfilePage />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/requests/user"
      element={
        <ProtectedRoute>
          <Layout>
            <UserRequestsDashboard />
          </Layout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/requests/freelancer"
      element={
        <ProtectedRoute allowedRoles={['freelancer']}>
          <Layout>
            <ProjectRequests />
          </Layout>
        </ProtectedRoute>
      }
    />

    {/* Freelancer Dashboard Routes */}
    <Route
      path="/freelancer"
      element={
        <ProtectedRoute allowedRoles={['freelancer']}>
          <FreelancerDashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<FreelancerDashboardHome />} />
      <Route path="dashboard" element={<FreelancerDashboardHome />} />
      <Route path="portfolio" element={<FreelancerPortfolio />} />
      <Route path="services" element={<FreelancerServices />} />
      <Route path="projects" element={<FreelancerProjects />} />
      <Route path="ai-proposals" element={<FreelancerProposalGenerator />} />
      <Route path="proposal-history" element={<FreelancerProposalHistory />} />
      <Route path="pricing-suggestions" element={<FreelancerPricingSuggestions />} />
      <Route path="proposal-templates" element={<FreelancerProposalTemplates />} />
      <Route path="earnings" element={<FreelancerEarnings />} />
      <Route path="settings" element={<FreelancerSettings />} />
    </Route>

    {/* Admin Dashboard Routes */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/users"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <AdminUsers />
          </AdminLayout>
        </ProtectedRoute>
      }
    />

    <Route
      path="/notifications"
      element={
        <ProtectedRoute>
          <NotificationsCenter />
        </ProtectedRoute>
      }
    />
    <Route
      path="/activity"
      element={
        <ProtectedRoute>
          <ActivityHistory />
        </ProtectedRoute>
      }
    />
    <Route
      path="/feedback-center"
      element={
        <ProtectedRoute>
          <FeedbackCenter />
        </ProtectedRoute>
      }
    />
    <Route
      path="/reviews"
      element={
        <ProtectedRoute>
          <ReviewsDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/verifications"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <AdminVerifications />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/feedback"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <AdminFeedback />
          </AdminLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/videos"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminLayout>
            <AdminVideoManagement />
          </AdminLayout>
        </ProtectedRoute>
      }
    />

    {/* Unauthorized */}
    <Route
      path="/unauthorized"
      element={
        <Layout>
          <Unauthorized />
        </Layout>
      }
    />
  </Routes>
);

export default AppRoutes;
