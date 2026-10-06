import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Navbarpro from '../components/Navbarpro';
import { useAuth } from '../context/authContext';
import { getApiError } from '../services/api';
import marketplace from '../services/marketplace';

const PAGE_SIZE = 12;

const normalizeList = (result, key) => {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.[key])) return result[key];
  if (Array.isArray(result?.items)) return result.items;
  return [];
};

const normalizeProduct = (product) => ({
  ...product,
  id: product.product_id ?? product.id,
  title: product.title ?? product.name ?? 'منتج',
  categoryName: product.category?.category_name ?? product.category_name ?? '',
  categoryId: product.category_id ?? product.category?.category_id,
  image:
    product.image_url ??
    product.images?.[0]?.image_url ??
    product.product_images?.[0]?.image_url ??
    '',
  sellerName: product.user?.full_name ?? product.seller?.name ?? '',
  preference: String(product.exchange_preference ?? '').toUpperCase(),
});

function MarketplacePage() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState(searchParams.get('search') || '');
  const [categoryId, setCategoryId] = useState(searchParams.get('categoryId') || '');
  const [sort, setSort] = useState('newest');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadCategories = useCallback(async () => {
    const result = await marketplace.categories();
    setCategories(normalizeList(result, 'categories'));
  }, []);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        page,
        limit: PAGE_SIZE,
        sort,
        ...(categoryId ? { categoryId } : {}),
        ...(query.trim() ? { search: query.trim() } : {}),
      };
      const result = await marketplace.products(params);
      const items = normalizeList(result, 'products');
      setProducts(items.map(normalizeProduct));
      setTotalPages(
        Number(result?.pagination?.totalPages) ||
          Math.max(1, Math.ceil(Number(result?.pagination?.totalItems || items.length) / PAGE_SIZE))
      );
    } catch (requestError) {
      setProducts([]);
      setError(getApiError(requestError) || 'تعذر تحميل المنتجات');
    } finally {
      setLoading(false);
    }
  }, [categoryId, page, query, sort]);

  useEffect(() => {
    let active = true;
    marketplace.categories()
      .then((result) => {
        if (active) setCategories(normalizeList(result, 'categories'));
      })
      .catch((requestError) => {
        if (active) setError(getApiError(requestError) || 'تعذر تحميل الفئات');
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const submitSearch = (event) => {
    event.preventDefault();
    setPage(1);
    setSearchParams({
      ...(query.trim() ? { search: query.trim() } : {}),
      ...(categoryId ? { categoryId } : {}),
    });
  };

  const chooseCategory = (value) => {
    setCategoryId(value);
    setPage(1);
    setSearchParams({
      ...(query.trim() ? { search: query.trim() } : {}),
      ...(value ? { categoryId: value } : {}),
    });
  };

  return (
    <>
      {user ? <Navbarpro /> : <Navbar />}
      <main dir="rtl" className="min-h-screen bg-[#F7FAFB] px-4 pb-12 pt-28">
        <div className="mx-auto max-w-7xl">
          <header className="mb-7">
            <h1 className="text-3xl font-bold text-[#174563]">السوق</h1>
            <p className="mt-2 text-sm text-[#718692]">تصفح المنتجات المنشورة في بدّلها.</p>
          </header>

          <form onSubmit={submitSearch} className="mb-6 flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث عن منتج..."
              className="min-w-0 flex-1 rounded-xl border border-[#D8E4E8] px-4 py-3 text-right outline-none focus:border-[#4F9D9E]"
            />
            <select
              value={categoryId}
              onChange={(event) => chooseCategory(event.target.value)}
              className="rounded-xl border border-[#D8E4E8] bg-white px-4 py-3 text-right text-[#31566D]"
              aria-label="تصفية حسب الفئة"
            >
              <option value="">كل الفئات</option>
              {categories.map((category) => {
                const id = category.category_id ?? category.id;
                return (
                  <option key={id} value={id}>
                    {category.category_name ?? category.name}
                  </option>
                );
              })}
            </select>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
              className="rounded-xl border border-[#D8E4E8] bg-white px-4 py-3 text-right text-[#31566D]"
              aria-label="ترتيب المنتجات"
            >
              <option value="newest">الأحدث</option>
              <option value="price">السعر: الأقل</option>
              <option value="price_desc">السعر: الأعلى</option>
            </select>
            <button className="rounded-xl bg-[#3A73AA] px-6 py-3 font-bold text-white hover:bg-[#315F8B]">
              بحث
            </button>
          </form>

          {error && (
            <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              <span>{error}</span>
              <button type="button" onClick={() => { loadCategories().catch(() => {}); loadProducts(); }} className="font-bold underline">
                إعادة المحاولة
              </button>
            </div>
          )}

          {loading ? (
            <div className="py-20 text-center text-[#4F9D9E]" role="status">جارٍ تحميل المنتجات...</div>
          ) : products.length === 0 ? (
            <div className="rounded-2xl border border-[#E4EDF1] bg-white p-12 text-center text-[#718692]">
              لا توجد منتجات تطابق البحث الحالي.
            </div>
          ) : (
            <>
              <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((product) => (
                  <article key={product.id} className="overflow-hidden rounded-2xl border border-[#E4EDF1] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="aspect-[4/3] bg-[#EEF4F6]">
                        {product.image ? (
                          <img src={product.image} alt={product.title} className="h-full w-full object-cover" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-[#8AA0AF]">لا توجد صورة</div>
                        )}
                      </div>
                      <div className="p-4">
                        <h2 className="line-clamp-1 font-bold text-[#174563]">{product.title}</h2>
                        <p className="mt-1 text-xs text-[#718692]">{product.categoryName || 'بدون فئة'}</p>
                        <p className="mt-3 font-bold text-[#3A73AA]">
                          {product.price != null ? `${product.price} ₪` : 'للتبادل'}
                        </p>
                        {product.sellerName && <p className="mt-2 text-xs text-[#8298A4]">البائع: {product.sellerName}</p>}
                      </div>
                    </Link>
                  </article>
                ))}
              </section>

              {totalPages > 1 && (
                <nav aria-label="صفحات المنتجات" className="mt-8 flex items-center justify-center gap-4">
                  <button type="button" disabled={page <= 1} onClick={() => setPage((current) => current - 1)} className="rounded-lg border border-[#D8E4E8] bg-white px-4 py-2 disabled:opacity-50">
                    السابقة
                  </button>
                  <span className="text-sm text-[#718692]">صفحة {page} من {totalPages}</span>
                  <button type="button" disabled={page >= totalPages} onClick={() => setPage((current) => current + 1)} className="rounded-lg border border-[#D8E4E8] bg-white px-4 py-2 disabled:opacity-50">
                    التالية
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default MarketplacePage;
