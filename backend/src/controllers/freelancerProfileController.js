import FreelancerProfile from '../models/FreelancerProfile.js';
import Review from '../models/Review.js';
import Service from '../models/Service.js';
import Portfolio from '../models/Portfolio.js';
import Project from '../models/Project.js';

const buildFreelancerSummary = async (userId) => {
  const [reviews, services, portfolios, completedProjects] = await Promise.all([
    Review.find({ targetUserId: userId, status: 'visible' }).lean(),
    Service.countDocuments({ userId }),
    Portfolio.countDocuments({ userId }),
    Project.find({ freelancerId: userId, status: 'Completed' }).lean(),
  ]);

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;
  const totalEarnings = completedProjects.reduce((sum, project) => sum + (project.servicePrice || 0), 0);

  return {
    averageRating: Number(averageRating.toFixed(2)),
    totalReviews: reviews.length,
    totalServices: services,
    portfolioCount: portfolios,
    completedProjects: completedProjects.length,
    totalEarnings,
    latestReviews: reviews.slice(0, 4),
  };
};

export const getFreelancerProfile = async (req, res, next) => {
  try {
    const profile = await FreelancerProfile.findOne({ userId: req.user.id });
    const summary = await buildFreelancerSummary(req.user.id);

    if (!profile) {
      return res.json({
        profile: {
          userId: req.user.id,
          bio: '',
          skills: [],
          experienceLevel: 'Intermediate',
          portfolioLinks: [],
          socialLinks: { linkedin: '', github: '', website: '', twitter: '' },
          availabilityStatus: 'Available',
          profileImage: req.user.profileImage || '',
        },
        summary,
      });
    }

    return res.json({ profile, summary });
  } catch (error) {
    next(error);
  }
};

export const getFreelancerProfileByUserId = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const profile = await FreelancerProfile.findOne({ userId });
    if (!profile) {
      return res.status(404).json({ message: 'Freelancer profile not found' });
    }

    const summary = await buildFreelancerSummary(userId);
    return res.json({ profile, summary });
  } catch (error) {
    next(error);
  }
};

export const updateFreelancerProfile = async (req, res, next) => {
  try {
    const updates = {
      bio: req.body.bio || '',
      skills: Array.isArray(req.body.skills) ? req.body.skills : [],
      experienceLevel: req.body.experienceLevel || 'Intermediate',
      portfolioLinks: Array.isArray(req.body.portfolioLinks) ? req.body.portfolioLinks : [],
      socialLinks: {
        linkedin: req.body.socialLinks?.linkedin || '',
        github: req.body.socialLinks?.github || '',
        website: req.body.socialLinks?.website || '',
        twitter: req.body.socialLinks?.twitter || '',
      },
      availabilityStatus: req.body.availabilityStatus || 'Available',
      profileImage: req.body.profileImage || req.user.profileImage || '',
    };

    const profile = await FreelancerProfile.findOneAndUpdate(
      { userId: req.user.id },
      updates,
      { new: true, upsert: true, setDefaultsOnInsert: true },
    );

    return res.json({ profile });
  } catch (error) {
    next(error);
  }
};
