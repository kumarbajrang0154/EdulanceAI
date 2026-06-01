import express from 'express';
import {
  createPortfolio,
  getPortfolios,
  updatePortfolio,
  deletePortfolio,
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/create', protect, authorizeRoles('freelancer'), createPortfolio);
router.get('/', protect, authorizeRoles('freelancer'), getPortfolios);
router.put('/:id', protect, authorizeRoles('freelancer'), updatePortfolio);
router.delete('/:id', protect, authorizeRoles('freelancer'), deletePortfolio);

export default router;
