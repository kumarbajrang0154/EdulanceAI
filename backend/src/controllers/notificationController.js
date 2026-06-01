import { getUserNotifications, markNotificationAsRead } from '../services/notificationService.js';

export const fetchNotifications = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const result = await getUserNotifications(req.user.id, { page, limit });
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const readNotification = async (req, res, next) => {
  try {
    const notification = await markNotificationAsRead(req.params.id, req.user.id);
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    res.json({ notification });
  } catch (error) {
    next(error);
  }
};
