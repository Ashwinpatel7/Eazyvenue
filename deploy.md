# 🚀 VenueVista - Quick Deployment Guide

## One-Click Deployment to Vercel

### Prerequisites
- Vercel account (free at https://vercel.com)
- MongoDB Atlas connection string

### Deploy Steps

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Set Environment Variable**
   - Go to Vercel Dashboard → Project Settings → Environment Variables
   - Add: `MONGODB_URI` = `your-mongodb-connection-string`

4. **Seed Database**
   ```bash
   curl -X POST https://your-app.vercel.app/api/seed
   ```

## Environment Variables Required

```env
MONGODB_URI=mongodb+srv://admin:Ashwin2029A@cluster0.3lrfhgc.mongodb.net/venue-booking?retryWrites=true&w=majority&appName=Cluster0
```

## Features Ready for Demo

✅ **8 Beautiful Indian Venues** - From Mumbai to Kerala
✅ **Responsive Design** - Works on all devices  
✅ **Admin Dashboard** - Add/manage venues
✅ **Real-time Booking** - Availability checking
✅ **Indian Branding** - VenueVista with ₹ pricing
✅ **Professional UI** - Material-UI design

## API Endpoints

- `GET /api/venues` - List all venues
- `POST /api/venues` - Add new venue  
- `POST /api/bookings` - Create booking
- `POST /api/seed` - Populate sample data

## Tech Stack

- **Frontend**: React + Material-UI
- **Backend**: Vercel Serverless Functions
- **Database**: MongoDB Atlas
- **Deployment**: Vercel

---

**VenueVista is ready for production! 🏛️**