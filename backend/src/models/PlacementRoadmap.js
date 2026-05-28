import mongoose from 'mongoose';

const stepSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    order: { type: Number, required: true },
  },
  { _id: false },
);

const placementRoadmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    skillLevel: { type: String, default: 'Beginner' },
    estimatedDuration: { type: String, default: '2-4 weeks' },
    tags: [{ type: String }],
    steps: { type: [stepSchema], default: [] },
  },
  { timestamps: true },
);

const PlacementRoadmap = mongoose.model('PlacementRoadmap', placementRoadmapSchema);
export default PlacementRoadmap;
