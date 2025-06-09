import axios from 'axios';




const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Track if we're currently refreshing the token
let isRefreshing = false;
let failedQueue = [];

// Request interceptor to add the access token
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('a_t'); // Access token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach the token
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 (Unauthorized)
axiosInstance.interceptors.response.use(
  response => response,  // Success, return the response as is
  async (error) => {
    const originalRequest = error.config;
    
    // If we get a 401 (Unauthorized) error and haven't already tried refreshing
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      // If a refresh is in progress, queue the request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axiosInstance(originalRequest);  // Retry the original request
        }).catch(err => {
          return Promise.reject(err);
        });
      }

      // Start the refresh process
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('r_t'); // Refresh token
        const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem('a_t', newAccessToken); // Save new access token
        axiosInstance.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;  // Update global axios header
        
        // Retry failed requests
        failedQueue.forEach(prom => prom.resolve(newAccessToken));
        failedQueue = [];  // Reset the queue

        return axiosInstance(originalRequest);  // Retry the original failed request
      } catch (err) {
        

        failedQueue.forEach(prom => prom.reject(err));
        failedQueue = [];  // Reset the queue
        // Handle error (perhaps redirect to login)
        console.log("Refresh token failed", err);
        localStorage.removeItem('a_t');
        localStorage.removeItem('r_t');
        localStorage.setItem('loggedin', false);
        window.location.href = '/signin?reason=sessionExpired'; // Redirect to login
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);  // For other errors, just reject the promise
  }
);




export default axiosInstance;