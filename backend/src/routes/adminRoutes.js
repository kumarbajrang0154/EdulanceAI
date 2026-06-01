import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  getPlatformMetrics,
  getUsers,
  updateUser,
  getVerificationRequests,
  moderateVerificationRequest,
  getFeedback,
  moderateFeedback,
  getPendingReviews,
  moderateReview,
  getVideos,
  createVideo,
  updateVideo,
  deleteVideo,
} from '../controllers/adminController.js';

const router = express.Router();

router.use(protect, authorizeRoles('admin'));
router.get('/metrics', getPlatformMetrics);
router.get('/users', getUsers);
router.patch('/users/:id', updateUser);
router.get('/verification-requests', getVerificationRequests);
router.patch('/verification-requests/:id', moderateVerificationRequest);
router.get('/feedback', getFeedback);
router.patch('/feedback/:id', moderateFeedback);
router.get('/reviews/pending', getPendingReviews);
router.patch('/reviews/:id', moderateReview);
router.get('/videos', getVideos);
router.post('/videos', createVideo);
router.patch('/videos/:id', updateVideo);
router.delete('/videos/:id', deleteVideo);

export default router;
