import api from "../api";

const API_BASE_URL = "http://localhost:8000";

export const getGroupSettings = async (groupId) => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/group/settings/${groupId}/`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting group settings:", error);
    throw error;
  }
};

export const updateGroupSettings = async (groupId, data) => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/group/settings/${groupId}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating group settings:", error);
    throw error;
  }
};

export const patchGroupSettings = async (groupId, data) => {
  try {
    const response = await api.patch(
      `${API_BASE_URL}/group/settings/${groupId}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error patching group settings:", error);
    throw error;
  }
};
