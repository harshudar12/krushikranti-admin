// src/lib/axios.js
import axios from 'axios';

// 1. Create the Axios Instance
// We use the environment variable we just set up in .env
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, 
  timeout: 15000, // 15 seconds timeout (Good practice for enterprise apps)
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 2. Request Interceptor (The "Security Guard")
// Before any request is sent, this code runs automatically.
apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the JWT token from local storage
    const token = localStorage.getItem('kk_admin_token');
    
    // If a token exists, attach it to the Authorization header
    // Spring Boot Security expects: "Authorization: Bearer <token>"
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 3. Response Interceptor (The "ErrorHandler")
// When the backend responds, this code runs automatically.
apiClient.interceptors.response.use(
  (response) => {
    // If the response is successful (Status 200-299), just return data
    return response;
  },
  (error) => {
    // Handle specific error codes globally
    
    // 401 Unauthorized: Token expired or invalid
    if (error.response && error.response.status === 401) {
      console.warn('Session expired. Redirecting to login...');
      
      // Clear the invalid token
      localStorage.removeItem('kk_admin_token');
      
      // Force redirect to login page
      // Using window.location ensures a full refresh, clearing memory
      window.location.href = '/login';
    }

    // 403 Forbidden: User doesn't have permission (e.g., Role issues)
    if (error.response && error.response.status === 403) {
      console.error('Access Denied: You do not have permission.');
      // Optional: You could trigger a toast notification here
    }

    // 500 Server Error: Spring Boot crashed or had an exception
    if (error.response && error.response.status >= 500) {
      console.error('System Error: Please contact the backend team.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;