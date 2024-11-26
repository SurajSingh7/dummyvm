import mongoose from 'mongoose';

// MongoDB connection URI
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI is not defined in your environment variables.');
}

// Use a global variable to cache the database connection
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Reusing existing database connection.');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating a new database connection...');
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongooseInstance) => {
      console.log('Connected to MongoDB successfully.');
      return mongooseInstance;
    }).catch((error) => {
      console.error('Error connecting to MongoDB:', error.message);
      throw new Error('Database connection failed.');
    });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default dbConnect;
