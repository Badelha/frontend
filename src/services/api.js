import axios from 'axios';

const configuredBaseUrl = (
  import.meta.env.VITE_API_URL || 'https://backend-6fgq.onrender.com'
).trim();

const parsedBaseUrl = new URL(configuredBaseUrl);

const basePath = parsedBaseUrl.pathname
  .replace(/\/{2,}/g, '/')
  .replace(/\/+$/, '')
  .replace(/\/api$/i, '');

parsedBaseUrl.pathname = `${basePath}/api`;
parsedBaseUrl.search = '';
parsedBaseUrl.hash = '';

export const API_BASE_URL = parsedBaseUrl.toString().replace(/\/+$/, '');

export const resolveApiUrl = (path) => {
  const normalizedPath = String(path)
    .replace(/\\/g, '/')
    .replace(/\/{2,}/g, '/')
    .replace(/^\/+/, '')
    .replace(/^(?:api\/)+/i, '');

  return new URL(normalizedPath, `${API_BASE_URL}/`).toString();
};

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const getApiData = (response) => response.data?.data ?? response.data;

export const getApiError = (error) =>
  error.response?.data?.message || error.response?.data?.error || error.message;

api.interceptors.request.use((config) => {
  if (config.url && !/^https?:\/\//i.test(config.url)) {
    config.url = resolveApiUrl(config.url);
  }

  const token = localStorage.getItem('accessToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  /*
   * مهم جدًا:
   * عندما نرسل FormData، لا نضع Content-Type يدويًا.
   * المتصفح/Axios سيضع multipart/form-data
   * مع الـ boundary الصحيح تلقائيًا.
   */
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }

  return config;
});

let refreshRequest;

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const request = error.config;

    const isRefreshRequest = request?.url?.includes('/auth/refresh-token');

    const hasAccessToken = Boolean(request?.headers?.Authorization);

    if (
      error.response?.status !== 401 ||
      !request ||
      request._retry ||
      isRefreshRequest ||
      !hasAccessToken
    ) {
      return Promise.reject(error);
    }

    request._retry = true;

    try {
      refreshRequest ??= api
        .post('/auth/refresh-token')
        .then((response) => {
          const { accessToken } = getApiData(response);

          if (!accessToken) {
            throw new Error('The refresh response did not include an access token');
          }

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
