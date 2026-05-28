import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    originalFileName: {
      type: String,
      required: true,
      trim: true,
    },
    extractedText: {
      type: String,
      required: true,
    },
    aiSummary: {
      type: String,
      default: '',
    },
    keyConcepts: [String],
    importantPoints: [String],
    examTips: String,
    textLength: {
      type: Number,
      default: 0,
    },
    summaryLength: {
      type: Number,
      default: 0,
    },
    processingTime: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['completed', 'failed', 'processing'],
      default: 'completed',
    },
    errorMessage: String,
  },
  { timestamps: true }
);

// Index for faster queries
noteSchema.index({ studentId: 1, createdAt: -1 });
noteSchema.index({ status: 1 });

const Note = mongoose.model('Note', noteSchema);
export default Note;
