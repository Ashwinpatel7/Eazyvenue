import axios from 'axios';

// For Vercel deployment, API calls will be relative to the current domain
const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;