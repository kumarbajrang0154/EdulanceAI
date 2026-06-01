import express from 'express';
import {
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  studentDashboard,
  freelancerDashboard,
  adminDashboard,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import studentRoutes from './studentRoutes.js';
import aiRoutes from './aiRoutes.js';
import resumeRoutes from './resumeRoutes.js';
import placementRoutes from './placementRoutes.js';
import freelancerRoutes from './freelancerRoutes.js';
import portfolioRoutes from './portfolioRoutes.js';
import serviceRoutes from './serviceRoutes.js';
import requestRoutes from './requestRoutes.js';
import projectRoutes from './projectRoutes.js';
import proposalRoutes from './proposalRoutes.js';
import adminRoutes from './adminRoutes.js';
import notificationRoutes from './notificationRoutes.js';
import activityRoutes from './activityRoutes.js';
import feedbackRoutes from './feedbackRoutes.js';
import reviewRoutes from './reviewRoutes.js';

const router = express.Router();

router.post('/auth/signup', registerUser);
router.post('/auth/login', loginUser);
router.get('/auth/profile', protect, getProfile);
router.post('/auth/logout', protect, logoutUser);
router.get('/auth/student-dashboard', protect, authorizeRoles('student'), studentDashboard);
router.get('/auth/freelancer-dashboard', protect, authorizeRoles('freelancer'), freelancerDashboard);
router.get('/auth/admin-dashboard', protect, authorizeRoles('admin'), adminDashboard);

// Student routes
router.use('/student', studentRoutes);

// Freelancer marketplace routes
router.use('/freelancer', freelancerRoutes);
router.use('/portfolio', portfolioRoutes);
router.use('/services', serviceRoutes);
router.use('/requests', requestRoutes);
router.use('/projects', projectRoutes);

// AI routes (PDF upload, summarization, history, freelancer proposal generation)
router.use('/ai', aiRoutes);

// Freelancer proposal history routes
router.use('/proposals', proposalRoutes);

// Resume routes (create, read, update, delete, download)
router.use('/resume', resumeRoutes);

// Placement preparation routes
router.use('/placement', placementRoutes);

// Admin platform management routes
router.use('/admin', adminRoutes);

// Notification, feedback, review, and activity routes
router.use('/notifications', notificationRoutes);
router.use('/activity', activityRoutes);
router.use('/feedback', feedbackRoutes);
router.use('/reviews', reviewRoutes);

export default router;
