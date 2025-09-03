import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const token = localStorage.getItem('a_t');
console.log(token)

const axiosRaw = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
});

export default axiosRaw;