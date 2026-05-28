import mongoose from 'mongoose';

const studentProgressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    roadmap: { type: mongoose.Schema.Types.ObjectId, ref: 'PlacementRoadmap', required: true },
    completedSteps: [{ type: Number }],
    currentStep: { type: Number, default: 1 },
    progressPercentage: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed'],
      default: 'not-started',
    },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

studentProgressSchema.index({ user: 1, roadmap: 1 }, { unique: true });

const StudentProgress = mongoose.model('StudentProgress', studentProgressSchema);
export default StudentProgress;
