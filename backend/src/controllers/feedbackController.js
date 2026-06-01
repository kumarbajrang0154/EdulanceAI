import Feedback from '../models/Feedback.js';
import { logActivity } from '../services/activityService.js';

export const createFeedback = async (req, res, next) => {
  try {
    const { message, rating, source, feedbackType } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ message: 'Feedback message is required.' });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      source: source || 'platform',
      message,
      rating: typeof rating === 'number' ? rating : undefined,
      status: 'pending',
      feedbackType: feedbackType || 'general',
    });

    await logActivity({
      userId: req.user.id,
      activityType: 'feedback_submitted',
      metadata: { feedbackId: feedback._id, feedbackType: feedback.feedbackType },
    });

    return res.status(201).json({ feedback });
  } catch (error) {
    next(error);
  }
};

export const fetchFeedback = async (req, res, next) => {
  try {
    const filter = {};
    if (req.user.role !== 'admin') {
      filter.user = req.user.id;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.feedbackType) {
      filter.feedbackType = req.query.feedbackType;
    }

    const feedback = await Feedback.find(filter).populate('user', 'fullName email');
    res.json({ feedback });
  } catch (error) {
    next(error);
  }
};
