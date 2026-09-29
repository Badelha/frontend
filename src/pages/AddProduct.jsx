import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaPlus, FaChevronDown, FaHome, FaImage, FaTimes } from 'react-icons/fa';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [keywordList, setKeywordList] = useState([]);
  const [keywordInput, setKeywordInput] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    category: '',
    operationType: '',
    location: '',
    extraInfo: '',
    status: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const addKeyword = (word) => {
    const trimmed = word.trim();
    if (trimmed && !keywordList.includes(trimmed)) {
      setKeywordList([...keywordList, trimmed]);
    }
  };

  const removeKeyword = (word) => {
    setKeywordList(keywordList.filter((w) => w !== word));
  };

  const handleKeywordKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (keywordInput.trim()) {
        addKeyword(keywordInput);
        setKeywordInput('');
      }
    }
    if (e.key === 'Backspace' && !keywordInput && keywordList.length > 0) {
      removeKeyword(keywordList[keywordList.length - 1]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) data.append(key, formData[key]);
    });
    data.append('keywords', keywordList.join(', '));

    try {
      await api.post('/products', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('✨ تم حفظ المنتج بنجاح!');
      navigate('/products');
    } catch (error) {
      console.error(error);
      alert('حدث خطأ أثناء الإضافة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-bg pb-16">
      <div className="container mx-auto px-4 py-10 max-w-3xl">

        <h1 className="text-4xl font-extrabold text-center text-brand-dark mb-8">
          اضف منتج جديد
        </h1>

        <div className="bg-brand-border/40 rounded-2xl p-5 mb-6">
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center justify-center w-full h-64 bg-brand-input border-2 border-brand-border rounded-xl hover:bg-white transition relative overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="preview" className="w-full h-full object-cover rounded-xl" />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                  <FaPlus className="text-brand" size={18} />
                </div>
                <FaImage className="text-gray-400 mb-2" size={24} />
                <p className="text-sm font-medium text-gray-500 text-center leading-relaxed">
                  اسحب وأفلت صورة هنا،<br />
                  أو انقر لتحميلها
                </p>
              </div>
            )}
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>

          <div className="flex items-center justify-between mt-4">
            <button type="button" className="w-14 h-12 rounded-lg bg-white flex items-center justify-center text-brand shadow-sm">
              <FaHome size={16} />
            </button>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-16 h-12 bg-white rounded-lg shadow-sm"></div>
              ))}
              <button type="button" className="w-10 h-12 rounded-lg bg-brand text-white flex items-center justify-center shadow-md hover:bg-brand-dark transition">
                <FaPlus size={12} />
              </button>
            </div>
            <p className="text-xs text-gray-500 font-medium">اضف حتى 5 صور</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 text-right">تفاصيل المنتج</h2>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-right">اسم المنتج</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="سماعات رأس لاسلكية"
                className="w-full bg-brand-input border border-brand-border rounded-lg py-3 px-4 text-right focus:outline-none focus:border-brand focus:bg-white transition"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 text-right">سعر المنتج</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full bg-brand-input border border-brand-border rounded-lg py-3 px-4 text-right focus:outline-none focus:border-brand focus:bg-white transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2 text-right">العدد</label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full bg-brand-input border border-brand-border rounded-lg py-3 px-4 text-right focus:outline-none focus:border-brand focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-right">الفئة</label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-brand-input border border-brand-border rounded-lg py-3 px-4 pr-10 text-right focus:outline-none focus:border-brand focus:bg-white transition appearance-none cursor-pointer"
                >
                  <option value="">اختر الفئة</option>
                  <option value="إلكترونيات">إلكترونيات</option>
                  <option value="ملابس">ملابس</option>
                  <option value="أثاث">أثاث</option>
                  <option value="أدوات">أدوات</option>
                  <option value="عطور">عطور</option>
                </select>
                <FaChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-right">نوع العملية</label>
              <div className="relative">
                <select
                  name="operationType"
                  value={formData.operationType}
                  onChange={handleChange}
                  className="w-full bg-brand-input border border-brand-border rounded-lg py-3 px-4 pr-10 text-right focus:outline-none focus:border-brand focus:bg-white transition appearance-none cursor-pointer"
                >
                  <option value="">اختر نوع العملية</option>
                  <option value="بيع">بيع</option>
                  <option value="إيجار">إيجار</option>
                  <option value="مقايضة">مقايضة</option>
                </select>
                <FaChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-right">الموقع</label>
              <div className="relative">
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-brand-input border border-brand-border rounded-lg py-3 px-4 pr-10 text-right focus:outline-none focus:border-brand focus:bg-white transition appearance-none cursor-pointer"
                >
                  <option value="">الموقع</option>
                  <option value="غزة">غزة</option>
                  <option value="دير البلح">دير البلح</option>
                  <option value="خان يونس">خان يونس</option>
                  <option value="رفح">رفح</option>
                </select>
                <FaChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-right">معلومات إضافية</label>
              <input
                type="text"
                name="extraInfo"
                value={formData.extraInfo}
                onChange={handleChange}
                placeholder="مثال: يفضل ان يكون في غزة"
                className="w-full bg-brand-input border border-brand-border rounded-lg py-3 px-4 text-right focus:outline-none focus:border-brand focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-right">كلمات مفتاحية</label>

              <div className="w-full bg-brand-input border border-brand-border rounded-lg py-2.5 px-4 focus-within:border-brand focus-within:bg-white transition min-h-[52px] flex flex-wrap gap-2 items-center">
                {keywordList.map((word, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-brand text-white text-xs px-3 py-1.5 rounded-full"
                  >
                    {word}
                    <button
                      type="button"
                      onClick={() => removeKeyword(word)}
                      className="hover:bg-white/20 rounded-full w-4 h-4 flex items-center justify-center transition"
                    >
                      <FaTimes size={10} />
                    </button>
                  </span>
                ))}

                <input
                  type="text"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={handleKeywordKeyDown}
                  placeholder={keywordList.length === 0 ? "مثال: لاسلكي" : "أضف كلمة..."}
                  className="flex-1 bg-transparent outline-none text-right min-w-[100px] text-sm py-1"
                />
              </div>

              <div className="flex gap-2 mt-2 justify-end flex-wrap">
                {['عالي الصوت', 'صوت', 'لاسلكي']
                  .filter((w) => !keywordList.includes(w))
                  .map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => addKeyword(word)}
                      className="bg-brand-border/50 text-gray-600 text-xs px-3 py-1.5 rounded-md hover:bg-brand hover:text-white transition"
                    >
                      + {word}
                    </button>
                  ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-right">الحالة</label>
              <div className="relative">
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-brand-input border border-brand-border rounded-lg py-3 px-4 pr-10 text-right focus:outline-none focus:border-brand focus:bg-white transition appearance-none cursor-pointer"
                >
                  <option value="">اختر الحالة</option>
                  <option value="جديد">جديد</option>
                  <option value="مستعمل">مستعمل</option>
                  <option value="ممتاز">ممتاز</option>
                </select>
                <FaChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2 text-right">الوصف</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="صف منتجك - المميزات، المواد، الأبعاد..."
                className="w-full bg-brand-input border border-brand-border rounded-lg py-3 px-4 text-right focus:outline-none focus:border-brand focus:bg-white transition resize-none"
              ></textarea>
            </div>
          </form>
        </div>

        <div className="flex gap-4 mt-6">
          
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
            className="flex-1 bg-brand text-white py-4 rounded-xl font-bold hover:bg-brand-dark transition shadow-md disabled:opacity-50"
          >
            {loading ? 'جاري الحفظ...' : 'حفظ المنتج'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/products')}
            className="flex-1 bg-white border border-gray-200 text-gray-600 py-4 rounded-xl font-bold hover:bg-gray-50 transition"
          >
            إلغاء
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;