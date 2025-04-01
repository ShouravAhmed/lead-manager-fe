import axios from 'axios';

const API = axios.create({ baseURL: 'https://lead-manager-d9jy.onrender.com' });

API.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(response => response, async (error) => {
  if (error.response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await axios.post('/api/auth/refresh-token', { refreshtoken: refreshToken });
    localStorage.setItem('accessToken', res.data.accessToken);
    error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
    return axios(error.config);
  }
  return Promise.reject(error);
});

export default API;
