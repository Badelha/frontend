
import { useState } from "react";

function Dashboard() {
    const [showAll, setShowAll] = useState(false);

    const transactions = [
        {
            user: "سامر محمد",
            product: "جهاز لابتوب",
            type: "تبادل",
            status: "مكتملة",
            date: "2026-09-19",
            statusClass: "bg-[#D7F8E5] text-[#27A35A]",
        },
        {
            user: "خالد العمري",
            product: "هاتف سامسونج",
            type: "بيع",
            status: "معلقة",
            date: "2026-09-19",
            statusClass: "bg-[#FFF3BF] text-[#D89A00]",
        },
        {
            user: "فاطمة الزهراء",
            product: "ملابس أطفال",
            type: "تبادل",
            status: "مرفوضة",
            date: "2026-09-18",
            statusClass: "bg-[#FFE0E0] text-[#F04444]",
        },
        {
            user: "عمر حسين",
            product: "أثاث منزلي",
            type: "بيع",
            status: "مكتملة",
            date: "2026-09-18",
            statusClass: "bg-[#D7F8E5] text-[#27A35A]",
        },
        {
            user: "نور الدين",
            product: "كتب دراسية",
            type: "تبادل",
            status: "مقبولة",
            date: "2026-09-17",
            statusClass: "bg-[#DCEAFF] text-[#3478E5]",
        },
        {
            user: "محمد أحمد",
            product: "طاولة مكتب",
            type: "بيع",
            status: "مكتملة",
            date: "2026-09-16",
            statusClass: "bg-[#D7F8E5] text-[#27A35A]",
        },
        {
            user: "ليان خالد",
            product: "هاتف آيفون",
            type: "تبادل",
            status: "معلقة",
            date: "2026-09-15",
            statusClass: "bg-[#FFF3BF] text-[#D89A00]",
        },
        {
            user: "أحمد يوسف",
            product: "دراجة هوائية",
            type: "بيع",
            status: "مقبولة",
            date: "2026-09-14",
            statusClass: "bg-[#DCEAFF] text-[#3478E5]",
        },
        {
            user: "سارة علي",
            product: "كتب جامعية",
            type: "تبادل",
            status: "مكتملة",
            date: "2026-09-13",
            statusClass: "bg-[#D7F8E5] text-[#27A35A]",
        },
        {
            user: "يوسف حسن",
            product: "كرسي مكتب",
            type: "بيع",
            status: "مرفوضة",
            date: "2026-09-12",
            statusClass: "bg-[#FFE0E0] text-[#F04444]",
        },
    ];

    const displayedTransactions = showAll
        ? transactions
        : transactions.slice(0, 5);

    return (
        <main
            dir="rtl"
            className="min-h-screen border-t-2 border-[#FFFFFF] bg-[#F5F9FA] px-[32px] pt-[32px] text-[#547487]"
            style={{ fontFamily: '"Cairo", sans-serif' }}
        >

            {/* عنوان الصفحة */}
            <div className="mb-[28px] flex justify-start">
                <h1 className="m-0 flex h-[32px] w-[131px] items-center justify-start p-0 font-['Cairo'] text-[24px] font-bold leading-[32px] text-[#2E5F87]">
                    لوحة التحكم
                </h1>
            </div>

            {/* بطاقات الإحصائيات */}
            <section className="mb-[21px] grid grid-cols-4 gap-[16px]">

                <div className="flex h-[74px] w-full items-center justify-start gap-[20px] rounded-[10px] border border-[#E7ECEE] bg-white px-[14px] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
                    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[12px] bg-[#8CBFCA] text-[19px]">
                        ⭐
                    </div>

                    <div className="text-right">
                        <div className="text-[30px] font-bold leading-[24px] text-[#2E5F87]">
                            ★ 4.3
                        </div>
                        <div className="mt-[3px] text-[14px] text-[#6B7280]">
                            متوسط التقييم
                        </div>
                    </div>
                </div>

                <div className="flex h-[74px] w-full items-center justify-start gap-[20px] rounded-[10px] border border-[#E7ECEE] bg-white px-[14px] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
                    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[12px] bg-[#2E5F87] text-[18px]">
                        ✅
                    </div>

                    <div className="text-right">
                        <div className="text-[30px] font-bold leading-[24px] text-[#2E5F87]">
                            892
                        </div>
                        <div className="mt-[3px] text-[14px] text-[#6B7280]">
                            المعاملات المكتملة
                        </div>
                    </div>
                </div>

                <div className="flex h-[74px] w-full items-center justify-start gap-[20px] rounded-[10px] border border-[#E7ECEE] bg-white px-[14px] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
                    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[12px] bg-[#4A9DA3] text-[18px]">
                        📦
                    </div>

                    <div className="text-right">
                        <div className="text-[30px] font-bold leading-[24px] text-[#2E5F87]">
                            1,340
                        </div>
                        <div className="mt-[3px] text-[14px] text-[#6B7280]">
                            الطلبات النشطة
                        </div>
                    </div>
                </div>

                <div className="flex h-[74px] w-full items-center justify-start gap-[20px] rounded-[10px] border border-[#E7ECEE] bg-white px-[14px] shadow-[0_2px_4px_rgba(0,0,0,0.12)]">
                    <div className="flex h-[56px] w-[56px] items-center justify-center rounded-[12px] bg-[#3A7CAE] text-[18px]">
                        👥
                    </div>

                    <div className="text-right">
                        <div className="text-[30px] font-bold leading-[24px] text-[#2E5F87]">
                            4,821
                        </div>
                        <div className="mt-[3px] text-[14px] text-[#6B7280]">
                            إجمالي المستخدمين
                        </div>
                    </div>
                </div>

            </section>


            {/* آخر المعاملات */}
            <section className="overflow-hidden rounded-[12px] border border-[#E4EAEC] bg-white shadow-[0_2px_4px_rgba(0,0,0,0.12)]">

                {/* رأس الجدول */}
                <div className="flex h-[40px] items-center justify-between px-[16px]">

                    <h2 className="m-0 text-[18px] font-bold text-[#2E5F87]">
                        آخر المعاملات
                    </h2>

                    <button
                        type="button"
                        onClick={() => setShowAll(!showAll)}
                        className="text-[14px] font-semibold text-[#4A9DA3] transition hover:text-[#285F88]"
                    >
                        {showAll ? "عرض أقل" : "عرض الكل"}
                    </button>

                </div>


                {/* عناوين الأعمدة */}
                <div className="grid h-[30px] grid-cols-5 items-center bg-[#F5F8F9] px-[16px] text-[14px] font-bold text-[#6B7280]">

                    <div className="text-right">المستخدم</div>
                    <div className="text-center">المنتج</div>
                    <div className="text-center">النوع</div>
                    <div className="text-center">الحالة</div>
                    <div className="text-center">التاريخ</div>

                </div>


                {/* المعاملات */}
                {displayedTransactions.map((transaction, index) => (
                    <div
                        key={index}
                        className={`grid h-[39px] grid-cols-5 items-center px-[16px] text-[16px] ${
                            index !== displayedTransactions.length - 1
                                ? "border-b border-[#F1F3F4]"
                                : ""
                        }`}
                    >

                        <div className="font-bold text-[#2E5F87]">
                            {transaction.user}
                        </div>

                        <div className="text-center text-[#6B7280]">
                            {transaction.product}
                        </div>

                        <div className="text-center text-[#6B7280]">
                            {transaction.type}
                        </div>

                        <div className="flex justify-center">
                            <span
                                className={`rounded-full px-[10px] py-[3px] text-[8px] font-bold ${transaction.statusClass}`}
                            >
                                {transaction.status}
                            </span>
                        </div>

                        <div className="text-center text-[#6B7280]">
                            {transaction.date}
                        </div>

                    </div>
                ))}

            </section>

        </main>
    );
}

export default Dashboard;

