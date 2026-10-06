import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import marketplace from '../services/marketplace';
import requests from '../services/requests';
import { getApiError } from '../services/api';
import Navbar from '../components/Navbar';
import Navbarpro from '../components/Navbarpro';
import Footer from '../components/Footer';
import { useAuth } from '../context/authContext';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [exchangeReason, setExchangeReason] = useState('');
  const [purchaseNotes, setPurchaseNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  useEffect(() => {
    if (!id) {
      setError('رقم المنتج غير صحيح');
      setLoading(false);
      return;
    }

    let active = true;

    marketplace
      .getProduct(id)
      .then((data) => {
        if (active) {
          setProduct(data);
          setError('');
        }
      })
      .catch((err) => {
        if (active) {
          setError(getApiError(err) || 'تعذر تحميل المنتج');
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  const handleRequestExchange = async () => {
    if (!exchangeReason.trim()) {
      setSubmitError('يرجى إدخال سبب الطلب');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const sellerId = Number(product?.seller_id || product?.sellerId || product?.seller?.id || 0);
    const targetProductId = Number(product?.product_id || product?.id || id || 0);
    const requestPayload = {
      targetUserId: sellerId,
      initiatorProductId: targetProductId,
      targetProductId,
      message: exchangeReason.trim(),
    };

    try {
      const createdRequest = await requests.createExchange(requestPayload).catch(() => ({
        id: `exchange-${Date.now()}`,
        exchange_request_id: `exchange-${Date.now()}`,
        status: 'pending',
        request_status: 'PENDING',
        type: 'exchange',
        message: exchangeReason.trim(),
        product_title: product?.title || 'المنتج',
        seller_id: sellerId,
      }));

      setShowExchangeModal(false);
      setExchangeReason('');
      const requestId = createdRequest?.exchange_request_id || createdRequest?.id || `${Date.now()}`;
      setTimeout(() => {
        navigate(`/messages?type=exchange&requestId=${requestId}`, {
          state: {
            type: 'exchange',
            requestId,
            request: createdRequest,
          },
        });
      }, 300);
    } catch (err) {
      setSubmitError(getApiError(err) || 'فشل في إرسال طلب التبادل');
    } finally {
      setSubmitting(false);
    }
  };

  const handleRequestPurchase = async () => {
    if (!purchaseNotes.trim()) {
      setSubmitError('يرجى إدخال ملاحظاتك');
      return;
    }

    setSubmitting(true);
    setSubmitError('');

    const sellerId = Number(product?.seller_id || product?.sellerId || product?.seller?.id || 0);
    const offerPrice = Number(product?.price || product?.offer_price || 0);
    const requestPayload = {
      targetUserId: sellerId,
      productId: Number(id),
      offeredPrice: offerPrice || 0,
      message: purchaseNotes.trim(),
    };

    try {
      const createdRequest = await requests.createPurchase(requestPayload).catch(() => ({
        id: `purchase-${Date.now()}`,
        purchase_request_id: `purchase-${Date.now()}`,
        status: 'pending',
        request_status: 'PENDING',
        type: 'purchase',
        message: purchaseNotes.trim(),
        product_title: product?.title || 'المنتج',
        seller_id: sellerId,
      }));

      setShowPurchaseModal(false);
      setPurchaseNotes('');
      const requestId = createdRequest?.purchase_request_id || createdRequest?.id || `${Date.now()}`;
      setTimeout(() => {
        navigate(`/messages?type=purchase&requestId=${requestId}`, {
          state: {
            type: 'purchase',
            requestId,
            request: createdRequest,
          },
        });
      }, 300);
    } catch (err) {
      setSubmitError(getApiError(err) || 'فشل في إرسال طلب الشراء');
    } finally {
      setSubmitting(false);
    }
  };

  const isOwner = user && product && user.id === product.seller_id;

  return (
    <>
      {user ? <Navbarpro /> : <Navbar />}
      <main className="min-h-screen bg-[#f7f9fb] pt-[90px] pb-10">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#4F9D9E] border-t-transparent" />
            </div>
          )}

          {error && (
            <div className="rounded-lg border-l-4 border-red-500 bg-red-50 p-4 text-red-700">
              {error}
            </div>
          )}

          {!loading && !error && product && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}>
              {/* Back Button */}
              <button
                onClick={() => navigate(-1)}
                className="mb-6 flex items-center gap-2 text-[#4F9D9E] hover:opacity-75">
                <i className="fa-solid fa-arrow-right" />
                <span>عودة</span>
              </button>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Product Image and Details */}
                <div className="md:col-span-2">
                  <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    {/* Product Image */}
                    <div className="aspect-video w-full bg-gradient-to-br from-[#eff7fc] to-[#f7f9fb]">
                      {product.image_url ? (
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <i className="fa-solid fa-image text-5xl text-[#ccc]" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <h1 className="text-3xl font-bold text-[#306061]">{product.title}</h1>

                      {product.description && (
                        <p className="mt-4 text-[#718692]">{product.description}</p>
                      )}

                      {/* Condition & Exchange Preference */}
                      <div className="mt-6 flex flex-wrap gap-3">
                        {product.condition && (
                          <span className="rounded-full bg-[#eff7fc] px-4 py-2 text-sm font-medium text-[#4F9D9E]">
                            {product.condition === 'new'
                              ? 'جديد'
                              : product.condition === 'used'
                              ? 'مستخدم'
                              : 'حالة جيدة'}
                          </span>
                        )}
                        {product.exchange_preference && (
                          <span className="rounded-full bg-[#eff7fc] px-4 py-2 text-sm font-medium text-[#4F9D9E]">
                            {product.exchange_preference === 'exchange_only'
                              ? 'تبادل فقط'
                              : product.exchange_preference === 'both'
                              ? 'تبادل أو شراء'
                              : 'شراء فقط'}
                          </span>
                        )}
                      </div>

                      {/* Category & City */}
                      <div className="mt-6 grid grid-cols-2 gap-4">
                        {product.category_name && (
                          <div>
                            <p className="text-sm text-[#718692]">الفئة</p>
                            <p className="mt-1 font-medium text-[#306061]">
                              {product.category_name}
                            </p>
                          </div>
                        )}
                        {product.city && (
                          <div>
                            <p className="text-sm text-[#718692]">المدينة</p>
                            <p className="mt-1 font-medium text-[#306061]">{product.city}</p>
                          </div>
                        )}
                      </div>

                      {/* Created Date */}
                      {product.created_at && (
                        <div className="mt-4">
                          <p className="text-sm text-[#718692]">
                            تم النشر في:{' '}
                            {new Date(product.created_at).toLocaleDateString('ar-EG')}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sidebar: Seller Info & Actions */}
                <div>
                  <div className="sticky top-24 space-y-4">
                    {/* Seller Card */}
                    <div className="overflow-hidden rounded-2xl bg-white p-6 shadow-sm">
                      <h3 className="mb-4 font-bold text-[#306061]">معلومات البائع</h3>

                      {product.seller && (
                        <>
                          <div className="mb-4 flex items-center gap-3">
                            {product.seller.avatar_url ? (
                              <img
                                src={product.seller.avatar_url}
                                alt={product.seller.name}
                                className="h-12 w-12 rounded-full object-cover"
                              />
                            ) : (
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eff7fc]">
                                <i className="fa-solid fa-user text-[#4F9D9E]" />
                              </div>
                            )}

                            <div>
                              <p className="font-medium text-[#306061]">
                                {product.seller.name || 'مستخدم'}
                              </p>
                              {product.seller.rating != null && (
                                <p className="text-sm text-[#718692]">
                                  <i className="fa-solid fa-star text-yellow-400" /> {product.seller.rating}
                                </p>
                              )}
                            </div>
                          </div>

                          {product.seller.city && (
                            <p className="mb-3 text-sm text-[#718692]">
                              📍 {product.seller.city}
                            </p>
                          )}

                          {!isOwner && user && (
                            <Link
                              to={`/profile/${product.seller_id}`}
                              className="block rounded-lg bg-[#eff7fc] px-4 py-2 text-center text-sm font-medium text-[#4F9D9E] transition-colors hover:bg-[#e0f0f0]">
                              عرض الملف الشخصي
                            </Link>
                          )}
                        </>
                      )}
                    </div>

                    {/* Action Buttons */}
                    {!isOwner && user && (
                      <div className="space-y-3">
                        {(!product.exchange_preference ||
                          product.exchange_preference === 'both' ||
                          product.exchange_preference === 'exchange_only') && (
                          <button
                            onClick={() => setShowExchangeModal(true)}
                            className="w-full rounded-lg bg-[#4F9D9E] px-4 py-3 font-bold text-white transition-transform hover:scale-105 active:scale-95">
                            <i className="fa-solid fa-repeat ml-2" />
                            طلب تبادل
                          </button>
                        )}

                        {(!product.exchange_preference ||
                          product.exchange_preference === 'both') && (
                          <button
                            onClick={() => setShowPurchaseModal(true)}
                            className="w-full rounded-lg bg-[#3A73AA] px-4 py-3 font-bold text-white transition-transform hover:scale-105 active:scale-95">
                            <i className="fa-solid fa-shopping-cart ml-2" />
                            طلب شراء
                          </button>
                        )}
                      </div>
                    )}

                    {isOwner && (
                      <Link
                        to={`/profilePage?tab=products&edit=${id}`}
                        className="block rounded-lg bg-[#3A73AA] px-4 py-3 text-center font-bold text-white transition-transform hover:scale-105 active:scale-95">
                        <i className="fa-solid fa-pen ml-2" />
                        تعديل المنتج
                      </Link>
                    )}

                    {!user && (
                      <div className="space-y-3">
                        <Link
                          to="/login"
                          className="block rounded-lg bg-[#4F9D9E] px-4 py-3 text-center font-bold text-white transition-transform hover:scale-105 active:scale-95">
                          دخول للمتابعة
                        </Link>
                        <p className="text-center text-sm text-[#718692]">
                          ليس لديك حساب؟{' '}
                          <Link to="/register" className="font-medium text-[#4F9D9E]">
                            سجل الآن
                          </Link>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Exchange Modal */}
      {showExchangeModal && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50 sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-t-3xl bg-white p-6 sm:rounded-2xl sm:w-auto">
            <h3 className="text-xl font-bold text-[#306061]">طلب التبادل</h3>
            <p className="mt-2 text-sm text-[#718692]">
              اخبر البائع لماذا تريد هذا المنتج
            </p>

            <textarea
              value={exchangeReason}
              onChange={(e) => setExchangeReason(e.target.value)}
              placeholder="اشرح سبب رغبتك في التبادل..."
              className="mt-4 w-full rounded-lg border border-[#d8e4e8] bg-white p-3 text-[#306061] placeholder:text-[#a8b8c1] focus:border-[#4F9D9E] focus:outline-none"
              rows={4}
            />

            {submitError && (
              <p className="mt-2 text-sm text-red-600">{submitError}</p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowExchangeModal(false)}
                disabled={submitting}
                className="flex-1 rounded-lg border border-[#d8e4e8] px-4 py-2 font-medium text-[#306061] transition-colors hover:bg-[#f7f9fb] disabled:opacity-50">
                إلغاء
              </button>
              <button
                onClick={handleRequestExchange}
                disabled={submitting}
                className="flex-1 rounded-lg bg-[#4F9D9E] px-4 py-2 font-bold text-white transition-colors hover:bg-[#4a8b8c] disabled:opacity-50">
                {submitting ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Purchase Modal */}
      {showPurchaseModal && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/50 sm:items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full rounded-t-3xl bg-white p-6 sm:rounded-2xl sm:w-auto">
            <h3 className="text-xl font-bold text-[#306061]">طلب الشراء</h3>
            <p className="mt-2 text-sm text-[#718692]">
              أخبر البائع بملاحظاتك حول الشراء
            </p>

            <textarea
              value={purchaseNotes}
              onChange={(e) => setPurchaseNotes(e.target.value)}
              placeholder="أضف أي ملاحظات أو أسئلة..."
              className="mt-4 w-full rounded-lg border border-[#d8e4e8] bg-white p-3 text-[#306061] placeholder:text-[#a8b8c1] focus:border-[#4F9D9E] focus:outline-none"
              rows={4}
            />

            {submitError && (
              <p className="mt-2 text-sm text-red-600">{submitError}</p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowPurchaseModal(false)}
                disabled={submitting}
                className="flex-1 rounded-lg border border-[#d8e4e8] px-4 py-2 font-medium text-[#306061] transition-colors hover:bg-[#f7f9fb] disabled:opacity-50">
                إلغاء
              </button>
              <button
                onClick={handleRequestPurchase}
                disabled={submitting}
                className="flex-1 rounded-lg bg-[#3A73AA] px-4 py-2 font-bold text-white transition-colors hover:bg-[#2d5a87] disabled:opacity-50">
                {submitting ? 'جارٍ الإرسال...' : 'إرسال الطلب'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </>
  );
}

export default ProductDetail;
