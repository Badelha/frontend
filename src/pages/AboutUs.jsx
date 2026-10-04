import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F6FBFD] px-4 py-16 text-[#013B59]">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[28px] bg-white p-8 shadow-[0_8px_30px_rgba(1,59,89,0.08)] md:p-12">
          <p className="mb-4 text-sm font-bold tracking-[0.2em] text-[#4F9D9E]">من نحن</p>
          <h1 className="text-3xl font-black md:text-5xl">منصة بدّلها تربط المجتمع بأسهل طريقة للتبادل والبيع</h1>
          <p className="mt-6 text-lg leading-8 text-[#355a6d]">
            بدّلها تم تصميمها لتسهيل تبادل السلع والخدمات داخل المجتمع الفلسطيني، مع التركيز على الثقة، السلامة، والسهولة في الوصول إلى المنتجات والاحتياجات اليومية.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              ['سهولة الاستخدام', 'واجهة بسيطة ووضوح كامل في التصفح والبحث عن المنتجات.'],
              ['الثقة والمصداقية', 'نظام تفاعلي يدعم التقييمات والطلبات والتحقق من الحسابات.'],
              ['التنمية المجتمعية', 'دعم احتياجات أصحاب السلع بشكل مباشر وسريع داخل المجتمع.'],
            ].map(([title, text]) => (
              <div key={title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="/home" className="rounded-full bg-[#013B59] px-6 py-3 font-bold text-white">العودة للرئيسية</Link>
            <Link to="/register" className="rounded-full border border-[#013B59] px-6 py-3 font-bold text-[#013B59]">إنشاء حساب</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
