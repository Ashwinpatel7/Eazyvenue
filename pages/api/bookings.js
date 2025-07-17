import mongoose from 'mongoose';

// Booking Schema
const BookingSchema = new mongoose.Schema({
  venue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Venue',
    required: true
  },
  user: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: String
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Venue Schema (needed for booking logic)
const VenueSchema = new mongoose.Schema({
  name: String,
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  capacity: Number,
  amenities: [String],
  pricePerHour: Number,
  images: [String],
  unavailableDates: [{
    startDate: Date,
    endDate: Date,
    reason: String
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
const Venue = mongoose.models.Venue || mongoose.model('Venue', VenueSchema);

// Database connection
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }
    
    console.log('Connecting to MongoDB with URI starting with:', process.env.MONGODB_URI.substring(0, 20) + '...');
    
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

// Helper function to check venue availability
async function checkVenueAvailability(venueId, startDate, endDate) {
  const venue = await Venue.findById(venueId);
  if (!venue) return false;
  
  const requestedStart = new Date(startDate);
  const requestedEnd = new Date(endDate);
  
  // Check if requested dates overlap with any unavailable dates
  for (const unavailable of venue.unavailableDates) {
    const unavailableStart = new Date(unavailable.startDate);
    const unavailableEnd = new Date(unavailable.endDate);
    
    if (
      (requestedStart >= unavailableStart && requestedStart < unavailableEnd) ||
      (requestedEnd > unavailableStart && requestedEnd <= unavailableEnd) ||
      (requestedStart <= unavailableStart && requestedEnd >= unavailableEnd)
    ) {
      return false; // Dates overlap, venue is not available
    }
  }
  
  return true; // Venue is available for the requested dates
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
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
          // Get single booking
          const booking = await Booking.findById(req.query.id).populate('venue');
          if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
          }
          return res.status(200).json(booking);
        } else {
          // Get all bookings
          const bookings = await Booking.find().populate('venue', 'name address');
          return res.status(200).json(bookings);
        }

      case 'POST':
        // Create new booking
        const { venue: venueId, startDate, endDate } = req.body;
        
        // Check if venue exists
        const venue = await Venue.findById(venueId);
        if (!venue) {
          return res.status(404).json({ message: 'Venue not found' });
        }
        
        // Check if venue is available for the requested dates
        const isAvailable = await checkVenueAvailability(venueId, startDate, endDate);
        if (!isAvailable) {
          return res.status(400).json({ message: 'Venue is not available for the selected dates' });
        }
        
        // Calculate total price based on venue hourly rate and booking duration
        const startDateTime = new Date(startDate);
        const endDateTime = new Date(endDate);
        const durationHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
        const totalPrice = venue.pricePerHour * durationHours;
        
        // Create new booking
        const newBooking = new Booking({
          ...req.body,
          totalPrice
        });
        
        const savedBooking = await newBooking.save();
        
        // Update venue availability
        venue.unavailableDates.push({
          startDate,
          endDate,
          reason: 'Booked'
        });
        await venue.save();
        
        return res.status(201).json(savedBooking);

      case 'PATCH':
        // Update booking status
        if (!req.query.id) {
          return res.status(400).json({ message: 'Booking ID is required' });
        }
        
        const { status } = req.body;
        
        const updatedBooking = await Booking.findByIdAndUpdate(
          req.query.id,
          { status, updatedAt: Date.now() },
          { new: true, runValidators: true }
        );
        
        if (!updatedBooking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
        
        return res.status(200).json(updatedBooking);

      case 'DELETE':
        // Cancel booking
        if (!req.query.id) {
          return res.status(400).json({ message: 'Booking ID is required' });
        }
        
        const booking = await Booking.findById(req.query.id);
        
        if (!booking) {
          return res.status(404).json({ message: 'Booking not found' });
        }
        
        booking.status = 'cancelled';
        booking.updatedAt = Date.now();
        await booking.save();
        
        // Remove the unavailable date from venue
        const venueToUpdate = await Venue.findById(booking.venue);
        if (venueToUpdate) {
          venueToUpdate.unavailableDates = venueToUpdate.unavailableDates.filter(
            date => !(date.startDate.getTime() === new Date(booking.startDate).getTime() && 
                    date.endDate.getTime() === new Date(booking.endDate).getTime())
          );
          await venueToUpdate.save();
        }
        
        return res.status(200).json({ message: 'Booking cancelled successfully', booking });

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
        return res.status(405).json({ message: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}