import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

export default function CategoryModal({ isOpen, onClose, onSubmit, initialData }) {
  const isEdit = !!initialData;

  const [form, setForm] = useState({ name: "", description: "", icon: "" });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          name: initialData.name || "",
          description: initialData.description || "",
          icon: initialData.icon || "",
        });
      } else {
        setForm({ name: "", description: "", icon: "" });
      }
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSubmit(form);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl w-full max-w-md p-6 shadow-lg"
        dir="rtl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-[#2c5f7c]">
            {isEdit ? "تعديل الفئة" : "إضافة فئة جديدة"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
            aria-label="إغلاق"
          >
            <FaTimes size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              اسم الفئة
            </label>
            <input
              type="text"
              name="name"
              placeholder="أدخل اسم الفئة"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#2c5f7c]"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الوصف
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="أدخل وصف الفئة"
              value={form.description}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#2c5f7c] resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              الأيقونة (emoji)
            </label>
            <input
              type="text"
              name="icon"
              placeholder="مثال: 🍎"
              value={form.icon}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-[#2c5f7c]"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="submit"
              className="flex-1 bg-gradient-to-l from-[#2c5f7c] to-[#5ba3b8] text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
            >
              {isEdit ? "حفظ التغييرات" : "إضافة"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
            >
              إلغاء
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}