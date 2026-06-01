import mongoose from 'mongoose';

const pricingSuggestionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    projectComplexity: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Enterprise'],
      default: 'Medium',
    },
    estimatedPrice: {
      type: String,
      required: true,
      trim: true,
    },
    estimatedTimeline: {
      type: String,
      required: true,
      trim: true,
    },
    recommendationSummary: {
      type: String,
      default: '',
    },
    inputDetails: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true },
);

pricingSuggestionSchema.index({ userId: 1, createdAt: -1 });

const PricingSuggestion = mongoose.model('PricingSuggestion', pricingSuggestionSchema);
export default PricingSuggestion;
