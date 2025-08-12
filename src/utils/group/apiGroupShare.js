import api from "../api";

const API_BASE_URL = "http://localhost:8000";

// Group Members
export const addMemberToGroup = async (groupId, data) => {
  try {
    const response = await api.post(
      `${API_BASE_URL} / group / add - member - group / ${groupId} / `,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error adding member to group:", error);
    throw error;
  }
};

export const removeMemberFromGroup = async (groupId, userId) => {
  try {
    const response = await api.delete(
      `${API_BASE_URL} / group / remove - member - group / ${groupId} / ${userId} / `
    );
    return response.data;
  } catch (error) {
    console.error("Error removing member from group:", error);
    throw error;
  }
};

// Member Role Management
export const changeMemberRole = async (groupId, userId, data) => {
  try {
    const response = await api.post(
      `${API_BASE_URL} / group / change - member - role / ${groupId} / ${userId} / `,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error changing member role:", error);
    throw error;
  }
};

// Group Code Info
export const getGroupCodeInfo = async (groupId) => {
  try {
    const response = await api.get(
      `${API_BASE_URL} / group / code - info / ${groupId} / `
    );
    return response.data;
  } catch (error) {
    console.error("Error getting group code info:", error);
    throw error;
  }
};

export const updateGroupCodeInfo = async (groupId, data) => {
  try {
    const response = await api.put(
      `${API_BASE_URL} / group / code - info / ${groupId} / `,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating group code info:", error);
    throw error;
  }
};

export const patchGroupCodeInfo = async (groupId, data) => {
  try {
    const response = await api.patch(
      `${API_BASE_URL} / group / code - info / ${groupId} / `,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error patching group code info:", error);
    throw error;
  }
};

export const deleteGroupCodeInfo = async (groupId) => {
  try {
    const response = await api.delete(
      `${API_BASE_URL} / group / code - info / ${groupId} / `
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting group code info:", error);
    throw error;
  }
};

// Group Code Management
export const deactivateGroupCode = async () => {
  try {
    const response = await api.post(
      `${API_BASE_URL} / group / deactivate - group - code / `
    );
    return response.data;
  } catch (error) {
    console.error("Error deactivating group code:", error);
    throw error;
  }
};

export const generateGroupCode = async () => {
  try {
    const response = await api.post(
      `${API_BASE_URL} / group / generate - group - code / `
    );
    return response.data;
  } catch (error) {
    console.error("Error generating group code:", error);
    throw error;
  }
};

// Group Joining
export const joinGroupByCode = async (data) => {
  try {
    const response = await api.post(
      `${API_BASE_URL} / group / join - group - by - code / `,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error joining group by code:", error);
    throw error;
  }
};
