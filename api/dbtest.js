import mongoose from 'mongoose';

// Database connection
async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

export default async function handler(req, res) {
  try {
    const connected = await connectToDatabase();
    
    if (connected) {
      return res.status(200).json({ 
        message: 'Database connection successful!',
        mongodbUri: process.env.MONGODB_URI ? 'Set (hidden for security)' : 'Not set'
      });
    } else {
      return res.status(500).json({ message: 'Failed to connect to database' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      message: 'Internal server error', 
      error: error.message 
    });
  }
}