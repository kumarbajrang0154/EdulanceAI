import mongoose from 'mongoose';

const proposalHistorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    projectTitle: {
      type: String,
      required: true,
      trim: true,
    },
    proposalType: {
      type: String,
      enum: ['Professional', 'Friendly', 'Technical', 'Short Pitch', 'Detailed Proposal'],
      default: 'Professional',
    },
    templateType: {
      type: String,
      enum: ['web development', 'design', 'AI/ML', 'resume services', 'content writing'],
      default: 'web development',
    },
    generatedProposal: {
      type: String,
      required: true,
    },
    sourceInput: {
      type: Object,
      default: {},
    },
    projectDescription: {
      type: String,
      default: '',
    },
    budget: {
      type: String,
      default: '',
    },
    timeline: {
      type: String,
      default: '',
    },
    skills: [String],
  },
  { timestamps: true },
);

proposalHistorySchema.index({ userId: 1, createdAt: -1 });

const ProposalHistory = mongoose.model('ProposalHistory', proposalHistorySchema);
export default ProposalHistory;
