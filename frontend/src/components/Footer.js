import React from 'react';
import { Box, Container, Typography, Link, Grid } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.grey[200],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #FF6B35, #F7931E)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              🏛️ VenueVista
            </Typography>
            <Typography variant="body2" color="text.secondary">
              India's premier venue booking platform - Discover, Book, Celebrate
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" display="block">Home</Link>
            <Link href="/venues" color="inherit" display="block">Venues</Link>
            <Link href="/admin/manage-venues" color="inherit" display="block">Admin</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Email: hello@venuevista.in
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Phone: +91 98765 43210
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://www.venuevista.in/" sx={{ fontWeight: 600 }}>
              VenueVista
            </Link>{' '}
            {new Date().getFullYear()}
            {'. Made with ❤️ in India'}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;