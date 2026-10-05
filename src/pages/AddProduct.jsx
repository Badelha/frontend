import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarpro from '../components/Navbarpro';
import Footer from '../components/Footer';
import marketplace from '../services/marketplace';
import { getApiError } from '../services/api';

const OPERATIONS_MAP = [
  { value: 'EXCHANGE_ONLY', label: 'تبادل فقط' },
  { value: 'PURCHASE_ONLY', label: 'شراء فقط' },
  { value: 'BOTH', label: 'بيع أو مقايضة' },
];

const CONDITIONS_MAP = [
  { value: 'NEW', label: 'جديد' },
  { value: 'LIKE_NEW', label: 'كالجديد' },
  { value: 'GOOD', label: 'جيد' },
  { value: 'FAIR', label: 'مقبول' },
  { value: 'POOR', label: 'ضعيف' },
];

const inputClass =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:bg-white focus:border-[#4F9D9E] focus:ring-4 focus:ring-[#4F9D9E]/20';

export default function AddProduct() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [mainIdx, setMainIdx] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [kw, setKw] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: '',
    price: '',
    categoryId: '',
    cityId: '',
    exchangePreference: 'BOTH',
    condition: 'NEW',
    description: '',
  });

  useEffect(() => {
    let active = true;

    Promise.all([marketplace.categories(), marketplace.cities()])
      .then(([catRes, cityRes]) => {
        if (!active) return;
        const cats = Array.isArray(catRes) ? catRes : catRes?.categories || [];
        const cits = Array.isArray(cityRes) ? cityRes : cityRes?.cities || [];
        setCategories(cats);
        setCities(cits);
      })
      .catch((err) => {
        if (active) setError(getApiError(err) || 'تعذر تحميل بيانات الفئات والمدن');
      });

    return () => {
      active = false;
    };
  }, []);

  const set = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addFiles = (files) => {
    const selected = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, 5 - imageFiles.length);

    if (selected.length > 0) {
      const newFiles = [...imageFiles, ...selected];
      const newPreviews = [...imagePreviews, ...selected.map((f) => URL.createObjectURL(f))];
      setImageFiles(newFiles);
      setImagePreviews(newPreviews);
    }
  };

  const removeImage = (index) => {
    const newFiles = imageFiles.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImageFiles(newFiles);
    setImagePreviews(newPreviews);
    if (mainIdx >= newPreviews.length) setMainIdx(Math.max(0, newPreviews.length - 1));
  };

  const addKeyword = () => {
    const word = kw.trim();
    if (word && !keywords.includes(word)) {
      setKeywords([...keywords, word]);
    }
    setKw('');
  };

  const handleSave = async () => {
    if (!form.title.trim()) {
      setError('يرجى كتابة اسم المنتج');
      return;
    }
    if (!form.categoryId) {
      setError('يرجى اختيار الفئة');
      return;
    }
    if (!form.cityId) {
      setError('يرجى اختيار المدينة');
      return;
    }
    if (!form.description.trim()) {
      setError('يرجى كتابة وصف للمنتج');
      return;
    }

    setError('');
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append('title', form.title.trim());
      formData.append('description', form.description.trim());
      formData.append('categoryId', Number(form.categoryId));
      formData.append('cityId', Number(form.cityId));
      formData.append('condition', form.condition);
      formData.append('exchangePreference', form.exchangePreference);

      if (form.price) {
        formData.append('price', Number(form.price));
      }

      if (keywords.length > 0) {
        formData.append('tags', JSON.stringify(keywords));
      }

      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      const created = await marketplace.createProduct(formData);
      const newId = created?.product_id || created?.id;
      if (newId) {
        navigate(`/product/${newId}`);
      } else {
        navigate('/profilePage?tab=products');
      }
    } catch (err) {
      setError(getApiError(err) || 'تعذر إضافة المنتج. يرجى التأكد من البيانات والمحاولة مجدداً.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Navbarpro />

      <div dir="rtl" className="min-h-screen bg-[#F7FAFB] text-slate-700 pb-16">
        <main className="max-w-2xl mx-auto px-4 pt-28">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4F9D9E]">سوق بدّلها</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[#1e4a63]">أضف منتج جديد</h1>
            </div>
          </div>

          {/* Upload Images */}
          <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addFiles(e.dataTransfer.files);
              }}
              className="h-48 sm:h-64 rounded-xl bg-[#F0F5F7] border-2 border-dashed border-[#B8D3D8] grid place-items-center cursor-pointer overflow-hidden hover:bg-[#E8F0F3] transition"
            >
              {imagePreviews.length > 0 ? (
                <img
                  src={imagePreviews[mainIdx]}
                  alt="معاينة الصورة"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-sm text-slate-500 px-4">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-white shadow grid place-items-center text-2xl text-[#4F9D9E]">
                    📷
                  </div>
                  <p className="font-bold text-[#2E5F87]">اضغط هنا لرفع صور المنتج</p>
                  <p className="text-xs text-[#8297A4] mt-1">يمكنك إرفاق حتى 5 صور</p>
                </div>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                hidden
                onChange={(e) => addFiles(e.target.files)}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {imagePreviews.map((url, index) => (
                  <div key={url} className="relative">
                    <button
                      type="button"
                      onClick={() => setMainIdx(index)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                        index === mainIdx ? 'border-[#4F9D9E] scale-105' : 'border-transparent opacity-70'
                      }`}
                    >
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <span className="mr-auto text-xs text-slate-500">{imagePreviews.length}/5 صور</span>
              </div>
            )}
          </section>

          {/* Product Details Form */}
          <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6 mt-5 space-y-4">
            <h2 className="font-bold text-[#1e4a63] text-lg">تفاصيل المنتج</h2>

            {/* Title */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">عنوان المنتج *</label>
              <input
                className={inputClass}
                placeholder="مثال: لابتوب HP مستعمل بحالة ممتازة"
                value={form.title}
                onChange={(e) => set('title', e.target.value)}
              />
            </div>

            {/* Category and City */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">الفئة *</label>
                <select
                  className={inputClass}
                  value={form.categoryId}
                  onChange={(e) => set('categoryId', e.target.value)}
                >
                  <option value="">اختر الفئة</option>
                  {categories.map((c) => {
                    const id = c.category_id ?? c.id;
                    const name = c.category_name ?? c.name;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">المدينة / المنطقة *</label>
                <select
                  className={inputClass}
                  value={form.cityId}
                  onChange={(e) => set('cityId', e.target.value)}
                >
                  <option value="">اختر المدينة</option>
                  {cities.map((c) => {
                    const id = c.city_id ?? c.id;
                    const name = c.city_name ?? c.city ?? c.name;
                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Price */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">السعر التقديري (₪)</label>
              <input
                type="number"
                min="0"
                className={inputClass}
                placeholder="0.00 (اتركه فارغاً إذا كان للتبادل فقط)"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
              />
            </div>

            {/* Operation Type */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-2">تفضيل المعاملة</label>
              <div className="flex flex-wrap gap-2">
                {OPERATIONS_MAP.map((op) => (
                  <button
                    key={op.value}
                    type="button"
                    onClick={() => set('exchangePreference', op.value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition active:scale-95 ${
                      form.exchangePreference === op.value
                        ? 'bg-[#4F9D9E] border-[#4F9D9E] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-[#4F9D9E] text-slate-700'
                    }`}
                  >
                    {op.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-2">حالة المنتج</label>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS_MAP.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => set('condition', c.value)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition active:scale-95 ${
                      form.condition === c.value
                        ? 'bg-[#3A73AA] border-[#3A73AA] text-white shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-[#3A73AA] text-slate-700'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">كلمات مفتاحية (وسوم)</label>
              <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-[#DCEFEE] text-[#2F6F8F] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1"
                  >
                    {keyword}
                    <button
                      type="button"
                      className="hover:text-red-500 font-bold"
                      onClick={() => setKeywords(keywords.filter((item) => item !== keyword))}
                    >
                      ×
                    </button>
                  </span>
                ))}
                <input
                  className="flex-1 min-w-[120px] bg-transparent outline-none text-sm p-1"
                  placeholder="اكتب وسم ثم اضغط Enter..."
                  value={kw}
                  onChange={(e) => setKw(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addKeyword();
                    }
                  }}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">وصف المنتج التفصيلي *</label>
              <textarea
                rows={4}
                maxLength={500}
                className={`${inputClass} resize-none`}
                placeholder="اكتب وصفاً كاملاً للمنتج، حالته، الأسباب والتفاصيل..."
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
              />
              <p className="text-xs text-slate-400 text-left mt-1">{form.description.length}/500</p>
            </div>
          </section>

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm p-4 font-semibold">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate('/market')}
              className="sm:w-40 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
            >
              إلغاء
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-to-l from-[#4F9D9E] to-[#3A73AA] text-white font-bold shadow hover:opacity-95 active:scale-95 transition disabled:opacity-60"
            >
              {saving ? 'جارٍ نشر المنتج...' : 'نشر المنتج في السوق'}
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}
