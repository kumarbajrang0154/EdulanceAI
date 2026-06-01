import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
      type: String,
      enum: ['info', 'success', 'warning', 'alert'],
      default: 'info',
    },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    category: { type: String, default: 'general', trim: true },
    targetUrl: { type: String, default: '' },
    data: { type: mongoose.Schema.Types.Mixed, default: {} },
    isRead: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;
