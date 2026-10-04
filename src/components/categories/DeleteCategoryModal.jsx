import { FaTrash } from "react-icons/fa";

export default function DeleteCategoryModal({
  isOpen,
  onClose,
  onConfirm,
  categoryName,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div
        className="bg-white rounded-2xl w-full max-w-md p-8 text-center shadow-lg"
        dir="rtl"
      >
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
          <FaTrash className="text-red-500" size={24} />
        </div>

        <h2 className="text-xl font-bold text-gray-800 mb-3">حذف الفئة</h2>

        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          هل أنت متأكد من حذف فئة{" "}
          <span className="font-bold text-gray-800">{categoryName}</span>؟ لا
          يمكن التراجع عن هذا الإجراء.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition"
          >
            حذف
          </button>
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-full font-semibold hover:bg-gray-50 transition"
          >
            إلغاء
          </button>
        </div>
      </div>
    </div>
  );
}