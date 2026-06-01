import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true },
    reviewType: {
      type: String,
      enum: ['freelancer', 'course', 'platform', 'resource'],
      default: 'freelancer',
    },
    status: {
      type: String,
      enum: ['visible', 'removed', 'pending'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

const Review = mongoose.model('Review', reviewSchema);
export default Review;
