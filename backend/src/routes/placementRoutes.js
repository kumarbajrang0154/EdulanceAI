import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';
import {
  getPlacementRoadmaps,
  getPlacementRoadmapById,
  getPlacementResources,
  getSavedResources,
  addSavedResource,
  removeSavedResource,
  getPlacementProgress,
  updatePlacementProgress,
  getVideoLibrary,
  watchVideo,
} from '../controllers/placementController.js';

const router = express.Router();

router.use(protect, authorizeRoles('student'));

router.get('/roadmaps', getPlacementRoadmaps);
router.get('/roadmaps/:id', getPlacementRoadmapById);
router.get('/resources', getPlacementResources);
router.get('/saved', getSavedResources);
router.post('/saved', addSavedResource);
router.delete('/saved/:id', removeSavedResource);
router.get('/progress', getPlacementProgress);
router.put('/progress', updatePlacementProgress);
router.get('/videos', getVideoLibrary);
router.post('/videos/watch/:id', watchVideo);

export default router;
