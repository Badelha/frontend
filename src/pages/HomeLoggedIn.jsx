import Navbarpro from '../components/Navbarpro';

export default function HomeLoggedIn() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#F6FBFD] text-[#013B59]">
      <Navbarpro />
      <main className="px-4 pb-16 pt-28">
        <section className="mx-auto max-w-6xl rounded-[30px] bg-gradient-to-l from-[#4F9D9E] to-[#3A73AA] p-8 text-white shadow-[0_20px_50px_rgba(59,99,143,0.2)] md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="mb-3 text-sm font-bold tracking-[0.2em] text-white/75">الأقسام الرئيسية</p>
              <h1 className="text-3xl font-black md:text-5xl">مرحبا بعودتك إلى منصة بدّلها</h1>
              <p className="mt-4 text-base leading-8 text-white/90 md:text-lg">
                استعرض الإعلانات، أضف منتجاتك، وابدأ في التبادل أو البيع داخل أسواقك المحلية بكل سهولة.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="/home#market" className="rounded-full bg-white px-6 py-3 font-bold text-[#013B59]">تصفح السوق</a>
                <a href="/profilePage" className="rounded-full border border-white/70 px-6 py-3 font-bold text-white">ملفي الشخصي</a>
              </div>
            </div>
            <div className="rounded-[26px] bg-white/10 p-6 backdrop-blur-sm">
              <div className="grid grid-cols-2 gap-4">
                {[
                  ['المنتجات', '320+'],
                  ['المستخدمين', '1200+'],
                  ['طلبات التبادل', '430+'],
                  ['المدن', '8'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl border border-white/20 bg-white/5 p-4 text-center">
                    <div className="text-2xl font-black">{value}</div>
                    <div className="mt-1 text-sm text-white/85">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
