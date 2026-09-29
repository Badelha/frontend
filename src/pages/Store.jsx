import React, { useState, useEffect } from 'react';
import api from '../services/api';
import SearchBar from '../components/SearchBar';
import FilterTabs from '../components/FilterTabs';
import Sidebar from '../components/Sidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { mockProducts } from '../data/mockProducts';

const Store = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data.length ? response.data : mockProducts);
      } catch (error) {
        console.error('خطأ:', error);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const matchSearch = p.name?.toLowerCase().includes(search.toLowerCase());
    const matchTab = activeTab === 'all' || p.type === activeTab;
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    return matchSearch && matchTab && matchCat;
  });

  return (
    <div className="min-h-screen bg-white pb-16">

      <div className="container mx-auto px-4 pt-8">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <FilterTabs active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="container mx-auto px-4 mt-8">
        <div className="flex flex-col lg:flex-row gap-6">

          <div className="lg:w-44 w-full lg:sticky lg:top-20 lg:self-start">
            <Sidebar activeCategory={activeCategory} onChange={setActiveCategory} />
          </div>

          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-[#2c7a8a]"></div>
              </div>
            ) : filtered.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 text-center border border-gray-100">
                <p className="text-gray-500">لا توجد منتجات مطابقة</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                <Pagination current={currentPage} total={6} onChange={setCurrentPage} />
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Store;