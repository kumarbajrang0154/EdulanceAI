import express from 'express';
import {
  createServiceRequest,
  getRequestsForFreelancer,
  getRequestsForUser,
  updateServiceRequest,
} from '../controllers/serviceRequestController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/create', protect, authorizeRoles('student', 'freelancer'), createServiceRequest);
router.get('/freelancer', protect, authorizeRoles('freelancer'), getRequestsForFreelancer);
router.get('/user', protect, authorizeRoles('student', 'freelancer'), getRequestsForUser);
router.put('/:id', protect, authorizeRoles('student', 'freelancer'), updateServiceRequest);

export default router;
