import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  duplicateResume,
  downloadResume,
} from '../controllers/resumeController.js';

const router = express.Router();

router.use(protect, authorizeRoles('student'));

router.post('/create', createResume);
router.get('/', getResumes);
router.get('/:id', getResumeById);
router.put('/:id', updateResume);
router.delete('/:id', deleteResume);
router.post('/duplicate/:id', duplicateResume);
router.post('/download/:id', downloadResume);

export default router;
