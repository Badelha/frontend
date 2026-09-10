import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function VerificationCode() {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
  const [timeLeft, setTimeLeft] = useState(59);

  const inputRefs = useRef([]);

  // Countdown
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Handle input
  const handleChange = (index, value) => {
    // السماح بالأرقام فقط
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);
    setError('');

    // الانتقال للخانة التالية
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Paste OTP
  const handlePaste = (e) => {
    e.preventDefault();

    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 4);

    if (!pastedData) return;

    const newOtp = ['', '', '', ''];

    pastedData.split('').forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setError('');

    const nextIndex = Math.min(pastedData.length, 3);
    inputRefs.current[nextIndex]?.focus();
  };

  // التحقق عند الضغط على المتابعة
  const handleContinue = (e) => {
    const code = otp.join('');

    // إذا كان الرمز فارغ أو غير مكتمل
    if (code.length !== 4) {
      e.preventDefault();
      setError('لا يمكن ترك رمز التحقق فارغًا، أدخلي الرمز المكون من 4 أرقام');
      return;
    }

    // الرمز الصحيح - للتجربة حالياً
    const correctCode = '1234';

    // إذا كان الرمز غير صحيح
    if (code !== correctCode) {
      e.preventDefault();
      setError('رمز التحقق غير صحيح');
      return;
    }

    // إذا كان الرمز صحيح
    setError('');
  };

  // Submit
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // Resend code
  const handleResend = () => {
    if (timeLeft !== 0) return;

    setOtp(['', '', '', '']);
    setError('');
    setTimeLeft(59);

    inputRefs.current[0]?.focus();

    console.log('تم إرسال رمز تحقق جديد');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#FCFEFF]">
      {/* Header */}
      <header>
        <div></div>
      </header>

      {/* Main */}
      <main>
        <div className="min-h-screen flex justify-center items-center px-4">
          <div className="w-full max-w-[400px] border border-[#ccc] rounded-[15px] p-[10px] sm:p-[15px]">
            {/* Title */}
            <div className="block my-[5px]">
              <h2 className="text-center m-[3px] font-bold text-[#013b59] text-[20px] sm:text-[25px]">
                رمز التحقق
              </h2>

              <p className="text-center mt-[5px] text-[#817f7f] text-[13px] sm:text-[15px]">
                أدخل رمز التحقق المرسل إلى إيميلك
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Verification Code */}
              <div className="mt-[20px]">
                <label htmlFor="otp-0" className="block text-[14px] sm:text-[15px] mb-[10px]">
                  رمز التحقق
                </label>

                <div
                  className="flex justify-center items-center gap-[12px]"
                  dir="ltr"
                  onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                      type="text"
                      maxLength="1"
                      inputMode="numeric"
                      placeholder="_"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`w-[55px] h-[60px] text-center text-[20px] font-bold bg-[#f1f4f9] border rounded-[10px] outline-none transition-all duration-200 ${
                        error
                          ? 'border-red-500'
                          : 'border-[#D8D8D8] focus:border-[#D8D8D8] focus:shadow-[0_0_10px_rgba(190,190,190,0.25)]'
                      }`}
                    />
                  ))}
                </div>

                {/* Error */}
                {error && <p className="text-red-500 text-[12px] mt-[8px] text-center">{error}</p>}
              </div>

              {/* Continue Link */}
              <Link
                to="/reset-password"
                onClick={handleContinue}
                className="block mx-auto text-center cursor-pointer transition-all duration-300 hover:from-[#4f8ac1] hover:to-[#6ccacc] bg-gradient-to-r from-[#3A73AA] to-[#4F9D9E] w-full p-[10px] rounded-[10px] mt-[15px] mb-[10px] text-white">
                المتابعة
              </Link>
            </form>

            {/* Resend */}
            <div className="flex text-center items-center justify-center mt-[20px] mb-[18px] gap-[5px]">
              <p className="text-[#828181] text-[13px]">إعادة إرسال رمز التحقق</p>

              <button
                type="button"
                onClick={handleResend}
                disabled={timeLeft !== 0}
                className={`line-clamp-1 text-[13px] underline ${
                  timeLeft === 0 ? 'text-[#041167] cursor-pointer' : 'text-[#041167] cursor-default'
                }`}>
                {timeLeft > 0 ? `00:${String(timeLeft).padStart(2, '0')}` : 'إعادة الإرسال'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default VerificationCode;
