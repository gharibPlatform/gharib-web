import api from "../api";

const API_BASE_URL = "http://localhost";

export const getGroupAuth = async () => {
  try {
    const response = await api.get(`${API_BASE_URL} / group / auth / `);
    return response.data;
  } catch (error) {
    console.error("Error getting group auth:", error);
    throw error;
  }
};
