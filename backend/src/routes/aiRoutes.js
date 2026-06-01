import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';
import {
  uploadAndSummarize,
  getNoteHistory,
  getNoteById,
  deleteNote,
  getAIStats,
} from '../controllers/aiController.js';
import {
  generateProposal,
  generateCoverLetter,
  suggestPricing,
  getPricingHistory,
} from '../controllers/freelancerAIController.js';

const router = express.Router();

// Student note AI routes
router.post('/upload-pdf', protect, authorizeRoles('student'), upload.single('pdf'), uploadAndSummarize);
router.get('/history', protect, authorizeRoles('student'), getNoteHistory);
router.get('/stats', protect, authorizeRoles('student'), getAIStats);
router.get('/history/:id', protect, authorizeRoles('student'), getNoteById);
router.delete('/history/:id', protect, authorizeRoles('student'), deleteNote);

// Freelancer AI proposal routes
router.post('/proposal/generate', protect, authorizeRoles('freelancer'), generateProposal);
router.post('/cover-letter/generate', protect, authorizeRoles('freelancer'), generateCoverLetter);
router.post('/pricing/suggest', protect, authorizeRoles('freelancer'), suggestPricing);
router.get('/pricing/history', protect, authorizeRoles('freelancer'), getPricingHistory);

export default router;
