import mongoose from 'mongoose';

const videoContentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: '', trim: true },
    url: { type: String, required: true, trim: true },
    category: { type: String, default: 'general', trim: true },
    tags: [{ type: String, trim: true }],
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
    },
    featured: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    views: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const VideoContent = mongoose.model('VideoContent', videoContentSchema);
export default VideoContent;
