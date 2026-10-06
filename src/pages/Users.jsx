import { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import usersService from '../services/users';
import { getApiError } from '../services/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState(''); // 'suspend' | 'ban' | 'activate' | 'delete'
  const [submitting, setSubmitting] = useState(false);

  const loadUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await usersService.getAllUsers({ search, limit: 50 });
      const list = Array.isArray(res) ? res : res?.users || [];
      setUsers(list);
    } catch (err) {
      setError(getApiError(err) || 'تعذر تحميل قائمة المستخدمين');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadUsers();
  };

  const handleStatusChange = async (userId, newStatus) => {
    setSubmitting(true);
    try {
      await usersService.updateUserStatus(userId, newStatus);
      setSelectedUser(null);
      setActionType('');
      await loadUsers();
    } catch (err) {
      alert(getApiError(err) || 'حدث خطأ أثناء تغيير حالة المستخدم');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    setSubmitting(true);
    try {
      await usersService.deleteUser(userId);
      setSelectedUser(null);
      setActionType('');
      await loadUsers();
    } catch (err) {
      alert(getApiError(err) || 'حدث خطأ أثناء حذف المستخدم');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'ACTIVE' || status === 'نشط') {
      return <span className="rounded-full bg-[#DDF7E8] px-3 py-1 text-xs font-bold text-[#008236]">نشط</span>;
    }
    if (status === 'SUSPENDED' || status === 'موقوف') {
      return <span className="rounded-full bg-[#FFF2C7] px-3 py-1 text-xs font-bold text-[#D39A00]">موقوف</span>;
    }
    return <span className="rounded-full bg-[#FDE1E1] px-3 py-1 text-xs font-bold text-[#E05252]">محظور</span>;
  };

  return (
    <>
      <AdminNavbar />
      <main dir="rtl" className="min-h-screen bg-[#F8FBFC] px-4 pt-24 pb-12">
        <div className="mx-auto max-w-[1300px]">
          {/* Header & Search */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-[#4F9D9E]">لوحة الإدارة</p>
              <h1 className="text-2xl font-bold text-[#285F88]">إدارة وتراخيص المستخدمين</h1>
            </div>

            <form onSubmit={handleSearchSubmit} className="flex gap-2">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="بحث بالاسم أو الهاتف أو البريد..."
                className="h-10 w-[260px] rounded-xl border border-[#E6ECEF] bg-white px-3 text-sm text-[#306061] outline-none focus:border-[#4F9D9E]"
              />
              <button className="rounded-xl bg-[#3A73AA] px-5 py-2 text-sm font-bold text-white hover:bg-[#315F8B]">
                بحث
              </button>
            </form>
          </div>

          {error && (
            <div role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Table Card */}
          <section className="overflow-hidden rounded-2xl border border-[#E5EAEC] bg-white shadow-sm">
            {loading ? (
              <div className="py-16 text-center text-[#4F9D9E]">جارٍ تحميل المستخدمين...</div>
            ) : users.length === 0 ? (
              <div className="py-16 text-center text-[#718692]">لا يوجد مستخدمون مطابقون للبحث.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-right text-sm">
                  <thead>
                    <tr className="bg-[#F5F8F9] border-b border-[#E5EAEC] text-xs font-bold text-[#74838C]">
                      <th className="py-3 px-4">المستخدم</th>
                      <th className="py-3 px-4">الهاتف</th>
                      <th className="py-3 px-4">البريد الإلكتروني</th>
                      <th className="py-3 px-4 text-center">الحالة</th>
                      <th className="py-3 px-4 text-center">الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EEF1F2]">
                    {users.map((user) => {
                      const id = user.user_id || user.id;
                      return (
                        <tr key={id} className="hover:bg-[#F9FBFB]">
                          <td className="py-3.5 px-4 font-bold text-[#2E5F87]">
                            <div className="flex items-center gap-2">
                              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#4384A5] text-xs text-white">
                                {user.full_name?.charAt(0) || 'م'}
                              </span>
                              <span>{user.full_name || 'مستخدم'}</span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-[#74838C]">{user.phone_number || '—'}</td>
                          <td className="py-3.5 px-4 text-[#74838C]">{user.email}</td>
                          <td className="py-3.5 px-4 text-center">{getStatusBadge(user.account_status)}</td>
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setActionType('activate');
                                }}
                                className="rounded-lg bg-[#DCFCE7] px-3 py-1 text-xs font-bold text-[#15803D] hover:bg-green-200"
                              >
                                تنشيط
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setActionType('suspend');
                                }}
                                className="rounded-lg bg-[#FEFCE8] px-3 py-1 text-xs font-bold text-[#A65F00] hover:bg-yellow-200"
                              >
                                إيقاف
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setActionType('ban');
                                }}
                                className="rounded-lg bg-[#FEF2F2] px-3 py-1 text-xs font-bold text-[#C10007] hover:bg-red-200"
                              >
                                حظر
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedUser(user);
                                  setActionType('delete');
                                }}
                                className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-bold text-gray-700 hover:bg-gray-200"
                              >
                                حذف
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          {/* Action Modal */}
          {selectedUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-[420px] rounded-2xl bg-white p-6 text-right shadow-2xl">
                <h3 className="text-xl font-bold text-[#2E5F87]">
                  {actionType === 'suspend' && 'إيقاف حساب المستخدم'}
                  {actionType === 'ban' && 'حظر المستخدم'}
                  {actionType === 'activate' && 'تنشيط حساب المستخدم'}
                  {actionType === 'delete' && 'حذف المستخدم'}
                </h3>
                <p className="mt-3 text-sm text-[#6B7280]">
                  هل أنت متأكد من تنفيذ الإجراء على المستخدم{' '}
                  <span className="font-bold text-[#2E5F87]">{selectedUser.full_name || selectedUser.email}</span>؟
                </p>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                      setSelectedUser(null);
                      setActionType('');
                    }}
                    className="rounded-xl border border-gray-300 bg-white px-5 py-2 text-sm font-bold text-gray-600 hover:bg-gray-50"
                  >
                    إلغاء
                  </button>

                  <button
                    type="button"
                    disabled={submitting}
                    onClick={() => {
                      const id = selectedUser.user_id || selectedUser.id;
                      if (actionType === 'delete') {
                        handleDeleteUser(id);
                      } else {
                        const status = actionType === 'suspend' ? 'SUSPENDED' : actionType === 'ban' ? 'BANNED' : 'ACTIVE';
                        handleStatusChange(id, status);
                      }
                    }}
                    className={`rounded-xl px-5 py-2 text-sm font-bold text-white shadow ${
                      actionType === 'delete' || actionType === 'ban'
                        ? 'bg-red-600 hover:bg-red-700'
                        : actionType === 'suspend'
                        ? 'bg-amber-600 hover:bg-amber-700'
                        : 'bg-green-600 hover:bg-green-700'
                    }`}
                  >
                    {submitting ? 'جارٍ التنفيذ...' : 'تأكيد'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}