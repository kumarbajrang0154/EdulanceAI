import dotenv from 'dotenv';

dotenv.config();

import app from './app.js';
import connectDatabase from './config/db.js';

const port = process.env.PORT || 5000;

connectDatabase();

const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Set PORT to a different value or stop the other process.`);
  } else {
    console.error('Server error:', error);
  }
  throw error;
});
