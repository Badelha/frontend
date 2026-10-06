import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbarpro from '../components/Navbarpro';
import auth from '../services/auth';
import { getApiError } from '../services/api';

const REQUIRED_MSG = 'يجب تعبئة هذا الحقل';

// ✅ Fields that exist in backend (Prisma schema + express-validator)
const REQUIRED_INFO_FIELDS = ['fullName', 'phoneNumber', 'address'];

const initialInfo = {
  fullName: '',
  email: '',
  phoneNumber: '',
  address: '',
  city: '',
};

const inputBase =
  'w-full font-inherit text-[14.5px] text-[#1F2A2B] bg-[#EDF4F6] border rounded-[10px] px-[13px] py-[11px] outline-none focus:border-[#4F9D9E]';

export default function ProfileEditPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState(initialInfo);
  const [cities, setCities] = useState([]);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | saving | success | error
  const [errorMessage, setErrorMessage] = useState('');

  // ---------- Load profile + cities ----------
  useEffect(() => {
    let active = true;
    setLoading(true);

    Promise.all([
      auth.profile(),
      auth.getCities ? auth.getCities() : Promise.resolve([]),
    ])
      .then(([profile, citiesList]) => {
        if (!active) return;

        setInfo({
          fullName: profile.full_name || profile.fullName || '',
          email: profile.email || '',
          phoneNumber: profile.phone_number || profile.phoneNumber || '',
          address: profile.address || '',
          city: profile.city || profile.city_name || '',
        });

        if (profile.avatar_url || profile.avatarUrl) {
          setAvatarPreview(profile.avatar_url || profile.avatarUrl);
        }

        if (Array.isArray(citiesList)) {
          const normalized = citiesList.map((c) =>
            typeof c === 'string' ? c : c.city_name || c.name || String(c)
          );
          setCities(normalized);
        }
      })
      .catch((err) => {
        console.error('Error loading profile:', err);
        setErrorMessage(getApiError(err) || 'حصل خطأ أثناء تحميل البيانات');
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  // ---------- Validation ----------
  const setFieldError = (field, message) =>
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[field] = message;
      else delete next[field];
      return next;
    });

  const validateInfo = () => {
    const errs = {};

    REQUIRED_INFO_FIELDS.forEach((f) => {
      if (!info[f] || String(info[f]).trim() === '') errs[f] = REQUIRED_MSG;
    });

    if (info.fullName && info.fullName.trim().length < 3) {
      errs.fullName = 'الاسم الكامل يجب أن يكون 3 أحرف على الأقل';
    }
    if (info.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) {
      errs.email = 'البريد الإلكتروني غير صحيح';
    }
    if (info.phoneNumber && !/^05\d{8}$/.test(info.phoneNumber)) {
      errs.phoneNumber = 'رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 05';
    }
    if (info.address && info.address.trim().length < 5) {
      errs.address = 'العنوان يجب أن يكون 5 أحرف على الأقل';
    }
    return errs;
  };

  // ---------- Save ----------
  const handleSave = async () => {
    const newErrors = validateInfo();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('saving');
    setErrorMessage('');

    try {
      // camelCase payload — matches express-validator
      const payload = {
        fullName: info.fullName.trim(),
        phoneNumber: info.phoneNumber.trim(),
        address: info.address.trim(),
      };

      if (info.email && info.email.trim()) {
        payload.email = info.email.trim();
      }
      if (info.city) {
        payload.city = info.city;
      }

      await auth.updateProfile(payload);

      // Sync local storage
      try {
        const stored = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({ ...stored, ...payload }));
      } catch (e) {
        console.warn('LocalStorage update failed:', e);
      }

      setStatus('success');
      setTimeout(() => setStatus('idle'), 3000);
    } catch (e) {
      console.error('Save failed:', e);
      setErrorMessage(getApiError(e) || 'حصل خطأ أثناء الحفظ، حاول مرة أخرى');
      setStatus('error');
    }
  };

  // ---------- Display helpers ----------
  const displayName = info.fullName || 'المستخدم';
  const displayInitials =
    displayName
      .split(/\s+/)
      .map((n) => n[0])
      .join('')
      .slice(0, 2) || 'أب';

  if (loading) {
    return (
      <>
        <Navbarpro />
        <div dir="rtl" className="min-h-screen bg-[#EDF4F6] pt-32 pb-12 px-4 flex items-center justify-center">
          <div className="text-center text-[#4F9D9E] font-bold text-base flex items-center gap-3 bg-white px-6 py-4 rounded-2xl shadow-sm border border-[#D7E4E6]">
            <span className="w-5 h-5 border-2 border-[#4F9D9E] border-t-transparent rounded-full animate-spin" />
            جارٍ تحميل البيانات...
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbarpro />
      <div dir="rtl" className="min-h-screen bg-[#EDF4F6] pt-28 pb-16 px-4 text-[#1F2A2B]">
        {/* Header */}
        <div className="max-w-[640px] mx-auto mb-3.5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#6C7A7B] hover:text-[#1F2A2B] text-[13.5px] font-bold border-none bg-transparent cursor-pointer transition-colors">
            <span className="text-base">›</span> رجوع
          </button>
          <h1 className="m-0 text-[19px] font-extrabold flex-1 text-center">تعديل الملف الشخصي</h1>
          <button
            className="bg-[#4F9D9E] hover:bg-[#3E7E7F] text-white border-none rounded-[10px] px-[18px] py-2 font-bold text-[13.5px] cursor-pointer disabled:opacity-60 transition-colors shadow-sm"
            onClick={handleSave}
            disabled={status === 'saving'}>
            {status === 'saving' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>

        {/* Banner */}
        <div className="max-w-[640px] mx-auto mb-4 bg-[#4F9D9E] rounded-2xl px-5 py-4 flex items-center gap-3 shadow-sm">
          <div className="w-11 h-11 rounded-full bg-[#3E7E7F] text-white flex items-center justify-center font-extrabold text-[15px] shrink-0 overflow-hidden">
            {avatarPreview ? (
              <img src={avatarPreview} alt={displayName} className="w-full h-full object-cover" />
            ) : (
              displayInitials
            )}
          </div>
          <div>
            <div className="text-white font-bold text-[15px]">{displayName}</div>
            <div className="text-[#E4F3F3] text-[12.5px]">
              {info.email ? `@${info.email.split('@')[0]}` : '@user'}
            </div>
          </div>
        </div>

        {/* Panel */}
        <div className="max-w-[640px] mx-auto bg-white border border-[#D7E4E6] rounded-2xl px-7 py-[26px] shadow-sm">
          <InfoTab
            info={info}
            setInfo={setInfo}
            cities={cities}
            errors={errors}
            setFieldError={setFieldError}
          />

          {status === 'success' && (
            <div className="mt-4 text-center bg-[#E8F5F4] border border-[#4F9D9E] p-3 rounded-lg text-[#3E7E7F] text-[13px] font-bold animate-fadeIn">
              تم حفظ التغييرات بنجاح ✓
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 text-center bg-[#FADBD8] border border-[#C0392B] p-3 rounded-lg text-[#C0392B] text-[13px] font-bold">
              {errorMessage || 'حصل خطأ أثناء الحفظ، حاول مرة أخرى'}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- Info Tab ---------- */
function InfoTab({ info, setInfo, cities, errors, setFieldError }) {
  const handleChange = (field) => (e) => setInfo((p) => ({ ...p, [field]: e.target.value }));
  const handleBlur = (field) => (e) => {
    if (REQUIRED_INFO_FIELDS.includes(field) && !String(e.target.value).trim()) {
      setFieldError(field, REQUIRED_MSG);
    } else {
      setFieldError(field, null);
    }
  };

  return (
    <>
      <h2 className="m-0 mb-1 text-[19px] font-extrabold">المعلومات الشخصية</h2>
      <p className="m-0 mb-[22px] text-[13.5px] text-[#6C7A7B]">
        هذه المعلومات ستظهر على متجرك العام
      </p>

      <Field
        label="الاسم الكامل"
        value={info.fullName}
        onChange={handleChange('fullName')}
        onBlur={handleBlur('fullName')}
        error={errors.fullName}
      />

      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
        <Field
          label="البريد الإلكتروني"
          type="email"
          value={info.email}
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          error={errors.email}
        />
        <Field
          label="رقم الهاتف"
          type="tel"
          value={info.phoneNumber}
          onChange={handleChange('phoneNumber')}
          onBlur={handleBlur('phoneNumber')}
          error={errors.phoneNumber}
        />
      </div>

      <Field
        label="العنوان التفصيلي"
        value={info.address}
        onChange={handleChange('address')}
        onBlur={handleBlur('address')}
        error={errors.address}
        placeholder="مثال: شارع الرمال، بجانب المسجد"
      />

      <div className="mb-4">
        <label className="block text-[13px] font-bold text-[#6C7A7B] mb-1.5">
          المدينة / المنطقة
        </label>
        <select
          className={`${inputBase} ${errors.city ? 'border-[#C0392B]' : 'border-[#D7E4E6]'}`}
          value={info.city}
          onChange={handleChange('city')}>
          <option value="">اختر المدينة</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.city && <div className="text-[#C0392B] text-xs font-bold mt-1">{errors.city}</div>}
      </div>
    </>
  );
}

/* ---------- Field ---------- */
function Field({ label, value, onChange, onBlur, type = 'text', placeholder = '', error }) {
  return (
    <div className="mb-4">
      <label className="block text-[13px] font-bold text-[#6C7A7B] mb-1.5">{label}</label>
      <input
        className={`${inputBase} ${error ? 'border-[#C0392B]' : 'border-[#D7E4E6]'}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <div className="text-[#C0392B] text-xs font-bold mt-1">{error}</div>}
    </div>
  );
}