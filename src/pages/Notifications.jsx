import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Notifications() {
    const navigate = useNavigate();

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

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-[#F0F9FF] font-['Cairo']"
        >
            {/* MAIN */}
            <main className="flex min-h-screen flex-row-reverse items-start gap-6 bg-[#F0F9FF] px-[63px] py-10">

                {/* الكرت الرئيسي */}
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

                {/* القائمة الجانبية */}
                <aside className="flex w-[275px] shrink-0 flex-col gap-1.5">

                    {/* الإشعارات */}
                    <button
                        type="button"
                        id="notificationsButton"
                        onClick={() => navigate("/notifications")}
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
                        onClick={() => navigate("/orders")}
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

export default Notifications;