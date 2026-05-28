import jwt from 'jsonwebtoken';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (secret) {
    return secret;
  }

  if (process.env.NODE_ENV !== 'production') {
    console.warn('Warning: JWT_SECRET is not defined. Using a development fallback secret. Set JWT_SECRET in .env for production.');
    return 'dev-secret-key-change-me';
  }

  throw new Error('JWT_SECRET must be defined in environment variables');
};

export const buildJwtToken = (payload) => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: '7d' });
};

export const verifyJwtToken = (token) => {
  return jwt.verify(token, getJwtSecret());
};
