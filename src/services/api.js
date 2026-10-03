import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

console.log('Backend URL:', API_URL);

const api = axios.create({
  baseURL: API_URL,
});
export function getApiError(error) {
  if (error?.response?.data?.message) return error.response.data.message;
  if (error?.response?.data?.error) return error.response.data.error;
  if (error?.response?.data?.errors) {
    const errors = error.response.data.errors;
    if (typeof errors === 'object') {
      return Object.values(errors).flat().join(' - ');
    }
  }
  if (error?.message) return error.message;
  return 'حدث خطأ غير متوقع، حاول مرة أخرى';
}

export function getApiData(response) {
  if (response?.data?.data !== undefined) return response.data.data;
  if (response?.data !== undefined) return response.data;
  return response;
}

export const extractApiData = getApiData;

export default api;