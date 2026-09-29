import { useState } from "react";

function PurchaseOrders() {
  const [activeTab, setActiveTab] = useState("purchase");

  const handleBack = () => {
    window.history.back();
  };

  const orders = [
    {
      name: "محمد خالد",
      initial: "م",
      details: "تمر مجدول فاخر × 2 — 90 ₪",
      time: "منذ 5 دقائق",
      status: "pending",
    },
    {
      name: "يوسف إبراهيم",
      initial: "ي",
      details: "صابون طبيعي يدوي × 3 — 90 ₪",
      time: "منذ ساعتين",
      status: "pending",
    },
    {
      name: "نور حسن",
      initial: "ن",
      details: "بهارات وزعفران طازج × 1 — 55 ₪",
      time: "أمس",
      status: "accepted",
    },
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F0F9FF] font-['Cairo']"
    >
      {/* ================= HEADER ================= */}

      <header className="relative h-[90px] w-full border-b-[0.67px] border-[#E8F0F3] bg-white px-[63px]">
        <div className="relative mx-auto h-full w-full max-w-[1314px]">

          {/* العودة */}
          <button
            type="button"
            onClick={handleBack}
            className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-[10px] text-[18px] font-semibold text-[#547487]"
            aria-label="العودة إلى الصفحة السابقة"
          >
            <span>العودة</span>

            <span
              className="h-[9px] w-[9px] rotate-45 border-r-[1.5px] border-t-[1.5px] border-current"
              aria-hidden="true"
            />
          </button>

          {/* العنوان */}
          <h1 className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[24px] font-bold leading-[34px] text-[#0D3B57]">
            ملفي الشخصي
          </h1>

          {/* معلومات المستخدم */}
          <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-start gap-3">

            {/* صورة الحساب */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4384A5] text-sm font-bold text-white">
              أح
            </div>

            {/* البيانات */}
            <div className="flex flex-col items-start gap-[3px]">

              <span className="whitespace-nowrap text-sm font-bold text-[#0D3B57]">
                أحمد محمد البدلحي
              </span>

              <span className="whitespace-nowrap text-[11px] text-[#A1B6C2]">
                دير البلح
              </span>

              {/* تعديل الملف الشخصي */}
              <span
                dir="rtl"
                className="flex h-[28px] w-[148px] flex-row items-center justify-center gap-[6px] rounded-full bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
              >
                <span className="font-['Cairo'] text-[10px] font-bold leading-[15px] text-[#438095]">
                  تعديل الملف الشخصي
                </span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="shrink-0"
                >
                  <path
                    d="M10.5 1.5H2.5C1.95 1.5 1.5 1.95 1.5 2.5V13.5C1.5 14.05 1.95 14.5 2.5 14.5H13.5C14.05 14.5 14.5 14.05 14.5 13.5V8.5"
                    stroke="#438095"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  <path
                    d="M5.5 10.5L6.1 7.9L11.9 2.1C12.3 1.7 13 1.7 13.4 2.1L13.9 2.6C14.3 3 14.3 3.7 13.9 4.1L8.1 9.9L5.5 10.5Z"
                    stroke="#438095"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="flex min-h-[calc(100vh-90px)] flex-row-reverse items-start gap-[16px] bg-[#F0F9FF] px-[63px] py-10">

        {/* ================= الكرت الرئيسي ================= */}

        <section className="w-full max-w-[1101px] overflow-hidden rounded-[16px] border-[0.67px] border-[#E1E9ED] bg-white">

          {/* التبويبات */}

          <div className="flex h-[52px] items-center justify-center gap-[30px] border-b-[0.67px] border-[#E8F0F3]">

            {/* طلبات المقايضة */}

            <button
              type="button"
              onClick={() => setActiveTab("exchange")}
              className={`flex h-[36px] w-[196px] items-center justify-center rounded-[12px] ${
                activeTab === "exchange"
                  ? "bg-gradient-to-l from-[#3A73AA] via-[#4388A5] to-[#4F9D9E] text-white"
                  : "bg-transparent text-[#5A7A84]"
              }`}
            >
              <span className="flex h-[20px] w-[117px] items-center justify-center gap-[4px] font-['Cairo'] text-center text-[14px] font-bold leading-[20px]">

                <svg
                  className="h-[14px] w-[14px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 1l4 4-4 4" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <path d="M7 23l-4-4 4-4" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>

                طلبات المقايضة
              </span>
            </button>

            {/* طلبات الشراء */}

            <button
              type="button"
              onClick={() => setActiveTab("purchase")}
              className={`flex h-[36px] w-[302px] items-center justify-center rounded-[12px] ${
                activeTab === "purchase"
                  ? "bg-gradient-to-l from-[#3A73AA] via-[#4388A5] to-[#4F9D9E] text-white"
                  : "bg-transparent text-[#5A7A84]"
              }`}
            >
              <span className="h-[20px] w-[117px] font-['Cairo'] text-center text-[14px] font-bold leading-[20px]">
                طلبات الشراء
              </span>
            </button>
          </div>

          {/* ================= الطلبات ================= */}

          <div className="w-full">

            {activeTab === "purchase" &&
              orders.map((order, index) => (
                <div
                  key={index}
                  className={`relative flex h-[90px] w-full items-center ${
                    index !== orders.length - 1
                      ? "border-b border-[#EDF3F5]"
                      : ""
                  }`}
                >

                  {/* الأزرار / الحالة */}

                  {order.status === "pending" ? (
                    <div className="absolute left-[22px] top-[23px] flex items-center gap-[8px]">

                      {/* رفض */}
                      <button
                        type="button"
                        className="flex h-[29px] w-[53px] items-center justify-center rounded-full border border-[#FF9B9B] bg-white font-['Cairo'] text-[11px] font-bold leading-[20px] text-[#FF4D4D]"
                      >
                        رفض
                      </button>

                      {/* قبول */}
                      <button
                        type="button"
                        className="flex h-[29px] w-[53px] items-center justify-center rounded-full bg-[#55A5A5] font-['Cairo'] text-[11px] font-bold leading-[20px] text-white"
                      >
                        قبول
                      </button>
                    </div>
                  ) : (
                    /* تم القبول */
                    <div className="absolute left-[38px] top-[33px]">
                      <span className="flex h-[25px] min-w-[75px] items-center justify-center rounded-full bg-[#DDF8E8] px-[10px] font-['Cairo'] text-[10px] font-bold leading-[18px] text-[#159447]">
                        تم القبول
                      </span>
                    </div>
                  )}

                  {/* معلومات المستخدم */}

                  <div className="absolute right-[20px] top-[17px] flex items-center gap-[4px]">

                    {/* الدائرة */}

                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#EAF5F6]">
                      <span className="font-['Cairo'] text-[14px] font-bold text-[#4F9D9E]">
                        {order.initial}
                      </span>
                    </div>

                    {/* المعلومات */}

                    <div className="flex flex-col items-end">

                      <span className="translate-x-[20px] font-['Cairo'] text-[14px] font-bold leading-[20px] text-[#174563]">
                        {order.name}
                      </span>

                      <span className="font-['Cairo'] text-[10px] font-normal leading-[16px] text-[#76A0AF]">
                        {order.details}
                      </span>

                      <span className="block w-full font-['Cairo'] text-[9px] font-normal leading-[14px] text-[#A1B6C2]">
                        {order.time}
                      </span>

                    </div>
                  </div>
                </div>
              ))}

            {/* المساحة البيضاء الموجودة أسفل الطلبات */}
            <div className="h-[150px] w-full bg-white" />
          </div>
        </section>

        {/* ================= القائمة الجانبية ================= */}

        <aside className="flex w-[275px] shrink-0 flex-col gap-1.5">

          {/* الإشعارات */}

          <button
            type="button"
            className="flex h-8 w-[275px] items-center justify-between rounded-xl bg-white px-4 py-2 text-right shadow-sm transition duration-200 hover:bg-[#F5F9FA]"
          >
            <span className="flex items-center gap-1 text-xs font-medium text-[#547487]">
              <span>🔔</span>
              <span>الإشعارات</span>
            </span>

            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF3048] text-[9px] font-bold text-white">
              3
            </span>
          </button>

          {/* الطلبات - المحدد */}

          <button
            type="button"
            className="flex h-11 w-[275px] items-center justify-between rounded-xl bg-gradient-to-l from-[#3A73AA] via-[#4388A5] to-[#4F9D9E] px-4 py-3 text-right shadow-sm transition duration-200 hover:brightness-95"
          >
            <span className="flex items-center gap-1 text-xs font-bold text-white">
              <span>📋</span>
              <span>الطلبات</span>
            </span>

            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7AAEBE] text-[10px] font-bold text-white">
              4
            </span>
          </button>

          {/* المحادثات */}

          <button
            type="button"
            className="flex h-8 w-[275px] items-center justify-between rounded-xl bg-white px-4 py-2 text-right shadow-sm transition duration-200 hover:bg-[#F5F9FA]"
          >
            <span className="flex items-center gap-1 text-xs font-medium text-[#547487]">
              <span>💬</span>
              <span>المحادثات</span>
            </span>

            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF3048] text-[9px] font-bold text-white">
              3
            </span>
          </button>

        </aside>
      </main>
    </div>
  );
}

export default PurchaseOrders;