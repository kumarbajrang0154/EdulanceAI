import User from '../models/User.js';

export const getStudentProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Only students can access this resource.' });
    }

    res.json({ user });
  } catch (err) {
    next(err);
  }
};

export const getStudentDashboardStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Only students can access this resource.' });
    }

    const stats = {
      resourcesSaved: user.stats?.resourcesSaved || 0,
      aiUsageCount: user.stats?.aiUsageCount || 0,
      resumeCount: user.stats?.resumeCount || 0,
      videosWatched: user.stats?.videosWatched || 0,
      joinedDate: user.joinedDate,
      lastActivity: user.updatedAt,
    };

    res.json({ stats, user: { id: user._id, fullName: user.fullName, email: user.email } });
  } catch (err) {
    next(err);
  }
};

export const updateStudentProfile = async (req, res, next) => {
  try {
    const { fullName, profileImage } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Only students can access this resource.' });
    }

    if (fullName) {
      user.fullName = fullName;
    }
    if (profileImage) {
      user.profileImage = profileImage;
    }

    await user.save();
    res.json({ user, message: 'Profile updated successfully' });
  } catch (err) {
    next(err);
  }
};

export const updateStudentPreferences = async (req, res, next) => {
  try {
    const { preferences } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Only students can access this resource.' });
    }

    if (preferences) {
      user.preferences = Object.assign({}, user.preferences || {}, preferences);
    }

    await user.save();
    res.json({ user, message: 'Preferences updated successfully' });
  } catch (err) {
    next(err);
  }
};

export const incrementStudentStat = async (req, res, next) => {
  try {
    const { statType } = req.params;
    const allowedStats = ['resourcesSaved', 'aiUsageCount', 'resumeCount', 'videosWatched'];

    if (!allowedStats.includes(statType)) {
      return res.status(400).json({ message: 'Invalid stat type' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Student not found' });
    }

    if (user.role !== 'student') {
      return res.status(403).json({ message: 'Access denied. Only students can access this resource.' });
    }

    user.stats[statType] = (user.stats[statType] || 0) + 1;
    await user.save();

    res.json({ stats: user.stats, message: `${statType} incremented` });
  } catch (err) {
    next(err);
  }
};
