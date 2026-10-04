import { useState } from "react";
import { useNavigate } from "react-router-dom";

function MessagesEmpty() {
    const navigate = useNavigate();

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        const trimmedMessage = message.trim();

        if (trimmedMessage === "") {
            return;
        }

        setMessages([
            ...messages,
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

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-[#F0F9FF] font-['Cairo']"
        >
            {/* MAIN */}
            <main
                className="min-h-screen bg-[#F0F9FF] px-[24px] py-[16px]"
            >
                <div
                    dir="ltr"
                    className="mx-auto grid min-h-[517px] max-w-[1314px] grid-cols-[minmax(0,1fr)_180px] gap-[16px]"
                >
                    {/* الكارد الرئيسي */}
                    <section
                        dir="rtl"
                        className="flex min-h-[517px] flex-col overflow-hidden rounded-[16px] border-[0.67px] border-[#E1E9ED] bg-white"
                    >
                        {/* HEADER داخل كرت المحادثة */}
                        <div className="flex h-[56px] shrink-0 items-center border-b border-[#F0F4F6] bg-white">

                            {/* عنوان المحادثات */}
                            <div className="flex h-full w-[250px] shrink-0 items-center justify-center border border-[#F0F4F6]">
                                <h2 className="text-[13px] font-bold text-[#0D3B57]">
                                    المحادثات
                                </h2>
                            </div>

                            {/* تفاصيل نور حسن */}
                            <div className="flex h-full flex-1 items-center justify-end gap-[10px] px-[16px]">

                                <div className="flex flex-col items-start">
                                    <span className="text-[12px] font-bold leading-[18px] text-[#0D3B57]">
                                        نور حسن
                                    </span>

                                    <span className="text-[9px] leading-[14px] text-[#CED0D4]">
                                        غير متصل
                                    </span>
                                </div>

                                {/* الصورة */}
                                <div className="relative flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] text-[14px] font-bold text-white">
                                    م
                                </div>

                            </div>
                        </div>

                        {/* BODY */}
                        <div
                            dir="ltr"
                            className="flex min-h-0 flex-1"
                        >
                            {/* تفاصيل المحادثة */}
                            <div
                                dir="ltr"
                                className="flex min-w-0 flex-1 flex-col"
                            >
                                {/* الرسائل */}
                                <div
                                    id="messagesArea"
                                    className="flex flex-1 flex-col items-center justify-center overflow-y-auto bg-white px-[10px] py-[12px]"
                                >
                                    {messages.length === 0 ? (
                                        <span className="font-['Cairo'] text-[14px] font-normal leading-[20px] text-[#A1B6C2]">
                                            لا توجد رسائل بعد
                                        </span>
                                    ) : (
                                        messages.map((item, index) => (
                                            <div
                                                key={index}
                                                className="flex w-full justify-end"
                                            >
                                                <div className="max-w-[65%] rounded-[10px] rounded-tl-[3px] bg-gradient-to-l from-[#3A73AA] to-[#4F9D9E] px-[14px] py-[8px]">

                                                    <p className="m-0 text-right text-[10px] leading-[16px] text-white">
                                                        {item.text}
                                                    </p>

                                                    <span className="mt-[2px] block text-[7px] text-[#E5F5F6]">
                                                        {item.time}
                                                    </span>

                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>

                                {/* INPUT */}
                                <div
                                    className="flex h-[52px] shrink-0 items-center gap-[10px] border-t-[0.67px] border-[#F0F5F7] bg-white px-[10px]"
                                >
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
                                        onChange={(e) =>
                                            setMessage(e.target.value)
                                        }
                                        onKeyDown={handleKeyDown}
                                        placeholder="...اكتب رسالة"
                                        className="h-[40px] w-[296px] shrink-0 rounded-full bg-[#EFF5F7] px-[16px] py-[10px] text-right font-['Cairo'] text-[14px] font-normal leading-[100%] tracking-[0px] text-[#547487] outline-none placeholder:text-[#A1B6C2] focus:ring-1 focus:ring-[#4384A5]"
                                    />
                                </div>
                            </div>

                            {/* قائمة المحادثات */}
                            <div
                                dir="rtl"
                                className="h-[471px] w-[374.33px] shrink-0 border-l border-[#F0F4F6] bg-white"
                            >
                                {/* محمد خالد */}
                                <button
                                    type="button"
                                    className="flex h-[58px] w-full items-center gap-[12px] border-b border-[#E8F0F3] border-l-[2px] border-l-[#4F9D9E] bg-[#F0F9FF] px-[16px] py-[10px]"
                                >
                                    <div className="relative flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] font-['Cairo'] text-[14px] font-bold text-white">
                                        م

                                        <span className="absolute bottom-[1px] left-[1px] h-[7px] w-[7px] rounded-full border-[1px] border-white bg-[#05DF72]" />
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col justify-center text-right">
                                        <span className="font-['Cairo'] text-[12px] font-bold leading-[18px] text-[#0D3B57]">
                                            محمد خالد
                                        </span>

                                        <span className="truncate font-['Cairo'] text-[9px] leading-[16px] text-[#A1B6C2]">
                                            هل التمر متوفر بكميات كبيرة؟
                                        </span>
                                    </div>

                                    <div className="flex h-[40px] w-[20px] shrink-0 flex-col items-center justify-between">
                                        <span className="font-['Cairo'] text-[8px] leading-[14px] text-[#9AB8C0]">
                                            5د
                                        </span>

                                        <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#4F9D9E] text-[8px] font-bold text-white">
                                            2
                                        </span>
                                    </div>
                                </button>

                                {/* سارة أحمد */}
                                <button
                                    type="button"
                                    className="flex h-[58px] w-full items-center gap-[12px] border-b border-[#E8F0F3] bg-[#F0F9FF] px-[16px] py-[10px]"
                                >
                                    <div className="relative flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] font-['Cairo'] text-[14px] font-bold text-white">
                                        س

                                        <span className="absolute bottom-[1px] left-[1px] h-[7px] w-[7px] rounded-full border-[1px] border-white bg-[#05DF72]" />
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col justify-center text-right">
                                        <span className="font-['Cairo'] text-[12px] font-bold leading-[18px] text-[#0D3B57]">
                                            سارة أحمد
                                        </span>

                                        <span className="truncate font-['Cairo'] text-[9px] leading-[16px] text-[#A1B6C2]">
                                            شكراً على عرض المقايضة
                                        </span>
                                    </div>

                                    <div className="flex h-[40px] w-[20px] shrink-0 flex-col items-center justify-between">
                                        <span className="font-['Cairo'] text-[8px] leading-[14px] text-[#9AB8C0]">
                                            22د
                                        </span>

                                        <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-[#4F9D9E] text-[8px] font-bold text-white">
                                            1
                                        </span>
                                    </div>
                                </button>

                                {/* يوسف إبراهيم */}
                                <button
                                    type="button"
                                    className="flex h-[58px] w-full items-center gap-[12px] bg-white px-[10px] py-[9px] text-right transition hover:bg-[#F7FBFD]"
                                >
                                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] text-[14px] font-bold text-white">
                                        ي
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[12px] font-bold text-[#0D3B57]">
                                                يوسف إبراهيم
                                            </span>

                                            <span className="text-[8px] text-[#A1B6C2]">
                                                1س
                                            </span>
                                        </div>

                                        <span className="truncate text-right text-[9px] text-[#A1B6C2]">
                                            متى يمكن الاستلام؟
                                        </span>
                                    </div>
                                </button>

                                {/* نور حسن */}
                                <button
                                    type="button"
                                    className="flex h-[58px] w-full items-center gap-[12px] bg-white px-[10px] py-[9px] text-right transition hover:bg-[#F7FBFD]"
                                >
                                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] text-[14px] font-bold text-white">
                                        ن
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[12px] font-bold text-[#0D3B57]">
                                                نور حسن
                                            </span>

                                            <span className="text-[8px] text-[#9AB8C0]">
                                                3س
                                            </span>
                                        </div>

                                        <span className="truncate text-right text-[9px] text-[#9AB8C0]">
                                            تم الدفع، شكراً
                                        </span>
                                    </div>
                                </button>

                                {/* فاطمة يوسف */}
                                <button
                                    type="button"
                                    className="flex h-[58px] w-full items-center gap-[12px] bg-white px-[10px] py-[9px] text-right transition hover:bg-[#F7FBFD]"
                                >
                                    <div className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#4384A5] text-[14px] font-bold text-white">
                                        ف
                                    </div>

                                    <div className="flex min-w-0 flex-1 flex-col">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[12px] font-bold text-[#0D3B57]">
                                                فاطمة يوسف
                                            </span>

                                            <span className="text-[8px] text-[#A1B6C2]">
                                                أمس
                                            </span>
                                        </div>

                                        <span className="truncate text-right text-[9px] text-[#A1B6C2]">
                                            هل الخزف يدوي 100%؟
                                        </span>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* القائمة الجانبية */}
                    <aside
                        dir="rtl"
                        className="flex w-full flex-col gap-[6px]"
                    >
                        {/* الإشعارات */}
                        <button
                            type="button"
                            onClick={() => navigate("/notifications")}
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
                            onClick={() => navigate("/orders")}
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
                            onClick={() => navigate("/messages")}
                            className="flex h-[44px] w-full items-center justify-between rounded-xl bg-gradient-to-l from-[#3A73AA] via-[#4388A5] to-[#4F9D9E] px-[12px] py-[10px] text-right shadow-sm"
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

export default MessagesEmpty;