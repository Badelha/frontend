import api, { getApiData } from './api';

const marketplace = {
  async categories() {
    return getApiData(await api.get('/categories'));
  },
  async cities() {
    return getApiData(await api.get('/users/cities'));
  },
  async searchProducts(search, categoryId) {
    if (search) {
      return getApiData(await api.get('/products/search', { params: { q: search } }));
    }
    return getApiData(await api.get('/products', { params: { categoryId } }));
  },
  async products(params = {}) {
    return getApiData(await api.get('/products', { params }));
  },
  async myProducts() {
    return getApiData(await api.get('/products/my/listings'));
  },
  async createProduct(product) {
    return getApiData(await api.post('/products', product));
  },
  async updateProduct(id, product) {
    return getApiData(await api.put(`/products/${id}`, product));
  },
  async deleteProduct(id) {
    return getApiData(await api.delete(`/products/${id}`));
  },
};

export default marketplace;
