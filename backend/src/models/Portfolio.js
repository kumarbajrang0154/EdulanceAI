import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    technologies: { type: [String], default: [] },
    images: { type: [String], default: [] },
    liveLink: { type: String, default: '' },
    githubLink: { type: String, default: '' },
    status: { type: String, enum: ['Draft', 'Published'], default: 'Published' },
  },
  { timestamps: true },
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
export default Portfolio;
