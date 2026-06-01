import Activity from '../models/Activity.js';

export const logActivity = async ({ userId, activityType, metadata = {} }) => {
  return Activity.create({ userId, activityType, metadata });
};

export const getActivityHistory = async (userId, { page = 1, limit = 20 } = {}) => {
  const skip = (page - 1) * limit;
  const activities = await Activity.find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Activity.countDocuments({ userId });
  return { activities, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
};
