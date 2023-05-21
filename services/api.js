import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888/fyp_backend/api', // Replace with your API host URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export default api;
