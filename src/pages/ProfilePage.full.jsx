import { useEffect, useRef, useState } from 'react';
<<<<<<< HEAD
import Navbarpro from '../components/Navbarpro';
import { useNavigate } from 'react-router-dom';
=======
import { useSearchParams, useNavigate } from 'react-router-dom';
import Navbarpro from '../components/Navbarpro';

import auth from '../services/auth';
import marketplace from '../services/marketplace';
import { getApiError } from '../services/api';
>>>>>>> origin/develop

/* =========================================================
   أدوات مساعدة
========================================================= */

const safeUrl = (url) =>
  typeof url === 'string' && /^(https?:\/\/|\/|blob:|data:image\/)/i.test(url) ? url : null;

/* =========================================================
   الأيقونات
========================================================= */

const ICONS = {
  pin: (
    <>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </>
  ),

  camera: (
    <>
      <path d="M14.5 4h-5L8 6H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3z" />
      <circle cx="12" cy="13" r="3.5" />
    </>
  ),

  edit: <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />,

  share: (
    <>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
    </>
  ),
};

function Icon({ name, size = 20, stroke = 2 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="block">
      {ICONS[name]}
    </svg>
  );
}

/* =========================================================
   الصورة الشخصية
========================================================= */

function Picture({ url, alt = '' }) {
  const src = safeUrl(url);

  if (src) {
    return <img src={src} alt={alt} className="h-full w-full object-cover" />;
  }

  return (
    <svg
      width="62%"
      height="62%"
      viewBox="0 0 24 24"
      fill="#ffffff"
      aria-hidden="true"
      className="block">
      <circle cx="12" cy="8.2" r="4.2" />
      <path d="M3.6 21c.6-4.4 4-7 8.4-7s7.8 2.6 8.4 7z" />
    </svg>
  );
}

/* =========================================================
   زر رفع الملفات
========================================================= */

function FileButton({ onPick, label, className, children }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      return;
    }

    onPick(file);

    e.target.value = '';
  };

  return (
    <>
      <button
        type="button"
        aria-label={label}
        className={className}
        onClick={() => inputRef.current?.click()}>
        {children}
      </button>

      <input ref={inputRef} type="file" accept="image/*" hidden onChange={handleChange} />
    </>
  );
}

/* =========================================================
   الصفحة الرئيسية
========================================================= */

export default function ProfilePage() {
<<<<<<< HEAD
  /* صورة الغلاف */
  const [coverImage, setCoverImage] = useState(null);

  /* الصورة الشخصية */
  const [profileImage, setProfileImage] = useState(null);

  /* بيانات المستخدم */
  const [profile] = useState({
    name: 'منة الصوير',
    city: 'غزة',
    region: 'قطاع غزة، فلسطين',
    memberSince: '2026-10-01',
    verified: true,
  });

  /* =======================================================
     رفع صورة الغلاف
  ======================================================= */

  const handleCoverChange = (file) => {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setCoverImage((oldImage) => {
      if (oldImage) {
        URL.revokeObjectURL(oldImage);
      }

      return imageUrl;
    });
  };

  /* =======================================================
     رفع الصورة الشخصية
  ======================================================= */

  const handleProfileChange = (file) => {
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setProfileImage((oldImage) => {
      if (oldImage) {
        URL.revokeObjectURL(oldImage);
      }

      return imageUrl;
    });
=======
  const [searchParams] = useSearchParams();
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [profileLoading, setProfileLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [profileError, setProfileError] = useState('');
  const [productsError, setProductsError] = useState('');
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
  });
  const [editError, setEditError] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileCities, setProfileCities] = useState([]);
  const [citiesError, setCitiesError] = useState('');

  useEffect(() => {
    let active = true;

    auth
      .profile()
      .then((data) => {
        if (active) setProfile(data);
      })
      .catch((error) => {
        if (active) {
          setProfileError(getApiError(error) || 'تعذر تحميل الملف الشخصي');
        }
      })
      .finally(() => {
        if (active) setProfileLoading(false);
      });

    marketplace
      .myProducts()
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.products;

        if (!Array.isArray(items)) {
          throw new Error('Unexpected listings response');
        }

        if (active) setProducts(items);
      })
      .catch((error) => {
        if (active) {
          setProductsError(getApiError(error) || 'تعذر تحميل المنتجات');
        }
      })
      .finally(() => {
        if (active) setProductsLoading(false);
      });

    marketplace
      .cities()
      .then((data) => {
        const items = Array.isArray(data) ? data : data?.cities;

        if (active && Array.isArray(items)) {
          setProfileCities(items);
        }
      })
      .catch((error) => {
        if (active) {
          setCitiesError(getApiError(error) || 'تعذر تحميل قائمة المدن');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const displayProfile = {
    name: profile?.full_name,
    city: profile?.city,
    memberSince: profile?.created_at,
    verified: profile?.is_verified,
    averageRating: profile?.average_rating,
    totalTransactions: profile?.total_transactions,
>>>>>>> origin/develop
  };

  /* =======================================================
     مشاركة الملف
  ======================================================= */

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
<<<<<<< HEAD
          title: profile.name,
=======
          title: profile?.full_name || 'Badelha',
>>>>>>> origin/develop
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('تم نسخ رابط الملف');
      }
    } catch {
      // المستخدم أغلق نافذة المشاركة
    }
  };

  /* =======================================================
     تعديل الملف
  ======================================================= */

  const handleEdit = () => {
<<<<<<< HEAD
    console.log('تعديل الملف الشخصي');
=======
    setEditForm({
      fullName: profile?.full_name || '',
      phoneNumber: profile?.phone_number || '',
      address: profile?.address || '',
      city: profile?.city || '',
    });

    setEditError('');
    setEditOpen(true);
  };

  const handleProfileSubmit = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    setEditError('');

    try {
      const updated = await auth.updateProfile(editForm);

      setProfile((current) => ({
        ...current,
        ...updated,
        average_rating: current?.average_rating,
        total_transactions: current?.total_transactions,
      }));

      setEditOpen(false);
    } catch (error) {
      setEditError(getApiError(error) || 'تعذر تحديث الملف الشخصي');
    } finally {
      setSavingProfile(false);
    }
>>>>>>> origin/develop
  };

  return (
    <div
      dir="rtl"
      className="
        min-h-screen
        bg-[#eef5f5]
        text-[#16384f]
        font-[IBM_Plex_Sans_Arabic,Segoe_UI,Tahoma,sans-serif]
      ">
      {/* =====================================================
          الهيدر
      ===================================================== */}

      <Navbarpro />

      {/* =====================================================
          الغلاف
      ===================================================== */}

      <section className="relative w-full">
        <div
          className="
            relative
            h-[220px]
            w-full
            overflow-hidden
            bg-gradient-to-l
            from-[#f4f5f4]
            via-[#e2e2e2]
            to-[#e4e4e5]
            sm:h-[260px]
            md:h-[280px]
            lg:h-[300px]
          ">
          {/* صورة الغلاف */}
<<<<<<< HEAD

          {coverImage && (
            <img
              src={coverImage}
              alt="صورة الغلاف"
              className="
                absolute
                inset-0
                h-full
                w-full
                object-cover
              "
            />
          )}

          {/* طبقة فوق الصورة */}

          {coverImage && <div className="absolute inset-0 bg-black/10" />}

          {/* زر إضافة صورة */}

          {!coverImage && (
            <FileButton
              onPick={handleCoverChange}
              label="إضافة صورة الغلاف"
              className="
                absolute
                left-1/2
                top-1/2
                z-10
                -translate-x-1/2
                -translate-y-1/2
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/95
                px-6
                py-3
                text-[15px]
                font-semibold
                text-[#2e7fa0]
                shadow-[0_8px_25px_rgba(0,0,0,0.12)]
                transition-all
                duration-300
                hover:-translate-x-1/2
                hover:-translate-y-[calc(50%+3px)]
                hover:bg-white
                hover:shadow-[0_12px_30px_rgba(0,0,0,0.18)]
                active:scale-95
              ">
              <Icon name="camera" size={17} />
              إضافة صورة
            </FileButton>
          )}

          {/* زر تغيير الغلاف */}

          {coverImage && (
            <FileButton
              onPick={handleCoverChange}
              label="تغيير صورة الغلاف"
              className="
                absolute
                right-5
                top-5
                z-10
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-black/45
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                backdrop-blur-md
                transition-all
                duration-300
                hover:bg-black/60
                hover:scale-[1.03]
                active:scale-95
              ">
              <Icon name="camera" size={16} />
              تغيير الصورة
            </FileButton>
          )}
=======
>>>>>>> origin/develop
        </div>
      </section>

      {/* =====================================================
          الهوية
      ===================================================== */}

      <Identity
        p={{
<<<<<<< HEAD
          ...profile,
          avatarUrl: profileImage,
        }}
        loading={false}
        isOwner={true}
        uploading={false}
        onAvatar={handleProfileChange}
=======
          ...displayProfile,
        }}
        loading={profileLoading}
        isOwner={true}
        uploading={false}
>>>>>>> origin/develop
        onShare={handleShare}
        onEdit={handleEdit}
      />

<<<<<<< HEAD
=======
      {editOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4">
          <form
            onSubmit={handleProfileSubmit}
            className="w-full max-w-lg space-y-4 rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold">تعديل الملف الشخصي</h2>

            {[
              ['fullName', 'الاسم الكامل'],
              ['phoneNumber', 'رقم الهاتف'],
              ['city', 'المدينة (من مدن غزة المعتمدة)'],
              ['address', 'العنوان'],
            ].map(([field, label]) => (
              <label key={field} className="block text-sm">
                {label}

                {field === 'city' ? (
                  <select
                    required
                    value={editForm.city}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        city: event.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-[#d8d8d8] p-2">
                    <option value="">اختر المدينة</option>

                    {profileCities.map((city) => {
                      const name = city.city || city.city_name || city.name;

                      return (
                        <option key={city.city_id ?? city.id ?? name} value={name}>
                          {name}
                        </option>
                      );
                    })}
                  </select>
                ) : (
                  <input
                    required={field !== 'address'}
                    value={editForm[field]}
                    onChange={(event) =>
                      setEditForm({
                        ...editForm,
                        [field]: event.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-[#d8d8d8] p-2"
                  />
                )}
              </label>
            ))}

            {editError && (
              <p role="alert" className="text-sm text-red-600">
                {editError}
              </p>
            )}

            {citiesError && (
              <p role="alert" className="text-sm text-red-600">
                {citiesError}
              </p>
            )}

            <div className="flex gap-2">
              <button
                disabled={savingProfile || !profileCities.length}
                className="rounded-lg bg-[#347f81] px-4 py-2 text-white disabled:opacity-60">
                {savingProfile ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
              </button>

              <button
                type="button"
                onClick={() => setEditOpen(false)}
                className="rounded-lg border px-4 py-2">
                إلغاء
              </button>
            </div>
          </form>
        </div>
      )}

      {profileError && (
        <p role="alert" className="mx-auto mt-4 max-w-[1100px] px-5 text-red-600">
          {profileError}
        </p>
      )}

>>>>>>> origin/develop
      {/* =====================================================
          الإحصائيات
      ===================================================== */}

<<<<<<< HEAD
      <ProfileStats />
      <ProfileAbout />
      <ProfileTabs />
=======
      <ProfileStats
        profile={displayProfile}
        productsCount={products.length}
        loading={productsLoading}
      />

      <ProfileAbout />

      <ProfileTabs
        initialTab={searchParams.get('tab')}
        openAddProduct={searchParams.get('addProduct') === '1'}
        profile={displayProfile}
        products={products}
        productsLoading={productsLoading}
        productsError={productsError}
        onProductsChange={setProducts}
      />
>>>>>>> origin/develop
    </div>
  );
}

/* =========================================================
   الهوية
   الصورة الشخصية + الاسم + الموقع + الأزرار
========================================================= */

function Identity({
  p = {},
  loading = false,
  isOwner = true,
  uploading = false,
  onAvatar = () => {},
  onShare = () => {},
  onEdit = () => {},
}) {
  const location = [p.city, p.region].filter(Boolean).join('، ');
<<<<<<< HEAD
  const navigate = useNavigate();
=======

  const navigate = useNavigate();

>>>>>>> origin/develop
  return (
    <section
      className="
        relative
        -mt-[48px]
        mx-auto
        flex
        max-w-[1100px]
        flex-wrap
        items-end
        gap-[18px]
        px-5
      ">
      {/* =====================================================
          الصورة الشخصية
      ===================================================== */}

      <div className="relative h-[110px] w-[110px] flex-none">
        <div
          className="
            relative
            grid
            h-full
            w-full
            place-items-center
            overflow-hidden
            rounded-full
            border-[5px]
            border-white
            bg-gradient-to-br
            from-[#5fb1b0]
            to-[#2e7fa0]
            shadow-[0_8px_25px_rgba(0,0,0,0.16)]
          ">
          <Picture url={p.avatarUrl} alt={p.name ? `صورة ${p.name}` : ''} />

          {uploading === 'avatar' && (
            <div
              className="
                absolute
                inset-0
                animate-pulse
                bg-white/40
              "
            />
          )}
        </div>

        {/* زر تغيير الصورة */}

<<<<<<< HEAD
        {isOwner && !loading && (
=======
        {isOwner && !loading && p.avatarEditable && (
>>>>>>> origin/develop
          <FileButton
            onPick={onAvatar}
            label="تغيير الصورة الشخصية"
            className="
<<<<<<< HEAD
              absolute
              bottom-0
              end-0
              grid
              h-[34px]
              w-[34px]
              place-items-center
              rounded-full
              border-[3px]
              border-white
              bg-[#b9771d]
              text-white
              shadow-[0_4px_12px_rgba(0,0,0,0.15)]
              transition-all
              duration-200
              hover:scale-105
              hover:brightness-110
              active:scale-95
            ">
=======
                absolute
                bottom-0
                end-0
                grid
                h-[34px]
                w-[34px]
                place-items-center
                rounded-full
                border-[3px]
                border-white
                bg-[#b9771d]
                text-white
                shadow-[0_4px_12px_rgba(0,0,0,0.15)]
                transition-all
                duration-200
                hover:scale-105
                hover:brightness-110
                active:scale-95
              ">
>>>>>>> origin/develop
            <Icon name="camera" size={16} />
          </FileButton>
        )}
      </div>

      {/* =====================================================
          الاسم والمعلومات
      ===================================================== */}

      <div
        className="
          min-w-[220px]
          flex-1
          pb-1.5
        ">
        <div className="flex flex-wrap items-center gap-2.5">
          <h1
            className="
              text-[24px]
              font-bold
              leading-tight
              text-[#16384f]
            ">
            {loading ? (
              <span
                className="
                  inline-block
                  h-[27px]
                  w-[190px]
                  animate-pulse
                  rounded-lg
                  bg-[#dfeaeb]
                "
              />
            ) : (
              p.name || 'اسم المستخدم'
            )}
          </h1>

          {p.verified && (
            <span
              className="
                rounded-full
                bg-[#e0f1f0]
                px-3
                py-1
                text-[13px]
                font-semibold
                text-[#22696a]
              ">
              بائع موثّق
            </span>
          )}
        </div>

        <div
          className="
            mt-1
            flex
            flex-wrap
            items-center
            gap-4
            text-sm
            text-[#5b7482]
          ">
          {location && (
            <span className="inline-flex items-center gap-1.5">
              <Icon name="pin" size={15} />
              {location}
            </span>
          )}

          {p.memberSince && <span>عضو منذ {new Date(p.memberSince).getFullYear()}</span>}
        </div>
      </div>

      {/* =====================================================
          الأزرار
      ===================================================== */}

      <div
        className="
          flex
          flex-wrap
          items-center
          gap-2
          pb-2
        ">
        {isOwner && (
          <button
            type="button"
            onClick={() => navigate('/Personalinfoform')}
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white
              px-4
              py-2.5
              text-[14px]
              font-semibold
              text-[#22696a]
              ring-[1.5px]
              ring-inset
              ring-[#dbe7e8]
              shadow-[0_2px_8px_rgba(22,56,79,0.05)]
              transition-all
              duration-200
              hover:bg-[#f7fbfb]
              hover:ring-[#3f9a99]
              hover:-translate-y-[1px]
              active:scale-[.97]
            ">
            <Icon name="edit" size={17} />
            تعديل الملف الشخصي
          </button>
        )}

        <button
          type="button"
          onClick={onShare}
          aria-label="مشاركة الملف"
          className="
            inline-flex
            h-[42px]
            w-[42px]
            items-center
            justify-center
            rounded-full
            bg-white
            text-[#22696a]
            ring-[1.5px]
            ring-inset
            ring-[#dbe7e8]
            shadow-[0_2px_8px_rgba(22,56,79,0.05)]
            transition-all
            duration-200
            hover:bg-[#f7fbfb]
            hover:ring-[#3f9a99]
            hover:-translate-y-[1px]
            active:scale-[.97]
          ">
          <Icon name="share" size={17} />
        </button>
      </div>
    </section>
  );
}

/* =========================================================
   الرقم المتحرك
========================================================= */

function AnimatedNumber({ value, duration = 1400, decimals = 0 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const target = Number(value);

    if (Number.isNaN(target)) return;

    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const progress = Math.min((currentTime - startTime) / duration, 1);

<<<<<<< HEAD
      // حركة ناعمة
=======
>>>>>>> origin/develop
      const easeOut = 1 - Math.pow(1 - progress, 3);

      const currentValue = target * easeOut;

      setCount(decimals > 0 ? Number(currentValue.toFixed(decimals)) : Math.floor(currentValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration, decimals]);

  return (
    <>
      {count.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
    </>
  );
}

/* =========================================================
   إحصائيات الملف الشخصي
========================================================= */

<<<<<<< HEAD
function ProfileStats() {
  const stats = [
    {
      value: 48,
      label: 'منتجات',
    },
    {
      value: 1204,
      label: 'عمليات تبديل',
    },
    {
      value: 392,
      label: 'متابعون',
    },
    {
      value: 4.8,
=======
function ProfileStats({ profile, productsCount, loading }) {
  const stats = [
    {
      value: productsCount,
      label: 'منتجات',
    },
    {
      value: profile.totalTransactions || 0,
      label: 'عمليات مكتملة',
    },
    {
      value: profile.averageRating || 0,
>>>>>>> origin/develop
      label: 'تقييم',
      rating: true,
      decimals: 1,
    },
  ];

  return (
    <section
      className="
        mx-auto
        mt-[35px]
        w-full
        max-w-[1100px]
        px-5
        animate-[statsAppear_0.8s_ease-out]
      ">
      <div
        className="
          grid
          grid-cols-2
          overflow-hidden
          rounded-[18px]
          border
          border-[#e1ebec]
          bg-white
          shadow-[0_4px_18px_rgba(22,56,79,0.05)]
<<<<<<< HEAD
          sm:grid-cols-4
=======
          sm:grid-cols-3
>>>>>>> origin/develop
        ">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={`
              group
              relative
              flex
              min-h-[105px]
              flex-col
              items-center
              justify-center
              gap-[7px]
              px-4
              py-5
              transition-all
              duration-300
              hover:-translate-y-[3px]
              hover:bg-[#f8fbfb]

              ${
                index !== stats.length - 1
                  ? 'border-b border-[#e8eeee] sm:border-b-0 sm:border-s'
                  : ''
              }
            `}>
<<<<<<< HEAD
            {/* خط متحرك */}

=======
>>>>>>> origin/develop
            <span
              className="
                absolute
                bottom-0
                left-1/2
                h-[2px]
                w-0
                -translate-x-1/2
                rounded-full
                bg-gradient-to-r
                from-[#3A73AA]
                to-[#4F9D9E]
                transition-all
                duration-300
                group-hover:w-[45%]
              "
            />

<<<<<<< HEAD
            {/* الرقم */}

=======
>>>>>>> origin/develop
            <span
              className="
                flex
                items-center
                text-[24px]
                font-bold
                leading-none
                text-[#16384f]
                transition-all
                duration-300
                group-hover:scale-105
              ">
              {stat.rating && (
                <span
                  className="
                    mr-[3px]
                    text-[#e4a52f]
                    transition-transform
                    duration-300
                    group-hover:rotate-12
                  ">
                  ★
                </span>
              )}

<<<<<<< HEAD
              <AnimatedNumber value={stat.value} decimals={stat.decimals || 0} />
            </span>

            {/* اسم الإحصائية */}

=======
              {loading && index === 0 ? (
                '…'
              ) : (
                <AnimatedNumber value={stat.value} decimals={stat.decimals || 0} />
              )}
            </span>

>>>>>>> origin/develop
            <span
              className="
                text-[14px]
                font-medium
                text-[#718692]
                transition-colors
                duration-300
                group-hover:text-[#3f8f91]
              ">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
<<<<<<< HEAD
function ProfileAbout() {
  const categories = ['خزف يدوي', 'مواد غذائية', 'خرز', 'تمور'];

=======

function ProfileAbout() {
>>>>>>> origin/develop
  return (
    <section
      className="
        mx-auto
        mt-[25px]
        w-full
        max-w-[1100px]
        px-5
        pb-[40px]
      ">
      <div
        className="
          rounded-[18px]
          border
          border-[#e1ebec]
          bg-white
          p-[24px]
          shadow-[0_4px_18px_rgba(22,56,79,0.05)]
          transition-all
          duration-300
          hover:shadow-[0_8px_25px_rgba(22,56,79,0.08)]
        ">
<<<<<<< HEAD
        {/* العنوان */}

=======
>>>>>>> origin/develop
        <h2
          className="
            mb-[12px]
            text-[19px]
            font-bold
            text-[#16384f]
          ">
          نبذة عن البائع
        </h2>

<<<<<<< HEAD
        {/* الوصف */}

=======
>>>>>>> origin/develop
        <p
          className="
            max-w-[850px]
            text-[15px]
            leading-[2]
            text-[#5b7482]
          ">
<<<<<<< HEAD
          بائع معتمد في سوق غزة المحلي، متخصص في التمور الفاخرة والمنتجات الحرفية اليدوية. أكثر من
          10 سنوات خبرة في التجارة المحلية، جميع المنتجات طازجة وعالية الجودة.
        </p>

        {/* التصنيفات */}

        <div className="mt-[20px] flex flex-wrap gap-[9px]">
          {categories.map((category) => (
            <span
              key={category}
              className="
                cursor-default
                rounded-full
                bg-[#edf7f7]
                px-[14px]
                py-[7px]
                text-[13px]
                font-medium
                text-[#347f81]
                transition-all
                duration-300
                hover:-translate-y-[2px]
                hover:bg-[#dff0ef]
                hover:shadow-[0_4px_12px_rgba(63,154,153,0.12)]
              ">
              {category}
            </span>
          ))}
        </div>
=======
          لا تتوفر نبذة تعريفية إضافية لهذا الحساب.
        </p>
>>>>>>> origin/develop
      </div>
    </section>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/develop
/* =========================================================
   تبويبات الملف الشخصي
========================================================= */

<<<<<<< HEAD
function ProfileTabs() {
  const [activeTab, setActiveTab] = useState('info');
=======
function ProfileTabs({
  profile,
  products,
  productsLoading,
  productsError,
  onProductsChange,
  initialTab,
  openAddProduct,
}) {
  const [activeTab, setActiveTab] = useState(initialTab === 'products' ? 'products' : 'info');
>>>>>>> origin/develop

  const tabs = [
    { id: 'info', label: 'المعلومات' },
    { id: 'reviews', label: 'التقييمات' },
    { id: 'products', label: 'منتجاتي' },
  ];

  return (
    <section className="mx-auto mt-6 w-full max-w-[1100px] px-5 pb-12">
      <div
        className="
          overflow-hidden
          rounded-[18px]
          border border-[#e1ebec]
          bg-white
          shadow-[0_4px_18px_rgba(22,56,79,0.05)]
        ">
<<<<<<< HEAD
        {/* أزرار التبويبات */}

=======
>>>>>>> origin/develop
        <div
          className="
            flex
            items-center
            gap-2
            overflow-x-auto
            border-b border-[#e8eeee]
            px-4
            pt-3
            sm:px-6
          "
          role="tablist"
          aria-label="أقسام الملف الشخصي">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative
                shrink-0
                px-5
                py-3
                text-[14px]
                font-semibold
                transition-all
                duration-300
                sm:px-7
                ${activeTab === tab.id ? 'text-[#347f81]' : 'text-[#81939d] hover:text-[#347f81]'}
              `}>
              {tab.label}

<<<<<<< HEAD
              {/* الخط المتحرك أسفل التبويب */}

=======
>>>>>>> origin/develop
              <span
                className={`
                  absolute
                  bottom-0
                  left-1/2
                  h-[3px]
                  -translate-x-1/2
                  rounded-t-full
                  bg-gradient-to-r
                  from-[#3A73AA]
                  to-[#4F9D9E]
                  transition-all
                  duration-300
                  ${activeTab === tab.id ? 'w-[65%]' : 'w-0'}
                `}
              />
            </button>
          ))}
        </div>

<<<<<<< HEAD
        {/* محتوى التبويب */}

=======
>>>>>>> origin/develop
        <div
          key={activeTab}
          role="tabpanel"
          className="
            min-h-[180px]
            p-5
            animate-[tabFade_0.35s_ease-out]
            sm:p-7
          ">
<<<<<<< HEAD
          {activeTab === 'info' && <InfoTab />}

          {activeTab === 'reviews' && <ReviewsTab />}

          {activeTab === 'products' && <ProductsTab />}
=======
          {activeTab === 'info' && <InfoTab profile={profile} />}

          {activeTab === 'reviews' && <ReviewsTab averageRating={profile.averageRating} />}

          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              loading={productsLoading}
              error={productsError}
              onProductsChange={onProductsChange}
              openAddProduct={openAddProduct}
            />
          )}
>>>>>>> origin/develop
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   تبويب المعلومات
========================================================= */

<<<<<<< HEAD
function InfoTab() {
  const information = [
    { label: 'الاسم', value: 'منة الصوير' },
    { label: 'الموقع', value: 'غزة، فلسطين' },
    { label: 'تاريخ الانضمام', value: '2026' },
    { label: 'حالة الحساب', value: 'بائع موثّق' },
=======
function InfoTab({ profile }) {
  const information = [
    {
      label: 'الاسم',
      value: profile.name || '—',
    },
    {
      label: 'الموقع',
      value: profile.city || '—',
    },
    {
      label: 'تاريخ الانضمام',
      value: profile.memberSince ? new Date(profile.memberSince).getFullYear() : '—',
    },
    {
      label: 'حالة الحساب',
      value: profile.verified ? 'بائع موثّق' : 'غير موثّق',
    },
>>>>>>> origin/develop
  ];

  return (
    <div>
      <h2 className="mb-5 text-[18px] font-bold text-[#16384f]">معلومات البائع</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {information.map((item) => (
          <div
            key={item.label}
            className="
              rounded-[12px]
              bg-[#f7fafa]
              p-4
              transition-all
              duration-300
              hover:bg-[#edf7f7]
            ">
            <p className="mb-1 text-[13px] text-[#81939d]">{item.label}</p>

            <p className="text-[15px] font-semibold text-[#16384f]">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   تبويب التقييمات
========================================================= */

<<<<<<< HEAD
/* =========================================================
   تبويب التقييمات
========================================================= */

function ReviewsTab() {
  const reviews = [
    {
      id: 1,
      name: 'سامر',
      initial: 'س',
      date: '30 أغسطس 2026',
      rating: 5,
      comment: 'التمر طازج ومغلّف بعناية، والتبديل كان سريعًا وبدون تعقيد.',
    },
    {
      id: 2,
      name: 'رنا',
      initial: 'ر',
      date: '12 أغسطس 2026',
      rating: 5,
      comment: 'الخزف أجمل من الصور، تعامل محترم والتزام بالمواعيد.',
    },
    {
      id: 3,
      name: 'خالد',
      initial: 'خ',
      date: '21 يوليو 2026',
      rating: 4,
      comment: 'جودة ممتازة، والتوصيل تأخر يومًا واحدًا فقط.',
    },
  ];

  const ratingStats = [
    { stars: 5, percentage: 67 },
    { stars: 4, percentage: 33 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <section className="w-full" dir="rtl">
      {/* =========================
          ملخص التقييمات + آراء العملاء
      ========================= */}

      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* =========================
            قائمة التقييمات
        ========================= */}

        <div className="flex flex-col gap-4">
=======
function ReviewsTab({ averageRating }) {
  const reviews = [];
  const ratingStats = [];

  return (
    <section className="w-full" dir="rtl">
      <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="flex flex-col gap-4">
          {reviews.length === 0 && (
            <p className="rounded-xl bg-[#f7fafa] p-5 text-center text-[#718692]">
              لا تتوفر مراجعات عامة من خلال واجهة الخادم الحالية.
            </p>
          )}

>>>>>>> origin/develop
          {reviews.map((review, index) => (
            <article
              key={review.id}
              style={{
                animationDelay: `${index * 120}ms`,
              }}
              className="
                group
                rounded-[25px]
                border
                border-[#e1ebec]
                bg-white
                p-5
                shadow-[0_4px_14px_rgba(22,56,79,0.04)]
                transition-all
                duration-300
                animate-[reviewAppear_0.6s_ease-out_both]
                hover:-translate-y-[3px]
                hover:shadow-[0_10px_25px_rgba(22,56,79,0.07)]
                sm:p-6
              ">
<<<<<<< HEAD
              {/* معلومات صاحب التقييم */}

              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  {/* صورة رمزية */}

=======
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
>>>>>>> origin/develop
                  <div
                    className="
                      grid
                      h-[50px]
                      w-[50px]
                      flex-none
                      place-items-center
                      rounded-full
                      bg-[#e2f2ef]
                      text-[20px]
                      font-bold
                      text-[#347f81]
                      transition-transform
                      duration-300
                      group-hover:scale-105
                    ">
                    {review.initial}
                  </div>

<<<<<<< HEAD
                  {/* الاسم والتاريخ */}

=======
>>>>>>> origin/develop
                  <div className="min-w-0">
                    <h3 className="text-[16px] font-bold text-[#16384f]">{review.name}</h3>

                    <p className="mt-1 text-[13px] text-[#81939d]">{review.date}</p>
                  </div>
                </div>

<<<<<<< HEAD
                {/* النجوم */}

=======
>>>>>>> origin/develop
                <div
                  className="
                    flex
                    flex-none
                    flex-row-reverse
                    gap-[2px]
                    pt-1
                    text-[20px]
                    text-[#b9771d]
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  aria-label={`التقييم ${review.rating} من 5`}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star}>{star <= review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
              </div>

<<<<<<< HEAD
              {/* نص التقييم */}

=======
>>>>>>> origin/develop
              <p
                className="
                  mt-5
                  text-[15px]
                  leading-[1.9]
                  text-[#16384f]
                ">
                {review.comment}
              </p>
            </article>
          ))}
        </div>

<<<<<<< HEAD
        {/* =========================
            ملخص التقييم
        ========================= */}

=======
>>>>>>> origin/develop
        <aside
          className="
            rounded-[25px]
            border
            border-[#e1ebec]
            bg-white
            p-6
            shadow-[0_4px_14px_rgba(22,56,79,0.04)]
            transition-all
            duration-300
            hover:shadow-[0_10px_25px_rgba(22,56,79,0.07)]
            lg:sticky
            lg:top-5
          ">
<<<<<<< HEAD
          {/* المعدل العام */}

=======
>>>>>>> origin/develop
          <div className="flex flex-col items-center text-center">
            <span
              className="
                text-[64px]
                font-bold
                leading-none
                text-[#20557b]
                animate-[ratingNumber_0.8s_ease-out]
              ">
<<<<<<< HEAD
              4.8
            </span>

            {/* النجوم */}

=======
              {Number(averageRating || 0).toFixed(1)}
            </span>

>>>>>>> origin/develop
            <div className="mt-4 flex flex-row-reverse gap-1 text-[24px] text-[#b9771d]">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className="transition-transform duration-300 hover:scale-125">
                  ★
                </span>
              ))}
            </div>

<<<<<<< HEAD
            <p className="mt-4 text-[15px] text-[#81939d]">من 3 تقييمات</p>
          </div>

          {/* توزيع التقييمات */}

=======
            <p className="mt-4 text-[15px] text-[#81939d]">متوسط التقييم المسجّل</p>
          </div>

>>>>>>> origin/develop
          <div className="mt-8 flex flex-col gap-5">
            {ratingStats.map((item, index) => (
              <div
                key={item.stars}
                className="
<<<<<<< HEAD
                  grid
                  grid-cols-[25px_minmax(0,1fr)_40px]
                  items-center
                  gap-3
                ">
                {/* عدد النجوم */}

                <span className="text-[14px] text-[#5b7482]">{item.stars}</span>

                {/* شريط النسبة */}

                <div
                  className="
                    h-[12px]
                    overflow-hidden
                    rounded-full
                    bg-[#dce7e8]
                  ">
                  <div
                    className="
                      h-full
                      rounded-full
                      bg-[#b9771d]
                      transition-all
                      duration-1000
                      ease-out
                      animate-[ratingBar_1s_ease-out_both]
                    "
=======
                    grid
                    grid-cols-[25px_minmax(0,1fr)_40px]
                    items-center
                    gap-3
                  ">
                <span className="text-[14px] text-[#5b7482]">{item.stars}</span>

                <div
                  className="
                      h-[12px]
                      overflow-hidden
                      rounded-full
                      bg-[#dce7e8]
                    ">
                  <div
                    className="
                        h-full
                        rounded-full
                        bg-[#b9771d]
                        transition-all
                        duration-1000
                        ease-out
                        animate-[ratingBar_1s_ease-out_both]
                      "
>>>>>>> origin/develop
                    style={{
                      width: `${item.percentage}%`,
                      animationDelay: `${index * 150}ms`,
                    }}
                  />
                </div>

<<<<<<< HEAD
                {/* النسبة المئوية */}

=======
>>>>>>> origin/develop
                <span className="text-left text-[14px] text-[#5b7482]">{item.percentage}%</span>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/develop
/* =========================================================
   تبويب منتجاتي
========================================================= */

<<<<<<< HEAD
function ProductsTab() {
  const products = [
    {
      id: 1,
      name: 'تمر مجدول فاخر (5 كغ)',
      category: 'تمور',
      exchange: 'زيت زيتون أو عسل',
      emoji: '🌴',
      available: true,
    },
    {
      id: 2,
      name: 'مزهرية خزف مطلية يدويًا',
      category: 'خزف يدوي',
      exchange: 'أقمشة أو خيوط تطريز',
      emoji: '🏺',
      available: true,
    },
    {
      id: 3,
      name: 'عقد خرز بألوان الأرض',
      category: 'خرز',
      exchange: 'مقابل مكسرات',
      emoji: '📿',
      available: true,
    },
    {
      id: 4,
      name: 'دبس التمر الطبيعي',
      category: 'مواد غذائية',
      exchange: 'طحين أو أرز',
      emoji: '🍯',
      available: true,
    },
  ];

  const handleAddProduct = () => {
    console.log('إضافة منتج جديد');
  };

  const handleProductClick = (product) => {
    console.log('عرض المنتج:', product);
=======
function ProductsTab({ products, loading, error, onProductsChange, openAddProduct }) {
  const [categories, setCategories] = useState([]);

  const [cities, setCities] = useState([]);

  const [formOpen, setFormOpen] = useState(openAddProduct);

  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    categoryId: '',
    cityId: '',
    condition: 'GOOD',
    price: '',
    exchangePreference: 'BOTH',
  });

  const [saving, setSaving] = useState(false);

  const [formError, setFormError] = useState('');

  useEffect(() => {
    let active = true;

    Promise.all([marketplace.categories(), marketplace.cities()])
      .then(([categoryResult, cityResult]) => {
        const categoryList = Array.isArray(categoryResult)
          ? categoryResult
          : categoryResult?.categories;

        const cityList = Array.isArray(cityResult) ? cityResult : cityResult?.cities;

        if (!Array.isArray(categoryList) || !Array.isArray(cityList)) {
          throw new Error('Unexpected categories or cities response');
        }

        if (active) {
          setCategories(categoryList);
          setCities(cityList);
        }
      })
      .catch((requestError) => {
        if (active) {
          setFormError(getApiError(requestError) || 'تعذر تحميل الفئات والمدن');
        }
      });

    return () => {
      active = false;
    };
  }, []);

  const openForm = (product = null) => {
    setFormOpen(true);
    setEditing(product);

    setForm({
      title: product?.title || '',
      description: product?.description || '',
      categoryId: product?.category_id || '',
      cityId: product?.city_id || '',
      condition: product?.condition || 'GOOD',
      price: product?.price ?? '',
      exchangePreference: product?.exchange_preference || 'BOTH',
    });

    setFormError('');
  };

  const refreshProducts = async () => {
    const result = await marketplace.myProducts();

    const items = Array.isArray(result) ? result : result?.products;

    if (!Array.isArray(items)) {
      throw new Error('Unexpected listings response');
    }

    onProductsChange(items);
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    setSaving(true);
    setFormError('');

    const payload = {
      ...form,
      categoryId: Number(form.categoryId),
      cityId: Number(form.cityId),
      price: form.price === '' ? null : Number(form.price),
    };

    try {
      if (editing) {
        await marketplace.updateProduct(editing.product_id, payload);
      } else {
        await marketplace.createProduct(payload);
      }

      await refreshProducts();

      setFormOpen(false);
      setEditing(null);
    } catch (requestError) {
      setFormError(getApiError(requestError) || 'تعذر حفظ المنتج');
    } finally {
      setSaving(false);
    }
  };

  const removeProduct = async (product) => {
    if (!window.confirm('هل تريد حذف هذا المنتج؟')) {
      return;
    }

    try {
      await marketplace.deleteProduct(product.product_id);

      await refreshProducts();
    } catch (requestError) {
      setFormError(getApiError(requestError) || 'تعذر حذف المنتج');
    }
>>>>>>> origin/develop
  };

  return (
    <section className="w-full">
      {/* عنوان القسم */}

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-[20px] font-bold text-[#16384f]">منتجاتي</h2>

          <p className="mt-1 text-[13px] text-[#81939d]">المنتجات التي تعرضينها في السوق</p>
        </div>

        <span className="rounded-full bg-[#e3f2f1] px-4 py-2 text-[13px] font-semibold text-[#347f81]">
          {products.length} منتجات
        </span>
<<<<<<< HEAD
      </div>

=======

        <button
          type="button"
          onClick={() => openForm()}
          className="rounded-full bg-gradient-to-r from-[#3A73AA] to-[#4F9D9E] px-4 py-2 text-sm font-semibold text-white">
          إضافة منتج
        </button>
      </div>

      {(error || formError) && (
        <p role="alert" className="mb-4 text-sm text-red-600">
          {formError || error}
        </p>
      )}

      {formOpen && (
        <form
          onSubmit={saveProduct}
          className="mb-6 grid gap-3 rounded-xl border border-[#e1ebec] bg-[#f7fafa] p-4 sm:grid-cols-2">
          <label className="text-sm">
            اسم المنتج
            <input
              required
              minLength="5"
              maxLength="200"
              value={form.title}
              onChange={(event) =>
                setForm({
                  ...form,
                  title: event.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border p-2"
            />
          </label>

          <label className="text-sm">
            الفئة
            <select
              required
              value={form.categoryId}
              onChange={(event) =>
                setForm({
                  ...form,
                  categoryId: event.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border p-2">
              <option value="">اختر الفئة</option>

              {categories.map((item) => (
                <option key={item.category_id ?? item.id} value={item.category_id ?? item.id}>
                  {item.category_name || item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            المدينة
            <select
              required
              value={form.cityId}
              onChange={(event) =>
                setForm({
                  ...form,
                  cityId: event.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border p-2">
              <option value="">اختر المدينة</option>

              {cities.map((item) => (
                <option key={item.city_id ?? item.id} value={item.city_id ?? item.id}>
                  {item.city || item.city_name || item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm">
            الحالة
            <select
              value={form.condition}
              onChange={(event) =>
                setForm({
                  ...form,
                  condition: event.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border p-2">
              <option value="NEW">جديد</option>
              <option value="LIKE_NEW">كالجديد</option>
              <option value="GOOD">جيد</option>
              <option value="FAIR">مقبول</option>
              <option value="POOR">مستهلك</option>
            </select>
          </label>

          <label className="text-sm">
            السعر (اختياري)
            <input
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(event) =>
                setForm({
                  ...form,
                  price: event.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border p-2"
            />
          </label>

          <label className="text-sm">
            نوع العرض
            <select
              value={form.exchangePreference}
              onChange={(event) =>
                setForm({
                  ...form,
                  exchangePreference: event.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border p-2">
              <option value="BOTH">تبديل أو شراء</option>

              <option value="EXCHANGE_ONLY">تبديل فقط</option>

              <option value="PURCHASE_ONLY">شراء فقط</option>
            </select>
          </label>

          <label className="text-sm sm:col-span-2">
            الوصف
            <textarea
              required
              minLength="10"
              value={form.description}
              onChange={(event) =>
                setForm({
                  ...form,
                  description: event.target.value,
                })
              }
              className="mt-1 w-full rounded-lg border p-2"
              rows="3"
            />
          </label>

          <div className="flex gap-2 sm:col-span-2">
            <button
              disabled={saving || !categories.length || !cities.length}
              className="rounded-lg bg-[#347f81] px-4 py-2 text-white disabled:opacity-50">
              {saving ? 'جارٍ الحفظ...' : 'حفظ'}
            </button>

            <button
              type="button"
              onClick={() => {
                setFormOpen(false);
                setEditing(null);
              }}
              className="rounded-lg border px-4 py-2">
              إلغاء
            </button>
          </div>
        </form>
      )}

>>>>>>> origin/develop
      {/* شبكة المنتجات */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        ">
        {/* كروت المنتجات */}

<<<<<<< HEAD
        {products.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => handleProductClick(product)}
            className="
              group
              overflow-hidden
              rounded-[25px]
              border
              border-[#e2ebeb]
              bg-white
              text-right
              shadow-[0_4px_14px_rgba(22,56,79,0.04)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:border-[#cce5e3]
              hover:shadow-[0_12px_28px_rgba(22,56,79,0.09)]
            ">
            {/* صورة المنتج */}

            <div
              className="
                relative
                flex
                h-[175px]
                items-center
                justify-center
                overflow-hidden
                bg-gradient-to-br
                from-[#e2f2ef]
                to-[#f5f0df]
              ">
              <span
                className="
                  text-[58px]
                  transition-transform
                  duration-500
                  group-hover:scale-110
                  group-hover:-rotate-3
                ">
                {product.emoji}
              </span>

              {/* حالة المنتج */}

              <span
                className="
                  absolute
                  right-3
                  top-3
                  rounded-full
                  bg-white/90
                  px-3
                  py-1
                  text-[11px]
                  font-semibold
                  text-[#347f81]
                  shadow-sm
                  backdrop-blur-sm
                ">
                {product.available ? 'متاح للتبديل' : 'غير متاح'}
              </span>
            </div>

            {/* تفاصيل المنتج */}

            <div className="p-4">
              <h3
                className="
                  truncate
                  text-[16px]
                  font-bold
                  text-[#16384f]
                  transition-colors
                  duration-300
                  group-hover:text-[#347f81]
                ">
                {product.name}
              </h3>

              <p className="mt-2 text-[13px] text-[#81939d]">{product.category}</p>

              {/* نوع التبديل */}

              <div className="mt-3 flex items-start gap-2 text-[13px] text-[#718692]">
                <span className="mt-[1px] text-[#399d9a]">⇄</span>

                <p className="line-clamp-2 leading-6">يبدّل مقابل: {product.exchange}</p>
              </div>

              {/* زر التفاصيل */}

              <div className="mt-4 flex justify-end">
                <span
                  className="
                    rounded-full
                    bg-[#e3f2f1]
                    px-3
                    py-1.5
                    text-[12px]
                    font-semibold
                    text-[#347f81]
                    transition-all
                    duration-300
                    group-hover:bg-gradient-to-r
                    group-hover:from-[#3A73AA]
                    group-hover:to-[#4F9D9E]
                    group-hover:text-white
                  ">
                  عرض التفاصيل
                </span>
              </div>
            </div>
          </button>
        ))}

        {/* بطاقة إضافة منتج */}

        <button
          type="button"
          onClick={handleAddProduct}
          className="
            group
            flex
            min-h-[315px]
            flex-col
            items-center
            justify-center
            rounded-[25px]
            border-2
            border-dashed
            border-[#d6e5e7]
            bg-transparent
            px-5
            py-8
            text-center
            transition-all
            duration-300
            hover:border-[#4F9D9E]
            hover:bg-[#e9f5f3]
            hover:shadow-[0_8px_22px_rgba(63,154,153,0.08)]
          ">
          {/* علامة الإضافة */}

          <span
            className="
              flex
              h-[58px]
              w-[58px]
              items-center
              justify-center
              rounded-full
              text-[38px]
              font-light
              text-[#5c7885]
              transition-all
              duration-300
              group-hover:rotate-90
              group-hover:bg-white
              group-hover:text-[#399d9a]
            ">
            +
          </span>

          <h3 className="mt-5 text-[17px] font-bold text-[#526f7e] transition-colors group-hover:text-[#347f81]">
            إضافة منتج جديد
          </h3>

          <p className="mt-3 max-w-[220px] text-[13px] leading-6 text-[#81939d]">
            اذكري ما تعرضينه للتبديل واحصلي على فرص جديدة.
          </p>
        </button>
=======
        {loading ? (
          <p>جارٍ تحميل المنتجات...</p>
        ) : (
          products.map((product) => (
            <article
              key={product.product_id}
              className="
                group
                overflow-hidden
                rounded-[25px]
                border
                border-[#e2ebeb]
                bg-white
                text-right
                shadow-[0_4px_14px_rgba(22,56,79,0.04)]
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#cce5e3]
                hover:shadow-[0_12px_28px_rgba(22,56,79,0.09)]
              ">
              {/* صورة المنتج */}

              <div
                className="
                  relative
                  flex
                  h-[175px]
                  items-center
                  justify-center
                  overflow-hidden
                  bg-gradient-to-br
                  from-[#e2f2ef]
                  to-[#f5f0df]
                ">
                <span
                  className="
                    text-[58px]
                    transition-transform
                    duration-500
                    group-hover:scale-110
                    group-hover:-rotate-3
                  ">
                  {product.images?.[0]?.image_url ? (
                    <img
                      src={product.images[0].image_url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    '📦'
                  )}
                </span>

                {/* حالة المنتج */}

                <span
                  className="
                    absolute
                    right-3
                    top-3
                    rounded-full
                    bg-white/90
                    px-3
                    py-1
                    text-[11px]
                    font-semibold
                    text-[#347f81]
                    shadow-sm
                    backdrop-blur-sm
                  ">
                  {product.availability_status === 'AVAILABLE' ? 'متاح' : 'غير متاح'}
                </span>
              </div>

              {/* تفاصيل المنتج */}

              <div className="p-4">
                <h3
                  className="
                    truncate
                    text-[16px]
                    font-bold
                    text-[#16384f]
                    transition-colors
                    duration-300
                    group-hover:text-[#347f81]
                  ">
                  {product.title}
                </h3>

                <p className="mt-2 text-[13px] text-[#81939d]">
                  {product.category?.category_name || product.category?.name || ''}
                </p>

                <div className="mt-3 flex items-start gap-2 text-[13px] text-[#718692]">
                  <span className="mt-[1px] text-[#399d9a]">⇄</span>

                  <p className="line-clamp-2 leading-6">{product.description}</p>
                </div>

                <div className="mt-4 flex justify-end">
                  <span
                    className="
                      rounded-full
                      bg-[#e3f2f1]
                      px-3
                      py-1.5
                      text-[12px]
                      font-semibold
                      text-[#347f81]
                      transition-all
                      duration-300
                      group-hover:bg-gradient-to-r
                      group-hover:from-[#3A73AA]
                      group-hover:to-[#4F9D9E]
                      group-hover:text-white
                    ">
                    {product.price != null ? `السعر: ${product.price}` : 'تفاصيل المنتج'}
                  </span>
                </div>

                <div className="mt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openForm(product);
                    }}
                    className="rounded border px-3 py-1 text-xs">
                    تعديل
                  </button>

                  <button
                    type="button"
                    onClick={() => removeProduct(product)}
                    className="rounded border border-red-200 px-3 py-1 text-xs text-red-600">
                    حذف
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
>>>>>>> origin/develop
      </div>
    </section>
  );
}
