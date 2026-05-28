import User from '../models/User.js';
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
  res.json({ message: 'Freelancer dashboard access granted', user: req.user });
};

export const adminDashboard = async (req, res) => {
  res.json({ message: 'Admin dashboard access granted', user: req.user });
};
