import axios from 'axios';

const api = axios.create({ baseURL: 'https://your-api-url.com' });

api.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(response => response, async (error) => {
  if (error.response.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');
    const res = await axios.post('/api/auth/refresh-token', { refreshtoken: refreshToken });
    localStorage.setItem('accessToken', res.data.accessToken);
    error.config.headers.Authorization = `Bearer ${res.data.accessToken}`;
    return axios(error.config);
  }
  return Promise.reject(error);
});

export default api;
