// auth.js
import api from './api'; //custom axios instance with interceptors 

const API_BASE_URL = 'http://localhost:8000';

// Google authentication
export async function googleAuth(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/google/`, data);
    return response.data;
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    throw error;
  }
}

// Login - stores tokens automatically via interceptors
export async function login(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/login/`, data);
    
    // Store tokens (interceptor will use these for future requests)
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// Logout - clears tokens
export async function logout() {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/logout/`);
    
    // Clear tokens
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Change password
export async function changePassword(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/password/change/`, data);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
}

export async function resetPassword(email) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/password/reset/`, { email });
    return response.data;
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw error;
  }
}

export async function resetPasswordConfirm(uid, token, new_password1, new_password2) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/password/reset/confirm/`, {
      uid,
      token,
      new_password1,
      new_password2
    });
    return response.data;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
}

// User registration
export async function registerUser(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/registration/`, data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

// Resend email verification
export async function resendEmailVerification(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/registration/resend-email/`, data);
    return response.data;
  } catch (error) {
    console.error('Error resending email verification:', error);
    throw error;
  }
}

// Verify email
export async function verifyEmail(key) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/registration/verify-email/`, { key });
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
}

// Refresh token - now handled automatically by interceptors
export async function refreshToken(refresh) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/token/refresh/`, { refresh });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

// Verify token
export async function verifyToken(token) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/token/verify/`, { token });
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
}

// Get user data - uses auth header automatically
export async function getUserData() {
  try {
    const response = await api.get(`${API_BASE_URL}/auth/user/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error;
  }
}

// Update user data (PUT)
export async function updateUserDataPut(data) {
  try {
    const response = await api.put(`${API_BASE_URL}/auth/user/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data with PUT:', error);
    throw error;
  }
}

// Update user data (PATCH)
export async function updateUserDataPatch(data) {
  try {
    const response = await api.patch(`${API_BASE_URL}/auth/user/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data with PATCH:', error);
    throw error;
  }
}

//To check auth status 
export async function checkAuth() {
  const token = localStorage.getItem('access_token');
  if (!token) return false;
  
  try {
    await verifyToken(token);
    return true;
  } catch {
    return false;
  }
}