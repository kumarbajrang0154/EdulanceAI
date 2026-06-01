import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { fetchNotifications, readNotification } from '../controllers/notificationController.js';

const router = express.Router();

router.use(protect);
router.get('/', fetchNotifications);
router.put('/:id/read', readNotification);

export default router;
