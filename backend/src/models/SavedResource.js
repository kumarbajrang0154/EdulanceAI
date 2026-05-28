import mongoose from 'mongoose';

const savedResourceSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resource: { type: mongoose.Schema.Types.ObjectId, ref: 'PlacementResource', required: true },
    notes: { type: String, default: '' },
    savedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

savedResourceSchema.index({ user: 1, resource: 1 }, { unique: true });

const SavedResource = mongoose.model('SavedResource', savedResourceSchema);
export default SavedResource;
