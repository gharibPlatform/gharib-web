import axios from "axios";

const API_BASE_URL = 'http://localhost:8000'; 

export const createKhatma = async (data) => {
    return await axios.post(`${API_BASE_URL}/khatma/create-khatma/`, data);
  };
  
  export const getKhatmaMembership = async (id) => {
    return await axios.get(`${API_BASE_URL}/khatma/khatma-membership/${id}/`);
  };
  
  export const updateKhatmaMembership = async (id, data) => {
    return await axios.put(`${API_BASE_URL}/khatma/khatma-membership/${id}/`, data);
  };
  
  export const patchKhatmaMembership = async (id, data) => {
    return await axios.patch(`${API_BASE_URL}/khatma/khatma-membership/${id}/`, data);
  };
  
  export const deleteKhatmaMembership = async (id) => {
    return await axios.delete(`${API_BASE_URL}/khatma/khatma-membership/${id}/`);
  };
  
  export const getKhatmaDetails = async (id) => {
    return await axios.get(`${API_BASE_URL}/khatma/khatma/${id}/`);
  };
  
  export const updateKhatma = async (id, data) => {
    return await axios.put(`${API_BASE_URL}/khatma/khatma/${id}/`, data);
  };
  
  export const patchKhatma = async (id, data) => {
    return await axios.patch(`${API_BASE_URL}/khatma/khatma/${id}/`, data);
  };
  
  export const deleteKhatma = async (id) => {
    return await axios.delete(`${API_BASE_URL}/khatma/khatma/${id}/`);
  };
  
  export const getListKhatmaMembership = async () => {
    return await axios.get(`${API_BASE_URL}/khatma/list-khatma-membership/`);
  };
  
  export const createListKhatmaMembership = async (data) => {
    return await axios.post(`${API_BASE_URL}/khatma/list-khatma-membership/`, data);
  };
  
  export const updateListKhatmaMembership = async (data) => {
    return await axios.put(`${API_BASE_URL}/khatma/list-khatma-membership/`, data);
  };
  
  export const patchListKhatmaMembership = async (data) => {
    return await axios.patch(`${API_BASE_URL}/khatma/list-khatma-membership/`, data);
  };
  
  export const deleteListKhatmaMembership = async () => {
    return await axios.delete(`${API_BASE_URL}/khatma/list-khatma-membership/`);
  };
  
  export const getListKhatma = async (groupId) => {
    return await axios.get(`${API_BASE_URL}/khatma/list-khatma/${groupId}/`);
  };
  