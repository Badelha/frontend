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
      </div>
    </section>
  );
}

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
