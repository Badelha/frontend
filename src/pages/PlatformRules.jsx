// صفحة قوانين المنصة (بسيطة وما فيها state)
// لو بدك تغيري أي نص، عدليه بالمصفوفات فوق بس
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const allowed = [
  'تعرض أغراض مستعملة أو جديدة تملكها فعلاً',
  'تكتب وصف صادق وتحط صور حقيقية إلك',
  'تتفاوض باحترام وتلتزم بوعدك',
  'تقيّم الطرف الثاني بعد ما تخلص الصفقة',
];

const forbidden = [
  'الاحتيال، أو أخذ مصاري بدون تسليم غرض',
  'صور منسوخة أو أوصاف مضللة',
  'الشتم أو التهديد أو المضايقة',
  'فتح حسابات وهمية أو متعددة للتحايل',
];

const bannedItems = [
  'المسروقات أو أي شي مصدره غير قانوني',
  'الأسلحة والمخدرات والمواد الخطرة',
  'الأدوية والمنتجات الطبية اللي بتحتاج ترخيص',
  'الحيوانات الحية والمنتجات المقلّدة',
  'أي محتوى مسيء أو مخالف للقانون',
];

const steps = [
  { icon: '👋', title: 'تنبيه', text: 'على المخالفة الأولى البسيطة بنبعت تحذير ونشرح السبب.' },
  { icon: '⏸️', title: 'تقييد مؤقت', text: 'لو تكرر الشي، منوقف النشر أو المراسلة لفترة.' },
  {
    icon: '🚫',
    title: 'إغلاق الحساب',
    text: 'بالاحتيال أو الإساءة الشديدة، بنغلق الحساب نهائياً.',
  },
];

export default function Rules() {
  return (
    <>
      <div dir="rtl" className="mx-auto max-w-4xl px-5 pb-12  py-[100px] text-[#16324a]">
        {/* الجزء الأزرق الكبير */}
        <div className="my-7 flex flex-col items-center gap-6 rounded-3xl bg-[#2f6f8f] p-8 text-center text-white sm:flex-row sm:text-right">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[#ffc93c] text-5xl">
            ⚖️
          </div>
          <div>
            <h1 className="text-3xl font-black">قوانين بادل</h1>
            <p className="mt-1 text-[#dceef5]">شوية قواعد بسيطة بتخلّي التبادل عادل وآمن للكل.</p>
          </div>
        </div>

        {/* مسموح وممنوع جنب بعض */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border-2 border-[#7fd8be] bg-white p-5">
            <span className="rounded-full bg-[#7fd8be] px-3 text-sm font-bold text-[#0d3a2e]">
              مسموح
            </span>
            <h2 className="mb-2 mt-2 text-xl font-extrabold">شو بتعمل على بادل</h2>
            <ul className="space-y-1 pr-5 text-[#4f6b7e]">
              {allowed.map((item) => (
                <li key={item} className="list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-[#ff6b5a] bg-white p-5">
            <span className="rounded-full bg-[#ff6b5a] px-3 text-sm font-bold text-white">
              ممنوع
            </span>
            <h2 className="mb-2 mt-2 text-xl font-extrabold">شو ما بنسمح فيه</h2>
            <ul className="space-y-1 pr-5 text-[#4f6b7e]">
              {forbidden.map((item) => (
                <li key={item} className="list-disc">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* الأغراض الممنوعة */}
        <h2 className="mb-3 mt-9 text-2xl font-extrabold">أغراض ما بتنعرض</h2>
        <div className="rounded-2xl border-2 border-[#d5e6ee] bg-white p-5">
          <ul className="space-y-1 pr-5 text-[#4f6b7e]">
            {bannedItems.map((item) => (
              <li key={item} className="list-disc">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* شو بصير لو خالف حدا */}
        <h2 className="mb-3 mt-9 text-2xl font-extrabold">لو خالف حدا القوانين</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.title} className="rounded-2xl border-2 border-[#d5e6ee] bg-white p-5">
              <div className="text-3xl">{s.icon}</div>
              <h3 className="mt-1 text-lg font-extrabold">{s.title}</h3>
              <p className="text-[#4f6b7e]">{s.text}</p>
            </div>
          ))}
        </div>

        {/* رابط الإبلاغ */}
        <div className="mt-6 rounded-2xl bg-[#ffc93c] p-5 font-semibold text-[#3a2b00]">
          شفت شي مخالف؟{' '}
          <a href="/report" className="underline">
            بلّغ عنه
          </a>
          ، بلاغك بيحمي غيرك.
        </div>
      </div>
    </>
  );
}
