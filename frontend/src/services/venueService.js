import axios from 'axios';

const API_URL = '/api/venues';

// Get all venues
export const getAllVenues = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching venues:', error);
    throw error;
  }
};

// Get venue by ID
export const getVenueById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching venue with ID ${id}:`, error);
    throw error;
  }
};

// Create a new venue
export const createVenue = async (venueData) => {
  try {
    const response = await axios.post(API_URL, venueData);
    return response.data;
  } catch (error) {
    console.error('Error creating venue:', error);
    throw error;
  }
};

// Update venue details
export const updateVenue = async (id, venueData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, venueData);
    return response.data;
  } catch (error) {
    console.error(`Error updating venue with ID ${id}:`, error);
    throw error;
  }
};

// Update venue availability
export const updateVenueAvailability = async (id, availabilityData) => {
  try {
    const response = await axios.patch(`${API_URL}/${id}/availability`, availabilityData);
    return response.data;
  } catch (error) {
    console.error(`Error updating availability for venue with ID ${id}:`, error);
    throw error;
  }
};

// Delete venue
export const deleteVenue = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting venue with ID ${id}:`, error);
    throw error;
  }
};