// utils/api.js
import axios from "axios";
import { refreshToken } from "./userAuth";
const API_BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";")[0];
    };

    const csrfToken = getCookie("csrftoken");
    if (csrfToken) {
      config.headers["X-CSRFToken"] = csrfToken;
    }

    config.withCredentials = true;

    return config;
  },
  (error) => Promise.reject(error),
);

// Handle token refresh when 401 occurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshTokenValue = localStorage.getItem("refresh_token");
        if (!refreshTokenValue) throw new Error("No refresh token");

        const { access } = await refreshToken({ refresh: refreshTokenValue });
        localStorage.setItem("access_token", access);

        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - logout user
        // localStorage.removeItem('access_token');
        // localStorage.removeItem('refresh_token');
        // window.location.href = '/login';
        // return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
