import axios from 'axios';


const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('a_t'); // or wherever you store your token
    if (token) {
      console.log('got token')
      config.headers['Authorization'] = `Bearer ${token}`; // Use Bearer, JWT, or whatever your auth scheme is
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);


export default axiosInstance;

