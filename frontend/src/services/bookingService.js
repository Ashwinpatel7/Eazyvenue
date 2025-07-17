import api from './api';

const API_URL = '/bookings';

// Get all bookings
export const getAllBookings = async () => {
  try {
    const response = await api.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

// Get booking by ID
export const getBookingById = async (id) => {
  try {
    const response = await api.get(`${API_URL}?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching booking with ID ${id}:`, error);
    throw error;
  }
};

// Create a new booking
export const createBooking = async (bookingData) => {
  try {
    const response = await api.post(API_URL, bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Update booking status
export const updateBookingStatus = async (id, status) => {
  try {
    const response = await api.patch(`${API_URL}?id=${id}`, { status });
    return response.data;
  } catch (error) {
    console.error(`Error updating status for booking with ID ${id}:`, error);
    throw error;
  }
};

// Cancel booking
export const cancelBooking = async (id) => {
  try {
    const response = await api.delete(`${API_URL}?id=${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error cancelling booking with ID ${id}:`, error);
    throw error;
  }
};