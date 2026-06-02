import User from '../models/User.js';
import Service from '../models/Service.js';
import Portfolio from '../models/Portfolio.js';
import Project from '../models/Project.js';
import Review from '../models/Review.js';
import { buildJwtToken } from '../services/jwtService.js';
import { validateSignup, validateLogin } from '../utils/validate.js';

const buildUserResponse = (user) => ({
  id: user.id,
  fullName: user.fullName,
  email: user.email,
  role: user.role,
  profileImage: user.profileImage,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const registerUser = async (req, res, next) => {
  try {
    const { error, value } = validateSignup(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const user = await User.create(value);
    const token = buildJwtToken({ id: user.id, role: user.role });

    res.status(201).json({ user: buildUserResponse(user), token });
  } catch (err) {
    next(err);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { error, value } = validateLogin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await User.findOne({ email: value.email }).select('+password');
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const passwordsMatch = await user.comparePassword(value.password);
    if (!passwordsMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = buildJwtToken({ id: user.id, role: user.role });
    res.json({ user: buildUserResponse(user), token });
  } catch (err) {
    next(err);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user: buildUserResponse(user) });
  } catch (err) {
    next(err);
  }
};

export const logoutUser = async (_req, res) => {
  res.json({ message: 'Logout successful' });
};

export const studentDashboard = async (req, res) => {
  res.json({ message: 'Student dashboard access granted', user: req.user });
};

export const freelancerDashboard = async (req, res) => {
  const userId = req.user.id;
  const [services, activeServices, portfolios, projects, reviews] = await Promise.all([
    Service.countDocuments({ userId }),
    Service.countDocuments({ userId, status: 'Active' }),
    Portfolio.countDocuments({ userId }),
    Project.find({ freelancerId: userId }).lean(),
    Review.find({ targetUserId: userId, status: 'visible' }).lean(),
  ]);

  const totalEarnings = projects
    .filter((project) => project.status === 'Completed')
    .reduce((sum, project) => sum + (project.servicePrice || 0), 0);

  const pendingRevenue = projects
    .filter((project) => ['Accepted', 'In Progress', 'Submitted'].includes(project.status))
    .reduce((sum, project) => sum + (project.servicePrice || 0), 0);

  const completedProjects = projects.filter((project) => project.status === 'Completed').length;
  const inProgressProjects = projects.filter((project) => project.status === 'In Progress').length;
  const submittedProjects = projects.filter((project) => project.status === 'Submitted').length;

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0;

  res.json({
    user: req.user,
    dashboard: {
      totalServices: services,
      activeServices,
      portfolioCount: portfolios,
      totalProjects: projects.length,
      completedProjects,
      inProgressProjects,
      submittedProjects,
      totalEarnings,
      pendingRevenue,
      averageRating: Number(averageRating.toFixed(2)),
      totalReviews: reviews.length,
    },
  });
};

export const adminDashboard = async (req, res) => {
  res.json({ message: 'Admin dashboard access granted', user: req.user });
};
