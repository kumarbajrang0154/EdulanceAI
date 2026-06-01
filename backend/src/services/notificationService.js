import Notification from '../models/Notification.js';

export const createNotification = async ({ userId, type, title, message, category = 'general', targetUrl = '', data = {} }) => {
  return Notification.create({ userId, type, title, message, category, targetUrl, data });
};

export const getUserNotifications = async (userId, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const notifications = await Notification.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Notification.countDocuments({ userId });
  return { notifications, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};

export const markNotificationAsRead = async (notificationId, userId) => {
  return Notification.findOneAndUpdate(
    { _id: notificationId, userId },
    { isRead: true },
    { new: true },
  );
};
