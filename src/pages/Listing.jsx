import { useState } from 'react';
import { Plus, Eye, Pencil, Trash2, Pause, Play } from 'lucide-react';
import Navbarpro from '../components/Navbarpro';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// بيانات تجريبية
const initial = [
  {
    id: 1,
    icon: '🌴',
    title: 'تمور مجدول فاخرة 2 كغ',
    type: 'بيع',
    price: '₪60',
    views: 312,
    status: 'نشط',
  },
  {
    id: 2,
    icon: '📿',
    title: 'طقم خرز يدوي',
    type: 'مقايضة',
    price: '',
    views: 148,
    status: 'نشط',
  },
  {
    id: 3,
    icon: '🏺',
    title: 'مزهرية خزف يدوي',
    type: 'مقايضة',
    price: '',
    views: 96,
    status: 'متوقف',
  },
  {
    id: 4,
    icon: '🍯',
    title: 'عسل طبيعي 1 كغ',
    type: 'بيع',
    price: '₪45',
    views: 210,
    status: 'نشط',
  },
  {
    id: 5,
    icon: '👜',
    title: 'حقيبة تطريز فلاحي',
    type: 'بيع',
    price: '₪120',
    views: 0,
    status: 'قيد المراجعة',
  },
];

const tabs = ['الكل', 'نشط', 'متوقف', 'قيد المراجعة'];

export default function Listings() {
  const [listings, setListings] = useState(initial);
  const [filter, setFilter] = useState('الكل');

  // الإعلانات اللي بنعرضها حسب التبويب
  const shown = filter === 'الكل' ? listings : listings.filter((item) => item.status === filter);

  function togglePause(id) {
    setListings(
      listings.map((item) =>
        item.id === id ? { ...item, status: item.status === 'نشط' ? 'متوقف' : 'نشط' } : item
      )
    );
  }

  function remove(id) {
    setListings(listings.filter((item) => item.id !== id));
  }

  return (
    <>
      <Navbarpro />

      <div dir="rtl" className="min-h-screen py-[100px] bg-[#eef7f7] text-[#12313d]">
        {/* حركة الظهور */}
        <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { opacity: 0; animation: fadeUp 0.6s ease-out forwards; }
      `}</style>

        <main className="mx-auto max-w-6xl px-4 py-10">
          {/* العنوان وزر الإضافة */}
          <div className="fade-up flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold">منتجاتي</h1>

            <Link
              to="/addListing"
              className="flex items-center gap-2 rounded-full bg-[#2f6f8f] px-6 py-3 font-semibold text-white transition hover:bg-[#4F9D9E]">
              <Plus size={20} />
              إضافة منتج
            </Link>
          </div>

          {/* التبويبات */}
          <div className="mt-8 flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={
                  'rounded-full px-5 py-2 text-sm transition ' +
                  (filter === tab
                    ? 'bg-[#2f6f8f] text-white'
                    : 'bg-white text-slate-600 hover:bg-[#4F9D9E]/20')
                }>
                {tab}
              </button>
            ))}
          </div>

          {/* الإعلانات: الـ key بتخلي الحركة تعيد نفسها مع كل تبويب */}
          <div key={filter} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((item, index) => (
              <div
                key={item.id}
                className="fade-up overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${index * 0.1}s` }}>
                {/* الصورة (مكانها) */}
                <div className="flex h-36 items-center justify-center bg-[#4F9D9E]/15 text-6xl">
                  {item.icon}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold">{item.title}</h3>
                    <span className="shrink-0 rounded-full bg-[#2f6f8f]/10 px-3 py-1 text-xs text-[#2f6f8f]">
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    {item.type === 'بيع' ? item.price : 'للمقايضة'}
                    <Eye size={16} className="mr-2" />
                    {item.views}
                  </p>

                  {/* الأزرار */}
                  <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4 text-sm">
                    <button className="flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-slate-600 hover:bg-[#4F9D9E]/20">
                      <Pencil size={16} /> تعديل
                    </button>

                    {item.status !== 'قيد المراجعة' && (
                      <button
                        onClick={() => togglePause(item.id)}
                        className="flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-slate-600 hover:bg-[#4F9D9E]/20">
                        {item.status === 'نشط' ? <Pause size={16} /> : <Play size={16} />}
                        {item.status === 'نشط' ? 'إيقاف' : 'تفعيل'}
                      </button>
                    )}

                    <button
                      onClick={() => remove(item.id)}
                      className="flex flex-1 items-center justify-center gap-1 rounded-lg py-2 text-red-500 hover:bg-red-50">
                      <Trash2 size={16} /> حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {shown.length === 0 && (
            <p className="py-20 text-center text-slate-500">ما في إعلانات هون.</p>
          )}
        </main>
      </div>
      <Footer />
    </>
  );
}
