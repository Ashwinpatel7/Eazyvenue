import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  Alert,
  Snackbar,
  FormHelperText
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createBooking } from '../services/bookingService';

function BookingForm({ venue }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: null,
    endDate: null
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleDateChange = (name, date) => {
    setFormData({
      ...formData,
      [name]: date
    });
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date and time is required';
    }
    
    if (!formData.endDate) {
      newErrors.endDate = 'End date and time is required';
    }
    
    if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
      newErrors.endDate = 'End time must be after start time';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Calculate booking duration and price
      const startDateTime = new Date(formData.startDate);
      const endDateTime = new Date(formData.endDate);
      const durationHours = (endDateTime - startDateTime) / (1000 * 60 * 60);
      const totalPrice = venue.pricePerHour * durationHours;
      
      const bookingData = {
        venue: venue._id,
        user: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        startDate: formData.startDate,
        endDate: formData.endDate,
        totalPrice
      };
      
      await createBooking(bookingData);
      
      setSnackbar({
        open: true,
        message: 'Booking created successfully!',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        startDate: null,
        endDate: null
      });
      
      // Redirect to venues page after successful booking
      setTimeout(() => {
        navigate('/venues');
      }, 2000);
      
    } catch (error) {
      console.error('Error creating booking:', error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || 'Failed to create booking. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          Book this Venue
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                label="Full Name"
                fullWidth
                required
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                name="email"
                label="Email"
                fullWidth
                required
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                name="phone"
                label="Phone Number"
                fullWidth
                value={formData.phone}
                onChange={handleChange}
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <DateTimePicker
                label="Start Date & Time"
                value={formData.startDate}
                onChange={(date) => handleDateChange('startDate', date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    error={!!errors.startDate}
                    helperText={errors.startDate}
                  />
                )}
                disablePast
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <DateTimePicker
                label="End Date & Time"
                value={formData.endDate}
                onChange={(date) => handleDateChange('endDate', date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    required
                    error={!!errors.endDate}
                    helperText={errors.endDate}
                  />
                )}
                disablePast
                disabled={loading}
              />
            </Grid>
            
            {formData.startDate && formData.endDate && formData.startDate < formData.endDate && (
              <Grid item xs={12}>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                  <Typography variant="subtitle1" color="white">
                    Booking Summary
                  </Typography>
                  <Typography variant="body2" color="white">
                    Duration: {((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60)).toFixed(1)} hours
                  </Typography>
                  <Typography variant="body2" color="white">
                    Price: ₹{(venue.pricePerHour * ((new Date(formData.endDate) - new Date(formData.startDate)) / (1000 * 60 * 60))).toFixed(2)}
                  </Typography>
                </Box>
              </Grid>
            )}
            
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? 'Processing...' : 'Book Now'}
              </Button>
              <FormHelperText>
                By booking, you agree to our terms and conditions.
              </FormHelperText>
            </Grid>
          </Grid>
        </Box>
        
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </LocalizationProvider>
  );
}

export default BookingForm;