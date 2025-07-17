# 🏛️ VenueVista - India's Premier Venue Booking Platform

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/venuevista-india)

A modern venue booking platform showcasing India's most beautiful venues - from royal palaces to serene backwaters. Built with React, Material-UI, and MongoDB, deployed on Vercel.

## ✨ Live Demo Features

🏛️ **8 Stunning Indian Venues** - From Mumbai's Rajmahal Palace to Kerala's Backwaters  
💰 **Indian Pricing** - All prices in ₹ (Rupees)  
📱 **Responsive Design** - Perfect on mobile and desktop  
👨‍💼 **Admin Dashboard** - Complete venue management  
🔍 **Smart Search** - Filter by city, price, capacity  
📅 **Date Management** - Block/unblock venue dates  

## 🚀 Quick Deploy to Vercel

### One-Click Deployment
1. **Fork this repository**
2. **Connect to Vercel** - Import your GitHub repo
3. **Add Environment Variable**:
   - `MONGODB_URI` = `your-mongodb-atlas-connection-string`
4. **Deploy** - Vercel will build and deploy automatically
5. **Seed Database** - Visit `/api/seed` to populate venues

### Manual Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod

# Add environment variable in Vercel dashboard
# Then seed database
curl -X POST https://your-app.vercel.app/api/seed
```

## 🏛️ Featured Indian Venues

1. **Rajmahal Palace Banquet** (Mumbai) - ₹8,000/hour
2. **Lotus Garden Resort** (Udaipur) - ₹6,500/hour  
3. **Taj Convention Center** (Gurgaon) - ₹5,500/hour
4. **Skyline Terrace Mumbai** - ₹12,000/hour
5. **Heritage Haveli Jaipur** - ₹4,500/hour
6. **Backwater Bliss Kerala** - ₹3,500/hour
7. **Golden Temple Banquet** (Amritsar) - ₹7,000/hour
8. **Mysore Palace Gardens** - ₹5,000/hour

## 🛠️ Tech Stack

- **Frontend**: React 18 + Material-UI + React Router
- **Backend**: Vercel Serverless Functions
- **Database**: MongoDB Atlas
- **Deployment**: Vercel
- **Styling**: Custom CSS + Material-UI Theme

## 📱 Core Features

### User Features
- Browse beautiful Indian venues
- Advanced filtering (city, price, capacity)
- Detailed venue information with image galleries
- Real-time booking with availability checking
- Mobile-responsive design

### Admin Features  
- Add new venues with rich details
- Manage venue availability (block/unblock dates)
- View and manage all bookings
- Professional dashboard interface

## 🔌 API Endpoints

```
GET    /api/venues     - List all venues
POST   /api/venues     - Add new venue
PATCH  /api/venues     - Update venue availability
GET    /api/bookings   - List all bookings  
POST   /api/bookings   - Create new booking
POST   /api/seed       - Populate sample data
```

## 💡 Future Enhancements

### User Analytics
- Track search patterns and popular venues
- Implement personalized recommendations
- Generate usage heatmaps and insights

### Advanced Features
- Calendar view for availability management
- Role-based authentication system
- Payment gateway integration
- Email notifications and confirmations

### Business Intelligence
- Revenue analytics and forecasting
- Venue performance metrics
- Custom reporting for venue owners

## 🎯 Perfect for Portfolios

This project demonstrates:
- **Full-Stack Development** - React frontend + Node.js backend
- **Modern UI/UX** - Material-UI with custom Indian theme
- **Database Design** - MongoDB with complex relationships
- **API Development** - RESTful APIs with proper error handling
- **Cloud Deployment** - Serverless architecture on Vercel
- **Responsive Design** - Mobile-first approach

## 📝 Environment Variables

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/venue-booking
```

---

**🏛️ VenueVista - Discover India's Finest Venues**  
*Built with ❤️ using modern web technologies*