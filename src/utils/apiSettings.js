import axios from 'axios';

const API_BASE_URL = "http://localhost/api/settings/";

// Helper function to get authorization headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

// GET request to fetch settings
export const getSettings = async () => {
  try {
    const res = await axios.get(API_BASE_URL, {
      headers: getAuthHeaders(),
    });
    return res;
  } catch (err) {
    console.error(
      "Error fetching settings:",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
};

// PATCH request to update settings
export const patchSettings = async (data) => {
  try {
    const res = await axios.patch(API_BASE_URL, data, {
      headers: {
        ...getAuthHeaders(),
        'Content-Type': 'application/json',
      },
    });
    alert("settings changed successfully")
    return res;
  } catch (err) {
    console.error(
      "Error updating settings:",
      err.response ? err.response.data : err.message
    );
    throw err;
  }
};

export default {
  getSettings,
  patchSettings,
};