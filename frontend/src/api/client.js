const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

export const api = {
  getBanners: () => request('/api/banners'),
  getCategories: () => request('/api/categories'),
  getCategoryBanners: () => request('/api/category-banners'),
  getProductCategories: () => request('/api/product-categories'),
  getProducts: (categorySlug) => {
    const query = categorySlug ? `?category_slug=${encodeURIComponent(categorySlug)}` : '';
    return request(`/api/products${query}`);
  },
  getProduct: (slug) => request(`/api/products/detail/${encodeURIComponent(slug)}`),
  getStores: () => request('/api/stores'),
  getStore: (slug) => request(`/api/stores/${encodeURIComponent(slug)}`),
  getCoffeeArticles: () => request('/api/coffee-knowledge'),
  getCoffeeArticle: (slug) => request(`/api/coffee-knowledge/${encodeURIComponent(slug)}`),
};
