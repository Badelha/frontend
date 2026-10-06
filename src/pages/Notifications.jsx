import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarpro from '../components/Navbarpro';
import notificationsService from '../services/notifications';
import { getApiError } from '../services/api';

export default function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);

  const loadNotifications = async () => {
    setLoading(true);
    setError('');
    try {
      const [listRes, countRes] = await Promise.allSettled([
        notificationsService.list({ limit: 50 }),
        notificationsService.getUnreadCount(),
      ]);

      const items = listRes.status === 'fulfilled'
        ? (Array.isArray(listRes.value) ? listRes.value : listRes.value?.notifications || [])
        : [];

      const count = countRes.status === 'fulfilled'
        ? Number(countRes.value?.unread_count || countRes.value?.count || countRes.value || 0)
        : 0;

      setNotifications(items);
      setUnreadCount(count);
    } catch (err) {
      setError(getApiError(err) || 'تعذر تحميل الإشعارات');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  const markAllAsRead = async () => {
    try {
      await notificationsService.markAllAsRead();
      setNotifications((prev) =>
        prev.map((item) => ({ ...item, is_read: true, read: true }))
      );
      setUnreadCount(0);
    } catch (err) {
      alert(getApiError(err) || 'تعذر تحديث الإشعارات');
    }
  };

  const markSingleRead = async (id) => {
    try {
      await notificationsService.markRead(id);
      setNotifications((prev) =>
        prev.map((item) => (item.notification_id === id || item.id === id ? { ...item, is_read: true } : item))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch {
      // Ignore
    }
  };

  const deleteNotification = async (id) => {
    try {
      await notificationsService.delete(id);
      setNotifications((prev) => prev.filter((item) => (item.notification_id || item.id) !== id));
    } catch (err) {
      alert(getApiError(err) || 'تعذر حذف الإشعار');
    }
  };

  const getNotificationIcon = (type) => {
    const t = String(type || '').toUpperCase();
    if (t.includes('EXCHANGE')) return '🔄';
    if (t.includes('PURCHASE') || t.includes('BUY')) return '🛒';
    if (t.includes('RATING')) return '⭐';
    if (t.includes('REPORT')) return '🚨';
    return '🔔';
  };

  return (
    <>
      <Navbarpro />
      <div dir="rtl" className="min-h-screen bg-[#F0F9FF] font-['Cairo'] pt-24 pb-12">
        <main className="mx-auto max-w-[1200px] px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            {/* Main Notification Card */}
            <section className="flex-1 w-full overflow-hidden rounded-2xl border border-[#E1E9ED] bg-white shadow-sm">
              <div className="flex h-14 items-center justify-between border-b border-[#F0F4F6] bg-white px-5">
                <div className="flex items-center gap-3">
                  <h1 className="text-lg font-bold text-[#0D3B57]">مركز الإشعارات</h1>
                  {unreadCount > 0 && (
                    <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-xs font-bold text-white">
                      {unreadCount} غير مقروء
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={markAllAsRead}
                  className="text-xs font-bold text-[#4F9D9E] transition hover:text-[#3A73AA]"
                >
                  تعيين الكل كمقروء
                </button>
              </div>

              {error && (
                <div role="alert" className="m-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="py-16 text-center text-[#4F9D9E]">جارٍ تحميل الإشعارات...</div>
              ) : notifications.length === 0 ? (
                <div className="py-16 text-center text-[#8AA0AF]">
                  <p className="text-3xl mb-2">🔔</p>
                  <p className="text-sm font-semibold">لا توجد إشعارات حالياً.</p>
                </div>
              ) : (
                <div className="divide-y divide-[#E8F0F3]">
                  {notifications.map((item) => {
                    const id = item.notification_id || item.id;
                    const isRead = item.is_read || item.read;
                    return (
                      <div
                        key={id}
                        onClick={() => !isRead && markSingleRead(id)}
                        className={`relative flex items-center justify-between p-4 sm:p-5 transition ${
                          isRead ? 'bg-white' : 'bg-[#F0F9FF]'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#E8F4F8] text-xl">
                            {getNotificationIcon(item.notification_type || item.type)}
                          </span>

                          <div>
                            <p className="text-sm font-semibold text-[#0D3B57] leading-relaxed">
                              {item.message || item.text}
                            </p>
                            <span className="mt-1 block text-xs text-[#A1B6C2]">
                              {item.created_at
                                ? new Date(item.created_at).toLocaleString('ar-EG')
                                : item.time || 'الآن'}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(id);
                            }}
                            className="text-xs font-semibold text-gray-400 hover:text-red-500 p-1"
                            title="حذف الإشعار"
                          >
                            ✕
                          </button>
                          {!isRead && (
                            <span className="h-2.5 w-2.5 rounded-full bg-[#4F9D9E]" title="غير مقروء" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Sidebar Navigation */}
            <aside className="w-full lg:w-[280px] flex flex-col gap-2 shrink-0">
              <button
                type="button"
                onClick={() => navigate('/notifications')}
                className="flex items-center justify-between rounded-xl bg-gradient-to-l from-[#3A73AA] to-[#4F9D9E] p-4 text-white font-bold text-sm shadow-sm"
              >
                <span className="flex items-center gap-2">
                  <span>🔔</span>
                  <span>الإشعارات</span>
                </span>
                {unreadCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs font-extrabold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate('/requests')}
                className="flex items-center justify-between rounded-xl bg-white p-4 text-[#547487] font-semibold text-sm shadow-sm hover:bg-[#F5F9FA] transition"
              >
                <span className="flex items-center gap-2">
                  <span>📋</span>
                  <span>الطلبات والمعاملات</span>
                </span>
                <span className="text-xs text-[#8AA0AF]">←</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/messages')}
                className="flex items-center justify-between rounded-xl bg-white p-4 text-[#547487] font-semibold text-sm shadow-sm hover:bg-[#F5F9FA] transition"
              >
                <span className="flex items-center gap-2">
                  <span>💬</span>
                  <span>المحادثات المباشرة</span>
                </span>
                <span className="text-xs text-[#8AA0AF]">←</span>
              </button>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}