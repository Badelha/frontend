import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NAV = [
  { label: 'الرئيسية', href: '/' },
  { label: 'كيف تعمل', href: '/#about' },
  { label: 'السوق', href: '/#market' },
  { label: 'من نحن', href: '/about' },
  { label: 'اتصل بنا', href: '/#contact' },
];

const CITIES = ['غزة', 'شمال غزة', 'دير البلح', 'خان يونس', 'رفح'];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [city, setCity] = useState('');

  const navigate = useNavigate();

  const profileRef = useRef(null);
  const cityRef = useRef(null);
  const mobileRef = useRef(null);

  /* ================= SCROLL ================= */

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  /* ================= CLOSE MENUS ================= */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!profileRef.current?.contains(event.target)) {
        setProfileOpen(false);
      }

      if (!cityRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }

      if (!mobileRef.current?.contains(event.target)) {
        setMobileOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setProfileOpen(false);
        setMenuOpen(false);
        setMobileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  /* ================= CLOSE MOBILE MENU ================= */

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  /* ================= HEADER BUTTON ================= */

  const headerButton = `
    flex items-center justify-center gap-2
    rounded-full
    border border-white/40
    bg-white/10
    px-3 py-2
    text-sm font-semibold
    text-white
    transition-all duration-300
    hover:bg-white/20
    hover:shadow-md
    active:scale-95
    sm:px-4 sm:py-2.5
  `;

  return (
    <header
      dir="rtl"
      className={`
        fixed left-0 top-0 z-50 w-full
        px-0
        transition-all duration-300
        
        ${isScrolled ? 'pt-2' : ''}
      `}>
      {/* ================= MAIN NAVBAR ================= */}

      <div
        className={`
          mx-auto flex min-h-[70px] w-full
          items-center justify-between
          gap-2
          bg-gradient-to-l from-[#4F9D9E] to-[#3A73AA]
          px-3
          text-white
          transition-all duration-300

          sm:min-h-[76px]
          sm:px-5

          lg:min-h-[80px]
          lg:px-7

          ${
            isScrolled
              ? 'max-w-[1450px] rounded-[22px] shadow-[0_8px_30px_rgba(1,59,89,0.18)] sm:rounded-[28px]'
              : ''
          }
        `}>
        {/* ================= LOGO ================= */}

        <Link
          to="/"
          aria-label="بدّلها - الرئيسية"
          className="
            group flex shrink-0
            items-center gap-2
            transition-all duration-300
            hover:-translate-y-0.5
            sm:gap-3
          ">
          <span
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              border border-white/30
              bg-white/15
              shadow-sm
              transition-all duration-500
              group-hover:rotate-6
              group-hover:scale-105
              group-hover:bg-white/25
              group-hover:shadow-lg

              sm:h-11 sm:w-11
              sm:rounded-2xl

              lg:h-12 lg:w-12
            ">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="
                h-5 w-5
                transition-transform duration-500
                sm:h-6 sm:w-6
                lg:h-7 lg:w-7
                group-hover:-rotate-6
              "
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M7 7h11l-3-3" />
              <path d="M18 7l-3 3" />
              <path d="M17 17H6l3 3" />
              <path d="M6 17l3-3" />
            </svg>
          </span>

          <span
            className="
              text-[22px]
              font-bold
              tracking-wide
              transition-all duration-300
              group-hover:drop-shadow-md

              sm:text-[25px]
              lg:text-[28px]
            ">
            بدّلها
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}

        <nav
          aria-label="التنقل الرئيسي"
          className="
            hidden
            items-center
            gap-5
            xl:flex
            xl:gap-7
            2xl:gap-9
          ">
          {NAV.map((item, index) => (
            <Link
              key={item.label}
              to={item.href}
              className={`
                group relative
                whitespace-nowrap
                py-2
                text-[14px]
                font-semibold
                transition-colors duration-300
                hover:text-white
                xl:text-[15px]
                ${index === 0 ? 'text-white' : 'text-white/75'}
              `}>
              {item.label}

              <span
                className="
                  absolute
                  bottom-0
                  right-0
                  h-[2px]
                  w-0
                  rounded-full
                  bg-white
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>
          ))}
        </nav>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2.5">
          {/* ================= CITY ================= */}

          <div className="relative" ref={cityRef}>
            <button
              type="button"
              className={headerButton}
              aria-expanded={menuOpen}
              onClick={() => {
                setMenuOpen((open) => !open);
                setProfileOpen(false);
              }}>
              <svg
                viewBox="0 0 24 24"
                className="h-[17px] w-[17px] sm:h-[18px] sm:w-[18px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              <span className="hidden sm:inline">{city || 'المنطقة'}</span>

              <svg
                viewBox="0 0 24 24"
                className={`
                  h-3.5 w-3.5
                  transition-transform duration-300
                  sm:h-4 sm:w-4
                  ${menuOpen ? 'rotate-180' : ''}
                `}
                fill="none"
                stroke="currentColor"
                strokeWidth="2">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {menuOpen && (
              <div
                className="
                  absolute right-0
                  top-[calc(100%+10px)]
                  z-[60]
                  w-[175px]
                  rounded-2xl
                  border border-[#dbe7e8]
                  bg-white
                  p-2
                  text-[#16384f]
                  shadow-[0_12px_35px_rgba(1,59,89,0.18)]
                  sm:w-[190px]
                ">
                <p className="px-3 py-2 text-xs font-semibold text-[#78909c]">اختاري منطقتك</p>

                {CITIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setCity(item);
                      setMenuOpen(false);
                    }}
                    className={`
                      flex w-full
                      items-center
                      justify-between
                      rounded-xl
                      px-3 py-2.5
                      text-right
                      text-sm
                      transition-all duration-200
                      hover:bg-[#e8f5f4]
                      hover:text-[#287d80]
                      ${city === item ? 'bg-[#e8f5f4] font-bold text-[#287d80]' : ''}
                    `}>
                    {item}

                    {city === item && <span>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================= ADD PRODUCT ================= */}

          <Link
            to="/add-product"
            className="
              hidden
              items-center
              justify-center
              gap-2
              rounded-full
              border border-white/70
              bg-white
              px-4 py-2.5
              text-sm
              font-bold
              text-[#287d80]
              shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#f0fbfa]
              hover:shadow-lg
              active:scale-95

              md:inline-flex
              lg:px-5
            ">
            <svg
              viewBox="0 0 24 24"
              className="h-[17px] w-[17px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>

            <span className="hidden lg:inline">إضافة منتج</span>

            <span className="lg:hidden">إضافة</span>
          </Link>

          {/* ================= PROFILE ================= */}

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              aria-label="فتح قائمة الحساب الشخصي"
              aria-expanded={profileOpen}
              onClick={() => {
                setProfileOpen((open) => !open);
                setMenuOpen(false);
              }}
              className="
                group flex items-center
                gap-1.5
                rounded-full
                border border-white/40
                bg-white/10
                py-1
                pl-2
                pr-1
                transition-all duration-300
                hover:bg-white/20
                hover:shadow-lg
                active:scale-95

                sm:gap-2
                sm:py-1.5
                sm:pl-3
                sm:pr-1.5
              ">
              <span
                className="
                  flex
                  h-9 w-9
                  items-center
                  justify-center
                  overflow-hidden
                  rounded-full
                  border-2 border-white/80
                  bg-gradient-to-br
                  from-[#e8f5f4]
                  to-white
                  text-[#3A73AA]
                  shadow-[0_2px_10px_rgba(1,59,89,0.18)]
                  transition-all duration-300
                  group-hover:scale-105

                  sm:h-10 sm:w-10
                ">
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M5 21v-2a7 7 0 0 1 14 0v2" />
                </svg>
              </span>

              <span className="hidden text-right md:block">
                <span className="block text-sm font-bold leading-5">حسابي</span>

                <span className="block text-[11px] text-white/75">الملف الشخصي</span>
              </span>

              <svg
                viewBox="0 0 24 24"
                className={`
                  hidden
                  h-4 w-4
                  transition-transform
                  duration-300
                  md:block
                  ${profileOpen ? 'rotate-180' : ''}
                `}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* PROFILE MENU */}

            {profileOpen && (
              <div
                className="
                  absolute
                  left-0
                  top-[calc(100%+10px)]
                  z-[60]
                  w-[220px]
                  overflow-hidden
                  rounded-2xl
                  border border-[#dbe7e8]
                  bg-white
                  p-2
                  text-[#16384f]
                  shadow-[0_12px_35px_rgba(1,59,89,0.18)]
                  sm:w-[230px]
                ">
                <div className="border-b border-[#e8eeee] px-3 py-3">
                  <p className="text-sm font-bold">أهلًا بكِ 👋</p>

                  <p className="mt-1 text-xs text-[#78909c]">إدارة حسابك في بدّلها</p>
                </div>

                <Link
                  to="/profile"
                  onClick={() => setProfileOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-xl
                    px-3 py-3
                    text-sm font-medium
                    transition-colors
                    hover:bg-[#e8f5f4]
                    hover:text-[#287d80]
                  ">
                  <span>👤</span>
                  الملف الشخصي
                </Link>

                <Link
                  to="/my-products"
                  onClick={() => setProfileOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-xl
                    px-3 py-3
                    text-sm font-medium
                    transition-colors
                    hover:bg-[#e8f5f4]
                    hover:text-[#287d80]
                  ">
                  <span>📦</span>
                  إعلاناتي
                </Link>

                <Link
                  to="/"
                  onClick={() => setProfileOpen(false)}
                  className="
                    flex items-center gap-3
                    rounded-xl
                    px-3 py-3
                    text-sm font-medium
                    transition-colors
                    hover:bg-[#e8f5f4]
                    hover:text-[#287d80]
                  ">
                  <span>⚙️</span>
                  الإعدادات
                </Link>

                <div className="my-1 border-t border-[#e8eeee]" />

                <button
                  type="button"
                  onClick={() => {
                    setProfileOpen(false);
                    navigate('/home');
                  }}
                  className="
                    flex w-full
                    items-center gap-3
                    rounded-xl
                    px-3 py-3
                    text-sm font-semibold
                    text-red-500
                    transition-colors
                    hover:bg-red-50
                  ">
                  <span>↪</span>
                  تسجيل خروج
                </button>
              </div>
            )}
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}

          <div className="relative lg:hidden" ref={mobileRef}>
            <button
              type="button"
              aria-label="فتح القائمة"
              aria-expanded={mobileOpen}
              onClick={() => {
                setMobileOpen((open) => !open);
                setProfileOpen(false);
                setMenuOpen(false);
              }}
              className="
                flex h-10 w-10
                items-center justify-center
                rounded-full
                border border-white/40
                bg-white/10
                transition-all duration-300
                hover:bg-white/20
                active:scale-95

                sm:h-11 sm:w-11
              ">
              {mobileOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* ================= MOBILE MENU ================= */}

            {mobileOpen && (
              <div
                className="
                  absolute
                  left-0
                  top-[calc(100%+10px)]
                  z-[60]
                  w-[calc(100vw-24px)]
                  max-w-[360px]
                  overflow-hidden
                  rounded-2xl
                  border border-[#dbe7e8]
                  bg-white
                  p-2
                  text-[#16384f]
                  shadow-[0_12px_35px_rgba(1,59,89,0.18)]

                  sm:w-[350px]
                ">
                {/* Mobile navigation */}

                <div className="p-1">
                  {NAV.map((item, index) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={closeMobileMenu}
                      className={`
                        flex items-center
                        justify-between
                        rounded-xl
                        px-4 py-3
                        text-sm
                        transition-all duration-200
                        hover:bg-[#e8f5f4]
                        hover:text-[#287d80]
                        ${index === 0 ? 'font-bold text-[#287d80]' : 'font-medium'}
                      `}>
                      <span>{item.label}</span>

                      <span className="text-[#a4b8bd]">←</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Add Product */}

                <div className="border-t border-[#e8eeee] p-2">
                  <Link
                    to="/add-product"
                    onClick={closeMobileMenu}
                    className="
                      flex items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-l
                      from-[#4F9D9E]
                      to-[#3A73AA]
                      px-4 py-3
                      text-sm
                      font-bold
                      text-white
                      shadow-sm
                      transition-all duration-300
                      hover:shadow-md
                    ">
                    <svg
                      viewBox="0 0 24 24"
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                    إضافة منتج جديد
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
