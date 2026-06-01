import mongoose from 'mongoose';

const freelancerProfileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    bio: { type: String, default: '' },
    skills: { type: [String], default: [] },
    experienceLevel: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
      default: 'Intermediate',
    },
    portfolioLinks: { type: [String], default: [] },
    socialLinks: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      website: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
    availabilityStatus: {
      type: String,
      enum: ['Available', 'Busy', 'Offline'],
      default: 'Available',
    },
    profileImage: { type: String, default: '' },
  },
  { timestamps: true },
);

const FreelancerProfile = mongoose.model('FreelancerProfile', freelancerProfileSchema);
export default FreelancerProfile;
