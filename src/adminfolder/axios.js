import axios from "axios";
import { logout } from "@/utils/auth";

const api = axios.create({
  baseURL: "https://srishakram-backend-v2.onrender.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  res => res,
  err => {
    const status = err.response?.status;
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;

    if (status === 401 && token) {
      logout();
    }

    return Promise.reject(err);
  }
);


export default api;
