import { Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Unauthorized from '../pages/Unauthorized';
import StudentDashboard from '../pages/StudentDashboard';
import FreelancerDashboard from '../pages/FreelancerDashboard';
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
          <StudentDashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/dashboard"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <StudentDashboardHome />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/ai-notes"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <AINotesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/summary-history"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <SummaryHistoryPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/ai-tools"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <AIToolsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/resume"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <ResumeBuilderPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/placement"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <PlacementPrepPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/videos"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <VideoLearningPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/resources"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <SavedResourcesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/student/settings"
      element={
        <ProtectedRoute allowedRoles={['student']}>
          <SettingsPage />
        </ProtectedRoute>
      }
    />

    {/* Freelancer Dashboard Routes */}
    <Route
      path="/freelancer"
      element={
        <ProtectedRoute allowedRoles={['freelancer']}>
          <Layout>
            <FreelancerDashboard />
          </Layout>
        </ProtectedRoute>
      }
    />

    {/* Admin Dashboard Routes */}
    <Route
      path="/admin"
      element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout>
            <AdminDashboard />
          </Layout>
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
