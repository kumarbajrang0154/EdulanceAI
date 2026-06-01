import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  getProposalHistory,
  getProposalById,
  deleteProposal,
} from '../controllers/freelancerAIController.js';

const router = express.Router();

router.use(protect, authorizeRoles('freelancer'));
router.get('/history', getProposalHistory);
router.get('/:id', getProposalById);
router.delete('/:id', deleteProposal);

export default router;
