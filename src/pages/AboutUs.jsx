import { useEffect, useRef, useState } from 'react';

/* =========================================================
   STATS
========================================================= */

const STATS = [
  {
    label: 'مقايضة ناجحة',
    value: 735,
    bg: '#1BA89D',
  },
  {
    label: 'عضو موثوق',
    value: 250,
    bg: '#127A72',
  },
  {
    label: 'سلعة متاحة',
    value: 700,
    bg: '#2C6FA6',
  },
];

/* =========================================================
   EXCHANGE ITEMS
========================================================= */

const EXCHANGE_ITEMS = [
  {
    type: 'car',
    position: 'right-[7%] top-[9%]',
    color: '#127A72',
  },
  {
    type: 'phone',
    position: 'left-[7%] top-[9%]',
    color: '#C76B4A',
  },
  {
    type: 'tool',
    position: 'right-[-1%] top-[43%]',
    color: '#C39A3B',
  },
  {
    type: 'furniture',
    position: 'bottom-[17%] right-[3%]',
    color: '#127A72',
  },
  {
    type: 'box',
    position: 'bottom-[17%] left-[3%]',
    color: '#C76B4A',
  },
  {
    type: 'user',
    position: 'bottom-[0%] left-1/2 -translate-x-1/2',
    color: '#C39A3B',
  },
];

/* =========================================================
   COUNT UP HOOK
========================================================= */

function useCountUp(target, start) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame;

    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);

      setCount(Math.floor(progress * target));

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [start, target]);

  return count;
}

/* =========================================================
   EXCHANGE ICON
========================================================= */

function ExchangeIcon({ type }) {
  const iconClass = 'h-7 w-7 sm:h-8 sm:w-8';

  switch (type) {
    case 'car':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={iconClass}>
          <path d="M3 13h2l2-5h10l2 5h2v5h-2a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H3v-5Z" />
        </svg>
      );

    case 'phone':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={iconClass}>
          <rect x="6" y="3" width="12" height="18" rx="2" />
          <path d="M10 7h4" />
        </svg>
      );

    case 'tool':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={iconClass}>
          <path d="M20.4 14.5 16 10 6.5 19.5 3 21l1.5-3.5L14 8l4.4-4.4a2.1 2.1 0 0 1 3 3Z" />
        </svg>
      );

    case 'furniture':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={iconClass}>
          <path d="M4 4h16v4H4zM4 12h10v8H4zM17 12h3v8h-3z" />
        </svg>
      );

    case 'box':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={iconClass}>
          <path d="M3 12v-2a2 2 0 0 1 2-2h4l2-3h2l2 3h4a2 2 0 0 1 2 2v2" />
          <path d="M3 12h18v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6Z" />
        </svg>
      );

    case 'user':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className={iconClass}>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
        </svg>
      );

    default:
      return null;
  }
}

/* =========================================================
   EXCHANGE ITEM
========================================================= */

function ExchangeItem({ item }) {
  return (
    <div
      className={`
        absolute
        ${item.position}
        flex
        h-[58px]
        w-[58px]
        items-center
        justify-center
        rounded-full
        bg-white
        shadow-[0_8px_25px_rgba(14,59,55,0.12)]
        animate-[spin_18s_linear_infinite_reverse]
        sm:h-[64px]
        sm:w-[64px]
      `}
      style={{
        color: item.color,
      }}>
      <ExchangeIcon type={item.type} />
    </div>
  );
}

/* =========================================================
   EXCHANGE ANIMATION
========================================================= */

function ExchangeAnimation() {
  return (
    <div
      className="
        flex
        w-full
        items-center
        justify-center
      ">
      <div
        className="
          relative
          h-[290px]
          w-[290px]
          sm:h-[350px]
          sm:w-[350px]
          lg:h-[400px]
          lg:w-[400px]
        ">
        {/* Outer Orbit */}

        <div
          className="
            absolute
            inset-[7%]
            rounded-full
            border-[1.5px]
            border-dashed
            border-[#A9DCD5]
          "
        />

        {/* Inner Orbit */}

        <div
          className="
            absolute
            inset-[20%]
            rounded-full
            border
            border-[#D2ECE8]
          "
        />

        {/* Rotating Items */}

        <div
          className="
            absolute
            inset-0
            animate-[spin_18s_linear_infinite]
          ">
          {EXCHANGE_ITEMS.map((item) => (
            <ExchangeItem key={item.type} item={item} />
          ))}
        </div>

        {/* Center Exchange */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            z-20
            flex
            h-[78px]
            w-[78px]
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#3A73AA]
            to-[#127A72]
            shadow-[0_15px_35px_rgba(18,122,114,0.25)]
            animate-pulse
            sm:h-[86px]
            sm:w-[86px]
          ">
          <svg viewBox="0 0 24 24" fill="none" className="h-10 w-10 text-white">
            <path
              d="M7 7h11l-3-3"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            <path
              d="M18 17H7l3 3"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   STAT BLOCK
========================================================= */

function StatBlock({ stat, start }) {
  const count = useCountUp(stat.value, start);

  return (
    <div
      className="
        min-w-[150px]
        flex-1
        px-3
        py-[18px]
        text-center
        text-white
      "
      style={{
        backgroundColor: stat.bg,
      }}>
      <b
        className="
          block
          text-[1.5rem]
          font-extrabold
        "
        style={{
          fontFamily: "'Tajawal', sans-serif",
        }}>
        +{count.toLocaleString('ar-EG')}
      </b>

      <span className="text-[0.82rem] opacity-90">{stat.label}</span>
    </div>
  );
}

/* =========================================================
   HERO SECTION
========================================================= */

export default function HeroSection() {
  const rowRef = useRef(null);
  const [inView, setInView] = useState(false);

  /* =======================================================
     STATS OBSERVER
  ======================================================= */

  useEffect(() => {
    const element = rowRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <section
      dir="rtl"
      className="
        overflow-hidden
        bg-gradient-to-br
        from-[#F3FBF9]
        to-[#EAF7F4]
        px-6
        py-16
        sm:py-20
        lg:px-10
        lg:py-20
      ">
      <div
        className="
          mx-auto
          flex
          max-w-[1080px]
          flex-col
          items-center
          gap-12
          lg:flex-row-reverse
          lg:gap-16
        ">
        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            w-full
            flex-1
            text-center
            lg:text-right
          ">
          {/* Heading */}

          <h1
            className="
              mb-[22px]
              text-[2.1rem]
              font-extrabold
              text-[#0E3B37]
              sm:text-[2.4rem]
              lg:text-[2.8rem]
            "
            style={{
              fontFamily: "'Tajawal', sans-serif",
            }}>
            من نحن
          </h1>

          {/* Description */}

          <p
            className="
              mb-7
              max-w-[56ch]
              text-[1rem]
              leading-[2]
              text-[#5B7A74]
              sm:text-[1.05rem]
            ">
            نحن في منصة "بدلها" نعمل على حل مشكلة السيولة النقدية عن طريق تقديم منصة آمنة للتبادل.
            نسعى لإعطاء قيمة جديدة لكل منتج وكل قطعة زادت عن حاجة صاحبها، ونؤمن بأهمية الأمان
            والسهولة في الاستخدام.
          </p>

          {/* Features */}

          <div
            className="
              mb-9
              flex
              flex-wrap
              justify-center
              gap-3.5
              lg:justify-start
            ">
            {['حسابات موثقة', 'تبادل مجاني', 'دردشة آمنة'].map((label) => (
              <span
                key={label}
                className="
                  rounded-full
                  border
                  border-[#DCEFEA]
                  bg-white
                  px-5
                  py-2.5
                  text-[0.9rem]
                  font-semibold
                  text-[#127A72]
                  shadow-[0_4px_15px_rgba(14,59,55,0.04)]
                ">
                {label}
              </span>
            ))}
          </div>

          {/* Stats */}

          <div
            ref={rowRef}
            className="
              flex
              flex-wrap
              overflow-hidden
              rounded-2xl
              shadow-[0_10px_30px_-14px_rgba(14,59,55,0.25)]
            ">
            {STATS.map((stat) => (
              <StatBlock key={stat.label} stat={stat} start={inView} />
            ))}
          </div>
        </div>

        {/* =================================================
            EXCHANGE ANIMATION
        ================================================= */}

        <div
          className="
            flex
            w-full
            flex-1
            items-center
            justify-center
            lg:w-auto
          ">
          <ExchangeAnimation />
        </div>
      </div>
    </section>
  );
}
