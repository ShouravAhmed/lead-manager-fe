import axios from 'axios';
import { logout } from '../services/authService';

//const API = axios.create({ baseURL: 'https://lead-manager-d9jy.onrender.com' });
const API = axios.create({ baseURL: 'http://localhost:8080' });

API.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const res = await axios.post('/api/auth/refresh-token', { refreshToken: refreshToken });
        localStorage.setItem('accessToken', res.data.accessToken);
        error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        logout();
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default API;
