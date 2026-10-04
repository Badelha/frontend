import { useCallback, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import CategoryCard from '../components/categories/CategoryCard';
import CategoryModal from '../components/categories/CategoryModal';
import DeleteCategoryModal from '../components/categories/DeleteCategoryModal';
import Navbarpro from '../components/Navbarpro';
import marketplace from '../services/marketplace';
import { getApiError } from '../services/api';

const normalizeCategory = (category) => ({
  ...category,
  id: category.category_id ?? category.id,
  name: category.category_name ?? category.name ?? '',
  description: category.description ?? '',
  icon: category.icon ?? '',
});

const normalizeList = (result) => {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.categories)) return result.categories;
  if (Array.isArray(result?.items)) return result.items;
  return [];
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const loadCategories = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      setCategories(normalizeList(await marketplace.categories()).map(normalizeCategory));
    } catch (requestError) {
      setError(getApiError(requestError) || 'تعذر تحميل الفئات');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const closeModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleSubmit = async (form) => {
    setSubmitting(true);
    setError('');
    try {
      const payload = {
        name: form.name.trim(),
        description: form.description.trim(),
        icon: form.icon.trim(),
      };
      if (editData) {
        await marketplace.updateCategory(editData.id, payload);
      } else {
        await marketplace.createCategory(payload);
      }
      closeModal();
      await loadCategories();
    } catch (requestError) {
      setError(getApiError(requestError) || 'تعذر حفظ الفئة');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteData) return;
    setSubmitting(true);
    setError('');
    try {
      await marketplace.deleteCategory(deleteData.id);
      setDeleteData(null);
      await loadCategories();
    } catch (requestError) {
      setError(getApiError(requestError) || 'تعذر حذف الفئة');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-16" dir="rtl">
      <Navbarpro />
      <main className="mx-auto max-w-6xl px-4 pb-10 pt-28">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-[#2c5f7c]">إدارة الفئات</h1>
          <button
            type="button"
            onClick={() => {
              setEditData(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 rounded-full bg-gradient-to-l from-[#2c5f7c] to-[#5ba3b8] px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            <FaPlus size={14} />
            <span>إضافة فئة</span>
          </button>
        </div>

        {error && (
          <div role="alert" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <span>{error}</span>
            <button type="button" onClick={loadCategories} className="font-bold underline">إعادة المحاولة</button>
          </div>
        )}

        {loading ? (
          <div className="py-16 text-center text-[#4F9D9E]" role="status">جارٍ تحميل الفئات...</div>
        ) : categories.length === 0 ? (
          <div className="py-16 text-center text-gray-500">لا توجد فئات في الخادم بعد.</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onEdit={() => {
                  setEditData(category);
                  setShowModal(true);
                }}
                onDelete={() => setDeleteData(category)}
              />
            ))}
          </div>
        )}

        <CategoryModal
          isOpen={showModal}
          onClose={closeModal}
          onSubmit={handleSubmit}
          initialData={editData}
          submitting={submitting}
        />
        <DeleteCategoryModal
          isOpen={Boolean(deleteData)}
          onClose={() => setDeleteData(null)}
          onConfirm={handleDelete}
          categoryName={deleteData?.name}
          submitting={submitting}
        />
      </main>
    </div>
  );
}
