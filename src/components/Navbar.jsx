// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import heroImage from '../assets/images/badelha2.png';

// function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 600) {
//         setIsScrolled(true);
//       } else {
//         setIsScrolled(false);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   return (
//     <header className="fixed top-0 left-0 w-full z-50">
//       <div
//         className={`
//           bg-[linear-gradient(90deg,#3A73AA_0%,#4F9D9E_100%)]
//           flex
//           gap-[5px]
//           items-center
//           px-[20px]
//           h-[80px]
//           sm:justify-between
//           transition-all
//           duration-300
//           ${isScrolled ? 'rounded-[50px] shadow-[0_0_5px_#ccc] m-[10px]' : ''}
//         `}>
//         {/* Menu Icon */}
//         <i className="fa-solid fa-bars block md:!hidden text-[30px] text-[#fff] cursor-pointer"></i>

//         {/* Logo */}
//         <Link to="/" className="group mb-4 flex items-center gap-3">
//           {/* Logo Icon */}
//           <span
//             className="
//       flex h-11 w-11 items-center justify-center
//       rounded-xl
//       border border-white/20
//       bg-white/15
//       text-white
//       shadow-sm
//       transition-all duration-500 ease-in-out
//       group-hover:rotate-12
//       group-hover:scale-110
//       group-hover:bg-white/25
//       group-hover:shadow-lg
//     ">
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               className="
//         h-6 w-6
//         transition-transform duration-500
//         group-hover:-rotate-12
//       "
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round">
//               <path d="M7 7h11l-3-3" />
//               <path d="M18 7l-3 3" />
//               <path d="M17 17H6l3 3" />
//               <path d="M6 17l3-3" />
//             </svg>
//           </span>

//           {/* Brand Name */}
//           <span
//             className="
//       text-3xl font-bold text-white
//       transition-all duration-300
//       group-hover:tracking-wide
//       group-hover:drop-shadow-md
//     ">
//             بدّلها
//           </span>
//         </Link>

//         {/* Links */}
//         <div>
//           <ul className="flex gap-[40px]">
//             <li>
//               <a
//                 href="#hero"
//                 className="text-[#fff] font-bold hover:text-[#C4C4C4] transition-all duration-300 hidden md:block">
//                 الرئيسية
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#about"
//                 className="text-[#C4C4C4] font-bold hover:text-[#fff] transition-all duration-300 hidden md:block">
//                 كيف تعمل
//               </a>
//             </li>
//             <li>
//               <a
//                 href="#market"
//                 className="text-[#C4C4C4] font-bold hover:text-[#fff] transition-all duration-300 hidden md:block">
//                 السوق
//               </a>
//             </li>

//             <li>
//               <a
//                 href=""
//                 className="text-[#C4C4C4] font-bold hover:text-[#fff] transition-all duration-300 hidden md:block">
//                 من نحن
//               </a>
//             </li>

//             <li>
//               <a
//                 href="#contact"
//                 className="text-[#C4C4C4] font-bold hover:text-[#fff] transition-all duration-300 hidden md:block">
//                 اتصل بنا
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* Actions */}
//         <div className="flex sm:gap-[10px] gap-[5px] items-center">
//           {/* Location */}
//           <div className="relative">
//             <i className="fa-solid fa-location-dot absolute sm:right-[15px] sm:top-[18px] top-[9px] right-[8px] text-[#fff] text-[12px]"></i>

//             <select
//               className="
//                 rounded-[50px]
//                 shadow-[0_0_5px_#ccc]
//                 sm:w-[150px]
//                 sm:h-[50px]
//                 w-[90px]
//                 h-[30px]
//                 text-[10px]
//                 sm:text-[15px]
//                 sm:px-[23px]
//                 px-[14px]
//                 py-[5px]
//                 hover:scale-[1.03]
//                 transition-all
//                 duration-300
//                 border
//                 border-gray-300
//                 outline-none
//                 text-[#fff]
//                 bg-transparent
//               ">
//               <option value="" className="text-black">
//                 اختر المنطقة
//               </option>

//               <option value="gaza" className="text-black">
//                 غزة
//               </option>

//               <option value="north-gaza" className="text-black">
//                 شمال غزة
//               </option>

//               <option value="deir-al-balah" className="text-black">
//                 دير البلح
//               </option>

//               <option value="khan-younis" className="text-black">
//                 خان يونس
//               </option>

//               <option value="rafah" className="text-black">
//                 رفح
//               </option>
//             </select>
//           </div>

//           {/* Add */}
//           <div
//             className="
//               flex
//               items-center
//               justify-between
//               hover:scale-[1.03]
//               transition-all
//               duration-300
//               border
//               border-[#ccc]
//               rounded-[50px]
//               shadow-[0_0_5px_#ccc]
//               sm:w-[150px]
//               sm:h-[50px]
//               w-[90px]
//               h-[30px]
//               text-[10px]
//               sm:text-[15px]
//               sm:px-[23px]
//               px-[14px]
//               py-[5px]
//               text-white
//               cursor-pointer
//             ">
//             <p>إضافة</p>

//             <i className="fa-solid fa-plus"></i>
//           </div>

//           {/* Login */}
//           <Link
//             to="/login"
//             className="
//               bg-white
//               sm:w-[150px]
//               sm:h-[50px]
//               w-[90px]
//               h-[30px]
//               text-[10px]
//               sm:text-[15px]
//               rounded-[50px]
//               shadow-[0_4px_15px_#ccc]
//               hover:bg-[linear-gradient(90deg,#3A73AA_0%,#4F9D9E_100%)]
//               transition-all
//               duration-300
//               hover:text-white
//               flex
//               items-center
//               justify-center
//               text-[#013B59]
//             ">
//             تسجيل دخول
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

// export default Navbar;

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [city, setCity] = useState('');
  const menuRef = useRef(null);

  // تأثير الهيدر عند النزول بالصفحة
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

  // إغلاق قائمة المناطق عند الضغط خارجها
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const headerButton =
    'inline-flex items-center justify-center gap-2 rounded-full ' +
    'border border-white/50 bg-white/10 px-4 py-2.5 ' +
    'text-sm font-semibold text-white transition-all duration-300 ' +
    'hover:bg-white/20 hover:shadow-md active:scale-95 ' +
    'focus-visible:outline-none focus-visible:ring-2 ' +
    'focus-visible:ring-white';

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
          relative mx-auto flex w-full items-center
          justify-between gap-6 px-5
          transition-all duration-300
          bg-gradient-to-l from-[#4F9D9E] to-[#3A73AA]
          text-white
          ${
            isScrolled
              ? 'max-w-[1450px] rounded-[30px] shadow-[0_8px_30px_rgba(1,59,89,0.18)]'
              : 'rounded-none'
          }
          min-h-[80px]
        `}>
        {/* الشعار */}
        <Link
          to="/"
          aria-label="بدّلها - الرئيسية"
          className="
            group flex shrink-0 items-center gap-3
            transition-all duration-300
            hover:-translate-y-0.5
          ">
          <span
            className="
              flex h-12 w-12 items-center justify-center
              rounded-2xl border border-white/30
              bg-white/15 shadow-sm
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
                h-7 w-7 transition-transform duration-500
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
              text-[28px] font-bold tracking-wide
              transition-all duration-300
              group-hover:tracking-wider
              group-hover:drop-shadow-md
            ">
            بدّلها
          </span>
        </Link>

        {/* روابط التنقل */}
        <nav
          aria-label="التنقل الرئيسي"
          className="
            hidden items-center gap-7
            lg:flex xl:gap-9
          ">
          {NAV.map((item, index) => (
            <Link
              key={item.label}
              to={item.href}
              className={`
                group relative whitespace-nowrap
                py-2 text-[15px] font-semibold
                transition-colors duration-300
                hover:text-white
                ${index === 0 ? 'text-white' : 'text-white/75'}
              `}>
              {item.label}

              <span
                className="
                  absolute bottom-0 right-0 h-[2px] w-0
                  rounded-full bg-white
                  transition-all duration-300
                  group-hover:w-full
                "
              />
            </Link>
          ))}
        </nav>

        {/* الأزرار */}
        <div
          className="
            flex shrink-0 items-center gap-2
            sm:gap-3
          ">
          {/* اختيار المنطقة */}
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              className={headerButton}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((open) => !open)}>
              <svg
                viewBox="0 0 24 24"
                className="h-[18px] w-[18px]"
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
                  h-4 w-4 transition-transform duration-300
                  ${menuOpen ? 'rotate-180' : ''}
                `}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="
                  absolute right-0 top-[calc(100%+12px)]
                  z-[60] min-w-[180px]
                  overflow-hidden rounded-2xl
                  border border-[#dbe7e8]
                  bg-white p-2 text-[#16384f]
                  shadow-[0_12px_35px_rgba(1,59,89,0.18)]
                  animate-in fade-in
                ">
                <p className="px-3 py-2 text-xs font-semibold text-[#78909c]">اختاري منطقتك</p>

                {CITIES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    role="menuitemradio"
                    aria-checked={city === item}
                    onClick={() => {
                      setCity(item);
                      setMenuOpen(false);
                    }}
                    className={`
                      flex w-full items-center justify-between
                      rounded-xl px-3 py-2.5
                      text-right text-sm
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

          {/* إضافة منتج */}
          <Link
            to="/add-product"
            className="
              hidden sm:inline-flex
              items-center justify-center gap-2
              rounded-full border border-white/70
              bg-white px-5 py-2.5
              text-sm font-bold text-[#287d80]
              shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#f0fbfa]
              hover:shadow-lg
              active:scale-95
            ">
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            إضافة منتج
          </Link>

          {/* تسجيل دخول بدل الملف الشخصي */}
          <Link
            to="/login"
            className="
              inline-flex items-center justify-center gap-2
              rounded-full bg-[#103f5b]
              px-4 py-2.5 sm:px-5
              text-sm font-bold text-white
              shadow-[0_4px_15px_rgba(1,40,65,0.2)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-white hover:text-[#164e70]
              hover:shadow-lg
              active:scale-95
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-white
            ">
            <svg
              viewBox="0 0 24 24"
              className="h-[18px] w-[18px]"
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
        </div>
      </div>
    </header>
  );
}

export default Navbar;
