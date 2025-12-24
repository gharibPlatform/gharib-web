// utils/api.js
import axios from "axios";
import { refreshToken } from "./userAuth";

const API_BASE_URL = "http://localhost";

const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const skipAuthPaths = [
      '/auth/login/',
      '/auth/registration/',
      '/auth/token/refresh/',
      '/auth/password/reset/',
      '/auth/password/reset/confirm/'
    ];

    // Only attach token if route is NOT in skip list
    const shouldAttachToken = !skipAuthPaths.some(path => config.url?.includes(path));

    if (shouldAttachToken) {
      const token = localStorage.getItem("access_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Attach CSRF token from cookies if available
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
  (error) => Promise.reject(error)
);

// Handle token refresh when 401 occurs
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const skipRefreshPaths = [
        '/auth/login/',
        '/auth/registration/',
        '/auth/token/refresh/'
      ];
      if (skipRefreshPaths.some(path => originalRequest.url?.includes(path))) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        const refreshTokenValue = localStorage.getItem("refresh_token");
        if (!refreshTokenValue) {
          throw new Error("No refresh token");
        }

        const { access } = await refreshToken({ refresh: refreshTokenValue });
        if (!access) {
          throw new Error("No access token received");
        }

        localStorage.setItem("access_token", access);
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);

        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';

        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
