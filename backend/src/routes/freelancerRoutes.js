import express from 'express';
import { getFreelancerProfile, updateFreelancerProfile } from '../controllers/freelancerProfileController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.get('/profile', protect, authorizeRoles('freelancer'), getFreelancerProfile);
router.get('/profile/:userId', protect, getFreelancerProfileByUserId);
router.put('/profile', protect, authorizeRoles('freelancer'), updateFreelancerProfile);

export default router;
