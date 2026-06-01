import express from 'express';
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/create', protect, authorizeRoles('freelancer'), createService);
router.get('/', protect, getServices);
router.get('/:id', protect, getServiceById);
router.put('/:id', protect, authorizeRoles('freelancer'), updateService);
router.delete('/:id', protect, authorizeRoles('freelancer'), deleteService);

export default router;
