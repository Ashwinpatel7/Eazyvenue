import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Slider,
  Pagination,
  CircularProgress,
  Paper,
  InputAdornment,
  Chip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import VenueCard from '../components/VenueCard';
import { getAllVenues } from '../services/venueService';

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination
  const [page, setPage] = useState(1);
  const venuesPerPage = 6;
  
  // Filters
  const [filters, setFilters] = useState({
    search: '',
    city: '',
    capacity: [0, 1000],
    priceRange: [0, 1000],
    sortBy: 'name'
  });
  
  // Cities for filter dropdown
  const [cities, setCities] = useState([]);
  
  useEffect(() => {
    const fetchVenues = async () => {
      try {
        setLoading(true);
        const data = await getAllVenues();
        setVenues(data);
        setFilteredVenues(data);
        
        // Extract unique cities for filter
        const uniqueCities = [...new Set(data.map(venue => venue.address.city))];
        setCities(uniqueCities);
        
        // Find max price and capacity for sliders
        const maxPrice = Math.max(...data.map(venue => venue.pricePerHour), 1000);
        const maxCapacity = Math.max(...data.map(venue => venue.capacity), 1000);
        
        setFilters(prev => ({
          ...prev,
          priceRange: [0, maxPrice],
          capacity: [0, maxCapacity]
        }));
        
      } catch (err) {
        console.error('Error fetching venues:', err);
        setError('Failed to load venues. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchVenues();
  }, []);
  
  useEffect(() => {
    // Apply filters
    let results = [...venues];
    
    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(venue => 
        venue.name.toLowerCase().includes(searchTerm) || 
        venue.description.toLowerCase().includes(searchTerm) ||
        (venue.amenities && venue.amenities.some(amenity => 
          amenity.toLowerCase().includes(searchTerm)
        ))
      );
    }
    
    // City filter
    if (filters.city) {
      results = results.filter(venue => 
        venue.address.city === filters.city
      );
    }
    
    // Capacity filter
    results = results.filter(venue => 
      venue.capacity >= filters.capacity[0] && 
      venue.capacity <= filters.capacity[1]
    );
    
    // Price filter
    results = results.filter(venue => 
      venue.pricePerHour >= filters.priceRange[0] && 
      venue.pricePerHour <= filters.priceRange[1]
    );
    
    // Sorting
    switch (filters.sortBy) {
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'price_low':
        results.sort((a, b) => a.pricePerHour - b.pricePerHour);
        break;
      case 'price_high':
        results.sort((a, b) => b.pricePerHour - a.pricePerHour);
        break;
      case 'capacity':
        results.sort((a, b) => b.capacity - a.capacity);
        break;
      default:
        break;
    }
    
    setFilteredVenues(results);
    setPage(1); // Reset to first page when filters change
  }, [filters, venues]);
  
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };
  
  const handleSliderChange = (name) => (event, newValue) => {
    setFilters({
      ...filters,
      [name]: newValue
    });
  };
  
  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Calculate pagination
  const indexOfLastVenue = page * venuesPerPage;
  const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
  const currentVenues = filteredVenues.slice(indexOfFirstVenue, indexOfLastVenue);
  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);
  
  const clearFilters = () => {
    setFilters({
      search: '',
      city: '',
      capacity: [0, Math.max(...venues.map(venue => venue.capacity), 1000)],
      priceRange: [0, Math.max(...venues.map(venue => venue.pricePerHour), 1000)],
      sortBy: 'name'
    });
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Find Your Perfect Venue
      </Typography>
      
      {/* Filters */}
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Search venues"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>City</InputLabel>
              <Select
                name="city"
                value={filters.city}
                onChange={handleFilterChange}
                label="City"
              >
                <MenuItem value="">All Cities</MenuItem>
                {cities.map((city) => (
                  <MenuItem key={city} value={city}>{city}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By</InputLabel>
              <Select
                name="sortBy"
                value={filters.sortBy}
                onChange={handleFilterChange}
                label="Sort By"
              >
                <MenuItem value="name">Name (A-Z)</MenuItem>
                <MenuItem value="price_low">Price (Low to High)</MenuItem>
                <MenuItem value="price_high">Price (High to Low)</MenuItem>
                <MenuItem value="capacity">Capacity (Highest)</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Price Range ($/hour)</Typography>
            <Slider
              value={filters.priceRange}
              onChange={handleSliderChange('priceRange')}
              valueLabelDisplay="auto"
              min={0}
              max={Math.max(...venues.map(venue => venue.pricePerHour), 1000)}
              marks={[
                { value: 0, label: '$0' },
                { value: Math.max(...venues.map(venue => venue.pricePerHour), 1000), label: `$${Math.max(...venues.map(venue => venue.pricePerHour), 1000)}` }
              ]}
            />
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography gutterBottom>Capacity</Typography>
            <Slider
              value={filters.capacity}
              onChange={handleSliderChange('capacity')}
              valueLabelDisplay="auto"
              min={0}
              max={Math.max(...venues.map(venue => venue.capacity), 1000)}
              marks={[
                { value: 0, label: '0' },
                { value: Math.max(...venues.map(venue => venue.capacity), 1000), label: Math.max(...venues.map(venue => venue.capacity), 1000).toString() }
              ]}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="body2">
                {filteredVenues.length} venues found
              </Typography>
              <Chip 
                label="Clear Filters" 
                onClick={clearFilters} 
                variant="outlined" 
                color="primary"
              />
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Venue List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">{error}</Typography>
      ) : filteredVenues.length === 0 ? (
        <Typography align="center" sx={{ my: 4 }}>
          No venues match your search criteria. Try adjusting your filters.
        </Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {currentVenues.map((venue) => (
              <Grid item key={venue._id} xs={12} sm={6} md={4}>
                <VenueCard venue={venue} />
              </Grid>
            ))}
          </Grid>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="primary" 
                size="large"
              />
            </Box>
          )}
        </>
      )}
    </Container>
  );
}

export default VenueList;