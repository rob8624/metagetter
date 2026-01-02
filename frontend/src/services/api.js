import axios from 'axios';

const API_URL =
  process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// =========================
// Refresh state
// =========================
let isRefreshing = false;
let failedQueue = [];

// =========================
// REQUEST INTERCEPTOR
// =========================
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('a_t'); // access token
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  error => Promise.reject(error)
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/jwt/refresh/')
    ) {
      originalRequest._retry = true;

      // Queue requests while refresh is happening
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${token}`,
          };
          return axiosInstance(originalRequest);
        });
      }

      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem('r_t');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        const response = await axios.post(
          `${API_URL}/auth/jwt/refresh/`,
          { refresh: refreshToken }
        );

        const newAccessToken = response.data.access;

        localStorage.setItem('a_t', newAccessToken);

        // Retry queued requests
        failedQueue.forEach(prom => prom.resolve(newAccessToken));
        failedQueue = [];

        // Retry original request with new token
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return axiosInstance(originalRequest);
      } catch (err) {
        failedQueue.forEach(prom => prom.reject(err));
        failedQueue = [];

        localStorage.removeItem('a_t');
        localStorage.removeItem('r_t');
        localStorage.removeItem('loggedin');

        setTimeout(() => {
          window.location.href = '/signin?reason=sessionExpired';
        }, 500);

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
