import api from "../api";

const API_BASE_URL = "http://localhost";

// Group APIs
export const getGroups = async (groupId) => {
  try {
    const url = groupId ? `/group/?group_id=${groupId}` : `/group/`;
    const res = await api.get(`${API_BASE_URL}${url}`);
    console.log(res);
    return groupId ? res.data : res.data.results;
  } catch (error) {
    console.error("Error creating group:", error);
  }
};

export const createGroup = async (data) => {
  try {
    const response = await api.post(`${API_BASE_URL}/group/`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating group:", error);
    throw error;
  }
};

export const updateGroup = async (data) => {
  try {
    const response = await api.put(`${API_BASE_URL}/group/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating group:", error);
    throw error;
  }
};

export const patchGroup = async (data) => {
  try {
    const response = await api.patch(`${API_BASE_URL} / group / `, data);
    return response.data;
  } catch (error) {
    console.error("Error patching group:", error);
    throw error;
  }
};

export const deleteGroup = async () => {
  try {
    const response = await api.delete(`${API_BASE_URL} / group / `);
    return response.data;
  } catch (error) {
    console.error("Error deleting group:", error);
    throw error;
  }
};
