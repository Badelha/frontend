import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  // التحقق من قوة كلمة المرور
  const validatePassword = (value) => {
    if (value.length < 8) {
      return 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل';
    }

    if (!/[A-Z]/.test(value)) {
      return 'يجب أن تحتوي كلمة المرور على حرف إنجليزي كبير واحد على الأقل';
    }

    if (!/[a-z]/.test(value)) {
      return 'يجب أن تحتوي كلمة المرور على حرف إنجليزي صغير واحد على الأقل';
    }

    if (!/[0-9]/.test(value)) {
      return 'يجب أن تحتوي كلمة المرور على رقم واحد على الأقل';
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return 'يجب أن تحتوي كلمة المرور على رمز خاص مثل @ أو # أو !';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;

    // التحقق من كلمة المرور
    if (!password.trim()) {
      setPasswordError('يجب تعبئة كلمة المرور');
      valid = false;
    } else {
      const passwordValidation = validatePassword(password);

      if (passwordValidation) {
        setPasswordError(passwordValidation);
        valid = false;
      } else {
        setPasswordError('');
      }
    }

    // التحقق من تأكيد كلمة المرور
    if (!confirmPassword.trim()) {
      setConfirmError('يجب تعبئة تأكيد كلمة المرور');
      valid = false;
    } else if (password !== confirmPassword) {
      setConfirmError('كلمتا المرور غير متطابقتين');
      valid = false;
    } else {
      setConfirmError('');
    }

    // إذا كل شيء صحيح
    if (valid && password === confirmPassword) {
      console.log('تم تغيير كلمة المرور بنجاح');

      navigate('/login');
    }
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
              تعيين كلمة المرور الجديدة
            </h2>

            <p className="text-center mt-[5px] text-[#817f7f] text-[13px] sm:text-[15px] leading-[1.8]">
              قم بتعيين كلمة المرور الجديدة لحسابك حتى تتمكن من
              <br />
              تسجيل الدخول
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-[5px] sm:px-[10px] mt-[20px]">
            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="block text-[14px] sm:text-[15px]">
                كلمة المرور الجديدة
              </label>

              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  const value = e.target.value;

                  setPassword(value);

                  // التحقق أثناء الكتابة
                  if (!value.trim()) {
                    setPasswordError('');
                  } else {
                    setPasswordError(validatePassword(value));
                  }

                  // إعادة التحقق من تأكيد كلمة المرور
                  if (confirmPassword) {
                    if (value !== confirmPassword) {
                      setConfirmError('كلمتا المرور غير متطابقتين');
                    } else {
                      setConfirmError('');
                    }
                  }
                }}
                className={`w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none transition-all duration-200 pr-[8px] pl-[40px] ${
                  passwordError
                    ? 'border-red-500'
                    : password && !validatePassword(password)
                      ? 'border-green-500'
                      : 'border-[#D8D8D8] focus:border-[#D8D8D8] focus:shadow-[0_0_10px_rgba(190,190,190,0.25)]'
                }`}
              />

              {/* Eye */}
              <i
                onClick={() => setShowPassword(!showPassword)}
                className={`fa-solid ${
                  showPassword ? 'fa-eye-slash' : 'fa-eye'
                } absolute left-[10px] ${
                  passwordError || (password && !validatePassword(password))
                    ? 'bottom-[38px]'
                    : 'bottom-[23px]'
                } text-[#b7b4b4] cursor-pointer`}></i>

              {/* Error */}
              {passwordError && (
                <p className="text-red-500 text-[12px] mt-[-5px] mb-[10px]">{passwordError}</p>
              )}

              {/* Success */}
              {password && !validatePassword(password) && (
                <p className="text-green-500 text-[12px] mt-[-5px] mb-[10px]">كلمة المرور قوية</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <label htmlFor="confirmPassword" className="block text-[14px] sm:text-[15px]">
                تأكيد كلمة المرور الجديدة
              </label>

              <input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;

                  setConfirmPassword(value);

                  if (!value.trim()) {
                    setConfirmError('');
                  } else if (value !== password) {
                    setConfirmError('كلمتا المرور غير متطابقتين');
                  } else {
                    setConfirmError('');
                  }
                }}
                className={`w-full p-[8px] my-[10px] bg-[#f1f4f9] border rounded-[10px] outline-none transition-all duration-200 pl-[40px] ${
                  confirmError
                    ? 'border-red-500'
                    : confirmPassword && password === confirmPassword && !validatePassword(password)
                      ? 'border-green-500'
                      : 'border-[#D8D8D8] focus:border-[#D8D8D8] focus:shadow-[0_0_10px_rgba(190,190,190,0.25)]'
                }`}
              />

              {/* Eye */}
              <i
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={`fa-solid ${
                  showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'
                } absolute left-[10px] ${
                  confirmError ||
                  (confirmPassword && password === confirmPassword && !validatePassword(password))
                    ? 'bottom-[38px]'
                    : 'bottom-[23px]'
                } text-[#b7b4b4] cursor-pointer`}></i>
              {/* Success */}
              {confirmPassword &&
                password === confirmPassword &&
                !confirmError &&
                !validatePassword(password) && (
                  <p className="text-green-500 text-[12px] mt-[-5px] mb-[10px]">
                    كلمتا المرور متطابقتان
                  </p>
                )}

              {/* Error */}
              {confirmError && (
                <p className="text-red-500 text-[12px] mt-[-5px] mb-[10px]">{confirmError}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="block mx-auto cursor-pointer transition-all duration-300 hover:from-[#4f8ac1] hover:to-[#6ccacc] bg-gradient-to-r from-[#3A73AA] to-[#4F9D9E] w-full p-[10px] rounded-[10px] mt-[10px] mb-[10px] text-white">
              التالي
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ResetPassword;
