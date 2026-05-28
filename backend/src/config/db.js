import mongoose from 'mongoose';

const isValidMongoUri = (uri) => /^mongodb(\+srv)?:\/\//i.test(uri);

const connectDatabase = async () => {
  const rawUri = process.env.MONGODB_URI?.trim();
  const placeholderPatterns = ['your_mongodb_atlas_connection_string', 'mongodb+srv://<username>:<password>@'];
  const hasPlaceholderValue = placeholderPatterns.some((pattern) => rawUri?.toLowerCase().includes(pattern.toLowerCase()));
  const uri = rawUri && isValidMongoUri(rawUri) && !hasPlaceholderValue
    ? rawUri
    : 'mongodb://127.0.0.1:27017/edulance_ai';

  const dbName = process.env.MONGODB_DB_NAME || 'edulance_ai';

  if (!uri) {
    throw new Error('MONGODB_URI must be defined in environment variables or a local MongoDB instance must be available');
  }

  try {
    if (uri !== rawUri) {
      console.warn('MONGODB_URI is not configured or appears to be a placeholder. Falling back to local MongoDB at mongodb://127.0.0.1:27017/edulance_ai');
    }
    console.log(`Connecting to MongoDB at ${uri}`);
    await mongoose.connect(uri, {
      dbName,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    throw new Error('Unable to connect to MongoDB');
  }
};

export default connectDatabase;
