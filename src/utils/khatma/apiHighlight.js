import api from "../api";
const API_BASE_URL = "http://localhost:8000";

//Highlights

export const getHighlights = async () => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/highlights/khatma/`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting highlights:", error);
    throw error;
  }
};

export const getHighlightById = async (id) => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/highlights/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting highlights:", error);
    throw error;
  }
};

export const createHighlights = async (data) => {
  try {
    const response = await api.post(
      `${API_BASE_URL}/highlights/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating highlights:", error);
    throw error;
  }
};

export const updateHighlights = async (id, data) => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/highlights/${id}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating highlights:", error);
    throw error;
  }
};

export const patchHighlights = async (id, data) => {
  try {
    const response = await api.patch(
      `${API_BASE_URL}/highlights/${id}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error patching highlights:", error);
    throw error;
  }
};

export const deleteHighlights = async (id) => {
  try {
    const response = await api.delete(
      `${API_BASE_URL}/highlights/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting highlights:", error);
    throw error;
  }
};