import axios from 'axios';

const baseURL = 'http://127.0.0.1:8888/fyp_backend/api';
// const baseURL = 'http://192.168.18.191:8888/fyp_backend/api';
// const baseURL = 'http://10.0.2.2:8888/fyp_backend/api';

const api = axios.create({
  baseURL: baseURL, // Replace with your API host URL
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

export default api;
