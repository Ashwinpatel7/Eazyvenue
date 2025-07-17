import mongoose from 'mongoose';

// Venue Schema
const VenueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  capacity: {
    type: Number,
    required: true
  },
  amenities: [String],
  pricePerHour: {
    type: Number,
    required: true
  },
  images: [String],
  unavailableDates: [{
    startDate: Date,
    endDate: Date,
    reason: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const Venue = mongoose.models.Venue || mongoose.model('Venue', VenueSchema);

// Database connection
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectToDatabase();

    switch (req.method) {
      case 'GET':
        if (req.query.id) {
          // Get single venue
          const venue = await Venue.findById(req.query.id);
          if (!venue) {
            return res.status(404).json({ message: 'Venue not found' });
          }
          return res.status(200).json(venue);
        } else {
          // Get all venues
          const venues = await Venue.find();
          return res.status(200).json(venues);
        }

      case 'POST':
        // Create new venue
        const newVenue = new Venue(req.body);
        const savedVenue = await newVenue.save();
        return res.status(201).json(savedVenue);

      case 'PUT':
        // Update venue
        if (!req.query.id) {
          return res.status(400).json({ message: 'Venue ID is required' });
        }
        
        const updatedVenue = await Venue.findByIdAndUpdate(
          req.query.id,
          { ...req.body, updatedAt: Date.now() },
          { new: true, runValidators: true }
        );
        
        if (!updatedVenue) {
          return res.status(404).json({ message: 'Venue not found' });
        }
        
        return res.status(200).json(updatedVenue);

      case 'PATCH':
        // Update venue availability
        if (!req.query.id) {
          return res.status(400).json({ message: 'Venue ID is required' });
        }
        
        const venue = await Venue.findById(req.query.id);
        if (!venue) {
          return res.status(404).json({ message: 'Venue not found' });
        }
        
        venue.unavailableDates = req.body.unavailableDates;
        venue.updatedAt = Date.now();
        
        const updatedAvailability = await venue.save();
        return res.status(200).json(updatedAvailability);

      case 'DELETE':
        // Delete venue
        if (!req.query.id) {
          return res.status(400).json({ message: 'Venue ID is required' });
        }
        
        const deletedVenue = await Venue.findByIdAndDelete(req.query.id);
        
        if (!deletedVenue) {
          return res.status(404).json({ message: 'Venue not found' });
        }
        
        return res.status(200).json({ message: 'Venue deleted successfully' });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}