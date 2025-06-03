import api from './api'; //custom api instance

const API_BASE_URL = 'http://localhost:8000';

// Google authentication
export async function googleAuth(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/google/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    throw error;
  }
}

// Login
export async function login(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/login/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// Logout
export async function logout() {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/logout/`); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Change password
export async function changePassword(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/password/change/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
}

export async function resetPassword(email) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/password/reset/`, email); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error sending email with error : ', error);
    throw error;
  }
}

export async function resetPasswordConfirm(password1, password2, userID, accessToken) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/password/reset/confirm/`, password1, password2, userID, accessToken); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error reseting the password with error : ', error);
    throw error;
  }
}

// User registration
export async function registerUser(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/registration/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

// Resend email verification
export async function resendEmailVerification(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/registration/resend-email/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error resending email verification:', error);
    throw error;
  }
}

// Verify email
export async function verifyEmail(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/registration/verify-email/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
}

// Refresh token
export async function refreshToken(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/token/refresh/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

// Verify token
export async function verifyToken(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/token/verify/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
}

// Get user data
export async function getUserData() {
  try {
    const response = await api.get(`${API_BASE_URL}/auth/user/`); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error;
  }
}

// Update user data (PUT)
export async function updateUserDataPut(data) {
  try {
    const response = await api.put(`${API_BASE_URL}/auth/user/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error updating user data with PUT:', error);
    throw error;
  }
}

// Update user data 
export async function updateUserDataPatch(data) {
  try {
    const response = await api.patch(`${API_BASE_URL}/auth/user/`, data); // Changed to api
    return response.data;
  } catch (error) {
    console.error('Error updating user data with PATCH:', error);
    throw error;
  }
}

// function to check auth status
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