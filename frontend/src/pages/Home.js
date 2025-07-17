import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Grid,
  Container,
  Card,
  CardContent,
  CardMedia
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PaymentIcon from '@mui/icons-material/Payment';
import { getAllVenues } from '../services/venueService';

function Home() {
  const [featuredVenues, setFeaturedVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedVenues = async () => {
      try {
        const venues = await getAllVenues();
        // Get 3 random venues to feature
        const randomVenues = venues.sort(() => 0.5 - Math.random()).slice(0, 3);
        setFeaturedVenues(randomVenues);
      } catch (error) {
        console.error('Error fetching featured venues:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedVenues();
  }, []);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        className="hero-section"
        sx={{
          py: 10,
          mb: 8,
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              mb: 3,
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            🏛️ Discover India's Finest Venues
          </Typography>
          <Typography 
            variant="h5" 
            component="p" 
            sx={{ 
              mb: 5, 
              opacity: 0.95,
              fontWeight: 400,
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            From majestic palaces to modern banquet halls - find the perfect venue for your special moments
          </Typography>
          <Button
            component={RouterLink}
            to="/venues"
            variant="contained"
            size="large"
            sx={{ 
              px: 6, 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 600,
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.3)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            🔍 Explore Venues
          </Button>
        </Container>
      </Box>

      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          How It Works
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <SearchIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <CardContent>
                <Typography variant="h5" component="h3" align="center" gutterBottom>
                  Search
                </Typography>
                <Typography variant="body1" align="center">
                  Browse our collection of venues and find the perfect match for your event needs.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <EventAvailableIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <CardContent>
                <Typography variant="h5" component="h3" align="center" gutterBottom>
                  Book
                </Typography>
                <Typography variant="body1" align="center">
                  Select your preferred date and time, and book your venue in just a few clicks.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
              <PaymentIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
              <CardContent>
                <Typography variant="h5" component="h3" align="center" gutterBottom>
                  Enjoy
                </Typography>
                <Typography variant="body1" align="center">
                  Receive instant confirmation and get ready for your event with peace of mind.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Featured Venues Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" component="h2" align="center" gutterBottom>
          Featured Venues
        </Typography>
        {loading ? (
          <Typography align="center">Loading featured venues...</Typography>
        ) : (
          <Grid container spacing={4} sx={{ mt: 2 }}>
            {featuredVenues.map((venue) => (
              <Grid item key={venue._id} xs={12} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={venue.images && venue.images.length > 0 ? venue.images[0] : 'https://via.placeholder.com/400x200?text=Venue'}
                    alt={venue.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h3">
                      {venue.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {venue.description.substring(0, 100)}...
                    </Typography>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      ₹{venue.pricePerHour}/hour
                    </Typography>
                  </CardContent>
                  <Box sx={{ p: 2, pt: 0 }}>
                    <Button
                      component={RouterLink}
                      to={`/venues/${venue._id}`}
                      variant="outlined"
                      fullWidth
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={RouterLink}
            to="/venues"
            variant="contained"
            color="primary"
            size="large"
          >
            View All Venues
          </Button>
        </Box>
      </Container>

      {/* Call to Action for Venue Owners */}
      <Box
        sx={{
          bgcolor: 'secondary.light',
          py: 6,
          borderRadius: 2,
          textAlign: 'center',
          mb: 6
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" component="h2" gutterBottom>
            Own a Venue?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            List your venue on our platform and reach more customers. Manage bookings and availability with ease.
          </Typography>
          <Button
            component={RouterLink}
            to="/admin/add-venue"
            variant="contained"
            color="secondary"
            size="large"
          >
            Add Your Venue
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;