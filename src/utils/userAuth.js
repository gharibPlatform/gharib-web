import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

// Google authentication
export async function googleAuth(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/google/`, data);
    return response.data;
  } catch (error) {
    console.error('Error authenticating with Google:', error);
    throw error;
  }
}

// Login
export async function login(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login/`, data);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

// Logout
export async function logout() {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout/`);
    return response.data;
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
}

// Change password
export async function changePassword(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/password/change/`, data);
    return response.data;
  } catch (error) {
    console.error('Error changing password:', error);
    throw error;
  }
}

export async function resetPassword(email) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/password/reset/`, email);
    return response.data;
  } catch (error) {
    console.error('Error sending email with error : ', error);
    throw error;
  }
}

export async function resetPasswordConfirm(password1, password2, userID, accessToken) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/password/reset/confirm/`, password1, password2, userID, accessToken);
    return response.data;
  } catch (error) {
    console.error('Error reseting the password with error : ', error);
    throw error;
  }
}

// User registration
export async function registerUser(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/registration/`, data);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

// Resend email verification
export async function resendEmailVerification(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/registration/resend-email/`, data);
    return response.data;
  } catch (error) {
    console.error('Error resending email verification:', error);
    throw error;
  }
}

// Verify email
export async function verifyEmail(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/registration/verify-email/`, data);
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
}

// Refresh token
export async function refreshToken(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/token/refresh/`, data);
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

// Verify token
export async function verifyToken(data) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/token/verify/`, data);
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
}

// Get user data
export async function getUserData() {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/user/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    throw error;
  }
}

// Update user data (PUT)
export async function updateUserDataPut(data) {
  try {
    const response = await axios.put(`${API_BASE_URL}/auth/user/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data with PUT:', error);
    throw error;
  }
}

// Update user data (PATCH)
export async function updateUserDataPatch(data) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/auth/user/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data with PATCH:', error);
    throw error;
  }
}