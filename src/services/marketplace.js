import api, { getApiData } from './api';

const marketplace = {
  async categories() {
    return getApiData(await api.get('/api/categories'));
  },
  async cities() {
    return getApiData(await api.get('/api/users/cities'));
  },
  async searchProducts(search, categoryId) {
    if (search) {
      return getApiData(await api.get('/api/products/search', { params: { q: search } }));
    }
    return getApiData(await api.get('/api/products', { params: { categoryId } }));
  },
  async products(params = {}) {
    return getApiData(await api.get('/api/products', { params }));
  },
  async myProducts() {
    return getApiData(await api.get('/api/products/my/listings'));
  },
  async createProduct(product) {
    return getApiData(await api.post('/api/products', product));
  },
  async updateProduct(id, product) {
    return getApiData(await api.put(`/api/products/${id}`, product));
  },
  async deleteProduct(id) {
    return getApiData(await api.delete(`/api/products/${id}`));
  },
};

export default marketplace;
