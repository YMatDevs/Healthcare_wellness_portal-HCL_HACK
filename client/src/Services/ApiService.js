import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Logic for auto-logout if token expires
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);




export const patientApi = {
  getProfile: (id) => api.get(`/patients/${id}`),
  updateProfile: (id, data) => api.post(`/patients/${id}`, data),
};

export const providerApi = {
  getProfile: (id) => api.get(`/providers/${id}`),
  updateProfile: (id, data) => api.post(`/providers/${id}`, data),
};

export const authApi = {
  getMe: () => api.get('/auth/me'),
  login: (credentials) => api.post('/auth/login', credentials),
};