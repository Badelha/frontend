import { useState } from "react";

const users = [
  {
    name: "سارة محمد",
    initial: "س",
    phone: "0599123456",
    status: "نشط",
    orders: "12",
    rating: "4.8 ★",
    location: "غزة",
    date: "2026-01-15",
  },
  {
    name: "خالد العمري",
    initial: "خ",
    phone: "0592456789",
    status: "نشط",
    orders: "5",
    rating: "3.9 ★",
    location: "رفح",
    date: "2026-02-20",
  },
  {
    name: "فاطمة الزهراء",
    initial: "ف",
    phone: "0598765432",
    status: "موقوف",
    orders: "8",
    rating: "4.2 ★",
    location: "خان يونس",
    date: "2025-11-10",
  },
  {
    name: "عمر حسن",
    initial: "ع",
    phone: "0591234567",
    status: "نشط",
    orders: "20",
    rating: "4.5 ★",
    location: "دير البلح",
    date: "2025-10-05",
  },
  {
    name: "نور الدين",
    initial: "ن",
    phone: "0597654321",
    status: "محظور",
    orders: "3",
    rating: "2.1 ★",
    location: "بيت لاهيا",
    date: "2025-12-30",
  },
  {
    name: "أمنة سالم",
    initial: "أ",
    phone: "0593456789",
    status: "محظور",
    orders: "15",
    rating: "4.9 ★",
    location: "غزة",
    date: "2026-03-01",
  },
  {
    name: "يوسف أحمد",
    initial: "ي",
    phone: "0594567890",
    status: "نشط",
    orders: "7",
    rating: "3.5 ★",
    location: "رفح",
    date: "2026-04-12",
  },
];

function Users() {
  const [suspendUser, setSuspendUser] = useState(null);
  const [blockUser, setBlockUser] = useState(null);

  const [suspendSuccess, setSuspendSuccess] = useState(false);
  const [blockSuccess, setBlockSuccess] = useState(false);

  const getStatusStyle = (status) => {
    if (status === "نشط") {
      return {
        container: "bg-[#DDF7E8]",
        text: "text-[#008236]",
      };
    }

    if (status === "موقوف") {
      return {
        container: "bg-[#FFF2C7]",
        text: "text-[#D39A00]",
      };
    }

    return {
      container: "bg-[#FDE1E1]",
      text: "text-[#E05252]",
    };
  };

  return (
    <div dir="rtl" className="min-h-screen bg-[#F7FAFB]">
      {/* ================= الهيدر ================= */}
      <header className="h-[97px] border-b border-[#DCE7EB] bg-gradient-to-l from-[#4C9FA0] to-[#3976AD] text-white">
        <div className="mx-auto flex h-full max-w-[1440px] flex-col">

          {/* الصف الأول */}
          <div className="flex h-[62px] items-center justify-between px-[98px]">

            {/* اليمين */}
            <div className="flex items-center gap-[10px]">

              {/* الشعار */}
              <div className="flex w-[90px] flex-col items-center justify-center">
                <div className="text-[25px] leading-[20px]">
                  〰
                </div>

                <div className="text-[18px] font-bold leading-[20px]">
                  بدّلها
                </div>
              </div>

              {/* الروابط */}
              <nav className="flex items-center gap-[34px] text-[12px] font-semibold">

                <a href="#" className="text-white">
                  الرئيسية
                </a>

                <a href="#" className="text-white/80">
                  من نحن
                </a>

                <a href="#" className="text-white/80">
                  السوق
                </a>

                <a href="#" className="text-white/80">
                  اتصل بنا
                </a>

              </nav>

            </div>

            {/* اليسار */}
            <div className="flex items-center gap-[10px]">

              {/* إضافة منتج */}
              <button
                type="button"
                className="flex h-[37px] items-center gap-[5px] rounded-full border border-white/70 px-[13px] text-[11px] font-semibold text-white"
              >
                <span className="text-[16px]">
                  +
                </span>

                إضافة منتج
              </button>

              {/* الموقع */}
              <button
                type="button"
                className="flex h-[37px] items-center gap-[6px] rounded-full border border-white/70 px-[15px] text-[11px] font-semibold text-white"
              >
                <span>
                  دير البلح
                </span>

                <span className="text-[15px]">
                  ⌄
                </span>
              </button>

              {/* المستخدم */}
              <div className="flex h-[48px] w-[48px] items-center justify-center rounded-full border-[3px] border-white bg-[#285F88]">
                <div className="text-[25px]">
                  ♙
                </div>
              </div>

            </div>

          </div>

          {/* الصف الثاني */}
          <div className="flex h-[35px] items-center justify-center gap-[34px]">

            <a
              href="#"
              className="border-b-[2px] border-white pb-[6px] text-[11px] font-bold text-white"
            >
              المستخدمون
            </a>

            <a
              href="#"
              className="text-[11px] font-semibold text-white/75"
            >
              لوحة التحكم
            </a>

            <a
              href="#"
              className="text-[11px] font-semibold text-white/75"
            >
              البلاغات
            </a>

            <a
              href="#"
              className="text-[11px] font-semibold text-white/75"
            >
              الإعلانات
            </a>

          </div>

        </div>
      </header>

      {/* ================= المحتوى ================= */}
      <main className="min-h-[calc(100vh-97px)] bg-[#F8FBFC] px-[19px] pt-[18px]">

        {/* العنوان والبحث */}
        <div className="mb-[12px] flex items-center justify-between">

          {/* عنوان الصفحة - يمين */}
          <h1 className="m-0 text-[16px] font-bold text-[#285F88]">
            إدارة المستخدمين
          </h1>

          {/* البحث - يسار */}
          <div className="relative">
            <input
              type="text"
              placeholder="  بحث بالاسم أو الهاتف أو الموقع...   "
              className="h-[32px] w-[220px] rounded-[7px] border border-[#E6ECEF] bg-white px-[10px] text-right text-[14px] font-[300] text-[#74838C] outline-none placeholder:text-[#A7B1B7]"
            />
          </div>

        </div>

        {/* كرت الجدول */}
        <section className="overflow-hidden rounded-[10px] border border-[#E5EAEC] bg-white shadow-[0_2px_4px_-2px_#0000001A,0_4px_6px_-1px_#0000001A]">

          {/* رأس الجدول */}
          <div className="grid h-[28px] grid-cols-8 items-center bg-[#F5F8F9] px-[10px]">

            <div className="h-[20px] w-[37px] text-right font-[Cairo] text-[14px] font-bold leading-[20px] tracking-[0px] text-[#74838C]">
              الاسم
            </div>

            <div className="text-center font-[Cairo] text-[14px] font-bold leading-[20px] tracking-[0px] text-[#74838C]">
              الهاتف
            </div>

            <div className="text-center font-[Cairo] text-[14px] font-bold leading-[20px] tracking-[0px] text-[#74838C]">
              الحالة
            </div>

            <div className="text-center font-[Cairo] text-[14px] font-bold leading-[20px] tracking-[0px] text-[#74838C]">
              المنتجات
            </div>

            <div className="text-center font-[Cairo] text-[14px] font-bold leading-[20px] tracking-[0px] text-[#74838C]">
              التقييم
            </div>

            <div className="text-center font-[Cairo] text-[14px] font-bold leading-[20px] tracking-[0px] text-[#74838C]">
              الموقع
            </div>

            <div className="text-center font-[Cairo] text-[14px] font-bold leading-[20px] tracking-[0px] text-[#74838C]">
              تاريخ الانضمام
            </div>

            <div className="text-center font-[Cairo] text-[14px] font-bold leading-[20px] tracking-[0px] text-[#74838C]">
              الإجراءات
            </div>

          </div>

          {/* المستخدمون */}
          <div className="flex flex-col gap-[8px]">
            <div className="flex flex-col gap-[12px]">

              {users.map((user) => {
                const statusStyle = getStatusStyle(user.status);

                return (
                  <div
                    key={user.name}
                    className="grid h-[40px] grid-cols-8 items-center border-b border-[#EEF1F2] px-[10px] text-[7px]"
                  >

                    {/* الاسم */}
                    <div className="flex items-center gap-[6px] text-right font-[700] text-[16px] leading-[24px] text-[#2E5F87]">

                      <span className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] text-[10px] text-white">
                        {user.initial}
                      </span>

                      {user.name}

                    </div>

                    {/* رقم الهاتف */}
                    <div className="text-center font-[Cairo] text-[14px] font-light leading-[20px] tracking-[0px] text-[#89949B]">
                      {user.phone}
                    </div>

                    {/* الحالة */}
                    <div className="text-center">

                      <span
                        className={`inline-flex h-[30px] w-[49.21875px] items-center justify-center rounded-[22369600px] ${statusStyle.container}`}
                      >
                        <span
                          className={`font-[Cairo] text-[12px] font-bold leading-[16px] tracking-[0px] text-right ${statusStyle.text}`}
                        >
                          {user.status}
                        </span>
                      </span>

                    </div>

                    {/* عدد المنتجات */}
                    <div className="text-center font-[Cairo] text-[16px] font-light leading-[24px] tracking-[0px] text-[#6B7280]">
                      {user.orders}
                    </div>

                    {/* التقييم */}
                    <div className="text-center font-[Cairo] text-[16px] font-bold leading-[24px] tracking-[0px] text-[#F0B100]">
                      {user.rating}
                    </div>

                    {/* المنطقة */}
                    <div className="text-center font-[Cairo] text-[16px] font-light leading-[24px] tracking-[0px] text-[#6B7280]">
                      {user.location}
                    </div>

                    {/* التاريخ */}
                    <div className="text-center font-[Cairo] text-[14px] font-light leading-[20px] tracking-[0px] text-[#6B7280]">
                      {user.date}
                    </div>

                    {/* الأزرار */}
                    <div className="flex h-[28px] w-[172.17px] justify-center gap-[8px]">

                      <button
                        onClick={() => {
                          setBlockUser(user.name);
                          setBlockSuccess(false);
                        }}
                        className="block-btn rounded-[5px] bg-[#FEF2F2] px-[7px] py-[3px] text-[7px] font-bold text-[#C10007]"
                      >
                        حظر
                      </button>

                      <button
                        onClick={() => {
                          setSuspendUser(user.name);
                          setSuspendSuccess(false);
                        }}
                        className="suspend-btn rounded-[5px] bg-[#FEFCE8] px-[7px] py-[3px] text-[7px] font-bold text-[#A65F00]"
                      >
                        إيقاف
                      </button>

                      <button
                        className="rounded-[5px] bg-[#DCFCE7] px-[7px] py-[3px] text-[7px] font-bold text-[#15803D]"
                      >
                        تنشيط
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>
          </div>

        </section>

      </main>

      {/* ================= مودال إيقاف المستخدم ================= */}
      {suspendUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setSuspendUser(null);
            }
          }}
        >
          <div className="cairo-font mx-4 w-full max-w-[420px] rounded-2xl bg-white p-8 text-right shadow-2xl transition-all duration-300">

            {!suspendSuccess ? (
              <>
                <h2 className="mb-4 text-[20px] font-bold leading-[28px] tracking-[0px] text-[#2E5F87]">
                  إيقاف المستخدم
                </h2>

                <p className="mb-8 text-base leading-relaxed text-[#6B7280]">
                  هل أنت متأكد من إيقاف المستخدم{" "}
                  <span className="font-bold text-[#2E5F87]">
                    {suspendUser}
                  </span>
                  ؟
                </p>

                <div className="flex justify-start gap-3">

                  <button
                    onClick={() => {
                      setSuspendSuccess(true);

                      setTimeout(() => {
                        setSuspendUser(null);
                        setSuspendSuccess(false);
                      }, 1500);
                    }}
                    className="rounded-lg bg-[#f3b10b] px-7 py-2.5 text-base font-bold text-white transition active:scale-95 hover:bg-[#d99c09]"
                  >
                    إيقاف
                  </button>

                  <button
                    onClick={() => setSuspendUser(null)}
                    className="rounded-lg border border-gray-300 bg-white px-7 py-2.5 text-base font-bold text-[#7b838d] transition active:scale-95 hover:bg-gray-100"
                  >
                    إلغاء
                  </button>

                </div>
              </>
            ) : (
              <div className="py-4 text-center text-lg font-bold text-[#1e3a67]">
                <p>
                  تم إيقاف المستخدم{" "}
                  <span className="font-bold">
                    {suspendUser}
                  </span>{" "}
                  بنجاح!
                </p>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ================= مودال حظر المستخدم ================= */}
      {blockUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setBlockUser(null);
            }
          }}
        >
          <div className="cairo-font mx-4 w-full max-w-[420px] rounded-2xl bg-white p-8 text-right shadow-2xl transition-all duration-300">

            {!blockSuccess ? (
              <>
                <h2 className="mb-4 text-[20px] font-bold leading-[28px] tracking-[0px] text-[#2E5F87]">
                  حظر المستخدم
                </h2>

                <p className="mb-8 text-base leading-relaxed text-[#6B7280]">
                  هل أنت متأكد من حظر المستخدم{" "}
                  <span className="font-bold text-[#2E5F87]">
                    {blockUser}
                  </span>
                  ؟
                </p>

                <div className="flex justify-start gap-3">

                  <button
                    onClick={() => {
                      setBlockSuccess(true);

                      setTimeout(() => {
                        setBlockUser(null);
                        setBlockSuccess(false);
                      }, 1500);
                    }}
                    className="rounded-lg bg-[#FB2C36] px-7 py-2.5 text-base font-bold text-white transition active:scale-95 hover:bg-[#d9252e]"
                  >
                    حظر
                  </button>

                  <button
                    onClick={() => setBlockUser(null)}
                    className="rounded-lg border border-gray-300 bg-white px-7 py-2.5 text-base font-bold text-[#7b838d] transition active:scale-95 hover:bg-gray-100"
                  >
                    إلغاء
                  </button>

                </div>
              </>
            ) : (
              <div className="py-4 text-center text-lg font-bold text-[#1e3a67]">
                <p>
                  تم حظر المستخدم{" "}
                  <span className="font-bold">
                    {blockUser}
                  </span>{" "}
                  بنجاح!
                </p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

export default Users;