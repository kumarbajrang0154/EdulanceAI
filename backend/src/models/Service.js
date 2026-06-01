import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    deliveryTime: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    thumbnail: { type: String, default: '' },
    features: { type: [String], default: [] },
    revisions: { type: Number, default: 0 },
    status: { type: String, enum: ['Active', 'Paused', 'Draft', 'Archived'], default: 'Draft' },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

const Service = mongoose.model('Service', serviceSchema);
export default Service;
