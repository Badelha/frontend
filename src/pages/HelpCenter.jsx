import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// الأسئلة: لو بدك تضيفي سؤال جديد، زيدي سطر هون بس
const questions = [
  {
    id: 1,
    cat: 'acc',
    q: 'كيف أفتح حساب على بادل؟',
    a: 'اضغط إنشاء حساب، أدخل اسمك وبريدك أو رقم هاتفك، وأكّد الحساب من الرسالة اللي بتوصلك.',
  },
  {
    id: 2,
    cat: 'acc',
    q: 'نسيت كلمة المرور، شو أعمل؟',
    a: 'من صفحة الدخول اضغط نسيت كلمة المرور وبنبعتلك رابط لإعادة تعيينها.',
  },
  {
    id: 3,
    cat: 'swap',
    q: 'كيف أعرض غرض للمقايضة؟',
    a: 'أضف صورة واضحة ووصف صادق، واختار للمقايضة، واكتب شو بدك بدله.',
  },
  {
    id: 4,
    cat: 'swap',
    q: 'كيف بتتم المقايضة؟',
    a: 'ابعت عرضك على الغرض اللي عجبك، وصاحبه بيقبل أو بيرفض أو بيعدّل. لما توافقوا، اتفقوا على مكان وموعد التسليم.',
  },
  {
    id: 5,
    cat: 'swap',
    q: 'الغرضين مش بنفس القيمة، بينفع نتبادل؟',
    a: 'أكيد. فيك تضيف فرق نقدي على العرض، والطرفين بيتفقوا عليه قبل التسليم.',
  },
  {
    id: 6,
    cat: 'buy',
    q: 'كيف أبيع غرض؟',
    a: 'أضف الغرض، اختار للبيع، وحدد السعر. لما يهتم حدا، اتفقوا بالمحادثة على الدفع والتسليم.',
  },
  {
    id: 7,
    cat: 'buy',
    q: 'هل بادل بتاخد عمولة؟',
    a: 'نشر الأغراض والتفاوض مجاني. لو تغيّر هاد الشي، رح نعلمك بوضوح قبل ما يطبّق.',
  },
  {
    id: 8,
    cat: 'safe',
    q: 'كيف أتأكد إن الطرف الثاني موثوق؟',
    a: 'شوف تقييمات المستخدم وصفقاته السابقة، ولا تحوّل مصاري قبل ما تشوف الغرض.',
  },
  {
    id: 9,
    cat: 'safe',
    q: 'وين الأفضل نسلّم الغرض؟',
    a: 'اختار مكان عام ومزدحم وبالنهار، وجيب معك حدا لو الغرض كبير أو غالي.',
  },
];

// أزرار الفلترة
const categories = [
  { key: 'all', label: 'الكل' },
  { key: 'acc', label: 'حسابي' },
  { key: 'swap', label: 'المقايضة' },
  { key: 'buy', label: 'البيع والشراء' },
  { key: 'safe', label: 'الأمان' },
];

export default function HelpCenter() {
  // state = معلومات بتتغير وبتحدّث الصفحة
  const [search, setSearch] = useState(''); // اللي كتبه المستخدم بالبحث
  const [category, setCategory] = useState('all'); // القسم المختار
  const [openId, setOpenId] = useState(null); // السؤال المفتوح

  // نفلتر الأسئلة حسب القسم والبحث
  const filtered = questions.filter((item) => {
    const matchCategory = category === 'all' || item.cat === category;
    const matchSearch = item.q.includes(search) || item.a.includes(search);
    return matchCategory && matchSearch;
  });

  // لو ضغطنا على سؤال مفتوح بيسكر، وإلا بيفتح
  function toggle(id) {
    setOpenId(openId === id ? null : id);
  }

  return (
    <>
      <div dir="rtl" className="mx-auto max-w-4xl px-5 pb-12 py-[100px] text-[#16324a]">
        {/* الجزء الأزرق الكبير */}
        <div className="my-7 flex flex-col items-center gap-6 rounded-3xl bg-[#2f6f8f] p-8 text-center text-white sm:flex-row sm:text-right">
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[#fff] text-5xl font-bold text-[#16324a]">
            ⇄
          </div>
          <div>
            <h1 className="text-3xl font-black">كيف فينا نساعدك؟</h1>
            <p className="mt-1 text-[#dceef5]">
              بادل ببدّل، بتبيع، بتشتري. اسأل أو دور على جوابك هون.
            </p>
          </div>
        </div>

        {/* خانة البحث */}
        <input
          type="search"
          placeholder="ابحث: كيف أضيف غرض؟"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border-2 border-[#d5e6ee] px-4 py-3 outline-none focus:border-[#2f6f8f]"
        />

        {/* أزرار الأقسام */}
        <div className="my-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={
                'rounded-full border-2 px-4 py-1 font-semibold ' +
                (category === c.key
                  ? 'border-[#4F9D9E] bg-[#4F9D9E] text-white'
                  : 'border-[#d5e6ee] bg-white')
              }>
              {c.label}
            </button>
          ))}
        </div>

        {/* الأسئلة */}
        {filtered.map((item) => (
          <div key={item.id} className="my-2.5 rounded-2xl border-2 border-[#d5e6ee] bg-white">
            <button
              onClick={() => toggle(item.id)}
              className="flex w-full justify-between px-4 py-3.5 text-right font-bold">
              <span>{item.q}</span>
              <span className="text-2xl text-[#4F9D9E]">{openId === item.id ? '−' : '+'}</span>
            </button>
            {openId === item.id && <p className="px-4 pb-3.5 text-[#4f6b7e]">{item.a}</p>}
          </div>
        ))}

        {/* لو ما لقينا شي */}
        {filtered.length === 0 && (
          <p className="p-6 text-center text-[#4f6b7e]">ما لقينا جواب مطابق. جرّبي كلمة ثانية.</p>
        )}
      </div>
    </>
  );
}
