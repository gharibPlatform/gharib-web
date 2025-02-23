import axios from "axios";

const API_BASE_URL = "https://your-api-url.com";

// Group APIs
export const getGroups = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/group/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createGroup = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/group/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGroup = async (data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/group/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchGroup = async (data) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/group/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGroup = async () => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/group/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Group Members
export const addMemberToGroup = async (groupId, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/group/add-member-group/${groupId}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeMemberFromGroup = async (groupId, userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/group/remove-member-group/${groupId}/${userId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Group Authentication
export const getGroupAuth = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/group/auth/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Member Role Management
export const changeMemberRole = async (groupId, userId, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/group/change-member-role/${groupId}/${userId}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Group Code Info
export const getGroupCodeInfo = async (groupId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/group/code-info/${groupId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGroupCodeInfo = async (groupId, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/group/code-info/${groupId}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchGroupCodeInfo = async (groupId, data) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/group/code-info/${groupId}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteGroupCodeInfo = async (groupId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/group/code-info/${groupId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Group Code Management
export const deactivateGroupCode = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/group/deactivate-group-code/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const generateGroupCode = async () => {
  try {
    const response = await axios.post(`${API_BASE_URL}/group/generate-group-code/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Group Settings
export const getGroupSettings = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/group/group-settings/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateGroupSettings = async (id, data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/group/group-settings/${id}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const patchGroupSettings = async (id, data) => {
  try {
    const response = await axios.patch(`${API_BASE_URL}/group/group-settings/${id}/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Group Joining
export const joinGroupByCode = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/group/join-group-by-code/`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Group Media
export const uploadGroupMedia = async (groupId, formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/group/media/${groupId}/`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Group Messages
export const getGroupMessages = async (groupId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/group/messages/${groupId}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
