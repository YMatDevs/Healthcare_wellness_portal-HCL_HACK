import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://10.110.176.144:8000/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = "auth/login";
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  verify: () => api.get("/auth/me"),
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.post("/auth/logout"),
  register: (credentials) => api.post("/auth/register", credentials),
};