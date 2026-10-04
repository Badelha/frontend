import { useState, useRef } from 'react';

import Footer from '../components/Footer';
import Navbarpro from '../components/Navbarpro';

const CATEGORIES = ['سيارات', 'موبايلات', 'ملابس', 'أثاث', 'خدمات', 'ألعاب', 'أخرى'];

const LOCATIONS = ['غزة', 'شمال غزة', 'دير البلح', 'خان يونس', 'رفح'];

const OPERATIONS = ['بيع', 'مقايضة', 'بيع أو مقايضة'];

const CONDITIONS = ['جديد', 'كالجديد', 'مستعمل'];

const input =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:bg-white focus:border-[#4F9D9E] focus:ring-4 focus:ring-[#4F9D9E]/20';

export default function AddProduct() {
  const fileRef = useRef(null);

  const [images, setImages] = useState([]);
  const [mainIdx, setMainIdx] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [kw, setKw] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    name: '',
    price: '',
    qty: 1,
    category: '',
    operation: '',
    location: '',
    condition: '',
    description: '',
  });

  const set = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });
  };

  // =========================
  // إضافة الصور حتى 6 صور
  // =========================
  const addFiles = (files) => {
    const urls = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .slice(0, 6 - images.length)
      .map((file) => URL.createObjectURL(file));

    if (urls.length > 0) {
      setImages([...images, ...urls]);
    }
  };

  // =========================
  // إضافة كلمة مفتاحية
  // =========================
  const addKeyword = () => {
    const word = kw.trim();

    if (word && !keywords.includes(word)) {
      setKeywords([...keywords, word]);
    }

    setKw('');
  };

  // =========================
  // حفظ المنتج
  // =========================
  const save = () => {
    if (images.length === 0) {
      setError('ضيفي صورة وحدة على الأقل');
      return;
    }

    if (!form.name.trim()) {
      setError('اكتبي اسم المنتج');
      return;
    }

    if (!form.price) {
      setError('حطي سعر المنتج');
      return;
    }

    if (!form.category || !form.operation || !form.location || !form.condition) {
      setError('عبّي كل الحقول المطلوبة');
      return;
    }

    setError('');
    setSaving(true);

    // مؤقتًا إلى حين ربط الباك إند
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 1200);
  };

  // =========================
  // زر الخيارات
  // =========================
  const Pill = ({ value, field }) => (
    <button
      type="button"
      onClick={() => set(field, value)}
      className={`px-4 py-2 rounded-full text-sm border transition active:scale-95 ${
        form[field] === value
          ? 'bg-[#4F9D9E] border-[#4F9D9E] text-white shadow'
          : 'bg-slate-50 border-slate-200 hover:border-[#4F9D9E]'
      }`}>
      {value}
    </button>
  );

  return (
    <>
      <Navbarpro />

      <div dir="rtl" className="min-h-screen text-slate-700 pb-12">
        <main className="max-w-2xl mx-auto px-4 pt-24">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1e4a63] mt-8 mb-5">أضف منتج جديد</h1>

          {/* ========================= */}
          {/* رفع الصور */}
          {/* ========================= */}

          <section className="bg-[#c9dde3] rounded-2xl p-3">
            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                addFiles(e.dataTransfer.files);
              }}
              className="h-48 sm:h-64 rounded-xl bg-[#e8edf0] grid place-items-center cursor-pointer overflow-hidden hover:bg-[#dfe9ee] transition">
              {images.length ? (
                <img
                  src={images[mainIdx]}
                  alt="صورة المنتج"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-sm text-slate-500 px-4">
                  <div className="animate-bounce w-11 h-11 mx-auto mb-2 rounded-full bg-white shadow grid place-items-center text-xl text-[#4F9D9E]">
                    +
                  </div>
                  اسحب وأفلت صورة هنا، أو انقر للتحميل
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

            <div className="flex flex-wrap items-center gap-2 mt-3">
              {images.map((url, index) => (
                <button
                  key={url}
                  type="button"
                  onClick={() => setMainIdx(index)}
                  className={`w-14 h-11 rounded-lg overflow-hidden border-2 transition hover:scale-110 ${
                    index === mainIdx ? 'border-[#2f6f8f]' : 'border-transparent opacity-70'
                  }`}>
                  <img src={url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}

              <span className="mr-auto text-xs text-slate-500">{images.length}/6 صور</span>
            </div>
          </section>

          {/* ========================= */}
          {/* تفاصيل المنتج */}
          {/* ========================= */}

          <section className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 mt-5 space-y-4">
            <h2 className="font-bold text-[#1e4a63]">تفاصيل المنتج</h2>

            {/* اسم المنتج */}

            <div>
              <label className="text-xs text-slate-500">اسم المنتج</label>

              <input
                className={input}
                placeholder="مثال: سماعات رأس لاسلكية"
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
              />
            </div>

            {/* السعر والعدد */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500">السعر (₪)</label>

                <input
                  type="number"
                  min="0"
                  className={input}
                  placeholder="0.00"
                  value={form.price}
                  onChange={(e) => set('price', e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs text-slate-500">العدد</label>

                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                  <button
                    type="button"
                    onClick={() => set('qty', Math.max(1, form.qty - 1))}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm hover:bg-[#4F9D9E] hover:text-white transition">
                    −
                  </button>

                  <span className="font-bold">{form.qty}</span>

                  <button
                    type="button"
                    onClick={() => set('qty', form.qty + 1)}
                    className="w-8 h-8 rounded-lg bg-white shadow-sm hover:bg-[#4F9D9E] hover:text-white transition">
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* الفئة والموقع */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-500">الفئة</label>

                <select
                  className={input}
                  value={form.category}
                  onChange={(e) => set('category', e.target.value)}>
                  <option value="">اختر الفئة</option>

                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-500">الموقع</label>

                <select
                  className={input}
                  value={form.location}
                  onChange={(e) => set('location', e.target.value)}>
                  <option value="">اختر الموقع</option>

                  {LOCATIONS.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* نوع العملية */}

            <div>
              <label className="text-xs text-slate-500 block mb-1.5">نوع العملية</label>

              <div className="flex flex-wrap gap-2">
                {OPERATIONS.map((operation) => (
                  <Pill key={operation} value={operation} field="operation" />
                ))}
              </div>
            </div>

            {/* الحالة */}

            <div>
              <label className="text-xs text-slate-500 block mb-1.5">الحالة</label>

              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((condition) => (
                  <Pill key={condition} value={condition} field="condition" />
                ))}
              </div>
            </div>

            {/* الكلمات المفتاحية */}

            <div>
              <label className="text-xs text-slate-500">كلمات مفتاحية (Enter للإضافة)</label>

              <div className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="bg-[#d5ebec] text-[#2f6f8f] text-xs px-2.5 py-1 rounded-full">
                    {keyword}

                    <button
                      type="button"
                      className="mr-1 hover:text-red-500"
                      onClick={() => setKeywords(keywords.filter((item) => item !== keyword))}>
                      ×
                    </button>
                  </span>
                ))}

                <input
                  className="flex-1 min-w-[90px] bg-transparent outline-none text-sm"
                  placeholder="مثل: لاسلكي"
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

            {/* الوصف */}

            <div>
              <label className="text-xs text-slate-500">الوصف</label>

              <textarea
                rows={4}
                maxLength={500}
                className={`${input} resize-none`}
                placeholder="صف ملاحظاتك - المواد، المزايا، الأبعاد..."
                value={form.description}
                onChange={(e) => set('description', e.target.value)}
              />

              <p className="text-xs text-slate-400 text-left">{form.description.length}/500</p>
            </div>
          </section>

          {/* ========================= */}
          {/* رسالة الخطأ */}
          {/* ========================= */}

          {error && (
            <p className="mt-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 animate-pulse">
              {error}
            </p>
          )}

          {/* ========================= */}
          {/* الأزرار */}
          {/* ========================= */}

          <div className="flex flex-col-reverse sm:flex-row gap-3 mt-5">
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="sm:w-40 py-3 rounded-xl bg-white border border-slate-200 text-sm hover:bg-slate-50 active:scale-95 transition">
              إلغاء
            </button>

            <button
              type="button"
              onClick={save}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-[#4F9D9E] text-white font-bold shadow hover:bg-[#3f8c8d] hover:-translate-y-0.5 active:scale-95 transition disabled:opacity-70">
              {saving ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  جاري الحفظ...
                </span>
              ) : (
                'حفظ المنتج'
              )}
            </button>
          </div>
        </main>

        {/* ========================= */}
        {/* نافذة النجاح */}
        {/* ========================= */}

        {saved && (
          <div className="fixed inset-0 bg-black/40 grid place-items-center px-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#4F9D9E] text-white text-3xl grid place-items-center">
                ✓
              </div>

              <h3 className="text-xl font-bold mb-1">تم نشر المنتج</h3>

              <p className="text-sm text-slate-500 mb-5">"{form.name}" صار ظاهر في السوق.</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full py-3 rounded-xl bg-[#4F9D9E] text-white font-bold hover:bg-[#3f8c8d] transition">
                إضافة منتج آخر
              </button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}
