import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbarpro from '../components/Navbarpro';
import { getApiError } from '../services/api';
import requests from '../services/requests';
import marketplace from '../services/marketplace';

const dashboardCards = [
  { key: 'users', label: 'المستخدمين', value: '—', accent: 'from-[#3A73AA] to-[#4F9D9E]' },
  { key: 'products', label: 'المنتجات', value: '—', accent: 'from-[#4F9D9E] to-[#3A73AA]' },
  { key: 'reports', label: 'التقارير', value: '—', accent: 'from-[#2a7f7e] to-[#5ab7b6]' },
  { key: 'notifications', label: 'الإشعارات', value: '—', accent: 'from-[#4a90b2] to-[#78b5c2]' },
  { key: 'transactions', label: 'المعاملات', value: '—', accent: 'from-[#3a5f8f] to-[#4f9d9e]' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadStats = async () => {
      try {
        const [productsResult, transactionsResult] = await Promise.allSettled([
          marketplace.products({ limit: 1000 }),
          requests.transactionStats(),
        ]);

        const productCount = Array.isArray(productsResult.value)
          ? productsResult.value.length
          : Array.isArray(productsResult.value?.products)
            ? productsResult.value.products.length
            : 0;

        const transactionStats = transactionsResult.status === 'fulfilled'
          ? transactionsResult.value
          : {};

        const data = {
          users: Number(transactionStats.users ?? 0),
          products: Number(productCount || transactionStats.products || 0),
          reports: Number(transactionStats.reports ?? 0),
          notifications: Number(transactionStats.notifications ?? 0),
          transactions: Number(transactionStats.transactions ?? transactionStats.total ?? 0),
        };

        if (active) {
          setStats(data);
          setError('');
        }
      } catch (err) {
        if (active) {
          setError(getApiError(err) || 'تعذر تحميل لوحة الإدارة');
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    loadStats();
    return () => { active = false; };
  }, []);

  const cards = dashboardCards.map((card) => ({
    ...card,
    value: loading ? '...' : Number(stats[card.key] ?? 0).toLocaleString('ar-EG'),
  }));

  return (
    <>
      <Navbarpro />
      <main className="min-h-screen bg-[#f7f9fb] pt-[100px] pb-10">
        <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-medium text-[#4F9D9E]">لوحة الإدارة</p>
              <h1 className="text-3xl font-bold text-[#306061]">إحصاءات النظام</h1>
            </div>
            <Link to="/profilePage" className="rounded-xl bg-[#3A73AA] px-4 py-2 text-sm font-semibold text-white">
              العودة للملف الشخصي
            </Link>
          </div>

          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
          )}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {cards.map((card) => (
              <div key={card.key} className="overflow-hidden rounded-2xl border border-[#dfe9ed] bg-white shadow-sm">
                <div className={`h-2 bg-gradient-to-r ${card.accent}`} />
                <div className="p-5">
                  <p className="text-sm text-[#718692]">{card.label}</p>
                  <h3 className="mt-3 text-3xl font-bold text-[#306061]">{card.value}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
