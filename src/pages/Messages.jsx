import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { getApiError } from '../services/api';
import requests from '../services/requests';
import Navbar from '../components/Navbar';
import Navbarpro from '../components/Navbarpro';

const buildSystemMessages = () => [
  {
    id: 'system-1',
    sender: 'system',
    text: 'تم إرسال الطلب إلى البائع. يمكنك الآن تأكيد تفاصيل الدفع والمعاملة خارج التطبيق.',
    time: 'الآن',
  },
];

function Messages() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { requestId: routeRequestId } = useParams();
  const [searchParams] = useSearchParams();

  const requestType = String(searchParams.get('type') || location.state?.type || 'purchase').toLowerCase();
  const requestId = searchParams.get('requestId') || routeRequestId || location.state?.requestId;

  const [request, setRequest] = useState(location.state?.request || null);
  const [messages, setMessages] = useState(buildSystemMessages());
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(Boolean(requestId) && !location.state?.request);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!requestId || request) return;

    const loadRequest = async () => {
      try {
        setLoading(true);
        const service = requestType === 'exchange' ? requests.getExchange : requests.getPurchase;
        const result = await service(requestId);
        setRequest(result || null);
      } catch (err) {
        setError(getApiError(err) || 'تعذر تحميل تفاصيل الطلب');
      } finally {
        setLoading(false);
      }
    };

    loadRequest();
  }, [request, requestId, requestType]);

  const requestState = useMemo(() => {
    const raw = request || {};
    const status = String(raw.status || raw.request_status || 'pending').toLowerCase();
    const sellerName =
      raw.seller_name ||
      raw.target?.full_name ||
      raw.target_user?.full_name ||
      raw.seller?.name ||
      'البائع';
    const buyerName =
      raw.buyer_name ||
      raw.initiator?.full_name ||
      raw.initiator_user?.full_name ||
      raw.user?.full_name ||
      'المشتري';
    const productTitle =
      raw.product_title ||
      raw.product?.title ||
      raw.offered?.title ||
      raw.requested?.title ||
      'المنتج';
    const price = raw.offeredPrice ?? raw.price ?? raw.total_price ?? raw.amount ?? '—';
    const message = raw.message || raw.reason || raw.notes || raw.initiator_message || 'لا يوجد نص';

    return {
      title: productTitle,
      sellerName,
      buyerName,
      status,
      message,
      price,
      requestType,
    };
  }, [request, requestType]);

  const isSeller = Boolean(
    user &&
      request &&
      Number(request.seller_id ?? request.target_user_id ?? request.targetUserId ?? request.target?.user_id ?? 0) ===
        Number(user.id ?? user.user_id ?? 0)
  );

  const handleSendMessage = () => {
    const value = messageText.trim();
    if (!value) return;

    setMessages((current) => [
      ...current,
      {
        id: `msg-${Date.now()}`,
        sender: 'me',
        text: value,
        time: 'الآن',
      },
    ]);
    setMessageText('');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const confirmRequest = async () => {
    if (!requestId) return;

    try {
      setSending(true);
      const action = requestType === 'exchange' ? requests.acceptExchange : requests.acceptPurchase;
      await action(requestId, 'تم تأكيد تفاصيل المعاملة خارج التطبيق.');
      setRequest((current) => ({
        ...(current || {}),
        status: 'accepted',
        request_status: 'ACCEPTED',
      }));
      setMessages((current) => [
        ...current,
        {
          id: `system-${Date.now()}`,
          sender: 'system',
          text: 'تم تأكيد تفاصيل المعاملة من قبل البائع. سيتم إغلاق الطلب بعد الاستلام.',
          time: 'الآن',
        },
      ]);
    } catch (err) {
      setError(getApiError(err) || 'تعذر تأكيد تفاصيل المعاملة');
    } finally {
      setSending(false);
    }
  };

  const completeRequest = async () => {
    if (!requestId) return;

    try {
      setSending(true);
      const action = requestType === 'exchange' ? requests.completeExchange : requests.completePurchase;
      await action(requestId);
      setRequest((current) => ({
        ...(current || {}),
        status: 'completed',
        request_status: 'COMPLETED',
      }));
      setMessages((current) => [
        ...current,
        {
          id: `system-${Date.now()}`,
          sender: 'system',
          text: 'تم إغلاق الطلب بنجاح. يمكن للمشتري الآن تقييم البائع والمنتج.',
          time: 'الآن',
        },
      ]);
    } catch (err) {
      setError(getApiError(err) || 'تعذر إنهاء الطلب');
    } finally {
      setSending(false);
    }
  };

  const renderStatus = () => {
    const currentStatus = (request?.status || request?.request_status || requestState.status || 'pending').toString().toLowerCase();

    if (currentStatus === 'accepted' || currentStatus === 'completed') {
      return 'مؤكد';
    }

    if (currentStatus === 'rejected') {
      return 'مرفوض';
    }

    return 'قيد المراجعة';
  };

  return (
    <>
      {user ? <Navbarpro /> : <Navbar />}
      <main className="min-h-screen bg-[#F0F9FF] px-4 pb-10 pt-[110px] rtl" dir="rtl">
        <div className="mx-auto max-w-[1300px]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm text-[#62809A]">المحادثة الخاصة</p>
              <h1 className="text-2xl font-bold text-[#0D3B57]">تأكيد تفاصيل المعاملة</h1>
            </div>
            <button
              type="button"
              onClick={() => navigate('/requests')}
              className="rounded-full border border-[#D8E4E8] bg-white px-4 py-2 text-sm font-medium text-[#3A73AA] shadow-sm"
            >
              العودة إلى الطلبات
            </button>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-[#E8EEF2] bg-white p-8 text-center text-[#4F9D9E]">
              جارٍ تحميل تفاصيل الطلب...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
              <section className="overflow-hidden rounded-[20px] border border-[#E6EEF2] bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-[#EEF3F5] px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DCEAF4] text-sm font-bold text-[#3A73AA]">
                      {requestState.sellerName.charAt(0) || 'ب'}
                    </div>
                    <div>
                      <p className="font-bold text-[#0D3B57]">{requestState.sellerName}</p>
                      <p className="text-xs text-[#27B46C]">متصل الآن</p>
                    </div>
                  </div>
                  <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-[#15803D]">
                    {renderStatus()}
                  </span>
                </div>

                <div className="flex h-[420px] flex-col gap-4 overflow-y-auto bg-[#F8FBFD] p-4">
                  {messages.map((item) => (
                    <div
                      key={item.id}
                      className={`flex ${item.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          item.sender === 'me'
                            ? 'bg-gradient-to-l from-[#3A73AA] to-[#4F9D9E] text-white'
                            : 'bg-white text-[#0D3B57] shadow-sm'
                        }`}
                      >
                        <p className="text-sm leading-6">{item.text}</p>
                        <span className={`mt-1 block text-[10px] ${item.sender === 'me' ? 'text-[#E7F6FF]' : 'text-[#8AA0AF]'}`}>
                          {item.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3 border-t border-[#EEF3F5] bg-white p-4">
                  <button
                    type="button"
                    onClick={handleSendMessage}
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3A73AA] text-lg text-white transition hover:opacity-90"
                    aria-label="إرسال رسالة"
                  >
                    ➤
                  </button>
                  <input
                    type="text"
                    value={messageText}
                    onChange={(event) => setMessageText(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="اكتب رسالة بشأن تفاصيل المعاملة..."
                    className="h-11 flex-1 rounded-full border border-[#DDE7EC] bg-[#F7FAFB] px-4 text-right text-sm text-[#183D58] outline-none focus:border-[#4F9D9E]"
                  />
                </div>
              </section>

              <aside className="space-y-4">
                <div className="rounded-[20px] border border-[#E6EEF2] bg-white p-5 shadow-sm">
                  <p className="text-sm text-[#64819A]">تفاصيل الطلب</p>
                  <h2 className="mt-2 text-xl font-bold text-[#0D3B57]">{requestState.title}</h2>
                  <div className="mt-4 space-y-3 text-sm text-[#4F6778]">
                    <div className="flex items-center justify-between gap-4">
                      <span>النوع</span>
                      <span className="font-medium text-[#0D3B57]">
                        {requestType === 'exchange' ? 'تبادل' : 'شراء'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>الطرف الآخر</span>
                      <span className="font-medium text-[#0D3B57]">{requestState.buyerName}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>السعر / العرض</span>
                      <span className="font-medium text-[#0D3B57]">{requestState.price}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <span>الحالة</span>
                      <span className="font-medium text-[#0D3B57]">{renderStatus()}</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-[20px] border border-[#E6EEF2] bg-white p-5 shadow-sm">
                  <p className="text-sm text-[#64819A]">ملاحظات الطلب</p>
                  <p className="mt-3 text-sm leading-7 text-[#466680]">{requestState.message}</p>
                </div>

                <div className="rounded-[20px] border border-[#E6EEF2] bg-white p-5 shadow-sm">
                  <p className="text-sm text-[#64819A]">إجراءات المعاملة</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-xl bg-[#F5FAFC] p-3 text-sm text-[#4F6778]">
                      يتم الدفع خارج التطبيق. بعد تأكيد البائع، يتم إغلاق الطلب ويصبح للمشتري تقييم البائع والمنتج.
                    </div>

                    {isSeller && (
                      <>
                        <button
                          type="button"
                          disabled={sending}
                          onClick={confirmRequest}
                          className="w-full rounded-xl bg-[#4F9D9E] px-4 py-3 font-bold text-white disabled:opacity-60"
                        >
                          {sending ? 'جارٍ التنفيذ...' : 'تأكيد تفاصيل المعاملة'}
                        </button>
                        <button
                          type="button"
                          disabled={sending}
                          onClick={completeRequest}
                          className="w-full rounded-xl bg-[#3A73AA] px-4 py-3 font-bold text-white disabled:opacity-60"
                        >
                          {sending ? 'جارٍ التنفيذ...' : 'إغلاق الطلب بعد الاستلام'}
                        </button>
                      </>
                    )}

                    {!isSeller && (
                      <div className="rounded-xl border border-[#E5EEF2] bg-[#F7FBFC] p-3 text-sm text-[#466680]">
                        في انتظار تأكيد البائع على تفاصيل المعاملة ثم إغلاق الطلب. بعد ذلك يمكنك تقييم البائع.
                      </div>
                    )}

                    {(request?.status === 'completed' || request?.request_status === 'COMPLETED') && (
                      <div className="space-y-3 rounded-xl bg-[#F3FBF8] p-3">
                        <p className="text-sm font-medium text-[#0D3B57]">تقييم المعاملة</p>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((value) => (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setRating(value)}
                              className={`text-2xl ${value <= rating ? 'text-yellow-400' : 'text-[#CBD8DE]'}`}
                              aria-label={`تقييم ${value}`}
                            >
                              ★
                            </button>
                          ))}
                        </div>
                        {rating > 0 && (
                          <p className="text-sm text-[#2B6E58]">تم تحديد تقييمك: {rating} من 5</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default Messages;
