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
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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

const Venue = mongoose.models.Venue || mongoose.model('Venue', VenueSchema);

// Sample venue data
const sampleVenues = [
  {
    name: "Grand Ballroom",
    description: "An elegant ballroom perfect for weddings, corporate events, and special celebrations. Features crystal chandeliers, marble floors, and a spacious dance floor.",
    address: {
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    capacity: 200,
    amenities: ["WiFi", "Air Conditioning", "Sound System", "Projector", "Catering", "Parking"],
    pricePerHour: 150,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Modern Conference Center",
    description: "State-of-the-art conference facility with the latest technology and flexible seating arrangements. Ideal for business meetings, seminars, and corporate training.",
    address: {
      street: "456 Business Ave",
      city: "Los Angeles",
      state: "CA",
      zipCode: "90210",
      country: "USA"
    },
    capacity: 100,
    amenities: ["WiFi", "Air Conditioning", "Projector", "Sound System", "Parking"],
    pricePerHour: 120,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Garden Pavilion",
    description: "Beautiful outdoor pavilion surrounded by lush gardens. Perfect for outdoor weddings, garden parties, and intimate gatherings with nature as your backdrop.",
    address: {
      street: "789 Garden Lane",
      city: "Miami",
      state: "FL",
      zipCode: "33101",
      country: "USA"
    },
    capacity: 80,
    amenities: ["WiFi", "Sound System", "Catering", "Parking"],
    pricePerHour: 100,
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Rooftop Terrace",
    description: "Stunning rooftop venue with panoramic city views. Features modern amenities and an open-air design perfect for cocktail parties and evening events.",
    address: {
      street: "321 Sky High Blvd",
      city: "Chicago",
      state: "IL",
      zipCode: "60601",
      country: "USA"
    },
    capacity: 150,
    amenities: ["WiFi", "Sound System", "Parking", "Air Conditioning"],
    pricePerHour: 180,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Historic Library Hall",
    description: "Charming historic venue with classic architecture and vintage charm. Perfect for intimate weddings, book launches, and cultural events.",
    address: {
      street: "654 Heritage Street",
      city: "Boston",
      state: "MA",
      zipCode: "02101",
      country: "USA"
    },
    capacity: 60,
    amenities: ["WiFi", "Sound System", "Parking"],
    pricePerHour: 90,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Waterfront Event Space",
    description: "Spectacular waterfront venue with floor-to-ceiling windows offering breathtaking water views. Ideal for upscale events and celebrations.",
    address: {
      street: "987 Waterfront Drive",
      city: "Seattle",
      state: "WA",
      zipCode: "98101",
      country: "USA"
    },
    capacity: 120,
    amenities: ["WiFi", "Air Conditioning", "Sound System", "Projector", "Catering", "Parking"],
    pricePerHour: 160,
    images: [
      "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800"
    ],
    unavailableDates: []
  }
];

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
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed. Use POST to seed database.' });
  }

  try {
    await connectToDatabase();

    // Clear existing venues
    await Venue.deleteMany({});
    console.log('Cleared existing venues');

    // Insert sample venues
    const insertedVenues = await Venue.insertMany(sampleVenues);
    console.log(`Inserted ${insertedVenues.length} sample venues`);

    return res.status(200).json({
      message: 'Database seeded successfully!',
      venuesAdded: insertedVenues.length,
      venues: insertedVenues.map(venue => ({
        id: venue._id,
        name: venue.name,
        city: venue.address.city,
        state: venue.address.state
      }))
    });

  } catch (error) {
    console.error('Seed Error:', error);
    return res.status(500).json({ 
      message: 'Failed to seed database', 
      error: error.message 
    });
  }
}