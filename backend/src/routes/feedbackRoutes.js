import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createFeedback, fetchFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.use(protect);
router.post('/create', createFeedback);
router.get('/', fetchFeedback);

export default router;
