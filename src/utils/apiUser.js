import api from './api';

export const blockUser = async (userId) => {
  try {
    const response = await api.post(`/api/block-user/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error blocking user:', error);
    throw error;
  }
};

export const deleteBrother = async (userId) => {
  try {
    const response = await api.delete(`/api/delete-brother/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting brother:', error);
    throw error;
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await api.post(`/api/delete/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting user account:', error);
    throw error;
  }
};

export const getFcmDevice = async () => {
  try {
    const response = await api.get('/api/fcm-device/');
    return response.data;
  } catch (error) {
    console.error('Error retrieving FCM device info:', error);
    throw error;
  }
};

export const getBlockedUsers = async () => {
  try {
    const response = await api.get('/api/list-blocked/');
    return response.data;
  } catch (error) {
    console.error('Error retrieving blocked users:', error);
    throw error;
  }
};

export const getFriends = async () => {
  try {
    const response = await api.get('/api/list-friends/');
    return response.data;
  } catch (error) {
    console.error('Error retrieving friends list:', error);
    throw error;
  }
};

export const getMutualBrothers = async (userId) => {
  try {
    const response = await api.get(`/api/mutual-brother/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving mutual brothers:', error);
    throw error;
  }
};

export const getUserSettings = async (userId) => {
  try {
    const response = await api.get(`/api/usersettings/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving user settings:', error);
    throw error;
  }
};

export const updateUserSettingsPut = async (userId, settings) => {
  try {
    const response = await api.put(`/api/usersettings/${userId}/`, settings);
    return response.data;
  } catch (error) {
    console.error('Error updating user settings with PUT:', error);
    throw error;
  }
};

export const updateUserSettingsPatch = async (userId, settings) => {
  try {
    const response = await api.patch(`/api/usersettings/${userId}/`, settings);
    return response.data;
  } catch (error) {
    console.error('Error updating user settings with PATCH:', error);
    throw error;
  }
};

export const googleAuthPost = async (code) => {
  try {
    const response = await api.post('/auth/google/', code);
    return response.data;
  } catch (error) {
    console.error('Error exchanging Google code:', error);
    throw error;
  }
};

export const reportUser = async ({ reported_user, category, description }) => {
  try {
    const response = await api.post("/report/", {
      reported_user,
      category,
      description,
    });

    return response.data;
  } catch (error) {
    console.error("Error reporting user:", error);
    throw error;
  }
};