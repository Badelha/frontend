import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api, { getApiError } from '../services/api';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState(token ? 'loading' : 'error');
  const [message, setMessage] = useState(
    token ? 'جارٍ التحقق من بريدك الإلكتروني...' : 'رابط التحقق غير صالح.'
  );

  useEffect(() => {
    if (!token) return undefined;

    let active = true;
    api
      .get('/api/auth/verify-email', { params: { token } })
      .then(() => {
        if (active) {
          setStatus('success');
          setMessage('تم التحقق من بريدك الإلكتروني بنجاح.');
        }
      })
      .catch((error) => {
        if (active) {
          setStatus('error');
          setMessage(getApiError(error) || 'تعذر التحقق من البريد الإلكتروني.');
        }
      });

    return () => {
      active = false;
    };
  }, [token]);

  return (
    <main dir="rtl" className="flex min-h-screen items-center justify-center bg-[#FCFEFF] px-4">
      <section className="w-full max-w-[400px] rounded-[15px] border border-[#ccc] p-6 text-center">
        <h1 className="text-xl font-bold text-[#013b59]">التحقق من البريد الإلكتروني</h1>
        <p role={status === 'error' ? 'alert' : 'status'} className={`mt-4 ${status === 'error' ? 'text-red-600' : 'text-[#3b5869]'}`}>
          {message}
        </p>
        {status !== 'loading' && (
          <Link className="mt-6 inline-block text-[#3A73AA] underline" to="/login">
            الانتقال إلى تسجيل الدخول
          </Link>
        )}
      </section>
    </main>
  );
}
