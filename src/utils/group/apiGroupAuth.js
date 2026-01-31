import api from "../api";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export const getGroupAuth = async () => {
  try {
    const response = await api.get(`${API_URL}/group/auth/`);
    return response.data;
  } catch (error) {
    console.error("Error getting group auth:", error);
    throw error;
  }
};
