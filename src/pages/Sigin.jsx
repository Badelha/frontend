import { useState } from 'react';
import badelhaLogo from '../assets/images/badelha.png';
import googleIcon from '../assets/images/search 1.png';
import { Link } from 'react-router-dom';
function Sigin() {
  // بيانات الفورم
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    password: '',
  });

  // الأخطاء
  const [errors, setErrors] = useState({});

  // إظهار وإخفاء كلمة المرور
  const [showPassword, setShowPassword] = useState(false);

  // تغيير قيمة أي input
  const handleChange = (e) => {
    const { id, value } = e.target;

    setFormData({
      ...formData,
      [id]: value,
    });

    // إزالة الخطأ بمجرد أن يبدأ المستخدم بالكتابة
    setErrors({
      ...errors,
      [id]: '',
    });
  };

  // إرسال الفورم
  const handleSubmit = (e) => {
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
      const hasNumber = /[0-9]/.test(formData.password);
      const hasSymbol = /[^A-Za-z0-9]/.test(formData.password);

      if (!hasUpperCase || !hasNumber || !hasSymbol) {
        newErrors.password = 'كلمة المرور يجب أن تحتوي على حرف كبير ورقم ورمز';
      }
    }

    // وضع الأخطاء
    setErrors(newErrors);

    // إذا لم يوجد أي خطأ
    if (Object.keys(newErrors).length === 0) {
      console.log('تم إنشاء الحساب بنجاح');

      // هنا لاحقاً ممكن تربطي التسجيل بالـ Backend
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
           w-full max-w-[500px] border rounded-[15px] p-[10px] sm:p-[15px]
            border-[#E5E5E5]
            bg-white
            shadow-[0_4px_20px_rgba(0,0,0,0.05)]
          ">
          {/* ================= LOGO ================= */}
          <div className="flex justify-center mb-[15px]">
            <img src={badelhaLogo} alt="Badelha" />
          </div>

          {/* ================= TITLE ================= */}
          <h1
            className="
            text-center m-[3px] font-bold text-[#013b59] text-[20px] sm:text-[25px]
            ">
            إنشاء حساب جديد
          </h1>

          <p
            className="
             text-center mt-[5px] text-[#817f7f] text-[13px] sm:text-[15px]
            ">
            أدخل بياناتك لإنشاء حساب جديد
          </p>

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
                  w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.name ? 'border-red-500' : 'border-[#D8D8D8] '}
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
                w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none
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
                placeholder="+972 59-------"
                value={formData.phone}
                onChange={handleChange}
                className={`
                   w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.phone ? 'border-red-500' : 'border-[#D8D8D8]'}
                `}
              />

              {errors.phone && <p className="text-red-500 text-[12px] mt-[5px]">{errors.phone}</p>}
            </div>

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
                  w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none
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
                   w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.gender ? 'border-red-500' : 'border-[#D8D8D8] '}
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
            </div>

            {/* ================= ADDRESS ================= */}
            <div className="mb-[15px]">
              <label htmlFor="address" className="block text-[14px] sm:text-[15px] mb-[10px]">
                العنوان
              </label>

              <input
                id="address"
                type="text"
                placeholder="غزة"
                value={formData.address}
                onChange={handleChange}
                className={`
                   w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                  ${errors.address ? 'border-red-500' : 'border-[#D8D8D8] '}
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

              {/* input + eye */}
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`
                    w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none
                  focus:shadow-[0_0_12px_rgba(200,200,200,0.35)]
                    ${errors.password ? 'border-red-500' : 'border-[#D8D8D8] '}
                  `}
                />

                {/* Eye Icon */}
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
            <div className="flex items-center gap-[8px] mb-[20px]">
              <i
                className="
                  fa-regular
                  fa-square
                  text-[#777]
                  cursor-pointer
                "></i>

              <p className="text-[12px] sm:text-[13px] text-[#777]">أوافق على الشروط والأحكام</p>
            </div>

            {/* ================= REGISTER BUTTON ================= */}
            <button
              type="submit"
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
              ">
              إنشاء حساب
            </button>
          </form>

          {/* ================= LOGIN LINK ================= */}
          <div className="text-center mt-[20px] flex text-center items-center justify-center mt-[20px] mb-[18px] gap-[5px]">
            <p className=" text-[#777] "> لديك حساب بالفعل؟</p>

            <Link
              to="/login"
              className="
                 line-clamp-1 text-[#041167] underline font-bold
                ">
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

            {/* Facebook */}
            {/* Social Login */}
            <div className="flex justify-center items-center gap-[15px] m-[11px]">
              {/* Facebook */}
              <div className="border border-[#e1e1e1] rounded-[11px] cursor-pointer px-[27px] py-[8px] gap-[5px] flex justify-center items-center hover:scale-[1.03] transition-all duration-300">
                <i className="fa-brands fa-facebook text-[24px] bg-gradient-to-b from-[#00B2FF] to-[#006AFF] bg-clip-text text-transparent"></i>

                <p className="text-[12px] text-[#00B2FF]">الدخول باستخدام فيسبوك</p>
              </div>

              {/* Google */}
              <div className="border border-[#e1e1e1] rounded-[11px] px-[27px] py-[10px] gap-[6px] cursor-pointer flex justify-center items-center hover:scale-[1.03] transition-all">
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

export default Sigin;
