<<<<<<< HEAD
import { useState } from 'react';
import badelhaLogo from '../assets/images/badelha.png';
import googleIcon from '../assets/images/search 1.png';
import { Link } from 'react-router-dom';
import { registerUser } from '../services/authService';

function Register() {
=======
import { useEffect, useState } from 'react';
import badelhaLogo from '../assets/images/badelha.png';
import googleIcon from '../assets/images/search 1.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { getApiError } from '../services/api';
import marketplace from '../services/marketplace';

function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();

>>>>>>> origin/develop
  // بيانات الفورم
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
<<<<<<< HEAD
    birthDate: '',
    gender: '',
=======
    city: '',
>>>>>>> origin/develop
    address: '',
    password: '',
  });

  // الأخطاء
  const [errors, setErrors] = useState({});
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);
>>>>>>> origin/develop

  // إظهار وإخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

<<<<<<< HEAD
=======
  // جلب المدن
  useEffect(() => {
    let active = true;

    marketplace
      .cities()
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.cities;

        if (!Array.isArray(items)) {
          throw new Error('Unexpected cities response');
        }

        if (active) {
          setCities(items);
        }
      })
      .catch((error) => {
        if (active) {
          setErrors((current) => ({
            ...current,
            general: getApiError(error) || 'تعذر تحميل المدن',
          }));
        }
      });

    return () => {
      active = false;
    };
  }, []);

>>>>>>> origin/develop
  // تغيير قيمة أي input
  const handleChange = (e) => {
    const { id, value } = e.target;

<<<<<<< HEAD
    setFormData({
      ...formData,
      [id]: value,
    });

    // إزالة الخطأ بمجرد أن يبدأ المستخدم بالكتابة
    setErrors({
      ...errors,
      [id]: '',
    });
=======
    setFormData((current) => ({
      ...current,
      [id]: value,
    }));

    setErrors((current) => ({
      ...current,
      [id]: '',
      general: '',
    }));
>>>>>>> origin/develop
  };

  // إرسال الفورم
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    // الاسم
    if (!formData.name.trim()) {
      newErrors.name = 'يجب تعبئة الاسم رباعي';
    }

    // الإيميل
    if (!formData.email.trim()) {
      newErrors.email = 'يجب تعبئة عنوان البريد الإلكتروني';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'يجب إدخال عنوان بريد إلكتروني صحيح';
    }

    // رقم الهاتف
<<<<<<< HEAD
    if (!formData.phone.trim()) {
      newErrors.phone = 'يجب تعبئة رقم الهاتف';
    }

    // تاريخ الميلاد
    if (!formData.birthDate) {
      newErrors.birthDate = 'يجب تعبئة تاريخ الميلاد';
    }

    // الجنس
    if (!formData.gender) {
      newErrors.gender = 'يجب اختيار الجنس';
=======
    if (!/^05\d{8}$/.test(formData.phone.trim())) {
      newErrors.phone = 'أدخل رقم هاتف فلسطينيًا مكوّنًا من 10 أرقام ويبدأ بـ 05';
>>>>>>> origin/develop
    }

    // العنوان
    if (!formData.address.trim()) {
      newErrors.address = 'يجب تعبئة العنوان';
    }

    // كلمة المرور
    if (!formData.password) {
      newErrors.password = 'يجب تعبئة كلمة المرور';
    } else {
      const hasUpperCase = /[A-Z]/.test(formData.password);
<<<<<<< HEAD
      const hasNumber = /[0-9]/.test(formData.password);
      const hasSymbol = /[^A-Za-z0-9]/.test(formData.password);

      if (!hasUpperCase || !hasNumber || !hasSymbol) {
        newErrors.password = 'كلمة المرور يجب أن تحتوي على حرف كبير ورقم ورمز';
      }
    }
    if (!acceptedTerms) {
      newErrors.terms = 'يجب الموافقة على الشروط والأحكام';
    }
    // وضع الأخطاء
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const userData = {
          fullName: formData.name,
          phoneNumber: formData.phone,
          address: formData.address,
          email: formData.email,
          password: formData.password,

          // temporary value until you connect cities
          cityId: 1,
        };

        const result = await registerUser(userData);

        console.log('Backend Response:', result);

        localStorage.setItem('accessToken', result.data.accessToken);

        alert('Registration successful');
      } catch (error) {
        console.error(error);

        alert(error.message || 'Registration failed');
=======
      const hasLowerCase = /[a-z]/.test(formData.password);
      const hasNumber = /[0-9]/.test(formData.password);
      const hasSymbol = /[^A-Za-z0-9]/.test(formData.password);

      if (
        formData.password.length < 8 ||
        !hasUpperCase ||
        !hasLowerCase ||
        !hasNumber ||
        !hasSymbol
      ) {
        newErrors.password =
          'كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، وحرف كبير وصغير ورقم ورمز';
      }
    }

    // الشروط والأحكام
    if (!acceptedTerms) {
      newErrors.terms = 'يجب الموافقة على الشروط والأحكام';
    }

    setErrors(newErrors);

    // إذا لم يوجد أخطاء
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);

      try {
        await register({
          fullName: formData.name.trim(),
          email: formData.email.trim(),
          phoneNumber: formData.phone.trim(),
          city: formData.city,
          address: formData.address.trim(),
          password: formData.password,
        });

        navigate(location.state?.from || '/profilePage', { replace: true });
      } catch (error) {
        setErrors({
          general: getApiError(error) || 'تعذر إنشاء الحساب، حاول مرة أخرى',
        });
      } finally {
        setLoading(false);
>>>>>>> origin/develop
      }
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FCFEFF] flex flex-col">
      {/* ================= HEADER ================= */}
      <header className="w-full py-[20px] px-[20px]">
        <div className="max-w-[1200px] mx-auto"></div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex justify-center items-center px-[15px] py-[30px]">
        <div
          className="
            w-full max-w-[500px]
            border rounded-[15px]
            p-[10px] sm:p-[15px]
            border-[#E5E5E5]
            bg-white
            shadow-[0_4px_20px_rgba(0,0,0,0.05)]
          ">
          {/* ================= LOGO ================= */}
          <div className="flex justify-center mb-[15px]">
            <img
              src={badelhaLogo}
              alt="Badelha"
              className="sm:w-[250px] sm:h-[150px] w-[150px] h-[100px] object-contain"
            />
          </div>

          {/* ================= TITLE ================= */}
          <h1
            className="
              text-center m-[3px]
              font-bold
              text-[#013b59]
              text-[20px] sm:text-[25px]
            ">
            إنشاء حساب جديد
          </h1>

          <p
            className="
              text-center mt-[5px]
              text-[#817f7f]
              text-[13px] sm:text-[15px]
            ">
            أدخل بياناتك لإنشاء حساب جديد
          </p>

<<<<<<< HEAD
=======
          {/* General Error */}
          {errors.general && (
            <p
              role="alert"
              className="
                mt-4 rounded-lg
                bg-red-50 p-3
                text-center text-sm
                text-red-600
              ">
              {errors.general}
            </p>
          )}

>>>>>>> origin/develop
          {/* ================= FORM ================= */}
          <form onSubmit={handleSubmit} className="w-full">
            {/* ================= NAME ================= */}
            <div className="mb-[15px]">
              <label htmlFor="name" className="block text-[14px] sm:text-[15px] mb-[10px]">
                الاسم رباعي
              </label>

              <input
                id="name"
                type="text"
                placeholder="الاسم رباعي"
                value={formData.name}
                onChange={handleChange}
                className={`
                  w-full p-[8px] my-[10px]
                  bg-[#f1f4f9]
                  border rounded-[10px]
                  outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.name ? 'border-red-500' : 'border-[#D8D8D8]'}
                `}
              />

              {errors.name && <p className="text-red-500 text-[12px] mt-[5px]">{errors.name}</p>}
            </div>

            {/* ================= EMAIL ================= */}
            <div className="mb-[15px]">
              <label htmlFor="email" className="block text-[14px] sm:text-[15px] mb-[10px]">
                البريد الإلكتروني
              </label>

              <input
                id="email"
                type="email"
                placeholder="user.2004@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className={`
                  w-full p-[8px] my-[10px]
                  bg-[#f1f4f9]
                  border rounded-[10px]
                  outline-none
                  ${errors.email ? 'border-red-500' : 'border-[#D8D8D8]'}
                `}
              />

              {errors.email && <p className="text-red-500 text-[12px] mt-[5px]">{errors.email}</p>}
            </div>

            {/* ================= PHONE ================= */}
            <div className="mb-[15px]">
              <label htmlFor="phone" className="block text-[14px] sm:text-[15px] mb-[10px]">
                رقم الهاتف
              </label>

              <input
                id="phone"
                type="tel"
<<<<<<< HEAD
                placeholder="+972 59-------"
=======
                placeholder="0599123456"
>>>>>>> origin/develop
                value={formData.phone}
                onChange={handleChange}
                className={`
                  w-full p-[8px] my-[10px]
                  bg-[#f1f4f9]
                  border rounded-[10px]
                  outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.phone ? 'border-red-500' : 'border-[#D8D8D8]'}
                `}
              />

              {errors.phone && <p className="text-red-500 text-[12px] mt-[5px]">{errors.phone}</p>}
            </div>

<<<<<<< HEAD
            {/* ================= BIRTH DATE ================= */}
            <div className="mb-[15px]">
              <label htmlFor="birthDate" className="block text-[14px] sm:text-[15px] mb-[10px]">
                تاريخ الميلاد
              </label>

              <input
                id="birthDate"
                type="date"
                value={formData.birthDate}
                onChange={handleChange}
                className={`
                  w-full p-[8px] my-[10px]
                  bg-[#f1f4f9]
                  border rounded-[10px]
                  outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.birthDate ? 'border-red-500' : 'border-[#D8D8D8]'}
                `}
              />

              {errors.birthDate && (
                <p className="text-red-500 text-[12px] mt-[5px]">{errors.birthDate}</p>
              )}
            </div>

            {/* ================= GENDER ================= */}
            <div className="mb-[15px]">
              <label htmlFor="gender" className="block text-[14px] sm:text-[15px] mb-[10px]">
                الجنس
              </label>

              <select
                id="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`
                  w-full p-[8px] my-[10px]
                  bg-[#f1f4f9]
                  border rounded-[10px]
                  outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.gender ? 'border-red-500' : 'border-[#D8D8D8]'}
                `}>
                <option value="" disabled>
                  اختر الجنس
                </option>

                <option value="male">ذكر</option>

                <option value="female">أنثى</option>
              </select>

              {errors.gender && (
                <p className="text-red-500 text-[12px] mt-[5px]">{errors.gender}</p>
              )}
=======
            {/* ================= CITY ================= */}
            <div className="mb-[15px]">
              <label htmlFor="city" className="block text-[14px] sm:text-[15px] mb-[10px]">
                المدينة
              </label>

              <select
                id="city"
                value={formData.city}
                onChange={handleChange}
                className="
                  w-full p-[8px] my-[10px]
                  bg-[#f1f4f9]
                  border border-[#D8D8D8]
                  rounded-[10px]
                  outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                ">
                <option value="">اختر المدينة (اختياري)</option>

                {cities.map((item) => {
                  const cityName = item.city || item.city_name || item.name;

                  return (
                    <option key={item.city_id ?? item.id ?? cityName} value={cityName}>
                      {cityName}
                    </option>
                  );
                })}
              </select>
>>>>>>> origin/develop
            </div>

            {/* ================= ADDRESS ================= */}
            <div className="mb-[15px]">
              <label htmlFor="address" className="block text-[14px] sm:text-[15px] mb-[10px]">
                العنوان
              </label>

              <input
                id="address"
                type="text"
<<<<<<< HEAD
                placeholder="غزة"
=======
                placeholder="الحي والشارع"
>>>>>>> origin/develop
                value={formData.address}
                onChange={handleChange}
                className={`
                  w-full p-[8px] my-[10px]
                  bg-[#f1f4f9]
                  border rounded-[10px]
                  outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.address ? 'border-red-500' : 'border-[#D8D8D8]'}
                `}
              />

              {errors.address && (
                <p className="text-red-500 text-[12px] mt-[5px]">{errors.address}</p>
              )}
            </div>

            {/* ================= PASSWORD ================= */}
            <div className="mb-[15px]">
              <label htmlFor="password" className="block text-[14px] sm:text-[15px] mb-[10px]">
                كلمة المرور
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    w-full p-[8px] my-[10px]
                    bg-[#f1f4f9]
                    border rounded-[10px]
                    outline-none
                    focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                    ${errors.password ? 'border-red-500' : 'border-[#D8D8D8]'}
                  `}
                />

                <i
                  onClick={() => setShowPassword(!showPassword)}
                  className={`
                    fa-solid
                    ${showPassword ? 'fa-eye-slash' : 'fa-eye'}
                    absolute
                    left-[12px]
                    top-[50%]
                    -translate-y-[50%]
                    text-[#b7b4b4]
                    cursor-pointer
                  `}></i>
              </div>

              {errors.password && (
                <p className="text-red-500 text-[12px] mt-[5px]">{errors.password}</p>
              )}
            </div>

            {/* ================= TERMS ================= */}
<<<<<<< HEAD
            {/* ================= TERMS ================= */}
=======
>>>>>>> origin/develop
            <div className="mb-[20px]">
              <label className="flex items-center gap-[8px] cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => {
                    setAcceptedTerms(e.target.checked);

                    if (e.target.checked) {
<<<<<<< HEAD
                      setErrors({
                        ...errors,
                        terms: '',
                      });
=======
                      setErrors((current) => ({
                        ...current,
                        terms: '',
                      }));
>>>>>>> origin/develop
                    }
                  }}
                  className="sr-only"
                />

                {/* Custom Checkbox */}
                <span
                  className={`
<<<<<<< HEAD
        w-[20px]
        h-[20px]
        rounded-[5px]
        border
        flex
        items-center
        justify-center
        transition-all
        duration-200

        ${
          acceptedTerms
            ? 'bg-[#4F9D9E] border-[#4F9D9E]'
            : errors.terms
              ? 'bg-white border-red-500'
              : 'bg-white border-[#D8D8D8]'
        }
      `}>
=======
                    w-[20px]
                    h-[20px]
                    rounded-[5px]
                    border
                    flex
                    items-center
                    justify-center
                    transition-all
                    duration-200

                    ${
                      acceptedTerms
                        ? 'bg-[#4F9D9E] border-[#4F9D9E]'
                        : errors.terms
                          ? 'bg-white border-red-500'
                          : 'bg-white border-[#D8D8D8]'
                    }
                  `}>
>>>>>>> origin/develop
                  {acceptedTerms && <i className="fa-solid fa-check text-white text-[12px]"></i>}
                </span>

                <span className="text-[12px] sm:text-[13px] text-[#777]">
                  أوافق على الشروط والأحكام
                </span>
              </label>

              {errors.terms && <p className="text-red-500 text-[12px] mt-[6px]">{errors.terms}</p>}
            </div>

            {/* ================= REGISTER BUTTON ================= */}
            <button
              type="submit"
<<<<<<< HEAD
=======
              disabled={loading}
>>>>>>> origin/develop
              className="
                w-full
                h-[45px]
                rounded-[10px]
                text-white
                font-medium
                cursor-pointer
                transition
                bg-[linear-gradient(90deg,#3A73AA_0%,#4F9D9E_100%)]
                hover:opacity-90
<<<<<<< HEAD
              ">
              إنشاء حساب
=======
                disabled:opacity-60
                disabled:cursor-not-allowed
              ">
              {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء حساب'}
>>>>>>> origin/develop
            </button>
          </form>

          {/* ================= LOGIN LINK ================= */}
          <div className="text-center mt-[20px] mb-[18px] flex items-center justify-center gap-[5px]">
            <p className="text-[#777]">لديك حساب بالفعل؟</p>

            <Link to="/login" className="line-clamp-1 text-[#041167] underline font-bold">
              تسجيل الدخول
            </Link>
          </div>

          {/* ================= SOCIAL LOGIN ================= */}
          <div className="mt-[25px]">
            {/* Divider */}
            <div className="flex items-center gap-[10px] mb-[20px]">
              <div className="h-[1px] bg-[#E5E5E5] flex-1"></div>

              <span className="text-[12px] text-[#999]">أو</span>

              <div className="h-[1px] bg-[#E5E5E5] flex-1"></div>
            </div>

            {/* Social Login */}
            <div className="sm:flex sm:justify-center sm:items-center gap-[15px] m-[11px]">
              {/* Facebook */}
              <div
                className="
                  border border-[#e1e1e1]
                  rounded-[11px]
                  cursor-pointer
                  px-[27px] py-[8px]
                  gap-[5px]
                  flex justify-center items-center
                  hover:scale-[1.03]
                  transition-all duration-300
                  sm:mb-[0]
                  mb-[10px]
                ">
                <i className="fa-brands fa-facebook text-[24px] bg-gradient-to-b from-[#00B2FF] to-[#006AFF] bg-clip-text text-transparent"></i>

                <p className="text-[12px] text-[#00B2FF]">الدخول باستخدام فيسبوك</p>
              </div>

              {/* Google */}
              <div
                className="
                  border border-[#e1e1e1]
                  rounded-[11px]
                  px-[27px] py-[10px]
                  gap-[6px]
                  cursor-pointer
                  flex justify-center items-center
                  hover:scale-[1.03]
                  transition-all
                ">
                <img src={googleIcon} className="w-[20px] h-[20px]" alt="Google" />

                <p className="text-[12px] text-[#6f6d6d]">Google الدخول باستخدام</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Register;
