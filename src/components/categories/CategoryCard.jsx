import { FaEdit, FaTrash } from "react-icons/fa";

export default function CategoryCard({ category, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <span className="text-4xl leading-none">{category.icon}</span>

        <div className="flex gap-3">
          <button
            onClick={onEdit}
            className="text-blue-600 hover:text-blue-800 transition"
            aria-label="تعديل"
          >
            <FaEdit size={16} />
          </button>
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-red-700 transition"
            aria-label="حذف"
          >
            <FaTrash size={16} />
          </button>
        </div>
      </div>

      <div className="text-right">
        <h3 className="text-lg font-bold text-gray-800 mb-1">
          {category.name}
        </h3>
        <p className="text-sm text-gray-500">{category.description}</p>
      </div>
    </div>
  );
}