import { useState, useEffect } from 'react';

// رابط الباك إند (بدّليه برابطك)
const API = 'http://localhost:5000/api';

export default function MyProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all | active | hidden | done

  // 1) أول ما تفتح الصفحة: اجلبي منتجات المستخدم المسجل دخول
  useEffect(() => {
    fetch(API + '/users/me/products', {
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // 2) تغيير حالة المنتج (إخفاء / إظهار / تم البيع)
  function changeStatus(id, status) {
    fetch(API + '/products/' + id + '/status', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({ status }),
    }).then(() => {
      setProducts(products.map((p) => (p._id === id ? { ...p, status } : p)));
    });
  }

  // 3) حذف المنتج
  function deleteProduct(id) {
    if (!window.confirm('متأكدة بدك تحذفي المنتج؟')) return;
    fetch(API + '/products/' + id, {
      method: 'DELETE',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
    }).then(() => {
      setProducts(products.filter((p) => p._id !== id));
    });
  }

  const shown = filter === 'all' ? products : products.filter((p) => p.status === filter);

  const typeText = { sell: 'بيع', swap: 'مقايضة', both: 'بيع أو مقايضة' };
  const statusText = { active: 'نشط', hidden: 'مخفي', done: 'مكتمل' };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 p-6">
      {/* أنيميشن ظهور الكروت */}
      <style>{`
        @keyframes up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
        .card-anim { animation: up .4s ease both; }
      `}</style>

      <div className="max-w-5xl mx-auto">
        {/* العنوان + زر الإضافة */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-[#2f6f8f]">منتجاتي</h1>
          <a
            href="/add-product"
            className="bg-[#2f6f8f] text-white px-5 py-2 rounded-xl hover:bg-[#4F9D9E] transition">
            + إضافة منتج
          </a>
        </div>

        {/* أزرار الفلترة */}
        <div className="flex gap-2 mb-6">
          {[
            ['all', 'الكل'],
            ['active', 'نشط'],
            ['hidden', 'مخفي'],
            ['done', 'مكتمل'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={
                'px-4 py-2 rounded-full transition ' +
                (filter === key
                  ? 'bg-[#2f6f8f] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100')
              }>
              {label}
            </button>
          ))}
        </div>

        {/* المحتوى */}
        {loading ? (
          <p className="text-center text-gray-500 py-10 animate-pulse">جاري التحميل...</p>
        ) : shown.length === 0 ? (
          <p className="text-center text-gray-500 py-10">ما في منتجات هون بعد 📭</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {shown.map((p, i) => (
              <div
                key={p._id}
                style={{ animationDelay: i * 80 + 'ms' }}
                className="card-anim bg-white rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition overflow-hidden">
                {/* الصورة */}
                {p.image ? (
                  <img src={p.image} alt={p.name} className="w-full h-44 object-cover" />
                ) : (
                  <div className="h-44 bg-slate-100 flex items-center justify-center text-5xl">
                    📦
                  </div>
                )}

                <div className="p-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="bg-sky-100 text-sky-700 px-2 py-1 rounded-full">
                      {typeText[p.type]}
                    </span>
                    <span className="text-gray-500">{statusText[p.status]}</span>
                  </div>

                  <h3 className="font-bold text-lg">{p.name}</h3>
                  <p className="text-[#2f6f8f] font-bold">
                    {p.type === 'swap' ? 'للمقايضة' : p.price + ' ₪'}
                  </p>

                  {/* الأزرار */}
                  <div className="flex gap-2 mt-4 text-sm">
                    <a
                      href={'/edit-product/' + p._id}
                      className="flex-1 text-center bg-[#2f6f8f] text-white py-2 rounded-lg">
                      تعديل
                    </a>
                    <button
                      onClick={() =>
                        changeStatus(p._id, p.status === 'hidden' ? 'active' : 'hidden')
                      }
                      className="flex-1 bg-gray-100 py-2 rounded-lg hover:bg-gray-200">
                      {p.status === 'hidden' ? 'إظهار' : 'إخفاء'}
                    </button>
                    <button
                      onClick={() => deleteProduct(p._id)}
                      className="bg-red-50 text-red-500 px-3 rounded-lg hover:bg-red-100">
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
