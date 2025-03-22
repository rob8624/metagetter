import axios from 'axios';


const API_URL = process.env.BACKEND_URL  ;

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;

