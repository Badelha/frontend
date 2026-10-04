import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Orders() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("exchange");

    return (
        <div dir="rtl" className="min-h-screen bg-[#F0F9FF] font-['Cairo']">

            {/* MAIN */}
            <main
                className="flex min-h-screen flex-row-reverse gap-[16px] items-start bg-[#F0F9FF] px-[63px] py-10"
            >

                {/* الكرت الرئيسي */}
                <section
                    className="w-full max-w-[1101px] overflow-hidden rounded-[16px] border-[0.67px] border-[#E1E9ED] bg-white"
                >

                    {/* التبويبات */}
                    <div
                        className="flex h-[52px] items-center justify-center gap-[30px] border-b-[0.67px] border-[#E8F0F3]"
                    >

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
                            <span
                                className="flex h-[20px] w-[117px] items-center justify-center gap-[4px] font-['Cairo'] text-center text-[14px] font-bold leading-[20px] tracking-[0px]"
                            >
                                {/* SVG المقايضة */}
                                <svg
                                    className="h-[14px] w-[14px] shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke={
                                        activeTab === "exchange"
                                            ? "white"
                                            : "#5A7A84"
                                    }
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M17 1l4 4-4 4"></path>
                                    <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
                                    <path d="M7 23l-4-4 4-4"></path>
                                    <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
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
                            <span
                                className="h-[20px] w-[117px] font-['Cairo'] text-center text-[14px] font-bold leading-[20px] tracking-[0px]"
                            >
                                🛒 طلبات الشراء
                            </span>
                        </button>

                    </div>

                    {/* تفاصيل الطلبات */}
                    <div className="w-full">

                        {/* الطلب الأول */}
                        <div
                            className="relative flex h-[90px] w-full items-center border-b border-[#EDF3F5]"
                        >

                            {/* أزرار قبول ورفض */}
                            <div
                                className="absolute left-[22px] top-[23px] flex items-center gap-[8px]"
                            >

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
                                    className="flex h-[29px] w-[53px] items-center justify-center rounded-full bg-[#15803D] font-['Cairo'] text-[11px] font-bold leading-[20px] text-white"
                                >
                                    قبول
                                </button>

                            </div>

                            {/* معلومات سارة */}
                            <div
                                className="absolute right-[20px] top-[17px] flex items-center gap-[4px]"
                            >

                                {/* الدائرة */}
                                <div
                                    className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]"
                                >
                                    <span
                                        className="font-['Cairo'] text-[14px] font-bold text-[#15803D]"
                                    >
                                        م
                                    </span>
                                </div>

                                {/* البيانات */}
                                <div className="flex w-full flex-col items-end">

                                    <span
                                        className="block font-['Cairo'] text-[14px] font-bold leading-[20px] text-[#174563]"
                                    >
                                        سارة أحمد
                                    </span>

                                    <span
                                        className="block w-full font-['Cairo'] text-[10px] font-normal leading-[16px] text-[#76A0AF]"
                                    >
                                        يطلب: خزف يدوي ملون
                                    </span>

                                    <span
                                        className="block w-full font-['Cairo'] text-[10px] font-normal leading-[16px] text-[#76A0AF]"
                                    >
                                        يعرض: عسل طبيعي — كيلو
                                    </span>

                                    <span
                                        className="block w-full font-['Cairo'] text-[9px] font-normal leading-[14px] text-[#A1B6C2]"
                                    >
                                        منذ 20 دقيقة
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* الطلب الثاني */}
                        <div
                            className="relative flex h-[90px] w-full items-center border-b border-[#EDF3F5]"
                        >

                            {/* أزرار قبول ورفض */}
                            <div
                                className="absolute left-[22px] top-[23px] flex items-center gap-[8px]"
                            >

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
                                    className="flex h-[29px] w-[53px] items-center justify-center rounded-full bg-[#15803D] font-['Cairo'] text-[11px] font-bold leading-[20px] text-white"
                                >
                                    قبول
                                </button>

                            </div>

                            {/* معلومات خالد */}
                            <div
                                className="absolute right-[20px] top-[17px] flex items-center gap-[4px]"
                            >

                                {/* الدائرة */}
                                <div
                                    className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]"
                                >
                                    <span
                                        className="font-['Cairo'] text-[14px] font-bold text-[#15803D]"
                                    >
                                        خ
                                    </span>
                                </div>

                                {/* البيانات */}
                                <div className="flex flex-col items-end">

                                    <span
                                        className="translate-x-[20px] font-['Cairo'] text-[14px] font-bold leading-[20px] text-[#174563]"
                                    >
                                        خالد منصور
                                    </span>

                                    <span
                                        className="font-['Cairo'] text-[10px] font-normal leading-[16px] text-[#76A0AF]"
                                    >
                                        يطلب: أطباق بيضاء كلاسيكية
                                    </span>

                                    <span
                                        className="font-['Cairo'] text-[10px] font-normal leading-[16px] text-[#76A0AF]"
                                    >
                                        يعرض: زيت زيتون — نصف لتر
                                    </span>

                                    <span
                                        className="block w-full font-['Cairo'] text-[9px] font-normal leading-[14px] text-[#A1B6C2]"
                                    >
                                        منذ 3ساعات
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* الطلب الثالث */}
                        <div
                            className="relative flex h-[90px] w-full items-center"
                        >

                            {/* حالة الرفض */}
                            <div
                                className="absolute left-[38px] top-[33px]"
                            >
                                <span
                                    className="flex h-[25px] min-w-[75px] items-center justify-center rounded-full bg-[#FFE2E2] px-[10px] font-['Cairo'] text-[10px] font-bold leading-[18px] text-[#FB2C36]"
                                >
                                    مرفوض
                                </span>
                            </div>

                            {/* معلومات ليلى */}
                            <div
                                className="absolute right-[20px] top-[17px] flex items-center gap-[4px]"
                            >

                                {/* الدائرة */}
                                <div
                                    className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]"
                                >
                                    <span
                                        className="font-['Cairo'] text-[14px] font-bold text-[#15803D]"
                                    >
                                        ل
                                    </span>
                                </div>

                                {/* البيانات */}
                                <div
                                    className="flex flex-col items-end gap-0"
                                >

                                    <span
                                        className="translate-x-[20px] font-['Cairo'] text-[14px] font-bold leading-[20px] text-[#174563]"
                                    >
                                        ليلى عمر
                                    </span>

                                    <span
                                        className="font-['Cairo'] text-[10px] font-normal leading-[16px] text-[#76A0AF]"
                                    >
                                        يطلب: طقم أواني فخارية
                                    </span>

                                    <span
                                        className="font-['Cairo'] text-[10px] font-normal leading-[16px] text-[#76A0AF]"
                                    >
                                        يعرض: بهارات متنوعة — 500 غ
                                    </span>

                                    <span
                                        className="block w-full font-['Cairo'] text-[9px] font-normal leading-[14px] text-[#A1B6C2]"
                                    >
                                        أمس
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* المساحة البيضاء */}
                        <div className="h-[150px] w-full bg-white"></div>

                    </div>

                </section>

                {/* القائمة الجانبية */}
                <aside className="flex w-[275px] shrink-0 flex-col gap-1.5">

                    {/* الإشعارات */}
                    <button
                        type="button"
                        id="notificationsButton"
                        onClick={() => navigate("/notifications")}
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

                    {/* الطلبات */}
                    <button
                        type="button"
                        id="ordersButton"
                        onClick={() => navigate("/orders")}
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
                        id="messagesButton"
                        onClick={() => navigate("/messages")}
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

export default Orders;