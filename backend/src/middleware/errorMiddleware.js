export const notFoundHandler = (req, res) => {
  res.status(404).json({ message: 'Route not found' });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, _req, res, _next) => {
  console.error(err);
  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Internal server error';

  if (err.name === 'ValidationError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate field value entered' });
  }

  res.status(statusCode).json({ message });
};
