export const healthCheck = (_req, res) => {
  res.status(200).json({ status: 'ok', message: 'Edulance AI backend is healthy' });
};
