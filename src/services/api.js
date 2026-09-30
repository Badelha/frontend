import axios from 'axios';

export const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'https://backend-6fgq.onrender.com'
).replace(/\/+$/, '');

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getApiData = (response) => response.data?.data ?? response.data;

export const getApiError = (error) =>
  error.response?.data?.message || error.response?.data?.error || error.message;

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshRequest;

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    const isRefreshRequest = request?.url?.includes('/api/auth/refresh-token');
    const hasAccessToken = Boolean(request?.headers?.Authorization);

    if (error.response?.status !== 401 || !request || request._retry || isRefreshRequest || !hasAccessToken) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      refreshRequest ??= axios
        .post(`${API_BASE_URL}/api/auth/refresh-token`, {}, { withCredentials: true })
        .then((response) => {
          const { accessToken } = getApiData(response);
          if (!accessToken) throw new Error('The refresh response did not include an access token');
          localStorage.setItem('accessToken', accessToken);
          return accessToken;
        })
        .finally(() => {
          refreshRequest = undefined;
        });

      const token = await refreshRequest;
      request.headers.Authorization = `Bearer ${token}`;
      return api(request);
    } catch (refreshError) {
      if ([401, 403].includes(refreshError.response?.status)) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth:expired'));
      }
      return Promise.reject(refreshError);
    }
  }
);

export default api;
