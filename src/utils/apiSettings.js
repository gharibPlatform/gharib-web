import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// Helper function to get authorization headers
const getAuthHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

// GET request to fetch settings
export const getSettings = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/settings/`, {
      headers: getAuthHeaders(),
    });
    return res;
  } catch (err) {
    console.error(
      "Error fetching settings:",
      err.response ? err.response.data : err.message,
    );
    throw err;
  }
};

// PATCH request to update settings
export const patchSettings = async (data) => {
  try {
    const res = await axios.patch(`${API_URL}/api/settings/`, data, {
      headers: {
        ...getAuthHeaders(),
        "Content-Type": "application/json",
      },
    });
    alert("settings changed successfully");
    return res;
  } catch (err) {
    console.error(
      "Error updating settings:",
      err.response ? err.response.data : err.message,
    );
    throw err;
  }
};

export default {
  getSettings,
  patchSettings,
};
