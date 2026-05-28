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

const router = express.Router();

// All routes require authentication and student role
router.use(protect, authorizeRoles('student'));

// Upload PDF and generate summary
router.post('/upload-pdf', upload.single('pdf'), uploadAndSummarize);

// Get note history
router.get('/history', getNoteHistory);

// Get note statistics
router.get('/stats', getAIStats);

// Get single note
router.get('/history/:id', getNoteById);

// Delete note
router.delete('/history/:id', deleteNote);

export default router;
