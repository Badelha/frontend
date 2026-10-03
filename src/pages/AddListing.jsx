import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Check, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'تمور ومواد غذائية', icon: '🌴' },
  { name: 'خرز وإكسسوارات', icon: '📿' },
  { name: 'خزف وحرف يدوية', icon: '🏺' },
  { name: 'عسل ومنتجات طبيعية', icon: '🍯' },
  { name: 'ملابس وحقائب', icon: '👜' },
  { name: 'أخرى', icon: '📦' },
];

const inputClass =
  'mt-1 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-base text-[#12313d] outline-none focus:border-[#4F9D9E] focus:ring-4 focus:ring-[#4F9D9E]/20';

export default function AddListing() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('بيع'); // بيع أو مقايضة
  const [price, setPrice] = useState('');
  const [wanted, setWanted] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    // تحقق بسيط
    if (title.trim() === '') return setError('اكتبي عنوان الإعلان.');
    if (type === 'بيع' && price.trim() === '') return setError('اكتبي السعر.');
    if (type === 'مقايضة' && wanted.trim() === '') return setError('اكتبي شو بدك بالمقابل.');

    const newListing = {
      id: Date.now(),
      icon: category.icon,
      title: title.trim(),
      type,
      price: type === 'بيع' ? '₪' + price : '',
      wanted,
      description,
      views: 0,
      status: 'قيد المراجعة',
    };

    // نحفظ الإعلان (مؤقتاً بالمتصفح، بعدين بتبعتيه للباك إند)
    const old = JSON.parse(localStorage.getItem('listings')) || [];
    localStorage.setItem('listings', JSON.stringify([newListing, ...old]));

    // نعرض علامة النجاح وبعدها نروح لصفحة الإعلانات
    setDone(true);
    setTimeout(() => navigate('/listings'), 1300);
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#eef7f7] text-[#12313d]">
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pop {
          0% { transform: scale(0); }
          70% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
        .fade-up { animation: fadeUp 0.6s ease-out; }
        .pop { animation: pop 0.5s ease-out; }
      `}</style>

      <div className="h-1.5 bg-gradient-to-l from-[#4F9D9E] to-[#2f6f8f]" />

      {/* شاشة النجاح */}
      {done && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95">
          <div className="pop flex h-24 w-24 items-center justify-center rounded-full bg-[#4F9D9E] text-white">
            <Check size={48} />
          </div>
          <p className="fade-up mt-6 text-xl font-bold">تم إضافة إعلانك</p>
          <p className="fade-up mt-1 text-slate-500">رح يظهر عندك بعد المراجعة.</p>
        </div>
      )}

      <main className="mx-auto max-w-5xl px-4 py-10">
        <Link
          to="/listing"
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-[#2f6f8f]">
          <ArrowRight size={16} /> رجوع لإعلاناتي
        </Link>
        <h1 className="fade-up mt-3 text-3xl font-bold">إضافة إعلان</h1>

        <div className="mt-8 grid gap-8 md:grid-cols-[1fr_300px]">
          {/* الفورم */}
          <form
            onSubmit={handleSubmit}
            className="fade-up space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-8">
            {/* بيع أو مقايضة */}
            <div>
              <p className="mb-2 text-sm text-slate-500">نوع الإعلان</p>
              <div className="grid grid-cols-2 gap-3">
                {['بيع', 'مقايضة'].map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setType(t)}
                    className={
                      'rounded-xl border py-3 font-semibold transition ' +
                      (type === t
                        ? 'border-[#2f6f8f] bg-[#2f6f8f] text-white'
                        : 'border-slate-200 text-slate-600 hover:border-[#4F9D9E]')
                    }>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-sm text-slate-500">
              عنوان الإعلان
              <input
                className={inputClass}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="مثلاً: تمور مجدول فاخرة 2 كغ"
              />
            </label>

            {/* السعر أو المقابل حسب النوع */}
            {type === 'بيع' ? (
              <label className="fade-up block text-sm text-slate-500">
                السعر (₪)
                <input
                  type="number"
                  min="0"
                  className={inputClass}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </label>
            ) : (
              <label className="fade-up block text-sm text-slate-500">
                شو بدك بالمقابل؟
                <input
                  className={inputClass}
                  value={wanted}
                  onChange={(e) => setWanted(e.target.value)}
                  placeholder="مثلاً: عسل طبيعي أو خرز"
                />
              </label>
            )}

            {/* القسم */}
            <div>
              <p className="mb-2 text-sm text-slate-500">القسم</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {categories.map((c) => (
                  <button
                    type="button"
                    key={c.name}
                    onClick={() => setCategory(c)}
                    className={
                      'rounded-xl border px-3 py-3 text-sm transition ' +
                      (category.name === c.name
                        ? 'border-[#4F9D9E] bg-[#4F9D9E]/15 text-[#2f6f8f]'
                        : 'border-slate-200 text-slate-600 hover:border-[#4F9D9E]')
                    }>
                    <span className="ml-1 text-lg">{c.icon}</span> {c.name}
                  </button>
                ))}
              </div>
            </div>

            <label className="block text-sm text-slate-500">
              الوصف
              <textarea
                rows={4}
                className={inputClass}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="اكتبي تفاصيل عن الغرض وحالته..."
              />
            </label>

            {error && <p className="fade-up text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              className="w-full rounded-full bg-[#2f6f8f] py-3 font-semibold text-white transition hover:bg-[#4F9D9E]">
              نشر الإعلان
            </button>
          </form>

          {/* معاينة مباشرة */}
          <aside className="fade-up h-fit md:sticky md:top-6" style={{ animationDelay: '0.2s' }}>
            <p className="mb-2 text-sm text-slate-500">هيك رح يظهر إعلانك</p>
            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="flex h-32 items-center justify-center bg-[#4F9D9E]/15 text-6xl">
                {category.icon}
              </div>
              <div className="p-5">
                <h3 className="font-bold">{title || 'عنوان الإعلان'}</h3>
                <p className="mt-2 text-sm text-slate-500">
                  {type === 'بيع' ? (price ? '₪' + price : 'السعر') : 'للمقايضة'}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
