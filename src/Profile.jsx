import { useState, useRef, useEffect } from "react";

function Profile() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesAreaRef = useRef(null);

  const conversations = [
    {
      name: "محمد خالد",
      initial: "م",
      message: "هل التمر متوفر بكميات كبيرة؟",
      time: "5د",
      count: 2,
      unread: true,
      online: true,
    },
    {
      name: "سارة أحمد",
      initial: "س",
      message: "شكراً على عرض المقايضة",
      time: "22د",
      count: 1,
      unread: true,
      online: true,
    },
    {
      name: "يوسف إبراهيم",
      initial: "ي",
      message: "متى يمكن الاستلام؟",
      time: "1س",
      unread: false,
      online: false,
    },
    {
      name: "نور حسن",
      initial: "ن",
      message: "تم الدفع، شكراً",
      time: "3س",
      unread: false,
      online: false,
    },
    {
      name: "فاطمة يوسف",
      initial: "ف",
      message: "هل الخزف يدوي 100%؟",
      time: "أمس",
      unread: false,
      online: false,
    },
  ];

  const [selectedConversation, setSelectedConversation] = useState({
    name: "نور حسن",
    initial: "م",
    status: "غير متصل",
  });

  const sendMessage = () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return;
    }

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: trimmedMessage,
        time: "الآن",
      },
    ]);

    setMessage("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  useEffect(() => {
    if (messagesAreaRef.current) {
      messagesAreaRef.current.scrollTop =
        messagesAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleBack = () => {
    window.history.back();
  };

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
            aria-label="العودة إلى الصفحة السابقة"
            className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-[10px] text-[18px] font-semibold text-[#547487]"
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

            {/* الصورة */}
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

      <main className="min-h-[calc(100vh-90px)] bg-[#F0F9FF] px-[24px] py-[16px]">

        <div
          dir="ltr"
          className="mx-auto grid min-h-[517px] max-w-[1314px] grid-cols-[minmax(0,1fr)_180px] gap-[16px]"
        >

          {/* ================= MAIN CARD ================= */}

          <section
            dir="rtl"
            className="flex min-h-[517px] flex-col overflow-hidden rounded-[16px] border-[0.67px] border-[#E1E9ED] bg-white"
          >

            {/* HEADER */}

            <div className="flex h-[56px] shrink-0 items-center border-b border-[#F0F4F6] bg-white">

              {/* المحادثات */}
              <div className="flex h-full w-[250px] shrink-0 items-center justify-center border border-[#F0F4F6]">
                <h2 className="text-[13px] font-bold text-[#0D3B57]">
                  المحادثات
                </h2>
              </div>

              {/* تفاصيل المحادثة */}
              <div className="flex h-full flex-1 items-center justify-end gap-[10px] px-[16px]">

                <div className="flex flex-col items-start">
                  <span className="text-[12px] font-bold leading-[18px] text-[#0D3B57]">
                    {selectedConversation.name}
                  </span>

                  <span className="text-[9px] leading-[14px] text-[#CED0D4]">
                    {selectedConversation.status}
                  </span>
                </div>

                <div className="relative flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] text-[14px] font-bold text-white">
                  {selectedConversation.initial}
                </div>

              </div>
            </div>

            {/* BODY */}

            <div dir="ltr" className="flex min-h-0 flex-1">

              {/* ================= DETAILS ================= */}

              <div
                dir="ltr"
                className="flex min-w-0 flex-1 flex-col"
              >

                {/* الرسائل */}
                <div
                  ref={messagesAreaRef}
                  className="flex flex-1 flex-col overflow-y-auto bg-white px-[10px] py-[12px]"
                >

                  {messages.length === 0 ? (
                    <div className="flex flex-1 items-center justify-center">
                      <span className="font-['Cairo'] text-[14px] font-normal leading-[20px] text-[#A1B6C2]">
                        لا توجد رسائل بعد
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[8px]">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className="flex w-full justify-end"
                        >
                          <div className="max-w-[65%] rounded-[10px] rounded-tl-[3px] bg-gradient-to-l from-[#3A73AA] to-[#4F9D9E] px-[14px] py-[8px]">

                            <p className="m-0 text-right text-[10px] leading-[16px] text-white">
                              {msg.text}
                            </p>

                            <span className="mt-[2px] block text-[7px] text-[#E5F5F6]">
                              {msg.time}
                            </span>

                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

                {/* ================= INPUT ================= */}

                <div className="flex h-[52px] shrink-0 items-center gap-[10px] border-t-[0.67px] border-[#F0F5F7] bg-white px-[10px]">

                  {/* زر الإرسال */}
                  <button
                    type="button"
                    onClick={sendMessage}
                    className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] text-white transition hover:bg-[#35758F]"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22 2L11 13"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <path
                        d="M22 2L15 22L11 13L2 9L22 2Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {/* حقل الكتابة */}
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="...اكتب رسالة"
                    className="h-[40px] w-[296px] shrink-0 rounded-full bg-[#EFF5F7] px-[16px] py-[10px] text-right font-['Cairo'] text-[14px] font-normal leading-[100%] text-[#547487] outline-none placeholder:text-[#A1B6C2] focus:ring-1 focus:ring-[#4384A5]"
                  />

                </div>

              </div>

              {/* ================= CONVERSATIONS LIST ================= */}

              <div
                dir="rtl"
                className="h-[471px] w-[374.33px] shrink-0 border-l border-[#F0F4F6] bg-white"
              >

                {conversations.map((conversation, index) => (
                  <button
                    key={conversation.name}
                    type="button"
                    onClick={() =>
                      setSelectedConversation({
                        name: conversation.name,
                        initial: conversation.initial,
                        status: conversation.online
                          ? "متصل الآن"
                          : "غير متصل",
                      })
                    }
                    className={`flex h-[58px] w-full items-center gap-[12px] border-b border-[#E8F0F3] px-[16px] py-[10px] text-right transition ${
                      index < 2
                        ? "bg-[#F0F9FF]"
                        : "bg-white hover:bg-[#F7FBFD]"
                    } ${
                      index === 0
                        ? "border-l-[2px] border-l-[#4F9D9E]"
                        : ""
                    }`}
                  >

                    {/* الصورة */}
                    <div className="relative flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] font-['Cairo'] text-[14px] font-bold text-white">

                      {conversation.initial}

                      {conversation.online && (
                        <span className="absolute bottom-[1px] left-[1px] h-[7px] w-[7px] rounded-full border-[1px] border-white bg-[#05DF72]" />
                      )}

                    </div>

                    {/* المعلومات */}
                    <div className="flex min-w-0 flex-1 flex-col justify-center text-right">

                      <span className="font-['Cairo'] text-[12px] font-bold leading-[18px] text-[#0D3B57]">
                        {conversation.name}
                      </span>

                      <span className="truncate font-['Cairo'] text-[9px] leading-[16px] text-[#A1B6C2]">
                        {conversation.message}
                      </span>

                    </div>

                    {/* الوقت والعدد */}
                    <div className="flex h-[40px] w-[20px] shrink-0 flex-col items-center justify-between">

                      <span className="font-['Cairo'] text-[8px] leading-[14px] text-[#9AB8C0]">
                        {conversation.time}
                      </span>

                      {conversation.count && (
                        <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#4F9D9E] text-[8px] font-bold text-white">
                          {conversation.count}
                        </span>
                      )}

                    </div>

                  </button>
                ))}

              </div>

            </div>
          </section>

          {/* ================= SIDEBAR ================= */}

          <aside
            dir="rtl"
            className="flex w-full flex-col gap-[6px]"
          >

            {/* الإشعارات */}
            <button
              type="button"
              onClick={() => alert("صفحة الإشعارات")}
              className="flex h-[32px] w-full items-center justify-between rounded-xl bg-white px-[12px] py-[7px] text-right shadow-sm transition hover:bg-[#F5F9FA]"
            >
              <span className="flex items-center gap-[4px] text-[10px] font-medium text-[#547487]">
                <span>🔔</span>
                <span>الإشعارات</span>
              </span>

              <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FF3048] text-[9px] font-bold text-white">
                3
              </span>
            </button>

            {/* الطلبات */}
            <button
              type="button"
              onClick={() => alert("صفحة الطلبات")}
              className="flex h-[32px] w-full items-center justify-between rounded-xl bg-white px-[12px] py-[7px] text-right shadow-sm transition hover:bg-[#F5F9FA]"
            >
              <span className="flex items-center gap-[4px] text-[10px] font-medium text-[#547487]">
                <span>📋</span>
                <span>الطلبات</span>
              </span>

              <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FF3048] text-[9px] font-bold text-white">
                4
              </span>
            </button>

            {/* المحادثات */}
            <button
              type="button"
              onClick={() => alert("صفحة المحادثات")}
              className="flex h-[44px] w-full items-center justify-between rounded-xl bg-gradient-to-l from-[#3A73AA] via-[#4388A5] to-[#4F9D9E] px-[12px] py-[10px] text-right shadow-sm transition hover:brightness-95"
            >
              <span className="flex items-center gap-[4px] text-[11px] font-bold text-white">
                <span>💬</span>
                <span>المحادثات</span>
              </span>

              <span className="flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FF3048] text-[9px] font-bold text-white">
                3
              </span>
            </button>

          </aside>

        </div>
      </main>
    </div>
  );
}

export default Profile;