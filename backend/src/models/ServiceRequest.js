import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema(
  {
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', required: true },
    message: { type: String, required: true, trim: true },
    requestStatus: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true },
);

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
export default ServiceRequest;
