import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import requests from '../services/requests';
import { getApiError } from '../services/api';
import Navbarpro from '../components/Navbarpro';
import Footer from '../components/Footer';

const normalizeRequestList = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
};

function RequestsPage() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'exchanges';
  const showSuccess = searchParams.get('success');

  const [exchanges, setExchanges] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [loadingExchanges, setLoadingExchanges] = useState(true);
  const [loadingPurchases, setLoadingPurchases] = useState(true);
  const [errorExchanges, setErrorExchanges] = useState('');
  const [errorPurchases, setErrorPurchases] = useState('');
  const [showReasonModal, setShowReasonModal] = useState(null);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Load exchanges
  useEffect(() => {
    let active = true;

    requests
      .exchanges()
      .then((data) => {
        if (active) {
          setExchanges(normalizeRequestList(data));
          setErrorExchanges('');
        }
      })
      .catch((err) => {
        if (active) {
          setErrorExchanges(getApiError(err) || 'تعذر تحميل طلبات التبادل');
        }
      })
      .finally(() => {
        if (active) setLoadingExchanges(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // Load purchases
  useEffect(() => {
    let active = true;

    requests
      .purchases()
      .then((data) => {
        if (active) {
          setPurchases(normalizeRequestList(data));
          setErrorPurchases('');
        }
      })
      .catch((err) => {
        if (active) {
          setErrorPurchases(getApiError(err) || 'تعذر تحميل طلبات الشراء');
        }
      })
      .finally(() => {
        if (active) setLoadingPurchases(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const handleAccept = async (exchangeId) => {
    setShowReasonModal(exchangeId);
    setReason('');
  };

  const handleReject = async (exchangeId) => {
    setShowReasonModal(`reject-${exchangeId}`);
    setReason('');
  };

  const submitAction = async () => {
    if (!showReasonModal) return;

    const modalValue = showReasonModal.toString();
    const isReject = modalValue.startsWith('reject-');
    const isComplete = modalValue.startsWith('complete-');
    const requestId = modalValue.replace(/^reject-|^complete-/, '');

    setSubmitting(true);

    try {
      if (activeTab === 'exchanges') {
        if (isReject) {
          await requests.rejectExchange(requestId, reason);
          const updated = await requests.exchanges();
          setExchanges(normalizeRequestList(updated));
        } else if (isComplete) {
          await requests.completeExchange(requestId);
          const updated = await requests.exchanges();
          setExchanges(normalizeRequestList(updated));
        } else {
          await requests.acceptExchange(requestId, reason);
          const updated = await requests.exchanges();
          setExchanges(normalizeRequestList(updated));
        }
      } else {
        if (isReject) {
          await requests.rejectPurchase(requestId, reason);
          const updated = await requests.purchases();
          setPurchases(normalizeRequestList(updated));
        } else if (isComplete) {
          await requests.completePurchase(requestId);
          const updated = await requests.purchases();
          setPurchases(normalizeRequestList(updated));
        } else {
          await requests.acceptPurchase(requestId, reason);
          const updated = await requests.purchases();
          setPurchases(normalizeRequestList(updated));
        }
      }

      setShowReasonModal(null);
      setReason('');
    } catch (err) {
      alert(getApiError(err) || 'حدث خطأ أثناء معالجة الطلب');
    } finally {
      setSubmitting(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
      cancelled: 'bg-gray-100 text-gray-800',
    };

    const labels = {
      pending: 'قيد الانتظار',
      accepted: 'مقبول',
      rejected: 'مرفوض',
      completed: 'مكتمل',
      cancelled: 'ملغى',
    };

    return (
      <span
        className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
          colors[status] || colors.pending
        }`}>
        {labels[status] || status}
      </span>
    );
  };

  const renderRequestItem = (item, type) => (
    <motion.div
      key={item.id || item.exchange_id || item.purchase_id}
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-[#d8e4e8] bg-white p-4 sm:p-6">
      <div className="flex flex-col justify-between sm:flex-row sm:items-start">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="font-bold text-[#306061]">
              {item.product_title || item.product?.title || 'منتج'}
            </h3>
            {getStatusBadge(item.status || 'pending')}
          </div>

          <p className="mt-2 text-sm text-[#718692]">{item.reason || item.notes || ''}</p>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-[#a8b8c1]">
            {item.created_at && (
              <span>
                📅 {new Date(item.created_at).toLocaleDateString('ar-EG')}
              </span>
            )}
            {item.seller_name && <span>👤 {item.seller_name}</span>}
          </div>
        </div>

        {/* Action Buttons */}
        {(item.status === 'pending' || !item.status) && (
          <div className="mt-4 flex gap-2 sm:mt-0">
            <button
              onClick={() => handleAccept(item.id || item.exchange_id || item.purchase_id)}
              className="rounded-lg bg-green-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-green-600">
              قبول
            </button>
            <button
              onClick={() => handleReject(item.id || item.exchange_id || item.purchase_id)}
              className="rounded-lg bg-red-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-red-600">
              رفض
            </button>
          </div>
        )}

        {item.status === 'accepted' && (
          <button
            onClick={() => {
              setShowReasonModal(`complete-${item.id || item.exchange_id || item.purchase_id}`);
              setReason('');
            }}
            className="mt-4 rounded-lg bg-blue-500 px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-blue-600 sm:mt-0">
            تحديد كمكتمل
          </button>
        )}
      </div>
    </motion.div>
  );

  return (
    <>
      <Navbarpro />
      <main className="min-h-screen bg-[#f7f9fb] pt-[90px] pb-10">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          {showSuccess && (
            <div className="mb-6 rounded-lg border-l-4 border-green-500 bg-green-50 p-4 text-green-700">
              <i className="fa-solid fa-check ml-2" />
              تم إرسال الطلب بنجاح!
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6 flex gap-4 border-b border-[#d8e4e8]">
            <Link
              to="/requests?tab=exchanges"
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'exchanges'
                  ? 'border-b-2 border-[#4F9D9E] text-[#4F9D9E]'
                  : 'text-[#718692] hover:text-[#306061]'
              }`}>
              طلبات التبادل
            </Link>
            <Link
              to="/requests?tab=purchases"
              className={`px-4 py-2 font-medium transition-colors ${
                activeTab === 'purchases'
                  ? 'border-b-2 border-[#4F9D9E] text-[#4F9D9E]'
                  : 'text-[#718692] hover:text-[#306061]'
              }`}>
              طلبات الشراء
            </Link>
          </div>

          {/* Exchanges Tab */}
          {activeTab === 'exchanges' && (
            <div>
              {loadingExchanges ? (
                <div className="flex items-center justify-center py-10">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#4F9D9E] border-t-transparent" />
                </div>
              ) : errorExchanges ? (
                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-red-700">
                  {errorExchanges}
                </div>
              ) : exchanges.length > 0 ? (
                <div className="space-y-4">
                  {exchanges.map((item) => renderRequestItem(item, 'exchange'))}
                </div>
              ) : (
                <div className="rounded-lg border border-[#d8e4e8] bg-white p-10 text-center text-[#718692]">
                  <i className="fa-solid fa-inbox text-3xl" />
                  <p className="mt-3">لا توجد طلبات تبادل</p>
                </div>
              )}
            </div>
          )}

          {/* Purchases Tab */}
          {activeTab === 'purchases' && (
            <div>
              {loadingPurchases ? (
                <div className="flex items-center justify-center py-10">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#4F9D9E] border-t-transparent" />
                </div>
              ) : errorPurchases ? (
                <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-red-700">
                  {errorPurchases}
                </div>
              ) : purchases.length > 0 ? (
                <div className="space-y-4">
                  {purchases.map((item) => renderRequestItem(item, 'purchase'))}
                </div>
              ) : (
                <div className="rounded-lg border border-[#d8e4e8] bg-white p-10 text-center text-[#718692]">
                  <i className="fa-solid fa-inbox text-3xl" />
                  <p className="mt-3">لا توجد طلبات شراء</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Action Modal */}
      {showReasonModal && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50 sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-t-3xl bg-white p-6 sm:rounded-2xl sm:w-auto">
            <h3 className="text-xl font-bold text-[#306061]">
              {showReasonModal.toString().startsWith('reject-')
                ? 'رفض الطلب'
                : showReasonModal.toString().startsWith('complete-')
                ? 'تأكيد الانتهاء'
                : 'قبول الطلب'}
            </h3>
            <p className="mt-2 text-sm text-[#718692]">
              {showReasonModal.toString().startsWith('reject-')
                ? 'اشرح سبب الرفض'
                : showReasonModal.toString().startsWith('complete-')
                ? 'أضف ملاحظاتك حول الانتهاء من الصفقة'
                : 'اشرح سبب القبول'}
            </p>

            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="اكتب ملاحظاتك..."
              className="mt-4 w-full rounded-lg border border-[#d8e4e8] bg-white p-3 text-[#306061] placeholder:text-[#a8b8c1] focus:border-[#4F9D9E] focus:outline-none"
              rows={4}
            />

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowReasonModal(null)}
                disabled={submitting}
                className="flex-1 rounded-lg border border-[#d8e4e8] px-4 py-2 font-medium text-[#306061] transition-colors hover:bg-[#f7f9fb] disabled:opacity-50">
                إلغاء
              </button>
              <button
                onClick={submitAction}
                disabled={submitting}
                className={`flex-1 rounded-lg px-4 py-2 font-bold text-white transition-colors disabled:opacity-50 ${
                  showReasonModal.toString().startsWith('reject-')
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-[#4F9D9E] hover:bg-[#4a8b8c]'
                }`}>
                {submitting ? 'جارٍ المعالجة...' : 'تأكيد'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default RequestsPage;
