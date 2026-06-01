import { getActivityHistory } from '../services/activityService.js';

export const fetchActivityHistory = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const result = await getActivityHistory(req.user.id, { page, limit });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
