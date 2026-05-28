import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  getStudentProfile,
  getStudentDashboardStats,
  updateStudentProfile,
  updateStudentPreferences,
  incrementStudentStat,
} from '../controllers/studentController.js';

const router = express.Router();

// All student routes are protected and require student role
router.use(protect, authorizeRoles('student'));

// Get student profile
router.get('/profile', getStudentProfile);

// Get student dashboard statistics
router.get('/dashboard-stats', getStudentDashboardStats);

// Update student profile
router.put('/profile', updateStudentProfile);

// Update student preferences
router.put('/preferences', updateStudentPreferences);

// Increment student stats
router.post('/stats/:statType', incrementStudentStat);

export default router;
