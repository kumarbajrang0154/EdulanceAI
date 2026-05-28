import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      default: 'Untitled Resume',
    },
    template: {
      type: String,
      enum: ['modern', 'minimal', 'professional'],
      default: 'professional',
    },
    personalInfo: {
      name: { type: String, default: '' },
      email: { type: String, default: '' },
      phone: { type: String, default: '' },
      headline: { type: String, default: '' },
      location: { type: String, default: '' },
      website: { type: String, default: '' },
    },
    about: { type: String, default: '' },
    education: [
      {
        institution: { type: String, default: '' },
        degree: { type: String, default: '' },
        fieldOfStudy: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        location: { type: String, default: '' },
        description: { type: String, default: '' },
      },
    ],
    experience: [
      {
        company: { type: String, default: '' },
        title: { type: String, default: '' },
        location: { type: String, default: '' },
        startDate: { type: String, default: '' },
        endDate: { type: String, default: '' },
        summary: { type: String, default: '' },
      },
    ],
    projects: [
      {
        name: { type: String, default: '' },
        description: { type: String, default: '' },
        link: { type: String, default: '' },
        technologies: { type: String, default: '' },
      },
    ],
    skills: [{ type: String }],
    certifications: [
      {
        name: { type: String, default: '' },
        issuer: { type: String, default: '' },
        date: { type: String, default: '' },
      },
    ],
    achievements: [{ type: String }],
    socialLinks: {
      linkedin: { type: String, default: '' },
      github: { type: String, default: '' },
      website: { type: String, default: '' },
      twitter: { type: String, default: '' },
    },
  },
  { timestamps: true },
);

const Resume = mongoose.model('Resume', resumeSchema);
export default Resume;
