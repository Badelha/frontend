import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import CategoryCard from "../components/categories/CategoryCard";
import CategoryModal from "../components/categories/CategoryModal";
import DeleteCategoryModal from "../components/categories/DeleteCategoryModal";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([
    { id: 1, name: "فواكه", description: "فواكه موسمية وطازجة", icon: "🍎" },
    { id: 2, name: "خضروات", description: "جميع أنواع الخضروات الطازجة", icon: "🥦" },
    { id: 3, name: "منتجات الألبان", description: "حليب وجبن وزبادي", icon: "🥛" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);

  const openAddModal = () => {
    setEditData(null);
    setShowModal(true);
  };

  const openEditModal = (cat) => {
    setEditData(cat);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleSubmit = (form) => {
    if (editData) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editData.id ? { ...c, ...form } : c))
      );
    } else {
      setCategories((prev) => [...prev, { id: Date.now(), ...form }]);
    }
    closeModal();
  };

  const handleDelete = () => {
    setCategories((prev) => prev.filter((c) => c.id !== deleteData.id));
    setDeleteData(null);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto" dir="rtl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#2c5f7c]">إدارة الفئات</h1>
        <button
          onClick={openAddModal}
          className="bg-gradient-to-l from-[#2c5f7c] to-[#5ba3b8] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:opacity-90 transition font-semibold"
        >
          <FaPlus size={14} />
          <span>إضافة فئة</span>
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          لا توجد فئات بعد. اضغط "إضافة فئة" للبدء.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              onEdit={() => openEditModal(cat)}
              onDelete={() => setDeleteData(cat)}
            />
          ))}
        </div>
      )}

      <CategoryModal
        isOpen={showModal}
        onClose={closeModal}
        onSubmit={handleSubmit}
        initialData={editData}
      />

      <DeleteCategoryModal
        isOpen={!!deleteData}
        onClose={() => setDeleteData(null)}
        onConfirm={handleDelete}
        categoryName={deleteData?.name}
      />
    </div>
  );
}