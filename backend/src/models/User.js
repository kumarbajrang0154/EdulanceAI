import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ['student', 'freelancer', 'admin'],
      default: 'student',
    },
    profileImage: { type: String, default: '' },
    joinedDate: { type: Date, default: Date.now },
    
    // Dashboard preferences
    preferences: {
      theme: { type: String, enum: ['light', 'dark'], default: 'light' },
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: false },
      marketingEmails: { type: Boolean, default: false },
      twoFactorAuth: { type: Boolean, default: false },
    },

    // Activity stats for students
    stats: {
      resourcesSaved: { type: Number, default: 0 },
      aiUsageCount: { type: Number, default: 0 },
      resumeCount: { type: Number, default: 0 },
      videosWatched: { type: Number, default: 0 },
    },

    // Account status
    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

userSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) {
    return next();
  }

  try {
    this.password = await bcrypt.hash(this.password, 12);
    return next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.comparePassword = async function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toJSON = function toJSON() {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

const User = mongoose.model('User', userSchema);
export default User;
