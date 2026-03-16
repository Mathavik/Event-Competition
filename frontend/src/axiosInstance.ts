import axios from 'axios';
const axiosInstance = axios.create({
  // Keep baseURL as server root — route paths in the frontend include `/api` already.
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});


axiosInstance.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem('token');
    if (token && req.headers) {
      req.headers['Authorization'] = `Bearer ${token}`;
    }
    return req;
  },
);
export default axiosInstance;
