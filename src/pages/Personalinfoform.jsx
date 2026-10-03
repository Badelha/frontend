import { useState } from 'react';
import Navbarpro from '../components/Navbarpro';

// الألوان: EDF4F6 خلفية أساسية، 4F9D9E اللون المميز

async function submitProfile(payload) {
  // استبدلي هذا بطلب fetch حقيقي لباك اندك
  return new Promise((resolve) => setTimeout(resolve, 900));
}

const REQUIRED_MSG = 'يجب تعبئة هذا الحقل';

const initialInfo = {
  firstName: 'أحمد',
  fatherName: 'محمد',
  lastName: 'البدلحي',
  username: 'ahmed_badelha',
  email: 'ahmed@example.com',
  phone: '+970 59 000 0000',
  location: 'دير البلح، فلسطين',
  bio: 'بائع معتمد في سوق دير البلح المحلي، متخصص في التطريز الفلسطيني والمنتجات الحرفية اليدوية، أكثر من 4 سنوات خبرة',
  website: '',
  contactHours: 'السبت - الخميس، ٩ص - ٥م',
};

// كل حقول المعلومات الشخصية إلزامية الآن
const REQUIRED_INFO_FIELDS = [
  'firstName',
  'fatherName',
  'lastName',
  'username',
  'email',
  'phone',
  'location',
  'bio',
  'website',
  'contactHours',
];

const initialSecurity = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactor: false,
  showPhone: true,
  showEmail: false,
  loginAlerts: true,
};

const REQUIRED_SECURITY_FIELDS = ['currentPassword', 'newPassword', 'confirmPassword'];

function passwordChecks(pw) {
  return [
    { label: '8 أحرف على الأقل', pass: pw.length >= 8 },
    { label: 'حرف كبير واحد على الأقل (A-Z)', pass: /[A-Z]/.test(pw) },
    { label: 'حرف صغير واحد على الأقل (a-z)', pass: /[a-z]/.test(pw) },
    { label: 'رقم واحد على الأقل', pass: /[0-9]/.test(pw) },
    { label: 'رمز خاص واحد على الأقل (!@#$%...)', pass: /[^A-Za-z0-9]/.test(pw) },
  ];
}

const inputBase =
  'w-full font-inherit text-[14.5px] text-[#1F2A2B] bg-[#EDF4F6] border rounded-[10px] px-[13px] py-[11px] outline-none focus:border-[#4F9D9E]';

export default function ProfileEditPage() {
  const [tab, setTab] = useState('info');
  const [info, setInfo] = useState(initialInfo);
  const [tags, setTags] = useState(['تطريز', 'حرف يدوية', 'عدلية']);
  const [security, setSecurity] = useState(initialSecurity);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | saving | success | error

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
      if (!info[f] || !info[f].trim()) errs[f] = REQUIRED_MSG;
    });
    return errs;
  };

  const validateSecurity = () => {
    const errs = {};
    REQUIRED_SECURITY_FIELDS.forEach((f) => {
      if (!security[f] || !security[f].trim()) errs[f] = REQUIRED_MSG;
    });
    if (security.newPassword && !passwordChecks(security.newPassword).every((c) => c.pass)) {
      errs.newPassword = 'كلمة المرور لا تحقق كل الشروط المطلوبة';
    }
    if (
      security.newPassword &&
      security.confirmPassword &&
      security.newPassword !== security.confirmPassword
    ) {
      errs.confirmPassword = 'كلمتا المرور غير متطابقتين';
    }
    return errs;
  };

  const handleSave = async () => {
    const newErrors =
      tab === 'info' ? validateInfo() : tab === 'security' ? validateSecurity() : {};
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('saving');
    try {
      await submitProfile({ tab, info, tags, security });
      setStatus('success');
      setTimeout(() => setStatus('idle'), 2200);
    } catch (e) {
      setStatus('error');
    }
  };

  return (
    <>
      {/* Navbar في أعلى الصفحة تمامًا */}
      <Navbarpro />
      <div dir="rtl" className="min-h-full bg-[#EDF4F6] p-25 text-[#1F2A2B]">
        {/* محتوى تعديل الملف الشخصي */}
        <div className="max-w-[640px] mx-auto mb-3.5 flex items-center justify-between gap-3">
          <a
            href="#"
            className="flex items-center gap-1 text-[#6C7A7B] text-[13.5px] font-bold no-underline">
            <span className="text-base">›</span> رجوع
          </a>
          <h1 className="m-0 text-[19px] font-extrabold flex-1 text-center">تعديل الملف الشخصي</h1>
          <button
            className="bg-[#4F9D9E] hover:bg-[#3E7E7F] text-white border-none rounded-[10px] px-[18px] py-2 font-bold text-[13.5px] cursor-pointer disabled:opacity-60"
            onClick={handleSave}
            disabled={status === 'saving'}>
            {status === 'saving' ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
          </button>
        </div>

        <div className="max-w-[640px] mx-auto mb-4 bg-[#4F9D9E] rounded-2xl px-5 py-4 flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-[#3E7E7F] text-white flex items-center justify-center font-extrabold text-[15px] shrink-0">
            أب
          </div>
          <div>
            <div className="text-white font-bold text-[15px]">أحمد البدلحي</div>
            <div className="text-[#E4F3F3] text-[12.5px]">@ahmed_badelha</div>
          </div>
        </div>

        <div className="max-w-[640px] mx-auto mb-3 flex gap-2">
          {[
            ['info', 'المعلومات الشخصية'],
            ['photos', 'الصور'],
            ['security', 'الأمان والخصوصية'],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => {
                setTab(key);
                setErrors({});
              }}
              className={`flex-1 py-[11px] rounded-[10px] border font-bold text-[13px] cursor-pointer ${
                tab === key
                  ? 'bg-[#DCEEEE] text-[#3E7E7F] border-[#4F9D9E]'
                  : 'bg-white text-[#6C7A7B] border-[#D7E4E6] hover:bg-[#DCEEEE]'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="max-w-[640px] mx-auto bg-white border border-[#D7E4E6] rounded-2xl px-7 py-[26px]">
          {tab === 'info' && (
            <InfoTab
              info={info}
              setInfo={setInfo}
              tags={tags}
              setTags={setTags}
              errors={errors}
              setFieldError={setFieldError}
            />
          )}
          {tab === 'photos' && <PhotosTab />}
          {tab === 'security' && (
            <SecurityTab
              security={security}
              setSecurity={setSecurity}
              errors={errors}
              setFieldError={setFieldError}
            />
          )}

          {status === 'success' && (
            <div className="mt-4 text-left text-[#3E7E7F] text-[13px] font-bold">
              تم حفظ التغييرات ✓
            </div>
          )}
          {status === 'error' && (
            <div className="mt-4 text-left text-[#C0392B] text-[13px] font-bold">
              حصل خطأ أثناء الحفظ، حاولي مرة ثانية
            </div>
          )}
        </div>
      </div>
    </>
  );
}

/* ---------- تبويب المعلومات الشخصية ---------- */
function InfoTab({ info, setInfo, tags, setTags, errors, setFieldError }) {
  const [tagDraft, setTagDraft] = useState('');
  const bioLimit = 200;

  const handleChange = (field) => (e) => setInfo((p) => ({ ...p, [field]: e.target.value }));
  const handleBlur = (field) => (e) => {
    if (!e.target.value.trim()) setFieldError(field, REQUIRED_MSG);
    else setFieldError(field, null);
  };
  const addTag = (e) => {
    if (e.key === 'Enter' && tagDraft.trim()) {
      e.preventDefault();
      setTags((p) => [...p, tagDraft.trim()]);
      setTagDraft('');
    }
  };
  const removeTag = (i) => setTags((p) => p.filter((_, idx) => idx !== i));

  return (
    <>
      <h2 className="m-0 mb-1 text-[19px] font-extrabold">المعلومات الشخصية</h2>
      <p className="m-0 mb-[22px] text-[13.5px] text-[#6C7A7B]">
        هذه المعلومات ستظهر على متجرك العام
      </p>

      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
        <Field
          label="الاسم الأول"
          value={info.firstName}
          onChange={handleChange('firstName')}
          onBlur={handleBlur('firstName')}
          error={errors.firstName}
        />
        <Field
          label="اسم الأب"
          value={info.fatherName}
          onChange={handleChange('fatherName')}
          onBlur={handleBlur('fatherName')}
          error={errors.fatherName}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
        <Field
          label="اسم العائلة"
          value={info.lastName}
          onChange={handleChange('lastName')}
          onBlur={handleBlur('lastName')}
          error={errors.lastName}
        />
        <Field
          label="اسم المستخدم"
          value={info.username}
          onChange={handleChange('username')}
          onBlur={handleBlur('username')}
          error={errors.username}
        />
      </div>
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
          value={info.phone}
          onChange={handleChange('phone')}
          onBlur={handleBlur('phone')}
          error={errors.phone}
        />
      </div>
      <Field
        label="الموقع الجغرافي"
        value={info.location}
        onChange={handleChange('location')}
        onBlur={handleBlur('location')}
        error={errors.location}
      />

      <div className="mb-4">
        <label className="block text-[13px] font-bold text-[#6C7A7B] mb-1.5">نبذة شخصية</label>
        <textarea
          className={`${inputBase} min-h-[88px] resize-y ${errors.bio ? 'border-[#C0392B]' : 'border-[#D7E4E6]'}`}
          maxLength={bioLimit}
          value={info.bio}
          onChange={handleChange('bio')}
          onBlur={handleBlur('bio')}
        />
        <div className="flex items-center justify-between mt-1">
          {errors.bio ? (
            <div className="text-[#C0392B] text-xs font-bold">{errors.bio}</div>
          ) : (
            <span />
          )}
          <div className="text-xs text-[#6C7A7B]">
            {info.bio.length}/{bioLimit}
          </div>
        </div>
      </div>

      <Field
        label="الموقع الإلكتروني"
        type="url"
        placeholder="https://example.com"
        value={info.website}
        onChange={handleChange('website')}
        onBlur={handleBlur('website')}
        error={errors.website}
      />

      <div className="mb-4">
        <label className="block text-[13px] font-bold text-[#6C7A7B] mb-1.5">الوسوم</label>
        <div className="flex flex-wrap gap-2 items-center bg-[#EDF4F6] border border-[#D7E4E6] rounded-[10px] px-[11px] py-2">
          {tags.map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 bg-[#DCEEEE] border border-[#4F9D9E] text-[#3E7E7F] rounded-full ps-3 pe-1.5 py-1 text-[13px]">
              {t}
              <button
                onClick={() => removeTag(i)}
                className="bg-[#4F9D9E] hover:opacity-80 text-white border-none rounded-full w-[17px] h-[17px] text-[11px] leading-none cursor-pointer">
                ✕
              </button>
            </span>
          ))}
          <input
            className="border-none bg-transparent flex-1 min-w-[100px] text-sm outline-none p-1"
            placeholder="أضف وسمًا واضغط Enter"
            value={tagDraft}
            onChange={(e) => setTagDraft(e.target.value)}
            onKeyDown={addTag}
          />
        </div>
      </div>

      <Field
        label="أوقات التواصل"
        value={info.contactHours}
        onChange={handleChange('contactHours')}
        onBlur={handleBlur('contactHours')}
        error={errors.contactHours}
      />
    </>
  );
}

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

/* ---------- تبويب الصور ---------- */
function PhotosTab() {
  const [avatar, setAvatar] = useState(null);
  const [cover, setCover] = useState(null);
  const handleUpload = (setter) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setter(ev.target.result);
    reader.readAsDataURL(file);
  };
  return (
    <>
      <h2 className="m-0 mb-1 text-[19px] font-extrabold">الصور</h2>
      <p className="m-0 mb-[22px] text-[13.5px] text-[#6C7A7B]">
        صورة شخصية واضحة تزيد ثقة الزبائن بمتجرك
      </p>
      <div className="flex flex-wrap gap-5">
        <PhotoCard
          heading="الصورة الشخصية"
          note="مربعة، بحجم لا يقل عن 400×400"
          preview={avatar}
          shape="round"
          onChange={handleUpload(setAvatar)}
        />
        <PhotoCard
          heading="صورة الغلاف"
          note="عرضية، بنسبة 3:1 تقريبًا"
          preview={cover}
          shape="wide"
          onChange={handleUpload(setCover)}
        />
      </div>
    </>
  );
}

function PhotoCard({ heading, note, preview, shape, onChange }) {
  const previewClass =
    shape === 'round'
      ? 'w-24 h-24 rounded-full mx-auto mb-3.5'
      : 'w-full h-[110px] rounded-[10px] mb-3.5';
  return (
    <div className="flex-1 min-w-[220px] border-[1.5px] border-dashed border-[#D7E4E6] rounded-2xl p-5 text-center bg-[#EDF4F6]">
      <h3 className="m-0 mb-1 text-[14.5px] font-bold">{heading}</h3>
      <p className="m-0 mb-3.5 text-[12.5px] text-[#6C7A7B]">{note}</p>
      <div
        className={`${previewClass} bg-[#DCEEEE] border border-[#D7E4E6] overflow-hidden flex items-center justify-center`}>
        {preview ? (
          <img src={preview} alt={heading} className="w-full h-full object-cover" />
        ) : (
          <span className={`${shape === 'round' ? 'text-[26px]' : 'text-[22px]'} text-[#6C7A7B]`}>
            {shape === 'round' ? '🧑' : '🖼'}
          </span>
        )}
      </div>
      <label className="inline-block bg-[#4F9D9E] hover:bg-[#3E7E7F] text-white text-[13px] font-bold px-4 py-2 rounded-lg cursor-pointer">
        اختيار صورة
        <input type="file" accept="image/*" className="hidden" onChange={onChange} />
      </label>
    </div>
  );
}

/* ---------- تبويب الأمان والخصوصية ---------- */
function SecurityTab({ security, setSecurity, errors, setFieldError }) {
  const handleChange = (field) => (e) => setSecurity((p) => ({ ...p, [field]: e.target.value }));
  const handleToggle = (field) => () => setSecurity((p) => ({ ...p, [field]: !p[field] }));
  const handleBlur = (field) => (e) => {
    if (!e.target.value.trim()) setFieldError(field, REQUIRED_MSG);
    else if (field === 'newPassword' && !passwordChecks(e.target.value).every((c) => c.pass)) {
      setFieldError(field, 'كلمة المرور لا تحقق كل الشروط المطلوبة');
    } else if (field === 'confirmPassword' && e.target.value !== security.newPassword) {
      setFieldError(field, 'كلمتا المرور غير متطابقتين');
    } else {
      setFieldError(field, null);
    }
  };

  const checks = passwordChecks(security.newPassword);

  return (
    <>
      <h2 className="m-0 mb-1 text-[19px] font-extrabold">الأمان والخصوصية</h2>
      <p className="m-0 mb-[22px] text-[13.5px] text-[#6C7A7B]">
        تحكم بمن يرى بياناتك وكيف تدخل إلى حسابك
      </p>

      <div className="grid grid-cols-2 gap-4 max-[520px]:grid-cols-1">
        <Field
          label="كلمة المرور الحالية"
          type="password"
          value={security.currentPassword}
          onChange={handleChange('currentPassword')}
          onBlur={handleBlur('currentPassword')}
          error={errors.currentPassword}
        />
        <div>
          <Field
            label="كلمة المرور الجديدة"
            type="password"
            value={security.newPassword}
            onChange={handleChange('newPassword')}
            onBlur={handleBlur('newPassword')}
            error={errors.newPassword}
          />
        </div>
      </div>

      {/* شروط كلمة المرور - تتحدث فورًا أثناء الكتابة */}
      <div className="mb-4 -mt-2 bg-[#EDF4F6] border border-[#D7E4E6] rounded-[10px] p-3">
        <div className="text-[12.5px] font-bold text-[#6C7A7B] mb-2">
          يجب أن تحتوي كلمة المرور على:
        </div>
        <ul className="m-0 p-0 list-none flex flex-col gap-1">
          {checks.map((c, i) => (
            <li
              key={i}
              className={`flex items-center gap-2 text-[12.5px] ${c.pass ? 'text-[#3E7E7F]' : 'text-[#6C7A7B]'}`}>
              <span
                className={`inline-flex items-center justify-center w-4 h-4 rounded-full text-[10px] shrink-0 ${c.pass ? 'bg-[#4F9D9E] text-white' : 'bg-white border border-[#D7E4E6]'}`}>
                {c.pass ? '✓' : ''}
              </span>
              {c.label}
            </li>
          ))}
        </ul>
      </div>

      <Field
        label="تأكيد كلمة المرور الجديدة"
        type="password"
        value={security.confirmPassword}
        onChange={handleChange('confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        error={errors.confirmPassword}
      />

      <div className="h-px bg-[#D7E4E6] my-6" />

      <ToggleRow
        title="التحقق بخطوتين"
        sub="رمز إضافي عند تسجيل الدخول من جهاز جديد"
        checked={security.twoFactor}
        onChange={handleToggle('twoFactor')}
      />
      <ToggleRow
        title="إظهار رقم الهاتف للزبائن"
        sub="يظهر في صفحة متجرك العامة"
        checked={security.showPhone}
        onChange={handleToggle('showPhone')}
      />
      <ToggleRow
        title="إظهار البريد الإلكتروني"
        sub="يبقى مخفيًا افتراضيًا لحمايتك"
        checked={security.showEmail}
        onChange={handleToggle('showEmail')}
      />
      <ToggleRow
        title="تنبيهات الدخول"
        sub="إشعار فوري عند دخول غير معتاد"
        checked={security.loginAlerts}
        onChange={handleToggle('loginAlerts')}
        last
      />
    </>
  );
}

function ToggleRow({ title, sub, checked, onChange, last }) {
  return (
    <div
      className={`flex items-center justify-between py-3.5 ${last ? '' : 'border-b border-[#D7E4E6]'}`}>
      <div>
        <div className="text-[14.5px] font-bold">{title}</div>
        <div className="text-[12.5px] text-[#6C7A7B] mt-0.5">{sub}</div>
      </div>
      <label className="relative inline-block w-11 h-[25px] shrink-0 cursor-pointer">
        <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
        <span className="absolute inset-0 rounded-full bg-[#D7E4E6] peer-checked:bg-[#4F9D9E] transition-colors" />
        <span className="absolute top-[3px] right-[3px] w-[19px] h-[19px] rounded-full bg-white transition-transform peer-checked:-translate-x-[19px]" />
      </label>
    </div>
  );
}
