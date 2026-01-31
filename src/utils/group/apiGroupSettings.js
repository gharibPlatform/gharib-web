import api from "../api";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const getGroupSettings = async (groupId) => {
  try {
    const response = await api.get(`${API_URL}/group/settings/${groupId}/`);
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
      `${API_URL}/group/settings/${groupId}/`,
      data,
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
      `${API_URL}/group/settings/${groupId}/`,
      data,
    );
    return response.data;
  } catch (error) {
    console.error("Error patching group settings:", error);
    throw error;
  }
};
