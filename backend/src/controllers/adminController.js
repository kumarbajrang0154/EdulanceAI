import User from '../models/User.js';
import Feedback from '../models/Feedback.js';
import VideoContent from '../models/VideoContent.js';
import Review from '../models/Review.js';
import VerificationRequest from '../models/VerificationRequest.js';

export const getPlatformMetrics = async (req, res, next) => {
  try {
    const [students, freelancers, admins, pendingVerifications, pendingFeedback, pendingReviews, publishedVideos] =
      await Promise.all([
        User.countDocuments({ role: 'student' }),
        User.countDocuments({ role: 'freelancer' }),
        User.countDocuments({ role: 'admin' }),
        VerificationRequest.countDocuments({ status: 'pending' }),
        Feedback.countDocuments({ status: 'pending' }),
        Review.countDocuments({ status: 'pending' }),
        VideoContent.countDocuments({ status: 'published' }),
      ]);

    res.json({
      students,
      freelancers,
      admins,
      pendingVerifications,
      pendingFeedback,
      pendingReviews,
      publishedVideos,
    });
  } catch (error) {
    next(error);
  }
};

export const getPendingReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ status: 'pending' })
      .populate('reviewerId', 'fullName email')
      .populate('targetUserId', 'fullName email');
    res.json({ reviews });
  } catch (error) {
    next(error);
  }
};

export const moderateReview = async (req, res, next) => {
  try {
    const { status } = req.body;
    if (!['visible', 'removed', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid review status' });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true },
    ).populate('reviewerId', 'fullName email').populate('targetUserId', 'fullName email');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.json({ review });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role;
    }
    if (req.query.active) {
      filter.isActive = req.query.active === 'true';
    }

    const users = await User.find(filter).select('-password');
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updates = {};
    const { role, isActive, isVerified } = req.body;

    if (role) updates.role = role;
    if (typeof isActive === 'boolean') updates.isActive = isActive;
    if (typeof isVerified === 'boolean') updates.isVerified = isVerified;

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const getVerificationRequests = async (req, res, next) => {
  try {
    const requests = await VerificationRequest.find()
      .populate('user', 'fullName email role isVerified')
      .populate('reviewedBy', 'fullName email');
    res.json({ requests });
  } catch (error) {
    next(error);
  }
};

export const moderateVerificationRequest = async (req, res, next) => {
  try {
    const { status, reviewNotes } = req.body;
    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid moderation status' });
    }

    const request = await VerificationRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Verification request not found' });
    }

    request.status = status;
    request.reviewNotes = reviewNotes || request.reviewNotes;
    request.reviewedBy = req.user.id;
    await request.save();

    if (status === 'approved') {
      await User.findByIdAndUpdate(request.user, { isVerified: true });
    }

    res.json({ request });
  } catch (error) {
    next(error);
  }
};

export const getFeedback = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const feedback = await Feedback.find(filter).populate('user', 'fullName email');
    res.json({ feedback });
  } catch (error) {
    next(error);
  }
};

export const moderateFeedback = async (req, res, next) => {
  try {
    const { status, response } = req.body;
    if (!['approved', 'removed', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid feedback status' });
    }

    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      { status, response },
      { new: true, runValidators: true },
    ).populate('user', 'fullName email');

    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    res.json({ feedback });
  } catch (error) {
    next(error);
  }
};

export const getVideos = async (req, res, next) => {
  try {
    const videos = await VideoContent.find().populate('createdBy', 'fullName email');
    res.json({ videos });
  } catch (error) {
    next(error);
  }
};

export const createVideo = async (req, res, next) => {
  try {
    const { title, description, url, category, tags, status, featured } = req.body;
    const video = await VideoContent.create({
      title,
      description,
      url,
      category,
      tags: Array.isArray(tags) ? tags : tags?.split(',').map((tag) => tag.trim()).filter(Boolean),
      status: status || 'published',
      featured: !!featured,
      createdBy: req.user.id,
    });
    res.status(201).json({ video });
  } catch (error) {
    next(error);
  }
};

export const updateVideo = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.tags && typeof updates.tags === 'string') {
      updates.tags = updates.tags.split(',').map((tag) => tag.trim()).filter(Boolean);
    }

    const video = await VideoContent.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    res.json({ video });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const video = await VideoContent.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video removed successfully' });
  } catch (error) {
    next(error);
  }
};
