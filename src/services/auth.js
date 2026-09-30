import api, { getApiData } from './api';

let refreshRequest;

const auth = {
  async login(credentials) {
    return getApiData(await api.post('/api/auth/login', credentials));
  },
  async register(user) {
    return getApiData(await api.post('/api/auth/register', user));
  },
  async refresh() {
    refreshRequest ??= api.post('/api/auth/refresh-token')
      .then(getApiData)
      .finally(() => {
        refreshRequest = undefined;
      });
    return refreshRequest;
  },
  async profile() {
    return getApiData(await api.get('/api/auth/profile'));
  },
  async updateProfile(profile) {
    return getApiData(await api.put('/api/users/me', profile));
  },
  async logout() {
    return getApiData(await api.post('/api/auth/logout'));
  },
  async forgotPassword(email) {
    return getApiData(await api.post('/api/auth/forgot-password', { email }));
  },
  async resetPassword(token, password) {
    return getApiData(await api.post('/api/auth/reset-password', { token, password }));
  },
};

export default auth;
