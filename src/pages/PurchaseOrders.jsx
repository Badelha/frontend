import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PurchaseOrders() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("purchase");

    const [orders, setOrders] = useState([
        {
            id: 1,
            initial: "م",
            name: "محمد خالد",
            product: "تمر مجدول فاخر × 2 — 90 ₪",
            time: "منذ 5 دقائق",
            status: "pending",
        },
        {
            id: 2,
            initial: "ي",
            name: "يوسف إبراهيم",
            product: "صابون طبيعي يدوي × 3 — 90 ₪",
            time: "منذ ساعتين",
            status: "pending",
        },
        {
            id: 3,
            initial: "ن",
            name: "نور حسن",
            product: "بهارات وزعفران طازج × 1 — 55 ₪",
            time: "أمس",
            status: "accepted",
        },
    ]);

    const handleAccept = (id) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order.id === id
                    ? { ...order, status: "accepted" }
                    : order
            )
        );
    };

    const handleReject = (id) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order.id === id
                    ? { ...order, status: "rejected" }
                    : order
            )
        );
    };

    return (
        <div
            dir="rtl"
            className="min-h-screen bg-[#F0F9FF] font-['Cairo']"
        >
            {/* MAIN */}
            <main
                className="flex min-h-[calc(100vh-90px)] flex-row-reverse items-start gap-[16px] bg-[#F0F9FF] px-[63px] py-10"
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
                            id="exchangeTab"
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
                            id="purchaseTab"
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
                                طلبات الشراء
                            </span>
                        </button>
                    </div>

                    {/* تفاصيل الطلبات */}
                    <div className="w-full">
                        {activeTab === "purchase" && (
                            <>
                                {orders.map((order, index) => (
                                    <div
                                        key={order.id}
                                        className={`relative flex h-[90px] w-full items-center ${
                                            index !== orders.length - 1
                                                ? "border-b border-[#EDF3F5]"
                                                : ""
                                        }`}
                                    >
                                        {/* الأزرار / الحالة */}
                                        {order.status === "pending" && (
                                            <div className="absolute left-[22px] top-[23px] flex items-center gap-[8px]">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleReject(order.id)
                                                    }
                                                    className="flex h-[29px] w-[53px] items-center justify-center rounded-full border border-[#FF9B9B] bg-white font-['Cairo'] text-[11px] font-bold leading-[20px] text-[#FF4D4D]"
                                                >
                                                    رفض
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleAccept(order.id)
                                                    }
                                                    className="flex h-[29px] w-[53px] items-center justify-center rounded-full bg-[#55A5A5] font-['Cairo'] text-[11px] font-bold leading-[20px] text-white"
                                                >
                                                    قبول
                                                </button>
                                            </div>
                                        )}

                                        {order.status === "accepted" && (
                                            <div className="absolute left-[38px] top-[33px]">
                                                <span className="flex h-[25px] min-w-[75px] items-center justify-center rounded-full bg-[#DDF8E8] px-[10px] font-['Cairo'] text-[10px] font-bold leading-[18px] text-[#159447]">
                                                    تم القبول
                                                </span>
                                            </div>
                                        )}

                                        {order.status === "rejected" && (
                                            <div className="absolute left-[38px] top-[33px]">
                                                <span className="flex h-[25px] min-w-[75px] items-center justify-center rounded-full bg-[#FDE1E1] px-[10px] font-['Cairo'] text-[10px] font-bold leading-[18px] text-[#E05252]">
                                                    تم الرفض
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

                                            {/* البيانات */}
                                            <div className="flex flex-col items-end">
                                                <span className="block w-full font-['Cairo'] text-[14px] font-bold leading-[20px] text-[#174563]">
                                                    {order.name}
                                                </span>

                                                <span className="block w-full font-['Cairo'] text-[11px] font-normal leading-[17px] text-[#76A0AF]">
                                                    {order.product}
                                                </span>

                                                <span className="block w-full font-['Cairo'] text-[10px] font-normal leading-[15px] text-[#A1B6C2]">
                                                    {order.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="h-[150px] w-full bg-white"></div>
                            </>
                        )}

                        {activeTab === "exchange" && (
                            <div className="flex h-[420px] w-full items-center justify-center">
                                <span className="font-['Cairo'] text-[14px] font-bold text-[#547487]">
                                    لا توجد طلبات مقايضة حالياً
                                </span>
                            </div>
                        )}
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

export default PurchaseOrders;

