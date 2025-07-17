# Mini Venue Booking Dashboard

A venue booking system built for the EazyVenue.com technical assignment.

## Features

### Core Features
- **Venue Management**: Add, view, and manage venues
- **Availability Management**: Mark venues as unavailable for specific dates
- **Booking System**: Users can view available venues and make bookings
- **Automatic Updates**: System updates venue availability after bookings

### Tech Stack
- **Frontend**: React with Material-UI
- **Backend**: Vercel Serverless Functions
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

## Deployment Instructions

### Prerequisites
- A [Vercel](https://vercel.com) account
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account

### Steps to Deploy

1. **Set up MongoDB Atlas**
   - Create a new cluster
   - Create a database user
   - Get your MongoDB connection string

2. **Deploy to Vercel**
   - Fork/clone this repository to your GitHub account
   - Connect your GitHub repository to Vercel
   - Add the environment variable:
     ```
     MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/venue-booking
     ```
   - Deploy the project

3. **Seed the Database**
   - After deployment, make a POST request to `/api/seed`:
     ```
     curl -X POST https://your-vercel-app.vercel.app/api/seed
     ```

### Troubleshooting
- If venues are not displaying, check browser console for errors
- Ensure your MongoDB connection string is correct
- After deployment, you MUST seed the database by visiting `/api/seed` in your browser
- The API endpoints are now in the `pages/api` directory for Vercel compatibility

## API Endpoints

- `GET /api/venues` - Get all venues
- `GET /api/venues?id=<venueId>` - Get venue by ID
- `POST /api/venues` - Create a new venue
- `PATCH /api/venues?id=<venueId>` - Update venue availability
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create a new booking

## Future Enhancements

### User Search Activity Tracking
- Track search patterns and popular venues
- Implement personalized recommendations
- Generate usage heatmaps and insights

### Admin Analytics Dashboard
- Revenue analytics and forecasting
- Venue performance metrics
- Custom reporting for venue owners

### Calendar View for Venue Availability
- Interactive calendar interface
- Multi-view support (month, week, day)
- Color coding for availability status

### Basic Authentication
- Role-based access control
- Secure authentication for admin and venue owners

---

**Built for EazyVenue.com Technical Assignment**