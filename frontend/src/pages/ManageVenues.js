import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  CircularProgress,
  Alert
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { getAllVenues, deleteVenue } from '../services/venueService';

const ManageVenues = () => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [venueToDelete, setVenueToDelete] = useState(null);

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      setLoading(true);
      const data = await getAllVenues();
      setVenues(data);
      setError('');
    } catch (error) {
      console.error('Error fetching venues:', error);
      setError('Failed to load venues. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (venue) => {
    setVenueToDelete(venue);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!venueToDelete) return;
    
    try {
      await deleteVenue(venueToDelete._id);
      setVenues(venues.filter(venue => venue._id !== venueToDelete._id));
      setDeleteDialogOpen(false);
      setVenueToDelete(null);
    } catch (error) {
      console.error('Error deleting venue:', error);
      setError('Failed to delete venue. Please try again.');
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setVenueToDelete(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Manage Venues
        </Typography>
        <Button
          component={RouterLink}
          to="/admin/venues/add"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add New Venue
        </Button>
      </Box>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Capacity</TableCell>
              <TableCell>Price/Hour</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venues.length > 0 ? (
              venues.map((venue) => (
                <TableRow key={venue._id}>
                  <TableCell>{venue.name}</TableCell>
                  <TableCell>{venue.address.city}, {venue.address.state}</TableCell>
                  <TableCell>{venue.capacity}</TableCell>
                  <TableCell>${venue.pricePerHour}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      component={RouterLink}
                      to={`/admin/venues/edit/${venue._id}`}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      size="small"
                      onClick={() => handleDeleteClick(venue)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No venues found. Add your first venue!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the venue "{venueToDelete?.name}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageVenues;