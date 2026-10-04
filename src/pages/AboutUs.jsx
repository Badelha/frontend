<<<<<<< HEAD
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
=======
//
import { useEffect, useRef, useState } from 'react';
import {
  Car,
  Smartphone,
  Shirt,
  Sofa,
  Briefcase,
  Gamepad2,
  Repeat2,
  ShieldCheck,
  Handshake,
  Recycle,
} from 'lucide-react';

/* ألوان الموقع:
   brand  #2f6f8f  (الأزرق)
   accent #4F9D9E  (الأخضر المزرق)
   ink    #12313d  (للنصوص)
   mist   #f2f8fa  (خلفية فاتحة)
   line   #cfe2e8  (الخطوط)
*/

/* ---------- البيانات ---------- */

const ORBIT_ITEMS = [
  {
    Icon: Car,
    size: 30,
    color: 'text-[#4F9D9E]',
    position: 'top-[-30px] left-1/2 -translate-x-1/2',
  },
  { Icon: Smartphone, size: 28, color: 'text-[#2f6f8f]', position: 'top-[15%] right-[-25px]' },
  { Icon: Shirt, size: 28, color: 'text-[#4F9D9E]', position: 'bottom-[15%] right-[-25px]' },
  {
    Icon: Sofa,
    size: 28,
    color: 'text-[#2f6f8f]',
    position: 'bottom-[-30px] left-1/2 -translate-x-1/2',
  },
  { Icon: Briefcase, size: 28, color: 'text-[#4F9D9E]', position: 'bottom-[15%] left-[-25px]' },
  { Icon: Gamepad2, size: 28, color: 'text-[#2f6f8f]', position: 'top-[15%] left-[-25px]' },
];

const VALUES = [
  {
    Icon: Handshake,
    title: 'تبادل عادل',
    text: 'كل واحد بيحدد شو بدو وشو بقدر يعطي، والاتفاق بيصير بالتراضي بين الطرفين.',
  },
  {
    Icon: ShieldCheck,
    title: 'أمان وثقة',
    text: 'ملفات شخصية واضحة وتقييمات وإمكانية الإبلاغ عن أي مخالفة.',
  },
  {
    Icon: Recycle,
    title: 'استفادة أكثر',
    text: 'الغرض اللي ما عاد بتحتاجه ممكن يكون هو اللي بدور عليه غيرك.',
  },
];

/* ---------- الصفحة ---------- */

export default function AboutPage() {
  return (
    <div
      dir="rtl"
      className="min-h-screen bg-white text-[#12313d]"
      style={{ fontFamily: "'Readex Pro', Tahoma, sans-serif" }}>
      <PageStyles />
      <Hero />
      <Story />
      <VisionMission />
      <Values />
      <CallToAction />
    </div>
  );
}

/* ---------- الأقسام ---------- */

function Hero() {
  return (
    <section className="bg-[#2f6f8f] text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
        <div>
          <h1
            className="fade-up text-4xl font-bold leading-tight md:text-5xl"
            style={{ animationDelay: '0.1s' }}>
            كل غرض إله فرصة ثانية
          </h1>

          <p
            className="fade-up mt-6 max-w-md text-lg font-light leading-9 text-white/85"
            style={{ animationDelay: '0.4s' }}>
            بادل منصة مقايضة وبيع وشراء، بتوصّل اللي عنده شي زيادة باللي بدور عليه.
          </p>

          <div className="fade-up mt-9 flex flex-wrap gap-3" style={{ animationDelay: '0.7s' }}>
            <a
              href="/market"
              className="rounded-lg bg-white px-7 py-3 font-semibold text-[#2f6f8f] transition hover:bg-[#f2f8fa]">
              تصفح السوق
            </a>
            <a
              href="/how-it-works"
              className="rounded-lg border border-white/40 px-7 py-3 font-semibold transition hover:bg-white/10">
              كيف تعمل المنصة
            </a>
          </div>
        </div>

        <OrbitRing />
>>>>>>> origin/develop
      </div>
    </section>
  );
}
<<<<<<< HEAD
=======

function Story() {
  return (
    <section className="bg-[#f2f8fa]">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-20 md:grid-cols-[1fr_2fr]">
        <Reveal from="right">
          <h2 className="text-3xl font-bold text-[#2f6f8f]">من نحن</h2>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="space-y-5 text-lg font-light leading-9 text-[#12313d]/80">
            <p>
              بدأت الفكرة من سؤال بسيط: ليش نرمي أو نخزّن أغراض ممكن تفيد غيرنا؟ فعملنا مكان بيجمع
              الناس اللي عندهم شي زيادة مع الناس اللي بدورو عليه.
            </p>
            <p>
              من سيارات وموبايلات، لملابس وأثاث وألعاب وخدمات، كل شي إله مكان عنا، وكل صفقة بتتم
              بشفافية واحترام.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VisionMission() {
  return (
    <section className="mx-auto grid max-w-6xl px-6 py-20 md:grid-cols-2">
      <Reveal from="right">
        <div className="md:pe-12">
          <h2 className="text-2xl font-bold text-[#2f6f8f]">رؤيتنا</h2>
          <p className="mt-4 text-lg font-light leading-9 text-[#12313d]/80">
            نكون أول مكان بيفكر فيه الناس لما بدهم يبدّلوا أو يبيعوا أو يشتروا، ضمن مجتمع بيثق
            ببعضه.
          </p>
        </div>
      </Reveal>

      <Reveal from="left" delay={0.2}>
        <div className="mt-10 border-[#cfe2e8] md:mt-0 md:border-s md:ps-12">
          <h2 className="text-2xl font-bold text-[#4F9D9E]">رسالتنا</h2>
          <p className="mt-4 text-lg font-light leading-9 text-[#12313d]/80">
            نسهّل التبادل بين الناس بمنصة واضحة وآمنة، ونعطي كل غرض فرصة ثانية بدل ما يروح هدر.
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Values() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <h2 className="mb-6 text-3xl font-bold text-[#2f6f8f]">شو بيميزنا</h2>

      <div className="divide-y divide-[#cfe2e8] border-y border-[#cfe2e8]">
        {VALUES.map(({ Icon, title, text }, index) => (
          <Reveal key={title} delay={index * 0.15}>
            <div className="grid items-center gap-4 py-8 md:grid-cols-[auto_1fr_2fr] md:gap-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4F9D9E]/10 text-[#4F9D9E]">
                <Icon size={26} />
              </div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="font-light leading-8 text-[#12313d]/75">{text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CallToAction() {
  return (
    <section className="bg-[#4F9D9E] px-6 py-16 text-center text-[#12313d]">
      <h2 className="text-3xl font-bold">جاهز تبدّل؟</h2>
      <p className="mt-3 text-lg">انشر أول إعلان إلك وشوف شو بتلاقي.</p>
      <a
        href="/market"
        className="mt-8 inline-block rounded-lg bg-[#12313d] px-8 py-3 font-semibold text-white transition hover:bg-[#2f6f8f]">
        تصفح السوق
      </a>
    </section>
  );
}

/* ---------- عناصر صغيرة ---------- */

// الحلقة المتحركة
function OrbitRing() {
  return (
    <div className="flex h-[340px] items-center justify-center sm:h-[420px]">
      <div className="relative flex h-[400px] w-[400px] scale-[0.8] items-center justify-center sm:scale-100">
        {/* الدائرة الخارجية */}
        <div className="absolute h-[330px] w-[330px] animate-[spin_25s_linear_infinite] rounded-full border border-dashed border-white/40 motion-reduce:animate-none" />

        {/* الأيقونات (بتلف مع الحلقة) */}
        <div className="absolute h-[330px] w-[330px] animate-[spin_18s_linear_infinite] motion-reduce:animate-none">
          {ORBIT_ITEMS.map(({ Icon, size, color, position }, index) => (
            <div key={index} className={'absolute ' + position}>
              {/* بتلف عكس الحلقة عشان تضل الأيقونة مستقيمة */}
              <div
                className={
                  'flex h-[65px] w-[65px] animate-[spin_18s_linear_infinite_reverse] items-center justify-center rounded-full bg-white shadow-lg motion-reduce:animate-none ' +
                  color
                }>
                <Icon size={size} />
              </div>
            </div>
          ))}
        </div>

        {/* الدائرة الوسطى */}
        <div className="relative z-10 flex h-[105px] w-[105px] animate-pulse items-center justify-center rounded-full bg-[#4F9D9E] shadow-xl ring-8 ring-white/20 motion-reduce:animate-none">
          <Repeat2
            size={45}
            color="white"
            className="animate-[spin_4s_linear_infinite] motion-reduce:animate-none"
          />
        </div>
      </div>
    </div>
  );
}

// بتحرك أي شي جواتها أول ما يظهر عالشاشة
const START_POSITION = {
  up: 'translate-y-8',
  right: 'translate-x-12',
  left: '-translate-x-12',
};

function Reveal({ children, from = 'up', delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={
        'transition-all duration-700 ease-out motion-reduce:transition-none ' +
        (visible
          ? 'translate-x-0 translate-y-0 opacity-100'
          : 'opacity-0 motion-reduce:opacity-100 ' + START_POSITION[from])
      }>
      {children}
    </div>
  );
}

// الخط وحركة ظهور النص
function PageStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@300;400;600;700&display=swap');

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      .fade-up { opacity: 0; animation: fadeUp 0.8s ease-out forwards; }

      @media (prefers-reduced-motion: reduce) {
        .fade-up { animation: none; opacity: 1; }
      }
    `}</style>
  );
}
>>>>>>> origin/develop
