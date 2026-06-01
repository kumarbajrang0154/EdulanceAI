import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { fetchActivityHistory } from '../controllers/activityController.js';

const router = express.Router();

router.use(protect);
router.get('/history', fetchActivityHistory);

export default router;
