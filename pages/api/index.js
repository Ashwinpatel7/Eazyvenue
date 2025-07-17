export default function handler(req, res) {
  res.status(200).json({ 
    message: 'API is working!',
    endpoints: [
      { path: '/api/venues', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'] },
      { path: '/api/bookings', methods: ['GET', 'POST', 'PATCH', 'DELETE'] },
      { path: '/api/seed', methods: ['GET', 'POST'] }
    ]
  });
}