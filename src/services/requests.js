import api, { getApiData } from './api';

const requests = {
  async exchanges(params = {}) {
    return getApiData(await api.get('/exchanges', { params }));
  },
  async getExchange(id) {
    return getApiData(await api.get(`/exchanges/${id}`));
  },
  async createExchange(data) {
    return getApiData(await api.post('/exchanges', data));
  },
  async acceptExchange(id, reason) {
    return getApiData(await api.patch(`/exchanges/${id}/accept`, { reason: reason || undefined }));
  },
  async rejectExchange(id, reason) {
    return getApiData(await api.patch(`/exchanges/${id}/reject`, { reason: reason || undefined }));
  },
  async completeExchange(id) {
    return getApiData(await api.patch(`/exchanges/${id}/complete`));
  },
  async cancelExchange(id) {
    return getApiData(await api.patch(`/exchanges/${id}/cancel`));
  },
  async purchases(params = {}) {
    return getApiData(await api.get('/purchases', { params }));
  },
  async getPurchase(id) {
    return getApiData(await api.get(`/purchases/${id}`));
  },
  async createPurchase(data) {
    return getApiData(await api.post('/purchases', data));
  },
  async acceptPurchase(id, reason) {
    return getApiData(await api.patch(`/purchases/${id}/accept`, { reason: reason || undefined }));
  },
  async rejectPurchase(id, reason) {
    return getApiData(await api.patch(`/purchases/${id}/reject`, { reason: reason || undefined }));
  },
  async completePurchase(id) {
    return getApiData(await api.patch(`/purchases/${id}/complete`));
  },
  async cancelPurchase(id) {
    return getApiData(await api.patch(`/purchases/${id}/cancel`));
  },
  async transactions(params = {}) {
    return getApiData(await api.get('/transactions', { params }));
  },
  async transactionStats() {
    return getApiData(await api.get('/transactions/stats'));
  },
};

export default requests;
