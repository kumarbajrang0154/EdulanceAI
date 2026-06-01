import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'In Progress', 'Submitted', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
    deadline: { type: Date },
    submittedFiles: { type: [String], default: [] },
    updates: { type: [String], default: [] },
  },
  { timestamps: true },
);

const Project = mongoose.model('Project', projectSchema);
export default Project;
