import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import VenueList from './pages/VenueList';
import VenueDetails from './pages/VenueDetails';
import AddVenue from './pages/AddVenue';
import ManageVenues from './pages/ManageVenues';

// Create Indian-inspired theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B35', // Saffron Orange
      light: '#FF8A65',
      dark: '#E64A19',
    },
    secondary: {
      main: '#4CAF50', // Indian Green
      light: '#81C784',
      dark: '#388E3C',
    },
    background: {
      default: '#FFF8E1', // Warm cream
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2E2E2E',
      secondary: '#5D4037',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2.8rem',
      fontWeight: 600,
      color: '#2E2E2E',
    },
    h2: {
      fontSize: '2.2rem',
      fontWeight: 600,
      color: '#2E2E2E',
    },
    h3: {
      fontSize: '1.8rem',
      fontWeight: 500,
      color: '#2E2E2E',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
      color: '#FF6B35',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #4CAF50 100%)',
          boxShadow: '0 4px 20px rgba(255, 107, 53, 0.3)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 48px rgba(255, 107, 53, 0.2)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '10px 24px',
        },
        contained: {
          background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
          '&:hover': {
            background: 'linear-gradient(45deg, #E64A19, #FF6B35)',
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/venues" element={<VenueList />} />
            <Route path="/venues/:id" element={<VenueDetails />} />
            <Route path="/admin/add-venue" element={<AddVenue />} />
            <Route path="/admin/manage-venues" element={<ManageVenues />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;