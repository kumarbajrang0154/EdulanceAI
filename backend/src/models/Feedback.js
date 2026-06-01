import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    source: { type: String, default: 'platform', trim: true },
    feedbackType: {
      type: String,
      enum: ['general', 'issue', 'resource', 'course'],
      default: 'general',
      trim: true,
    },
    message: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    status: {
      type: String,
      enum: ['pending', 'approved', 'removed'],
      default: 'pending',
    },
    response: { type: String, default: '' },
  },
  { timestamps: true },
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
