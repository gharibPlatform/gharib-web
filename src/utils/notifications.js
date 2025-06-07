import api from './api';

export const acceptBrotherRequest = async (userId) => {
  try {
    const response = await api.post(`/notification/accept-br-req/${userId}/`);
    return response.data;
  } catch (error) {
    console.error('Error accepting brother request:', error);
    throw error;
  }
};

export const denyBrotherRequest = async (brothershipReqId) => {
  try {
    const response = await api.post(`/notification/deny-br-req/${brothershipReqId}/`);
    return response.data;
  } catch (error) {
    console.error('Error denying brother request:', error);
    throw error;
  }
};

export const getBrotherRequests = async () => {
  try {
    const response = await api.get('/notification/list-br-req/');
    return response.data;
  } catch (error) {
    console.error('Error retrieving brother requests:', error);
    throw error;
  }
};

export const sendBrotherRequest = async (username) => {
  try {
    const response = await api.post(`/notification/send-br-req/${username}/`);
    return response.data;
  } catch (error) {
    console.error('Error sending brother request:', error);
    throw error;
  }
};