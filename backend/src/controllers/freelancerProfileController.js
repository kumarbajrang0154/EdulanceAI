import FreelancerProfile from '../models/FreelancerProfile.js';

export const getFreelancerProfile = async (req, res, next) => {
  try {
    const profile = await FreelancerProfile.findOne({ userId: req.user.id });
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
      });
    }

    return res.json({ profile });
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

    return res.json({ profile });
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
