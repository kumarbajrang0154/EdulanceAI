import Review from '../models/Review.js';
import { createNotification } from '../services/notificationService.js';
import { logActivity } from '../services/activityService.js';

export const createReview = async (req, res, next) => {
  try {
    const { targetUserId, rating, comment, reviewType } = req.body;

    if (!targetUserId || !rating || !comment) {
      return res.status(400).json({ message: 'targetUserId, rating, and comment are required.' });
    }

    const review = await Review.create({
      reviewerId: req.user.id,
      targetUserId,
      rating,
      comment,
      reviewType: reviewType || 'freelancer',
      status: 'pending',
    });

    await Promise.all([
      createNotification({
        userId: targetUserId,
        type: 'info',
        title: 'New review submitted',
        message: 'A new review is waiting moderation before it becomes visible on your profile.',
        category: 'review',
        targetUrl: `/reviews/${targetUserId}`,
      }),
      logActivity({
        userId: req.user.id,
        activityType: 'review_submitted',
        metadata: { reviewId: review._id, targetUserId, rating },
      }),
    ]);

    res.status(201).json({ review });
  } catch (error) {
    next(error);
  }
};

export const fetchReviewsForUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const filter = { targetUserId: userId, status: 'visible' };

    const reviews = await Review.find(filter)
      .populate('reviewerId', 'fullName email profileImage')
      .sort({ createdAt: -1 });

    const averageRating =
      reviews.length > 0 ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length : 0;

    res.json({ reviews, averageRating: Number(averageRating.toFixed(2)), totalReviews: reviews.length });
  } catch (error) {
    next(error);
  }
};

export const fetchMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ targetUserId: req.user.id, status: 'visible' })
      .populate('reviewerId', 'fullName email profileImage')
      .sort({ createdAt: -1 });

    const averageRating =
      reviews.length > 0 ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length : 0;

    res.json({ reviews, averageRating: Number(averageRating.toFixed(2)), totalReviews: reviews.length });
  } catch (error) {
    next(error);
  }
};
