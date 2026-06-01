import express from 'express';
import {
  createProject,
  getProjectsForFreelancer,
  getProjectsForUser,
  updateProjectStatus,
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/create', protect, authorizeRoles('freelancer'), createProject);
router.get('/freelancer', protect, authorizeRoles('freelancer'), getProjectsForFreelancer);
router.get('/user', protect, authorizeRoles('student', 'freelancer'), getProjectsForUser);
router.put('/:id/status', protect, authorizeRoles('freelancer'), updateProjectStatus);

export default router;
