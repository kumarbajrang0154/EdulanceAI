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

// AI routes (PDF upload, summarization, history)
router.use('/ai', aiRoutes);

// Resume routes (create, read, update, delete, download)
router.use('/resume', resumeRoutes);

// Placement preparation routes
router.use('/placement', placementRoutes);

export default router;
