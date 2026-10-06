import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbarpro from '../components/Navbarpro';
import Footer from '../components/Footer';

import marketplace from '../services/marketplace';
import { getApiError } from '../services/api';

const OPERATIONS_MAP = [
  { value: 'EXCHANGE_ONLY', label: 'مقايضة فقط' },
  { value: 'PURCHASE_ONLY', label: 'بيع فقط' },
  { value: 'BOTH', label: 'بيع أو مقايضة' },
];

const CONDITIONS_MAP = [
  { value: 'NEW', label: 'جديد' },
  { value: 'LIKE_NEW', label: 'كالجديد' },
  { value: 'GOOD', label: 'مستعمل' },
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
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    title: '',
    price: '',
    categoryId: '',
    cityId: '',
    exchangePreference: 'BOTH',
    condition: 'NEW',
    description: '',
  });

  /* =========================
     تحميل الفئات والمدن
  ========================= */

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
        if (active) {
          setError(getApiError(err) || 'تعذر تحميل بيانات الفئات والمدن');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  /* =========================
     تحديث بيانات الفورم
  ========================= */

  const set = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  /* =========================
     إضافة الصور
  ========================= */

  const addFiles = (files) => {
    if (!files) return;

    const selected = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, 5 - imageFiles.length);

    if (selected.length === 0) return;

    const newFiles = [...imageFiles, ...selected];

    const newPreviews = [...imagePreviews, ...selected.map((file) => URL.createObjectURL(file))];

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);

    if (imageFiles.length === 0) {
      setMainIdx(0);
    }
  };

  /* =========================
     حذف صورة
  ========================= */

  const removeImage = (index) => {
    const previewToRemove = imagePreviews[index];

    if (previewToRemove) {
      URL.revokeObjectURL(previewToRemove);
    }

    const newFiles = imageFiles.filter((_, i) => i !== index);

    const newPreviews = imagePreviews.filter((_, i) => i !== index);

    setImageFiles(newFiles);
    setImagePreviews(newPreviews);

    if (newPreviews.length === 0) {
      setMainIdx(0);
    } else if (mainIdx >= newPreviews.length) {
      setMainIdx(newPreviews.length - 1);
    } else if (index < mainIdx) {
      setMainIdx((prev) => prev - 1);
    }
  };

  /* =========================
     تنظيف الصور عند مغادرة الصفحة
  ========================= */

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, []);

  /* =========================
     الكلمات المفتاحية
  ========================= */

  const addKeyword = () => {
    const word = kw.trim();

    if (word && !keywords.includes(word)) {
      setKeywords((prev) => [...prev, word]);
    }

    setKw('');
  };

  const removeKeyword = (keyword) => {
    setKeywords((prev) => prev.filter((item) => item !== keyword));
  };

  /* =========================
     استخراج خطأ Backend
  ========================= */

  const getBackendError = (err) => {
    const data = err?.response?.data;

    console.log('========== BACKEND ERROR ==========');
    console.log(data);
    console.log('===================================');

    if (Array.isArray(data?.errors)) {
      const messages = data.errors
        .map((item) => {
          if (typeof item === 'string') {
            return item;
          }

          return item?.msg || item?.message || item?.error || null;
        })
        .filter(Boolean);

      if (messages.length > 0) {
        return messages.join(' - ');
      }
    }

    if (data?.errors && typeof data.errors === 'object') {
      const messages = Object.values(data.errors)
        .flat()
        .map((item) => {
          if (typeof item === 'string') {
            return item;
          }

          return item?.msg || item?.message || item?.error || null;
        })
        .filter(Boolean);

      if (messages.length > 0) {
        return messages.join(' - ');
      }
    }

    return data?.message || data?.error || err?.message || 'حدث خطأ أثناء إضافة المنتج';
  };

  /* =========================
     حفظ المنتج
  ========================= */

  const handleSave = async () => {
    setError('');

    /* الصور */

    if (imageFiles.length === 0) {
      setError('ضيفي صورة وحدة على الأقل');
      return;
    }

    /* اسم المنتج */

    const productTitle = form.title.trim();

    if (!productTitle) {
      setError('اكتبي اسم المنتج');
      return;
    }

    if (productTitle.length < 5) {
      setError('اسم المنتج يجب أن يكون 5 أحرف على الأقل');
      return;
    }

    if (productTitle.length > 200) {
      setError('اسم المنتج يجب ألا يتجاوز 200 حرف');
      return;
    }

    /* الفئة */

    if (!form.categoryId) {
      setError('اختاري فئة المنتج');
      return;
    }

    /* المدينة */

    if (!form.cityId) {
      setError('اختاري المدينة');
      return;
    }

    /* نوع العملية */

    if (!form.exchangePreference) {
      setError('اختاري نوع العملية');
      return;
    }

    /* الحالة */

    if (!form.condition) {
      setError('اختاري حالة المنتج');
      return;
    }

    /* الوصف */

    const description = form.description.trim();

    if (!description) {
      setError('اكتبي وصف المنتج');
      return;
    }

    if (description.length < 10) {
      setError('وصف المنتج يجب أن يكون 10 أحرف على الأقل');
      return;
    }

    /* تسجيل الدخول */

    const token = localStorage.getItem('accessToken');

    if (!token) {
      setError('يجب تسجيل الدخول أولًا لإضافة منتج');
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      /* =========================
         بيانات المنتج
      ========================= */

      formData.append('title', productTitle);

      formData.append('description', description);

      formData.append('categoryId', String(Number(form.categoryId)));

      formData.append('cityId', String(Number(form.cityId)));

      formData.append('condition', form.condition);

      formData.append('exchangePreference', form.exchangePreference);

      /* السعر اختياري */

      if (form.price !== '' && form.price !== null && form.price !== undefined) {
        const price = Number(form.price);

        if (Number.isNaN(price) || price < 0) {
          setError('أدخلي سعرًا صحيحًا');
          setSaving(false);
          return;
        }

        formData.append('price', String(price));
      }

      /* =========================
         الصور
      ========================= */

      imageFiles.forEach((file) => {
        formData.append('images', file);
      });

      /* =========================
         عرض البيانات في Console
      ========================= */

      console.log('========== PRODUCT DATA ==========');

      for (const [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(key, value.name, value.type, value.size);
        } else {
          console.log(key, value);
        }
      }

      console.log('==================================');

      /* =========================
         إرسال المنتج
      ========================= */

      const created = await marketplace.createProduct(formData);

      console.log('تمت إضافة المنتج بنجاح:', created);

      setSaving(false);
      setSaved(true);
    } catch (err) {
      console.error('Add product error:', err);

      setSaving(false);

      const message = getBackendError(err);

      setError(message);
    }
  };

  /* =========================
     زر الاختيار
  ========================= */

  const Pill = ({ item, field }) => (
    <button
      type="button"
      onClick={() => set(field, item.value)}
      className={`px-4 py-2 rounded-full text-sm font-semibold border transition active:scale-95 ${
        form[field] === item.value
          ? 'bg-[#4F9D9E] border-[#4F9D9E] text-white shadow-sm'
          : 'bg-slate-50 border-slate-200 hover:border-[#4F9D9E] text-slate-700'
      }`}>
      {item.label}
    </button>
  );

  return (
    <>
      <Navbarpro />

      <div dir="rtl" className="min-h-screen bg-[#F7FAFB] text-slate-700 pb-16">
        <main className="max-w-2xl mx-auto px-4 pt-28">
          {/* =========================
              العنوان
          ========================= */}

          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4F9D9E]">سوق بدّلها</p>

              <h1 className="text-2xl sm:text-3xl font-bold text-[#1e4a63]">أضف منتج جديد</h1>
            </div>
          </div>

          {/* =========================
              رفع الصور
          ========================= */}

          <section className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addFiles(e.dataTransfer.files);
              }}
              className="h-48 sm:h-64 rounded-xl bg-[#F0F5F7] border-2 border-dashed border-[#B8D3D8] grid place-items-center cursor-pointer overflow-hidden hover:bg-[#E8F0F3] transition">
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
                onChange={(e) => {
                  addFiles(e.target.files);

                  e.target.value = '';
                }}
              />
            </div>

            {imagePreviews.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                {imagePreviews.map((url, index) => (
                  <div key={`${url}-${index}`} className="relative">
                    <button
                      type="button"
                      onClick={() => setMainIdx(index)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition ${
                        index === mainIdx
                          ? 'border-[#4F9D9E] scale-105'
                          : 'border-transparent opacity-70'
                      }`}>
                      <img src={url} alt="" className="w-full h-full object-cover" />
                    </button>

                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center shadow hover:bg-red-600">
                      ✕
                    </button>
                  </div>
                ))}

                <span className="mr-auto text-xs text-slate-500">{imagePreviews.length}/5 صور</span>
              </div>
            )}
          </section>

          {/* =========================
              تفاصيل المنتج
          ========================= */}

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
              {/* Category */}

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">الفئة *</label>

                <select
                  className={inputClass}
                  value={form.categoryId}
                  onChange={(e) => set('categoryId', e.target.value)}>
                  <option value="">اختر الفئة</option>

                  {categories.map((category) => {
                    const id = category.category_id ?? category.id;

                    const name = category.category_name ?? category.name;

                    return (
                      <option key={id} value={id}>
                        {name}
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* City */}

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">
                  المدينة / المنطقة *
                </label>

                <select
                  className={inputClass}
                  value={form.cityId}
                  onChange={(e) => set('cityId', e.target.value)}>
                  <option value="">اختر المدينة</option>

                  {cities.map((city) => {
                    const id = city.city_id ?? city.id;

                    const name = city.city_name ?? city.city ?? city.name;

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
              <label className="text-xs font-bold text-slate-600 block mb-1">
                السعر التقديري (₪)
              </label>

              <input
                type="number"
                min="0"
                className={inputClass}
                placeholder="0.00 (اتركه فارغاً إذا كان للتبادل فقط)"
                value={form.price}
                onChange={(e) => set('price', e.target.value)}
              />
            </div>

            {/* Operation */}

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-2">تفضيل المعاملة</label>

              <div className="flex flex-wrap gap-2">
                {OPERATIONS_MAP.map((operation) => (
                  <Pill key={operation.value} item={operation} field="exchangePreference" />
                ))}
              </div>
            </div>

            {/* Condition */}

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-2">حالة المنتج</label>

              <div className="flex flex-wrap gap-2">
                {CONDITIONS_MAP.map((condition) => (
                  <Pill key={condition.value} item={condition} field="condition" />
                ))}
              </div>
            </div>

            {/* Keywords */}

            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">
                كلمات مفتاحية (وسوم)
              </label>

              <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-[#DCEFEE] text-[#2F6F8F] text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    {keyword}

                    <button
                      type="button"
                      className="hover:text-red-500 font-bold"
                      onClick={() => removeKeyword(keyword)}>
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
              <label className="text-xs font-bold text-slate-600 block mb-1">
                وصف المنتج التفصيلي *
              </label>

              <textarea
                rows={4}
                maxLength={500}
                className={`${inputClass} resize-none`}
                placeholder="اكتب وصفاً كاملاً للمنتج، حالته، الأسباب والتفاصيل..."
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
              />

              <p className="text-xs text-slate-400 text-left mt-1">
                {form.description.length}
                /500
              </p>
            </div>
          </section>

          {/* =========================
              الخطأ
          ========================= */}

          {error && (
            <div className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm p-4 font-semibold">
              {error}
            </div>
          )}

          {/* =========================
              الأزرار
          ========================= */}

          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="sm:w-40 py-3 rounded-xl bg-white border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 active:scale-95 transition">
              إلغاء
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-gradient-to-l from-[#4F9D9E] to-[#3A73AA] text-white font-bold shadow hover:opacity-95 active:scale-95 transition disabled:opacity-60">
              {saving ? 'جارٍ نشر المنتج...' : 'نشر المنتج في السوق'}
            </button>
          </div>
        </main>

        {/* =========================
            نافذة النجاح
        ========================= */}

        {saved && (
          <div className="fixed inset-0 bg-black/40 grid place-items-center px-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4F9D9E] text-white text-3xl grid place-items-center">
                ✓
              </div>

              <h3 className="text-xl font-bold mb-1">تم نشر المنتج</h3>

              <p className="text-sm text-slate-500 mb-5">
                تم إضافة المنتج بنجاح وأصبح متاحًا ضمن إعلاناتك.
              </p>

              <button
                type="button"
                onClick={() => navigate('/profilePage?tab=products')}
                className="w-full py-3 rounded-xl bg-[#4F9D9E] text-white font-bold hover:bg-[#3f8c8d] transition">
                الانتقال إلى منتجاتي
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
