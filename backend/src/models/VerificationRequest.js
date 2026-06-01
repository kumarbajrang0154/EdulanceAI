import mongoose from 'mongoose';

const verificationRequestSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    requestedRole: {
      type: String,
      enum: ['freelancer', 'student'],
      default: 'freelancer',
    },
    documents: [{ type: String, trim: true }],
    note: { type: String, trim: true },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reviewNotes: { type: String, default: '' },
  },
  { timestamps: true },
);

const VerificationRequest = mongoose.model('VerificationRequest', verificationRequestSchema);
export default VerificationRequest;
