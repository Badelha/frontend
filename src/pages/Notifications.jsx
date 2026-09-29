import { useState } from "react";

function Notifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            icon: "🛒",
            text: "محمد خالد طلب شراء «تمر مجدول فاخر»",
            time: "منذ 5 دقائق",
            read: false,
        },
        {
            id: 2,
            icon: "🔄",
            text: "سارة أحمد اقترحت مقايضة «خزف يدوي» بعسل طبيعي",
            time: "منذ 20 دقيقة",
            read: false,
        },
        {
            id: 3,
            icon: "⭐",
            text: "تقييم جديد على «حِرفك متنوعة» — 5 نجوم",
            time: "منذ ساعة",
            read: false,
        },
        {
            id: 4,
            icon: "✅",
            text: "تمت الموافقة على طلب المقايضة مع فاطمة يوسف",
            time: "منذ 3 ساعات",
            read: true,
        },
        {
            id: 5,
            icon: "📦",
            text: "تم تسليم طلب رقم #1042 بنجاح",
            time: "أمس",
            read: true,
        },
    ]);

    // تعيين جميع الإشعارات كمقروءة
    const markAllAsRead = () => {
        setNotifications((currentNotifications) =>
            currentNotifications.map((notification) => ({
                ...notification,
                read: true,
            }))
        );
    };

    // زر العودة
    const handleBack = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-[#F0F9FF] font-['Cairo']"
        >
            {/* ========================= */}
            {/* HEADER */}
            {/* ========================= */}

            <header
                className="relative h-[90px] w-full border-b-[0.67px] border-[#E8F0F3] bg-white px-[63px] font-['Cairo']"
            >
                <div className="relative mx-auto h-full w-full max-w-[1314px]">

                    {/* العودة */}
                    <button
                        id="backButton"
                        type="button"
                        onClick={handleBack}
                        className="absolute right-0 top-1/2 flex -translate-y-1/2 items-center gap-[10px] text-[18px] font-semibold text-[#547487]"
                        aria-label="العودة إلى الصفحة السابقة"
                    >
                        <span>العودة</span>

                        <span
                            className="h-[9px] w-[9px] rotate-45 border-r-[1.5px] border-t-[1.5px] border-current"
                            aria-hidden="true"
                        ></span>
                    </button>

                    {/* العنوان */}
                    <h1
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[24px] font-bold leading-[34px] text-[#0D3B57]"
                    >
                        ملفي الشخصي
                    </h1>

                    {/* معلومات المستخدم */}
                    <div className="absolute left-0 top-1/2 flex -translate-y-1/2 items-start gap-3">

                        {/* صورة الحساب */}
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#4384A5] text-sm font-bold text-white">
                            أح
                        </div>

                        {/* بيانات المستخدم */}
                        <div className="flex flex-col items-start gap-[3px]">

                            {/* الاسم */}
                            <span className="whitespace-nowrap text-sm font-bold text-[#0D3B57]">
                                أحمد محمد البدلحي
                            </span>

                            {/* الموقع */}
                            <span className="whitespace-nowrap text-[11px] text-[#A1B6C2]">
                                دير البلح
                            </span>

                            {/* تعديل الملف الشخصي */}
                            <span
                                className="flex h-[28px] w-[148px] flex-row items-center justify-center gap-[6px] rounded-[9999999px] bg-white shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]"
                                dir="rtl"
                            >
                                <span className="font-['Cairo'] text-[10px] font-bold leading-[15px] text-[#438095]">
                                    تعديل الملف الشخصي
                                </span>

                                {/* أيقونة القلم */}
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

            {/* ========================= */}
            {/* MAIN */}
            {/* ========================= */}

            <main className="flex min-h-[calc(100vh-90px)] flex-row-reverse items-start gap-6 bg-[#F0F9FF] px-[63px] py-10">

                {/* ========================= */}
                {/* الكرت الرئيسي */}
                {/* ========================= */}

                <section className="w-full max-w-[1101px] overflow-hidden rounded-2xl border-[0.67px] border-[#E1E9ED] bg-white">

                    {/* رأس كرت الإشعارات */}
                    <div className="flex h-[56px] items-center justify-between border-b border-[#F0F4F6] bg-white px-5">

                        <h2 className="text-base font-bold text-[#0D3B57]">
                            الإشعارات
                        </h2>

                        <button
                            id="markAllRead"
                            type="button"
                            onClick={markAllAsRead}
                            className="text-xs font-medium text-[#4F9D9E] transition hover:text-[#3A73AA]"
                        >
                            تعيين الكل كمقروء
                        </button>
                    </div>

                    {/* قائمة الإشعارات */}
                    <div
                        id="notificationsList"
                        className="flex flex-col"
                    >

                        {notifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`notification-item relative flex min-h-[68px] items-center border-b border-[#E8F0F3] px-5 py-3 ${
                                    notification.read
                                        ? "bg-white"
                                        : "bg-[#F0F9FF]"
                                }`}
                            >

                                {/* الأيقونة والنص */}
                                <div className="flex w-full items-center justify-start gap-3">

                                    <span className="flex h-7 w-7 shrink-0 items-center justify-center text-xl">
                                        {notification.icon}
                                    </span>

                                    <div className="flex flex-col items-start gap-1 text-right">

                                        <p className="text-xs font-medium text-[#0D3B57]">
                                            {notification.text}
                                        </p>

                                        <span className="text-[12px] text-[#A1B6C2]">
                                            {notification.time}
                                        </span>

                                    </div>
                                </div>

                                {/* نقطة الإشعار غير المقروء */}
                                {!notification.read && (
                                    <span className="absolute left-5 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#4F9D9E]"></span>
                                )}
                            </div>
                        ))}

                        {/* المساحة الفارغة */}
                        <div className="h-[80px] bg-white"></div>

                    </div>
                </section>

                {/* ========================= */}
                {/* القائمة الجانبية */}
                {/* ========================= */}

                <aside className="flex w-[275px] shrink-0 flex-col gap-1.5">

                    {/* الإشعارات */}
                    <button
                        type="button"
                        id="notificationsButton"
                        className="flex h-11 w-[275px] items-center justify-between rounded-xl bg-gradient-to-l from-[#3A73AA] via-[#4388A5] to-[#4F9D9E] px-4 py-3 text-right shadow-sm transition duration-200 hover:brightness-95"
                    >
                        <span className="flex items-center gap-1 text-xs font-bold text-white">
                            <span>🔔</span>
                            <span>الإشعارات</span>
                        </span>

                        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#7AAEBE] text-[10px] font-bold text-white">
                            3
                        </span>
                    </button>

                    {/* الطلبات */}
                    <button
                        type="button"
                        id="ordersButton"
                        className="flex h-8 w-[275px] items-center justify-between rounded-xl bg-white px-4 py-2 text-right shadow-sm transition duration-200 hover:bg-[#F5F9FA]"
                    >
                        <span className="flex items-center gap-1 text-xs font-medium text-[#547487]">
                            <span>📋</span>
                            <span>الطلبات</span>
                        </span>

                        <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#FF3048] text-[9px] font-bold text-white">
                            4
                        </span>
                    </button>

                    {/* المحادثات */}
                    <button
                        type="button"
                        id="messagesButton"
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

export default Notifications;