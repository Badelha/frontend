import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import { getApiError } from '../services/api';
import requests from '../services/requests';
import marketplace from '../services/marketplace';
import usersService from '../services/users';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    usersCount: 0,
    productsCount: 0,
    categoriesCount: 0,
    transactionsCount: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadAdminData = async () => {
      try {
        setLoading(true);
        const [productsRes, transactionsRes, usersRes, categoriesRes] = await Promise.allSettled([
          marketplace.products({ limit: 1000 }),
          requests.transactionStats(),
          usersService.getAllUsers({ limit: 5 }),
          marketplace.categories(),
        ]);

        const products = productsRes.status === 'fulfilled' ? productsRes.value : [];
        const productList = Array.isArray(products)
          ? products
          : Array.isArray(products?.products)
          ? products.products
          : [];

        const txStats = transactionsRes.status === 'fulfilled' ? transactionsRes.value || {} : {};

        const usersData = usersRes.status === 'fulfilled' ? usersRes.value : {};
        const userList = Array.isArray(usersData)
          ? usersData
          : Array.isArray(usersData?.users)
          ? usersData.users
          : [];
        const totalUsers = Number(usersData?.total || userList.length || 0);

        const catsData = categoriesRes.status === 'fulfilled' ? categoriesRes.value : [];
        const catList = Array.isArray(catsData) ? catsData : Array.isArray(catsData?.categories) ? catsData.categories : [];

        if (active) {
          setStats({
            usersCount: totalUsers,
            productsCount: productList.length,
            categoriesCount: catList.length,
            transactionsCount: Number(txStats.transactions || txStats.total || 0),
          });
          setRecentUsers(userList);
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(getApiError(err) || 'تعذر تحميل بيانات لوحة التحكم');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadAdminData();
    return () => {
      active = false;
    };
  }, []);

  const cards = [
    { key: 'users', label: 'المستخدمين المسجلين', value: stats.usersCount, icon: '👥', color: 'from-[#3A73AA] to-[#4F9D9E]', link: '/admin/users' },
    { key: 'products', label: 'المنتجات في السوق', value: stats.productsCount, icon: '📦', color: 'from-[#4F9D9E] to-[#3A73AA]', link: '/market' },
    { key: 'categories', label: 'الفئات المعتمدة', value: stats.categoriesCount, icon: '📁', color: 'from-[#2a7f7e] to-[#5ab7b6]', link: '/admin/categories' },
    { key: 'transactions', label: 'إجمالي المعاملات', value: stats.transactionsCount, icon: '🔄', color: 'from-[#3a5f8f] to-[#4f9d9e]', link: '/requests' },
  ];

  return (
    <>
      <AdminNavbar />
      <main dir="rtl" className="min-h-screen bg-[#F7FAFB] pt-24 pb-12">
        <div className="mx-auto max-w-[1300px] px-4 sm:px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#4F9D9E]">لوحة الإدارة المركزية</p>
              <h1 className="text-3xl font-bold text-[#16384F]">إحصاءات ونشاط النظام</h1>
            </div>
            <div className="flex gap-2">
              <Link to="/admin/users" className="rounded-xl bg-[#3A73AA] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#315F8B]">
                إدارة المستخدمين
              </Link>
              <Link to="/admin/categories" className="rounded-xl bg-[#4F9D9E] px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-[#3f8f91]">
                إدارة الفئات
              </Link>
            </div>
          </div>

          {error && (
            <div role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          {/* Metric Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            {cards.map((card) => (
              <Link
                key={card.key}
                to={card.link}
                className="group overflow-hidden rounded-2xl border border-[#DFE9ED] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{card.icon}</span>
                  <span className="rounded-full bg-[#F0F6F8] px-3 py-1 text-xs font-bold text-[#3A73AA]">عرض</span>
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-[#718692]">{card.label}</p>
                  <h3 className="mt-2 text-3xl font-bold text-[#16384F]">
                    {loading ? '...' : card.value.toLocaleString('ar-EG')}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Management Grid */}
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Recent Users Table */}
            <div className="lg:col-span-2 rounded-2xl border border-[#DFE9ED] bg-white p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-[#16384F]">أحدث المستخدمين المسجلين</h2>
                <Link to="/admin/users" className="text-sm font-bold text-[#4F9D9E] hover:underline">
                  عرض الكل ←
                </Link>
              </div>

              {loading ? (
                <div className="py-10 text-center text-[#718692]">جارٍ التحميل...</div>
              ) : recentUsers.length === 0 ? (
                <div className="py-10 text-center text-[#718692]">لا يوجد مستخدمون مسجلون بعد.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-right text-sm">
                    <thead>
                      <tr className="border-b border-[#EEF3F5] text-xs font-bold text-[#718692]">
                        <th className="pb-3">الاسم</th>
                        <th className="pb-3">البريد الإلكتروني</th>
                        <th className="pb-3">الهاتف</th>
                        <th className="pb-3">الحالة</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#F0F5F7]">
                      {recentUsers.slice(0, 5).map((user) => (
                        <tr key={user.user_id || user.id} className="hover:bg-[#F8FBFD]">
                          <td className="py-3 font-bold text-[#16384F]">{user.full_name || 'مستخدم'}</td>
                          <td className="py-3 text-[#5A7A84]">{user.email}</td>
                          <td className="py-3 text-[#5A7A84]">{user.phone_number || '—'}</td>
                          <td className="py-3">
                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                              {user.account_status || 'نشط'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Quick Admin Actions Panel */}
            <div className="rounded-2xl border border-[#DFE9ED] bg-white p-6 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-[#16384F] mb-4">إجراءات الإدارة الإدارية</h2>

              <Link
                to="/admin/categories"
                className="flex items-center gap-3 rounded-xl border border-[#E4EDF1] p-4 text-[#16384F] hover:bg-[#F4F9FA] transition"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5F5] text-xl">📁</span>
                <div>
                  <h3 className="font-bold">إدارة الفئات والاقسام</h3>
                  <p className="text-xs text-[#718692]">إضافة وتعديل فئات المنتجات</p>
                </div>
              </Link>

              <Link
                to="/admin/tags"
                className="flex items-center gap-3 rounded-xl border border-[#E4EDF1] p-4 text-[#16384F] hover:bg-[#F4F9FA] transition"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5F5] text-xl">🏷️</span>
                <div>
                  <h3 className="font-bold">إدارة الوسوم والكلمات</h3>
                  <p className="text-xs text-[#718692]">إدارة الكلمات المفتاحية</p>
                </div>
              </Link>

              <Link
                to="/admin/ads"
                className="flex items-center gap-3 rounded-xl border border-[#E4EDF1] p-4 text-[#16384F] hover:bg-[#F4F9FA] transition"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5F5] text-xl">📢</span>
                <div>
                  <h3 className="font-bold">إدارة الإعلانات الترويجية</h3>
                  <p className="text-xs text-[#718692]">إنشاء وتخصيص الحملات</p>
                </div>
              </Link>

              <Link
                to="/report"
                className="flex items-center gap-3 rounded-xl border border-[#E4EDF1] p-4 text-[#16384F] hover:bg-[#F4F9FA] transition"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F5F5] text-xl">🚨</span>
                <div>
                  <h3 className="font-bold">تقديم بلاغ جديد</h3>
                  <p className="text-xs text-[#718692]">الإبلاغ عن مخالفة أو محتوى</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
