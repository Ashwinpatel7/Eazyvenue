import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  Chip
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PeopleIcon from '@mui/icons-material/People';

function VenueCard({ venue }) {
  const navigate = useNavigate();
  
  // Default image if none provided
  const imageUrl = venue.images && venue.images.length > 0
    ? venue.images[0]
    : 'https://via.placeholder.com/400x200?text=Venue';
  
  const handleViewDetails = () => {
    navigate(`/venues/${venue._id}`);
  };
  
  return (
    <Card className="venue-card">
      <CardMedia
        component="img"
        className="venue-card-media"
        image={imageUrl}
        alt={venue.name}
      />
      <CardContent className="venue-card-content">
        <Typography gutterBottom variant="h5" component="div">
          {venue.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <LocationOnIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            {venue.address.city}, {venue.address.state}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <PeopleIcon fontSize="small" sx={{ mr: 0.5, color: 'text.secondary' }} />
          <Typography variant="body2" color="text.secondary">
            Capacity: {venue.capacity}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {venue.description.length > 100
            ? `${venue.description.substring(0, 100)}...`
            : venue.description}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
          {venue.amenities && venue.amenities.slice(0, 3).map((amenity, index) => (
            <Chip key={index} label={amenity} size="small" />
          ))}
          {venue.amenities && venue.amenities.length > 3 && (
            <Chip label={`+${venue.amenities.length - 3} more`} size="small" variant="outlined" />
          )}
        </Box>
        <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
          ₹{venue.pricePerHour}/hour
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleViewDetails}>View Details</Button>
        <Button size="small" color="primary" onClick={handleViewDetails}>
          Book Now
        </Button>
      </CardActions>
    </Card>
  );
}

export default VenueCard;