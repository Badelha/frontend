import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';

const ManageTags = () => {
  const [tagName, setTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#2c7a8a');
  const [deletingTag, setDeletingTag] = useState(null);
  const [editingTag, setEditingTag] = useState(null);
  const [editName, setEditName] = useState('');
  const [editColor, setEditColor] = useState('');

  const colors = [
    '#2c7a8a', '#5a9e9e', '#e74c3c', '#2ecc71',
    '#f39c12', '#9b59b6', '#1abc9c', '#e67e22',
  ];

  const [tags, setTags] = useState([
    { id: 1, name: 'طارئ', color: '#2ecc71' },
    { id: 2, name: 'عروض', color: '#e74c3c' },
    { id: 3, name: 'موسمي', color: '#f39c12' },
  ]);

  const handleAddTag = () => {
    if (tagName.trim() === '') return;
    setTags([...tags, { id: Date.now(), name: tagName, color: selectedColor }]);
    setTagName('');
    setSelectedColor('#2c7a8a');
  };

  const openDeleteConfirm = (tag) => {
    setEditingTag(null);
    setDeletingTag(tag);
  };

  const confirmDelete = () => {
    setTags(tags.filter((t) => t.id !== deletingTag.id));
    setDeletingTag(null);
  };

  const openEdit = (tag) => {
    setDeletingTag(null);
    setEditingTag(tag);
    setEditName(tag.name);
    setEditColor(tag.color);
  };

  const confirmEdit = () => {
    setTags(
      tags.map((t) =>
        t.id === editingTag.id ? { ...t, name: editName, color: editColor } : t
      )
    );
    setEditingTag(null);
  };

  return (
    <div className="py-8 px-4" dir="rtl">
      <div className="w-[80%] mx-auto">

        <h1 className="text-2xl font-bold text-[#1e3a5f] mb-6 text-right">
          إدارة الوسوم
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
          <h2 className="text-lg font-bold text-[#1e3a5f] mb-6 text-right">
            إضافة وسم جديد
          </h2>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2 text-right">
              اسم الوسم
            </label>
            <input
              type="text"
              value={tagName}
              onChange={(e) => setTagName(e.target.value)}
              placeholder="أدخل اسم الوسم..."
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-right focus:outline-none focus:ring-2 focus:ring-[#2c7a8a] focus:border-transparent transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-3 text-right">
              لون الوسم
            </label>
            <div className="flex justify-end gap-3 flex-row-reverse">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full transition-transform ${
                    selectedColor === color
                      ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                      : 'hover:scale-110'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="mb-8 flex items-center gap-3 flex-row-reverse justify-end">
            <span className="text-sm font-bold text-gray-700">معاينة</span>
            <span
              className="text-white text-sm font-bold px-5 py-1.5 rounded-full"
              style={{ backgroundColor: selectedColor }}
            >
              معاينة الوسم
            </span>
          </div>

          <div className="flex justify-end">
            <button
              onClick={handleAddTag}
              className="bg-gradient-to-l from-[#2c7a8a] to-[#1e3a5f] text-white font-bold px-10 py-2.5 rounded-full hover:opacity-90 transition shadow-md"
            >
              إضافة الوسم
            </button>
          </div>
        </div>

        <h2 className="text-lg font-bold text-[#1e3a5f] mb-4 text-right">
          الوسوم الحالية
        </h2>

        <div className="flex flex-col gap-3 mb-8">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 p-3 flex justify-between items-center"
            >
              <span
                className="text-white text-sm font-bold px-6 py-1.5 rounded-full min-w-[80px] text-center"
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openDeleteConfirm(tag)}
                  className="bg-[#e74c3c] text-white text-xs font-bold px-5 py-1.5 rounded-full hover:bg-red-600 transition"
                >
                  حذف
                </button>
                <button
                  onClick={() => openEdit(tag)}
                  className="bg-[#2c7a8a] text-white text-xs font-bold px-5 py-1.5 rounded-full hover:bg-[#1e3a5f] transition"
                >
                  تعديل
                </button>
              </div>
            </div>
          ))}
        </div>

        {deletingTag && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <div className="flex flex-row-reverse justify-between items-start mb-4">
              <div className="text-right flex-1">
                <h2 className="text-lg font-bold text-[#e74c3c] mb-2">
                  حذف الوسم
                </h2>
                <p className="text-sm text-gray-600">
                  هل أنت متأكد من حذف هذا الوسم؟ لا يمكن التراجع عن هذا الإجراء.
                </p>
              </div>
              <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                <FaTrash className="text-[#e74c3c]" size={18} />
              </div>
            </div>
            <div className="flex items-center gap-3 flex-row-reverse justify-end mb-6 mt-4">
              <span
                className="text-white text-sm font-bold px-6 py-1.5 rounded-full min-w-[80px] text-center"
                style={{ backgroundColor: deletingTag.color }}
              >
                {deletingTag.name}
              </span>
              <span className="text-sm font-bold text-gray-700">الوسم المراد حذفه</span>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeletingTag(null)}
                className="bg-white text-gray-700 font-bold px-10 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
              <button
                onClick={confirmDelete}
                className="bg-[#e74c3c] text-white font-bold px-10 py-2.5 rounded-full hover:bg-red-600 transition shadow-md"
              >
                تأكيد الحذف
              </button>
            </div>
          </div>
        )}

        {editingTag && (
          <div className="bg-white rounded-xl shadow-sm p-8 mb-8 border border-gray-100">
            <h2 className="text-lg font-bold text-[#2c7a8a] mb-6 text-right">
              تعديل الوسم
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2 text-right">
                اسم الوسم
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-right font-bold focus:outline-none focus:ring-2 focus:ring-[#2c7a8a] focus:border-transparent transition"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-3 text-right">
                لون الوسم
              </label>
              <div className="flex justify-end gap-3 flex-row-reverse">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setEditColor(color)}
                    className={`w-9 h-9 rounded-full transition-transform ${
                      editColor === color
                        ? 'ring-2 ring-offset-2 ring-gray-400 scale-110'
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div className="mb-8 flex items-center gap-3 flex-row-reverse justify-end">
              <span
                className="text-white text-sm font-bold px-6 py-1.5 rounded-full min-w-[80px] text-center"
                style={{ backgroundColor: editColor }}
              >
                {editName || 'معاينة'}
              </span>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setEditingTag(null)}
                className="bg-white text-gray-700 font-bold px-10 py-2.5 rounded-full border border-gray-300 hover:bg-gray-50 transition"
              >
                إلغاء
              </button>
              <button
                onClick={confirmEdit}
                className="bg-gradient-to-l from-[#2c7a8a] to-[#1e3a5f] text-white font-bold px-10 py-2.5 rounded-full hover:opacity-90 transition shadow-md"
              >
                حفظ التغييرات
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ManageTags;