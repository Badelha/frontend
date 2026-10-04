import api, { getApiData } from './api';

const notifications = {
  async list(params = {}) {
    return getApiData(await api.get('/notifications', { params }));
  },
  async getUnreadCount() {
    return getApiData(await api.get('/notifications/unread-count'));
  },
  async markRead(id) {
    return getApiData(await api.patch(`/notifications/${id}/read`));
  },
  async markAllAsRead() {
    return getApiData(await api.patch('/notifications/read-all'));
  },
  async delete(id) {
    return getApiData(await api.delete(`/notifications/${id}`));
  },
};

export default notifications;
