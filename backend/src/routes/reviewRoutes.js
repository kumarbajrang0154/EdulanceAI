import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createReview, fetchReviewsForUser, fetchMyReviews } from '../controllers/reviewController.js';

const router = express.Router();

router.use(protect);
router.post('/create', createReview);
router.get('/user/:userId', fetchReviewsForUser);
router.get('/me', fetchMyReviews);

export default router;
