// صفحة سياسة الخصوصية (بسيطة وما فيها state)
// كل قسم بالصفحة هو عنصر بالمصفوفة، لو بدك تعدلي نص أو تضيفي قسم غيري هون بس
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const sections = [
  {
    id: 'collect',
    icon: '🧺',
    title: 'شو بنجمع',
    list: [
      'معلومات الحساب: الاسم، البريد أو الهاتف، وصورة الملف الشخصي',
      'محتوى بتنشره: أغراضك، صورها، وأوصافها',
      'رسائل المحادثة بينك وبين المستخدمين الثانيين داخل المنصة',
      'بيانات تقنية بسيطة: نوع الجهاز والمتصفح لتحسين الخدمة',
    ],
  },
  {
    id: 'use',
    icon: '⚙️',
    title: 'كيف منستخدمها',
    text: 'لتشغيل حسابك وربطك بمستخدمين ثانيين، ولإرسال إشعارات العروض، ولحماية المنصة من الاحتيال، ولتحسين التجربة.',
  },
  {
    id: 'share',
    icon: '🤝',
    title: 'مع مين منشاركها',
    text: 'ما منبيع بياناتك. الاسم والصورة والأغراض بتظهر للمستخدمين الثانيين لأن هاد جوهر المنصة، أما رقم هاتفك وبريدك فما بنعرضهم إلا إذا قررت إنت تشاركهم. ممكن نشارك معلومات مع جهات رسمية فقط لو القانون فرض علينا هيك.',
  },
  {
    id: 'rights',
    icon: '🎛️',
    title: 'حقوقك',
    list: [
      'تشوف بياناتك وتعدلها من صفحة ملفك الشخصي',
      'تحذف أغراضك أو محادثاتك',
      'تطلب حذف حسابك بالكامل',
    ],
  },
  {
    id: 'contact',
    icon: '✉️',
    title: 'التواصل',
    text: 'أي سؤال عن الخصوصية، اكتبلنا على privacy@badil.example أو من صفحة الإبلاغ عن مشكلة.',
  },
];

export default function Privacy() {
  return (
    <>
      <div
        dir="rtl"
        className="mx-auto max-w-5xl scroll-smooth px-5 pb-12 p-[100px] text-[#16324a]">
        {/* الجزء الأزرق الكبير */}
        <div className="my-7 flex flex-col items-center gap-6 rounded-3xl bg-[#2f6f8f] p-8 text-center text-white sm:flex-row sm:text-right">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[#ffc93c] text-5xl">
            🔒
          </div>
          <div>
            <h1 className="text-3xl font-black">خصوصيتك عنّا أمانة</h1>
            <p className="mt-1 text-[#dceef5]">
              بنشرح هون شو بنجمع من معلوماتك ولشو، وشو بإيدك تتحكم فيه.
            </p>
          </div>
        </div>

        {/* الفهرس على الجنب + الأقسام */}
        <div className="grid gap-6 md:grid-cols-[210px_1fr]">
          {/* الفهرس: بيضل ثابت وإنت بتنزلي */}
          <nav className="h-fit rounded-2xl border-2 border-[#d5e6ee] bg-white p-4 md:sticky md:top-5">
            <p className="mb-2 font-extrabold">المحتويات</p>
            {sections.map((s) => (
              <a
                key={s.id}
                href={'#' + s.id}
                className="block py-1 text-sm font-semibold text-[#4f6b7e] hover:text-[#ff6b5a]">
                {s.icon} {s.title}
              </a>
            ))}
          </nav>

          <div className="space-y-4">
            {sections.map((s) => (
              <section
                key={s.id}
                id={s.id}
                className="scroll-mt-5 rounded-2xl border-2 border-[#d5e6ee] bg-white p-5">
                <h2 className="mb-2 flex items-center gap-2 text-xl font-extrabold">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#eaf4f8] text-xl">
                    {s.icon}
                  </span>
                  {s.title}
                </h2>

                {/* لو القسم فيه نص بنعرضه */}
                {s.text && <p className="text-[#4f6b7e]">{s.text}</p>}

                {/* لو القسم فيه قائمة بنعرضها */}
                {s.list && (
                  <ul className="space-y-1 pr-5 text-[#4f6b7e]">
                    {s.list.map((item) => (
                      <li key={item} className="list-disc">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            <div className="rounded-2xl bg-[#ffc93c] p-4 font-semibold text-[#3a2b00]">
              آخر تحديث: أيلول 2026
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
