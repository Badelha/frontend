import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const NAV = [
  { label: 'الرئيسية', href: '/' },
  { label: 'كيف تعمل', href: '/#about' },
  { label: 'السوق', href: '/market' },
  { label: 'من نحن', href: '/about' },
  { label: 'اتصل بنا', href: '/#contact' },
];

const CITIES = ['غزة', 'شمال غزة', 'دير البلح', 'خان يونس', 'رفح'];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cityMenuOpen, setCityMenuOpen] = useState(false);
  const [city, setCity] = useState('');

  const cityRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // =========================
  // Scroll
  // =========================
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

  // =========================
  // إغلاق القوائم عند الضغط خارجها
  // =========================
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cityRef.current && !cityRef.current.contains(event.target)) {
        setCityMenuOpen(false);
      }

      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setCityMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  // =========================
  // إغلاق القائمة عند اختيار رابط
  // =========================
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      dir="rtl"
      className={`
        fixed top-0 left-0 z-50 w-full
        transition-all duration-300
        ${isScrolled ? 'px-3 pt-2' : ''}
      `}>
      <div
        className={`
          relative mx-auto
          flex w-full items-center justify-between
          gap-3 px-4 sm:px-5 lg:px-6

          bg-gradient-to-l
          from-[#4F9D9E]
          to-[#3A73AA]

          text-white

          transition-all duration-300

          ${
            isScrolled
              ? 'max-w-[1450px] rounded-[30px] shadow-[0_8px_30px_rgba(1,59,89,0.18)]'
              : 'rounded-none'
          }

          min-h-[70px]
          sm:min-h-[76px]
          lg:min-h-[80px]
        `}>
        {/* ===================================== */}
        {/* LOGO */}
        {/* ===================================== */}

        <Link
          to="/"
          onClick={closeMobileMenu}
          aria-label="بدّلها - الرئيسية"
          className="
            group flex shrink-0
            items-center gap-2 sm:gap-3
            transition-all duration-300
            hover:-translate-y-0.5
          ">
          <span
            className="
              flex
              h-10 w-10
              sm:h-11 sm:w-11
              lg:h-12 lg:w-12
              items-center justify-center
              rounded-xl sm:rounded-2xl
              border border-white/30
              bg-white/15
              shadow-sm
              transition-all duration-500

              group-hover:rotate-6
              group-hover:scale-110
              group-hover:bg-white/25
              group-hover:shadow-lg
            ">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="
                h-5 w-5
                sm:h-6 sm:w-6
                lg:h-7 lg:w-7
                transition-transform duration-500
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
              sm:text-[25px]
              lg:text-[28px]
              font-bold
              tracking-wide
              transition-all duration-300
              group-hover:tracking-wider
              group-hover:drop-shadow-md
            ">
            بدّلها
          </span>
        </Link>

        {/* ===================================== */}
        {/* DESKTOP NAVIGATION */}
        {/* ===================================== */}

        <nav
          aria-label="التنقل الرئيسي"
          className="
            hidden
            lg:flex
            items-center
            gap-6
            xl:gap-9
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
                xl:text-[15px]

                font-semibold

                transition-colors duration-300

                hover:text-white

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

        {/* ===================================== */}
        {/* RIGHT ACTIONS */}
        {/* ===================================== */}

        <div
          className="
            flex
            shrink-0
            items-center
            gap-1.5
            sm:gap-2
            lg:gap-3
          ">
          {/* ================================= */}
          {/* CITY */}
          {/* ================================= */}

          <div className="relative" ref={cityRef}>
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={cityMenuOpen}
              onClick={() => setCityMenuOpen((open) => !open)}
              className="
                inline-flex
                items-center
                justify-center
                gap-1.5

                rounded-full
                border
                border-white/40

                bg-white/10

                px-2.5
                py-2

                sm:px-3
                sm:py-2.5

                lg:px-4

                text-white

                transition-all duration-300

                hover:bg-white/20
                hover:shadow-md

                active:scale-95

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
              ">
              {/* Location Icon */}

              <svg
                viewBox="0 0 24 24"
                className="
                  h-4 w-4
                  sm:h-[18px] sm:w-[18px]
                "
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>

              {/* اسم المنطقة */}

              <span
                className="
                  hidden
                  md:inline
                  text-xs
                  lg:text-sm
                  font-semibold
                  whitespace-nowrap
                ">
                {city || 'المنطقة'}
              </span>

              {/* Arrow */}

              <svg
                viewBox="0 0 24 24"
                className={`
                  h-3.5 w-3.5
                  sm:h-4 sm:w-4
                  transition-transform duration-300
                  ${cityMenuOpen ? 'rotate-180' : ''}
                `}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* CITY DROPDOWN */}

            {cityMenuOpen && (
              <div
                role="menu"
                className="
                  absolute
                  left-0
                  md:right-0
                  md:left-auto

                  top-[calc(100%+10px)]

                  z-[70]

                  min-w-[175px]
                  sm:min-w-[190px]

                  overflow-hidden
                  rounded-2xl

                  border
                  border-[#dbe7e8]

                  bg-white

                  p-2

                  text-[#16384f]

                  shadow-[0_12px_35px_rgba(1,59,89,0.18)]
                ">
                <p
                  className="
                    px-3
                    py-2
                    text-xs
                    font-semibold
                    text-[#78909c]
                  ">
                  اختاري منطقتك
                </p>

                {CITIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="menuitemradio"
                    aria-checked={city === item}
                    onClick={() => {
                      setCity(item);
                      setCityMenuOpen(false);
                    }}
                    className={`
                      flex
                      w-full
                      items-center
                      justify-between

                      rounded-xl

                      px-3
                      py-2.5

                      text-right
                      text-sm

                      transition-all duration-200

                      hover:bg-[#e8f5f4]
                      hover:text-[#287d80]

                      ${city === item ? 'bg-[#e8f5f4] font-bold text-[#287d80]' : ''}
                    `}>
                    {item}

                    {city === item && <span className="text-[#4F9D9E]">✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ================================= */}
          {/* ADD PRODUCT */}
          {/* ================================= */}

          <Link
            to="/add-product"
            className="
              hidden
              sm:inline-flex

              items-center
              justify-center
              gap-2

              rounded-full

              border
              border-white/70

              bg-white

              px-3
              py-2

              md:px-4
              md:py-2.5

              lg:px-5

              text-xs
              md:text-sm

              font-bold

              text-[#287d80]

              shadow-sm

              transition-all duration-300

              hover:-translate-y-0.5
              hover:bg-[#f0fbfa]
              hover:shadow-lg

              active:scale-95
            ">
            <svg
              viewBox="0 0 24 24"
              className="
                h-4 w-4
                md:h-[18px]
                md:w-[18px]
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>

            <span>إضافة منتج</span>
          </Link>

          {/* ================================= */}
          {/* LOGIN */}
          {/* ================================= */}

          <Link
            to="/login"
            className="
              inline-flex
              items-center
              justify-center
              gap-1.5
              sm:gap-2

              rounded-full

              bg-[#103f5b]

              px-3
              py-2

              sm:px-4
              sm:py-2.5

              lg:px-5

              text-xs
              sm:text-sm

              font-bold
              text-white

              shadow-[0_4px_15px_rgba(1,40,65,0.2)]

              transition-all duration-300

              hover:-translate-y-0.5

              hover:bg-white
              hover:text-[#164e70]

              hover:shadow-lg

              active:scale-95

              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
            ">
            <svg
              viewBox="0 0 24 24"
              className="
                h-4 w-4
                sm:h-[18px]
                sm:w-[18px]
              "
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <path d="m10 17 5-5-5-5" />
              <path d="M15 12H3" />
            </svg>

            <span className="hidden sm:inline">تسجيل دخول</span>

            <span className="sm:hidden">دخول</span>
          </Link>

          {/* ================================= */}
          {/* MOBILE MENU BUTTON */}
          {/* ================================= */}

          <div
            ref={mobileMenuRef}
            className="
              relative
              lg:hidden
            ">
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="
                flex
                h-10 w-10
                sm:h-11 sm:w-11

                items-center
                justify-center

                rounded-xl

                border
                border-white/30

                bg-white/10

                text-white

                transition-all duration-300

                hover:bg-white/20

                active:scale-95

                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-white
              ">
              {mobileMenuOpen ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round">
                  <path d="M6 6l12 12" />
                  <path d="M18 6L6 18" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round">
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </svg>
              )}
            </button>

            {/* ================================= */}
            {/* MOBILE MENU */}
            {/* ================================= */}

            {mobileMenuOpen && (
              <div
                className="
                  absolute
                  left-0

                  top-[calc(100%+12px)]

                  z-[80]

                  w-[280px]
                  max-w-[calc(100vw-24px)]

                  overflow-hidden

                  rounded-2xl

                  border
                  border-[#dbe7e8]

                  bg-white

                  p-3

                  text-[#16384f]

                  shadow-[0_15px_40px_rgba(1,59,89,0.2)]
                ">
                {/* عنوان القائمة */}

                <div
                  className="
                    mb-2
                    flex
                    items-center
                    justify-between
                    border-b
                    border-[#edf2f3]
                    px-2
                    pb-3
                  ">
                  <span
                    className="
                      text-sm
                      font-bold
                      text-[#3A73AA]
                    ">
                    القائمة الرئيسية
                  </span>

                  <span
                    className="
                      rounded-full
                      bg-[#e8f5f4]
                      px-2
                      py-1
                      text-[10px]
                      font-bold
                      text-[#4F9D9E]
                    ">
                    بدّلها
                  </span>
                </div>

                {/* روابط القائمة */}

                <nav
                  className="
                    flex
                    flex-col
                    gap-1
                  ">
                  {NAV.map((item, index) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={closeMobileMenu}
                      className="
                        flex
                        items-center
                        justify-between

                        rounded-xl

                        px-3
                        py-3

                        text-sm
                        font-semibold

                        text-[#36566b]

                        transition-all duration-200

                        hover:bg-[#e8f5f4]
                        hover:text-[#287d80]

                        active:scale-[0.98]
                      ">
                      <span>{item.label}</span>

                      <span
                        className="
                          text-[#4F9D9E]
                          opacity-0
                          transition-all
                          group-hover:opacity-100
                        ">
                        ←
                      </span>
                    </Link>
                  ))}
                </nav>

                {/* خط */}

                <div
                  className="
                    my-2
                    h-px
                    bg-[#edf2f3]
                  "
                />

                {/* إضافة منتج للموبايل */}

                <Link
                  to="/add-product"
                  onClick={closeMobileMenu}
                  className="
                    flex
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    border
                    border-[#4F9D9E]

                    bg-[#e8f5f4]

                    px-4
                    py-3

                    text-sm
                    font-bold

                    text-[#287d80]

                    transition-all duration-300

                    hover:bg-[#d9efed]
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
                  إضافة منتج
                </Link>

                {/* تسجيل الدخول للموبايل */}

                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="
                    mt-2

                    flex
                    items-center
                    justify-center
                    gap-2

                    rounded-xl

                    bg-[#103f5b]

                    px-4
                    py-3

                    text-sm
                    font-bold

                    text-white

                    shadow-sm

                    transition-all duration-300

                    hover:bg-[#164e70]
                  ">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <path d="m10 17 5-5-5-5" />
                    <path d="M15 12H3" />
                  </svg>
                  تسجيل دخول
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
