import api from './api'; 
const API_BASE_URL = 'http://localhost:8000';

// Khatma APIs
export const createKhatma = async (data) => {
  try {
    const response = await api.post(`${API_BASE_URL}/khatma/create-khatma/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating khatma:', error);
    throw error;
  }
};

export const getKhatmaMembership = async (id) => {
  try {
    const response = await api.get(`${API_BASE_URL}/khatma/khatma-membership/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting khatma membership:', error);
    throw error;
  }
};

export const updateKhatmaMembership = async (id, data) => {
  try {
    const response = await api.put(`${API_BASE_URL}/khatma/khatma-membership/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating khatma membership:', error);
    throw error;
  }
};

export const postKhatmaMembership = async (id, data) => {
  try {
    const response = await api.post(`${API_BASE_URL}/khatma/khatma-membership/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error posting khatma membership:', error);
    throw error;
  }
};

export const patchKhatmaMembership = async (id, data) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/khatma/khatma-membership/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error patching khatma membership:', error);
    throw error;
  }
};

export const deleteKhatmaMembership = async (id) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/khatma/khatma-membership/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting khatma membership:', error);
    throw error;
  }
};

export const getKhatmaDetails = async (id) => {
  try {
    const response = await api.get(`${API_BASE_URL}/khatma/khatma/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting khatma details:', error);
    throw error;
  }
};

export const updateKhatma = async (id, data) => {
  try {
    const response = await api.put(`${API_BASE_URL}/khatma/khatma/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating khatma:', error);
    throw error;
  }
};

export const patchKhatma = async (id, data) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/khatma/khatma/${id}/`, data);
    return response.data;
  } catch (error) {
    console.error('Error patching khatma:', error);
    throw error;
  }
};

export const deleteKhatma = async (id) => {
  try {
    const response = await api.delete(`${API_BASE_URL}/khatma/khatma/${id}/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting khatma:', error);
    throw error;
  }
};

export const getListKhatmaMembership = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/khatma/list-khatma-membership/`);
    return response.data;
  } catch (error) {
    console.error('Error getting khatma membership list:', error);
    throw error;
  }
};

export const createListKhatmaMembership = async (data) => {
  try {
    const response = await api.post(`${API_BASE_URL}/khatma/list-khatma-membership/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating khatma membership list:', error);
    throw error;
  }
};

export const updateListKhatmaMembership = async (data) => {
  try {
    const response = await api.put(`${API_BASE_URL}/khatma/list-khatma-membership/`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating khatma membership list:', error);
    throw error;
  }
};

export const patchListKhatmaMembership = async (data) => {
  try {
    const response = await api.patch(`${API_BASE_URL}/khatma/list-khatma-membership/`, data);
    return response.data;
  } catch (error) {
    console.error('Error patching khatma membership list:', error);
    throw error;
  }
};

export const deleteListKhatmaMembership = async () => {
  try {
    const response = await api.delete(`${API_BASE_URL}/khatma/list-khatma-membership/`);
    return response.data;
  } catch (error) {
    console.error('Error deleting khatma membership list:', error);
    throw error;
  }
};

export const getListKhatma = async (groupId) => {
  try {
    const response = await api.get(`${API_BASE_URL}/khatma/list-khatma/${groupId}/`);
    return response.data;
  } catch (error) {
    console.error('Error getting khatma list:', error);
    throw error;
  }
};