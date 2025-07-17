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

// Sample venue data - Indian venues
const sampleVenues = [
  {
    name: "Rajmahal Palace Banquet",
    description: "An elegant royal palace perfect for weddings, corporate events, and special celebrations. Features crystal chandeliers, marble floors, and a spacious dance floor.",
    address: {
      street: "123 Palace Road",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      country: "India"
    },
    capacity: 200,
    amenities: ["WiFi", "Air Conditioning", "Sound System", "Projector", "Catering", "Parking"],
    pricePerHour: 8000,
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Lotus Garden Resort",
    description: "Beautiful resort surrounded by lotus gardens and water features. Perfect for outdoor weddings and celebrations with nature as your backdrop.",
    address: {
      street: "456 Lake Road",
      city: "Udaipur",
      state: "Rajasthan",
      zipCode: "313001",
      country: "India"
    },
    capacity: 150,
    amenities: ["WiFi", "Air Conditioning", "Sound System", "Catering", "Parking", "Swimming Pool"],
    pricePerHour: 6500,
    images: [
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Taj Convention Center",
    description: "State-of-the-art convention facility with the latest technology and flexible seating arrangements. Ideal for business meetings, seminars, and corporate training.",
    address: {
      street: "789 Business Avenue",
      city: "Gurgaon",
      state: "Haryana",
      zipCode: "122001",
      country: "India"
    },
    capacity: 300,
    amenities: ["WiFi", "Air Conditioning", "Projector", "Sound System", "Parking"],
    pricePerHour: 5500,
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800",
      "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Skyline Terrace Mumbai",
    description: "Stunning rooftop venue with panoramic city views. Features modern amenities and an open-air design perfect for cocktail parties and evening events.",
    address: {
      street: "321 Sky High Tower",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400002",
      country: "India"
    },
    capacity: 150,
    amenities: ["WiFi", "Sound System", "Parking", "Air Conditioning"],
    pricePerHour: 12000,
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Heritage Haveli Jaipur",
    description: "Charming historic venue with classic architecture and vintage charm. Perfect for intimate weddings, cultural events, and traditional celebrations.",
    address: {
      street: "654 Heritage Street",
      city: "Jaipur",
      state: "Rajasthan",
      zipCode: "302001",
      country: "India"
    },
    capacity: 80,
    amenities: ["WiFi", "Sound System", "Parking", "Traditional Decor"],
    pricePerHour: 4500,
    images: [
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800"
    ],
    unavailableDates: []
  },
  {
    name: "Backwater Bliss Kerala",
    description: "Spectacular waterfront venue with breathtaking backwater views. Ideal for destination weddings and upscale events in God's own country.",
    address: {
      street: "987 Backwater Drive",
      city: "Alleppey",
      state: "Kerala",
      zipCode: "688001",
      country: "India"
    },
    capacity: 100,
    amenities: ["WiFi", "Air Conditioning", "Sound System", "Catering", "Parking", "Boat Access"],
    pricePerHour: 3500,
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

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Allow both GET and POST for easier testing
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed. Use POST or GET to seed database.' });
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