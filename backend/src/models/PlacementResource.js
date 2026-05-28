import mongoose from 'mongoose';

const placementResourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    type: {
      type: String,
      enum: ['article', 'video', 'document', 'guide', 'practice'],
      default: 'article',
    },
    category: { type: String, required: true },
    url: { type: String, required: true },
    tags: [{ type: String }],
    source: { type: String, default: 'Edulance AI' },
  },
  { timestamps: true },
);

const PlacementResource = mongoose.model('PlacementResource', placementResourceSchema);
export default PlacementResource;
