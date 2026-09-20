import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/api/auth`, userData, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
