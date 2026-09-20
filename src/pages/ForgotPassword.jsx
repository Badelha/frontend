import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError('يجب تعبئة عنوان البريد الإلكتروني');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('يجب إدخال عنوان بريد إلكتروني صحيح');
      return;
    }

    setError('');

    console.log('تم إرسال رابط إعادة تعيين كلمة المرور');

    navigate('/verification');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FCFEFF]">
      {/* Header */}
      <header className="w-full px-[20px] py-[15px]">
        <div></div>
      </header>

      {/* Main */}
      <main className="min-h-[calc(100vh-100px)] flex justify-center items-center px-4">
        <div className="w-full max-w-[400px] border border-[#ccc] rounded-[15px] p-[10px] sm:p-[15px]">
          {/* Title */}
          <div className="block my-[5px]">
            <h2 className="text-center m-[3px] font-bold text-[#013b59] text-[20px] sm:text-[25px]">
              نسيت كلمة المرور
            </h2>

            <p className="text-center mt-[5px] text-[#817f7f] text-[13px] sm:text-[15px] leading-[1.8]">
              قم بكتابة الإيميل الذي قمت بالتسجيل الدخول به، لإرسال
              <br />
              رابط تعيين كلمة المرور اليه.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-[5px] sm:px-[10px] mt-[20px]">
            {/* Email */}
            <label htmlFor="email" className="block text-[14px] sm:text-[15px]">
              عنوان البريد الإلكتروني
            </label>

            <input
              id="email"
              type="email"
              placeholder="user.2004@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError('');
              }}
              className={`w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none transition-all duration-200 ${
                error
                  ? 'border-red-500'
                  : 'border-[#D8D8D8] focus:border-[#D8D8D8] focus:shadow-[0_0_10px_rgba(190,190,190,0.25)]'
              }`}
            />

            {/* Error */}
            {error && <p className="text-red-500 text-[12px] mt-[-5px] mb-[10px]">{error}</p>}

            {/* Button */}
            <button
              type="submit"
              className="block mx-auto w-full p-[10px] rounded-[10px] mt-[10px] mb-[10px] text-white cursor-pointer transition-all text-center duration-300 bg-gradient-to-r from-[#3A73AA] to-[#4F9D9E] hover:from-[#4f8ac1] hover:to-[#6ccacc]">
              التالي
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
