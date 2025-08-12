import api from "../api";

const API_BASE_URL = "http://localhost:8000";

// Group Media
export const uploadGroupMedia = async (groupId, formData) => {
  try {
    const response = await api.post(
      `${API_BASE_URL} / group / media / ${groupId} / `,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading group media:", error);
    throw error;
  }
};

// Group Messages
export const getGroupMessages = async (groupId) => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/group/messages/${groupId}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting group messages:", error);
    throw error;
  }
};
