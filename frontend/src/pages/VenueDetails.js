import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Divider,
  CircularProgress,
  Alert,
  ImageList,
  ImageListItem
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import MicIcon from '@mui/icons-material/Mic';
import TvIcon from '@mui/icons-material/Tv';

import BookingForm from '../components/BookingForm';
import { getVenueById } from '../services/venueService';

// Map amenity names to icons
const amenityIcons = {
  'WiFi': <WifiIcon />,
  'Parking': <LocalParkingIcon />,
  'Air Conditioning': <AcUnitIcon />,
  'Catering': <RestaurantIcon />,
  'Sound System': <MicIcon />,
  'Projector': <TvIcon />
};

function VenueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVenueDetails = async () => {
      try {
        setLoading(true);
        const data = await getVenueById(id);
        setVenue(data);
      } catch (err) {
        console.error('Error fetching venue details:', err);
        setError('Failed to load venue details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchVenueDetails();
  }, [id]);

  const handleBack = () => {
    navigate('/venues');
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button variant="outlined" onClick={handleBack}>
          Back to Venues
        </Button>
      </Container>
    );
  }

  if (!venue) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Venue not found
        </Alert>
        <Button variant="outlined" onClick={handleBack}>
          Back to Venues
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button variant="outlined" onClick={handleBack} sx={{ mb: 2 }}>
        Back to Venues
      </Button>

      <Grid container spacing={4}>
        {/* Venue Details */}
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {venue.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LocationOnIcon sx={{ mr: 1, color: 'text.secondary' }} />
              <Typography variant="body1">
                {venue.address.street}, {venue.address.city}, {venue.address.state}, {venue.address.zipCode}
              </Typography>
            </Box>

            {/* Image Gallery */}
            {venue.images && venue.images.length > 0 ? (
              <ImageList sx={{ mb: 3 }} cols={venue.images.length === 1 ? 1 : 2} rowHeight={300}>
                {venue.images.map((image, index) => (
                  <ImageListItem key={index}>
                    <img
                      src={image}
                      alt={`${venue.name} view ${index + 1}`}
                      loading="lazy"
                      style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            ) : (
              <Box
                sx={{
                  height: 300,
                  bgcolor: 'grey.200',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  mb: 3
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  No images available
                </Typography>
              </Box>
            )}

            <Typography variant="h5" gutterBottom>
              About this venue
            </Typography>
            <Typography variant="body1" paragraph>
              {venue.description}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom>
              Details
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PeopleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body1">
                    Capacity: {venue.capacity} people
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6} md={4}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <AccessTimeIcon sx={{ mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body1">
                    ${venue.pricePerHour}/hour
                  </Typography>
                </Box>
              </Grid>
            </Grid>

            <Typography variant="h5" gutterBottom>
              Amenities
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {venue.amenities && venue.amenities.length > 0 ? (
                venue.amenities.map((amenity, index) => (
                  <Chip
                    key={index}
                    icon={amenityIcons[amenity] || null}
                    label={amenity}
                    variant="outlined"
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No amenities listed
                </Typography>
              )}
            </Box>
          </Paper>
        </Grid>

        {/* Booking Form */}
        <Grid item xs={12} md={4}>
          <Box sx={{ position: { md: 'sticky' }, top: { md: '20px' } }}>
            <BookingForm venue={venue} />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default VenueDetails;