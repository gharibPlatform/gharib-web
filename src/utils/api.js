import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000'; 

export async function blockUser(userId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/block-user/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
}

export async function deleteBrother(userId) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/delete-brother/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting brother:', error);
    throw error;
  }
}

export async function deleteUser(userId) {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/delete/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
}

export async function getFcmDevice() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/fcm-device/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving FCM device info:', error);
    throw error;
  }
}

export async function getBlockedUsers() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/list-blocked/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving blocked users:', error);
    throw error;
  }
}

export async function getFriends() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/list-friends/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving friends list:', error);
    throw error;
  }
}

export async function getMutualBrothers(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/mutual-brother/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving mutual brothers:', error);
    throw error;
  }
}

export async function getUserSettings(userId) {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/usersettings/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving user settings:', error);
    throw error;
  }
}

export async function updateUserSettingsPut(userId, settings) {
  try {
    const response = await axios.put(`${API_BASE_URL}/api/usersettings/${userId}/`, settings);
    return response.data;
  } catch (error) {
    console.error('Error updating user settings with PUT:', error);
    throw error;
  }
}

export async function updateUserSettingsPatch(userId, settings) {
  try {
    const response = await axios.patch(`${API_BASE_URL}/api/usersettings/${userId}/`, settings);
    return response.data;
  } catch (error) {
    console.error('Error updating user settings with PATCH:', error);
    throw error;
  }
}

export async function googleAuthPost(code) {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/google/`,
      code
    );

    return response.data; 
  } catch (error) {
    console.error('Error exchanging Google code:', error);

    throw error;
  }
}