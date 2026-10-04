import api, { getApiData } from './api';

const marketplace = {
  async categories() {
    return getApiData(await api.get('/categories'));
  },
  async createCategory(category) {
    return getApiData(await api.post('/categories', category));
  },
  async updateCategory(id, category) {
    return getApiData(await api.put(`/categories/${id}`, category));
  },
  async deleteCategory(id) {
    return getApiData(await api.delete(`/categories/${id}`));
  },
  async cities() {
    return getApiData(await api.get('/users/cities'));
  },
  async searchProducts(search, categoryId) {
    if (search) {
      return getApiData(await api.get('/products/search', {
        params: { q: search, ...(categoryId ? { categoryId } : {}) },
      }));
    }
    return getApiData(await api.get('/products', { params: { categoryId } }));
  },
  async products(params = {}) {
    return getApiData(await api.get('/products', { params }));
  },
  async getProduct(id) {
    return getApiData(await api.get(`/products/${id}`));
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
