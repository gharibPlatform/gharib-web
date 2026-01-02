import api from "../api";
const API_BASE_URL = "http://localhost";

// Khatma APIs

export const getUserKhatmaDetails = async (khatmaId) => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/khatma/${khatmaId}/membership/user/`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting user khatma membership details:", error);
    throw error;
  }
};

export const createKhatma = async (data) => {
  try {
    const response = await api.post(`${API_BASE_URL}/khatma/create/`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating khatma:", error);
    throw error;
  }
};

export const getKhatmaMembership = async (khatmaId) => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/khatma/${khatmaId}/membership/`
    );
    console.log("response is : ", response);
    return response.data;
  } catch (error) {
    console.error("Error getting khatma membership:", error);
    throw error;
  }
};

export const getKhatmaByGroup = async (groupId) => {
  try {

    const response = await api.get(`${API_BASE_URL}/khatma/group/${groupId}/`);
    console.log("response is : ", response);
    return response.data;
  } catch (error) {
    console.error("Error getting khatma from the group:", error);
    throw error;
  }
};

export const updateKhatmaMembership = async (id, data) => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/khatma/khatma-membership/${id}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating khatma membership:", error);
    throw error;
  }
};

export const postKhatmaMembership = async (khatmaId, data) => {
  try {
    const response = await api.post(
      `${API_BASE_URL}/khatma/${khatmaId}/membership/create/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error posting khatma membership:", error);
    throw error;
  }
};

export const patchKhatmaMembership = async (id, data) => {
  try {
    const response = await api.patch(
      `${API_BASE_URL}/khatma/membership/${id}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error patching khatma membership:", error);
    throw error;
  }
};

export const deleteKhatmaMembership = async (id) => {
  try {
    const response = await api.delete(
      `${API_BASE_URL}/khatma/khatma-membership/${id}/`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting khatma membership:", error);
    throw error;
  }
};

export const getKhatmaDetails = async (khatmaId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/khatma/${khatmaId}/`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error getting khatma details:", error);
    throw error;
  }
};

export const updateKhatma = async (khatmaId, data) => {
  try {
    const response = await api.put(`${API_BASE_URL}/khatma/${khatmaId}/`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating khatma:", error);
    throw error;
  }
};

export const patchKhatma = async (id, data) => {
  try {
    const response = await api.patch(
      `${API_BASE_URL}/khatma/khatma/${id}/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error patching khatma:", error);
    throw error;
  }
};

export const deleteKhatma = async (id) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/khatma/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting khatma:", error);
    throw error;
  }
};

export const getListKhatmaMembership = async () => {
  try {
    const response = await api.get(
      `${API_BASE_URL}/khatma/list-khatma-membership/`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting khatma membership list:", error);
    throw error;
  }
};

export const createListKhatmaMembership = async (data) => {
  try {
    const response = await api.post(
      `${API_BASE_URL}/khatma/list-khatma-membership/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error creating khatma membership list:", error);
    throw error;
  }
};

export const updateListKhatmaMembership = async (data) => {
  try {
    const response = await api.put(
      `${API_BASE_URL}/khatma/list-khatma-membership/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error updating khatma membership list:", error);
    throw error;
  }
};

export const patchListKhatmaMembership = async (data) => {
  try {
    const response = await api.patch(
      `${API_BASE_URL}/khatma/list-khatma-membership/`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error patching khatma membership list:", error);
    throw error;
  }
};

export const deleteListKhatmaMembership = async () => {
  try {
    const response = await api.delete(
      `${API_BASE_URL}/khatma/list-khatma-membership/`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting khatma membership list:", error);
    throw error;
  }
};

export const updatePartsKhatma = async (khatma_membership_id, data) => {
  try {
    const response = await api.patch(
      `${API_BASE_URL}/khatma/membership/${khatma_membership_id}/part/`,
      { parts: data }
    );
    console.log("the data is: ", { parts: data });
    console.log(response);
  } catch (error) {
    console.error("Error updating khatma parts:", error);
    throw error;
  }
};

export const getListKhatma = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/khatma/membership/`);
    return response.data;
  } catch (error) {
    console.error("Error getting khatma list:", error);
    throw error;
  }
};
