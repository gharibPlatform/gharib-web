import api from './api'; //custom api instance

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
// login
// In your login function:
export async function login(data) {
  try {
    const response = await api.post('/auth/login/', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

    const access = response.data.access;
    const refresh = response.data.refresh;

    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);

    // Set cookies manually since we can't access Set-Cookie headers directly
    document.cookie = `access_token=${access}; path=/; max-age=${60 * 60 * 24}; sameSite=lax${process.env.NODE_ENV === 'production' ? '; secure' : ''}`;
    document.cookie = `refresh_token=${refresh}; path=/; max-age=${60 * 60 * 24 * 7}; sameSite=lax${process.env.NODE_ENV === 'production' ? '; secure' : ''}`;
    
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

// In your logout function:
export async function logout() {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/logout/`)
    
    // Clear client-side storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    
    // Clear cookies
    document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    
    return response.data
  } catch (error) {
    console.error('Logout error:', error)
    throw error
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
    const response = await api.post(`${API_BASE_URL}/auth/password/reset/`, email);
    return response.data;
  } catch (error) {
    console.error('Error sending email with error : ', error);
    throw error;
  }
}

export async function resetPasswordConfirm(password1, password2, userID, accessToken) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/password/reset/confirm/`, password1, password2, userID, accessToken);
    return response.data;
  } catch (error) {
    console.error('Error reseting the password with error : ', error);
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
export async function verifyEmail(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/registration/verify-email/`, data);
    return response.data;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
}

// Refresh token
export async function refreshToken(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/token/refresh/`, data);
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
}

// Verify token
export async function verifyToken(data) {
  try {
    const response = await api.post(`${API_BASE_URL}/auth/token/verify/`, data);
    return response.data;
  } catch (error) {
    console.error('Error verifying token:', error);
    throw error;
  }
}

// Get user data
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

// Update user data 
export async function updateUserDataPatch(data) {
  try {
    const response = await api.patch(`${API_BASE_URL}/auth/user/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating user data with PATCH:', error);
    throw error;
  }
}

// function to check auth status
export async function checkAuth() {
  // For client-side
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (!token) return false
    
    try {
      await verifyToken({ token })
      return true
    } catch {
      return false
    }
  }
  return false
}

// cookies and clearing it 
export function setAuthCookies(accessToken, refreshToken = null) {
  document.cookie = `access_token=${accessToken}; path=/; max-age=${60 * 60 * 24}` // 1 day
  if (refreshToken) {
    document.cookie = `refresh_token=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 7}` // 7 days
  }
}

export function clearAuthCookies() {
  document.cookie = 'access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  document.cookie = 'refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
}