import { useState } from 'react';
import badelhaLogo from '../assets/images/badelha.png';
import googleIcon from '../assets/images/search 1.png';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [rememberPassword, setRememberPassword] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // التحقق من البريد
    if (!email.trim()) {
      newErrors.email = 'يجب إدخال البريد الإلكتروني';
    }

    // التحقق من كلمة المرور
    if (!password) {
      newErrors.password = 'يجب إدخال كلمة المرور';
    }

    setErrors(newErrors);

    // إذا يوجد أخطاء لا نرسل الطلب
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);

      // رابط الباك إند
      const API_URL = import.meta.env.VITE_API_URL;

      // Endpoint تسجيل الدخول
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          password: password,
        }),
      });

      // نحاول قراءة Response
      const data = await response.json();

      console.log('Login response:', data);

      // =========================
      // تسجيل الدخول ناجح
      // =========================
      if (response.ok) {
        /*
          نخزن بيانات المستخدم حتى نقدر
          نعرف لاحقًا إنه عامل Login
        */

        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
        }

        // إذا الباك إند يرجع token
        if (data.token) {
          localStorage.setItem('token', data.token);
        }

        // الانتقال إلى صفحة Profile
        navigate('/profile');

        return;
      }

      // =========================
      // البريد غير موجود
      // =========================
      if (
        response.status === 404 ||
        data.message === 'USER_NOT_FOUND' ||
        data.error === 'USER_NOT_FOUND'
      ) {
        setErrors({
          email: 'لا يوجد حساب بهذا البريد الإلكتروني',
        });

        return;
      }

      // =========================
      // كلمة المرور خاطئة
      // =========================
      if (
        response.status === 401 ||
        data.message === 'INVALID_PASSWORD' ||
        data.error === 'INVALID_PASSWORD'
      ) {
        setErrors({
          password: 'كلمة المرور غير صحيحة',
        });

        return;
      }

      // =========================
      // في حال الباك إند رجع
      // رسالة مختلفة
      // =========================
      setErrors({
        general: data.message || 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      });
    } catch (error) {
      console.error('Login Error:', error);

      setErrors({
        general: 'حدث خطأ أثناء الاتصال بالخادم، حاول مرة أخرى',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFEFF]" dir="rtl">
      {/* Header */}
      <header>
        <div className="m-[15px]"></div>
      </header>

      <main>
        <div className="min-h-screen flex justify-center items-center px-4">
          <div
            className="
              w-full max-w-[500px]
              border rounded-[15px]
              p-[10px] sm:p-[15px]
              border-[#E5E5E5]
              bg-white
              shadow-[0_4px_20px_rgba(0,0,0,0.05)]
            ">
            {/* Logo */}
            <div className="flex justify-center items-center m-[30px]">
              <img
                src={badelhaLogo}
                alt="Badelha"
                className="sm:w-[250px] sm:h-[150px] w-[150px] h-[100px] object-contain"
              />
            </div>

            {/* Title */}
            <div className="block my-[5px]">
              <h2
                className="
                  text-center
                  m-[3px]
                  font-bold
                  text-[#013b59]
                  text-[20px]
                  sm:text-[25px]
                ">
                تسجيل الدخول إلى الحساب
              </h2>

              <p
                className="
                  text-center
                  mt-[5px]
                  text-[#817f7f]
                  text-[13px]
                  sm:text-[15px]
                ">
                ادخل البريد الإلكتروني أو رقم الهاتف وكلمة المرور
              </p>
            </div>

            {/* General Error */}
            {errors.general && (
              <div
                className="
                  mt-[15px]
                  rounded-[10px]
                  bg-red-50
                  border border-red-200
                  text-red-500
                  text-[13px]
                  text-center
                  p-[10px]
                ">
                {errors.general}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="px-[5px] sm:px-[10px] mt-[20px]">
              {/* Email */}
              <label htmlFor="email" className="block text-[14px] sm:text-[15px]">
                عنوان البريد الإلكتروني
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);

                  // إزالة الخطأ عند الكتابة
                  if (errors.email) {
                    setErrors((prev) => ({
                      ...prev,
                      email: '',
                    }));
                  }
                }}
                placeholder="user.2004@gmail.com"
                className={`
                  w-full
                  p-[8px]
                  my-[10px]
                  bg-[#f1f4f9]
                  border
                  rounded-[10px]
                  outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.email ? 'border-red-500' : 'border-[#D8D8D8]'}
                `}
              />

              {errors.email && (
                <p className="text-red-500 text-[13px] mt-[-5px] mb-[5px]">{errors.email}</p>
              )}

              {/* Password */}
              <div className="relative">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-[14px] sm:text-[15px]">
                    كلمة المرور
                  </label>
                </div>

                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);

                    // إزالة الخطأ عند الكتابة
                    if (errors.password) {
                      setErrors((prev) => ({
                        ...prev,
                        password: '',
                      }));
                    }
                  }}
                  placeholder="••••••••"
                  className={`
                    w-full
                    p-[8px]
                    my-[10px]
                    bg-[#f1f4f9]
                    border
                    rounded-[10px]
                    outline-none
                    focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                    ${errors.password ? 'border-red-500' : 'border-[#D8D8D8]'}
                  `}
                />

                {/* Eye */}
                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`
                    fa-solid
                    ${showPassword ? 'fa-eye-slash' : 'fa-eye'}
                    absolute
                    left-[10px]
                    ${errors.password ? 'bottom-[38px]' : 'bottom-[23px]'}
                    text-[#b7b4b4]
                    cursor-pointer
                  `}></i>

                {errors.password && (
                  <p className="text-red-500 text-[13px] mt-[-5px] mb-[5px]">{errors.password}</p>
                )}
              </div>

              {/* Remember Password */}
              <div className="relative flex justify-between items-center">
                <div
                  onClick={() => setRememberPassword(!rememberPassword)}
                  className="flex items-center mb-[10px] cursor-pointer select-none">
                  <i
                    className={`fa-solid ${
                      rememberPassword
                        ? 'fa-square-check text-[#5CBA9D]'
                        : 'fa-square text-transparent'
                    } text-[25px]`}
                    style={rememberPassword ? {} : { WebkitTextStroke: '1px #4F9D9E' }}></i>

                  <p className="mr-[8px] text-[#a09c9c] text-[16px]">تذكر كلمة المرور</p>
                </div>

                <Link to="/forgot-password" className="text-[13px] text-[#929191]">
                  هل نسيت كلمة المرور؟
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="
                  block
                  mx-auto
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:from-[#4f8ac1]
                  hover:to-[#6ccacc]
                  bg-gradient-to-r
                  from-[#3A73AA]
                  to-[#4F9D9E]
                  w-full
                  p-[10px]
                  rounded-[10px]
                  mt-[20px]
                  text-[#fff]
                  disabled:opacity-60
                  disabled:cursor-not-allowed
                ">
                {loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}
              </button>
            </form>

            {/* Register */}
            <div className="flex text-center items-center justify-center mt-[20px] mb-[18px] gap-[5px]">
              <p className="text-[#828181]">ليس لديك حساب؟</p>

              <Link
                to="/register"
                className="
                  line-clamp-1
                  text-[#041167]
                  underline
                  font-bold
                ">
                إنشاء حساب
              </Link>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-[10px] mb-[20px]">
              <div className="h-[1px] bg-[#E5E5E5] flex-1"></div>

              <span className="text-[12px] text-[#999]">أو</span>

              <div className="h-[1px] bg-[#E5E5E5] flex-1"></div>
            </div>

            {/* Social Login */}
            <div className="sm:flex sm:justify-center sm:items-center  gap-[15px] m-[11px]">
              {/* Facebook */}
              <div
                className="
                  border
                  border-[#e1e1e1]
                  rounded-[11px]
                  cursor-pointer
                  px-[27px]
                  py-[8px]
                  gap-[5px]
                  flex
                  justify-center
                  items-center
                  hover:scale-[1.03]
                  transition-all
                  duration-300
                  sm:mb-[0]
                  mb-[10px]
                ">
                <i
                  className="
                    fa-brands
                    fa-facebook
                    text-[24px]
                    bg-gradient-to-b
                    from-[#00B2FF]
                    to-[#006AFF]
                    bg-clip-text
                    text-transparent
                  "></i>

                <p className="text-[12px] text-[#00B2FF]">الدخول باستخدام فيسبوك</p>
              </div>

              {/* Google */}
              <div
                className="
                  border
                  border-[#e1e1e1]
                  rounded-[11px]
                  px-[27px]
                  py-[10px]
                  gap-[6px]
                  cursor-pointer
                  flex
                  justify-center
                  items-center
                  hover:scale-[1.03]
                  transition-all
                ">
                <img src={googleIcon} className="w-[20px] h-[20px]" alt="Google" />

                <button type="button" className="text-[12px] text-[#6f6d6d]">
                  Google الدخول باستخدام
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
