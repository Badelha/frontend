import api, { getApiData } from './api';

const usersService = {
  async getAllUsers(params = {}) {
    return getApiData(await api.get('/users', { params }));
  },
  async getUserById(id) {
    return getApiData(await api.get(`/users/${id}`));
  },
  async updateUserStatus(id, status) {
    return getApiData(await api.patch(`/users/${id}/status`, { status }));
  },
  async deleteUser(id) {
    return getApiData(await api.delete(`/users/${id}`));
  },
};

export default usersService;
