import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Link
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  { title: 'Home', path: '/' },
  { title: 'Venues', path: '/venues' }
];

const adminPages = [
  { title: 'Add Venue', path: '/admin/add-venue' },
  { title: 'Manage Venues', path: '/admin/manage-venues' }
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenAdminMenu = (event) => {
    setAnchorElAdmin(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseAdminMenu = () => {
    setAnchorElAdmin(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '1.5rem',
              letterSpacing: '0.5px'
            }}
          >
            🏛️ VenueVista
          </Typography>

          {/* Mobile menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link
                    component={RouterLink}
                    to={page.path}
                    sx={{ textDecoration: 'none', color: 'text.primary' }}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for mobile */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              fontSize: '1.2rem'
            }}
          >
            🏛️ VenueVista
          </Typography>

          {/* Desktop menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Admin menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Button
              onClick={handleOpenAdminMenu}
              sx={{ color: 'white' }}
            >
              Admin
            </Button>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-admin"
              anchorEl={anchorElAdmin}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElAdmin)}
              onClose={handleCloseAdminMenu}
            >
              {adminPages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseAdminMenu}>
                  <Link
                    component={RouterLink}
                    to={page.path}
                    sx={{ textDecoration: 'none', color: 'text.primary' }}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;