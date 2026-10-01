import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// أنواع المشاكل اللي بتظهر بالقائمة
const problemTypes = [
  'احتيال أو نصب',
  'غرض مخالف أو ممنوع',
  'إساءة أو مضايقة من مستخدم',
  'مشكلة تقنية بالموقع',
  'شي ثاني',
];

export default function Report() {
  // كل خانة بالفورم إلها state
  const [type, setType] = useState('');
  const [link, setLink] = useState('');
  const [details, setDetails] = useState('');
  const [sent, setSent] = useState(false); // هل انبعت البلاغ؟

  function handleSubmit(e) {
    e.preventDefault(); // بيمنع الصفحة تعمل ريفريش

    // هون بتبعتي البلاغ للباك إند، شيلي // وعدلي المسار:
    // fetch("/api/reports", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ type, link, details }),
    // });

    setSent(true);
  }

  // بعد الإرسال بنعرض رسالة الشكر بدل الفورم
  if (sent) {
    return (
      <div dir="rtl" className="mx-auto max-w-2xl px-5 py-16 text-center text-[#16324a]">
        <div className="text-6xl">✅</div>
        <h1 className="mt-3 text-3xl font-black">وصلنا بلاغك</h1>
        <p className="mt-2 text-[#4f6b7e]">
          شكراً إلك. رح نراجعه ونتواصل معك لو احتجنا معلومات إضافية.
        </p>
        <a href="/reportaproblem" className="mt-4 inline-block font-bold text-[#2f6f8f] underline">
          رجوع لمركز المساعدة
        </a>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div dir="rtl" className="mx-auto max-w-4xl px-5 pb-12 py-[100px] text-[#16324a]">
        {/* الجزء الأزرق الكبير */}
        <div className="my-7 flex flex-col items-center gap-6 rounded-3xl bg-[#2f6f8f] p-8 text-center text-white sm:flex-row sm:text-right">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[#ffc93c] text-5xl font-bold text-[#16324a]">
            !
          </div>
          <div>
            <h1 className="text-3xl font-black">صادفت مشكلة؟</h1>
            <p className="mt-1 text-[#dceef5]">احكيلنا شو صار، وبنراجعه بأسرع وقت.</p>
          </div>
        </div>

        {/* الفورم */}
        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-3xl border-2 border-[#d5e6ee] bg-white p-6">
          <label className="grid gap-1 font-bold">
            نوع المشكلة
            <select
              required
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="rounded-xl border-2 border-[#d5e6ee] bg-[#f4fafc] px-3 py-2.5 font-normal outline-none focus:border-[#2f6f8f]">
              <option value="">اختار...</option>
              {problemTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-1 font-bold">
            رابط الغرض أو اسم المستخدم (اختياري)
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="مثال: badil.com/item/123"
              className="rounded-xl border-2 border-[#d5e6ee] bg-[#f4fafc] px-3 py-2.5 font-normal outline-none focus:border-[#2f6f8f]"
            />
          </label>

          <label className="grid gap-1 font-bold">
            شو صار؟
            <textarea
              required
              minLength={15}
              rows={5}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="اكتب التفاصيل: شو صار، ومتى، وشو الاتفاق اللي كان بينكم؟"
              className="resize-y rounded-xl border-2 border-[#d5e6ee] bg-[#f4fafc] px-3 py-2.5 font-normal outline-none focus:border-[#2f6f8f]"
            />
          </label>

          <button
            type="submit"
            className="justify-self-start rounded-2xl bg-[#ff6b5a] px-7 py-3 font-extrabold text-white hover:brightness-110">
            إرسال البلاغ
          </button>
        </form>

        {/* تنبيه للخطر */}
        <div className="mt-6 rounded-2xl bg-[#ffc93c] p-5 font-semibold text-[#3a2b00]">
          لو في خطر مباشر على سلامتك، تواصل مع الجهات المختصة أولاً قبل ما تبلّغنا.
        </div>
      </div>
      <Footer />
    </>
  );
}
