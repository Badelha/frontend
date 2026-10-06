import { useState } from "react";
import AdminNavbar from '../components/AdminNavbar';

function Ads() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedAd, setSelectedAd] = useState(null);

  const [editData, setEditData] = useState({
    product: "",
    position: "",
    startDate: "",
    endDate: "",
  });

  const ads = [
    {
      product: "جهاز لابتوب HP",
      status: "نشط",
      startDate: "2026-09-01",
      endDate: "2026-09-30",
      position: "الرئيسية",
      owner: "عمر حسين",
    },
    {
      product: "هاتف iPhone 13",
      status: "منتهي",
      startDate: "2026-08-15",
      endDate: "2026-09-15",
      position: "السوق",
      owner: "أمنة سالم",
    },
    {
      product: "أثاث مكتبي",
      status: "نشط",
      startDate: "2026-09-10",
      endDate: "2026-10-10",
      position: "الرئيسية",
      owner: "خالد العمري",
    },
  ];

  const [adsList, setAdsList] = useState(ads);

  // فتح تعديل الإعلان
  const openEditModal = (ad) => {
    setSelectedAd(ad);

    setEditData({
      product: ad.product,
      position: ad.position,
      startDate: ad.startDate,
      endDate: ad.endDate,
    });

    setShowEditModal(true);
  };

  // حفظ التعديلات
  const saveEdit = (e) => {
    e.preventDefault();

    setAdsList((prevAds) =>
      prevAds.map((ad) =>
        ad.product === selectedAd.product
          ? {
              ...ad,
              product: editData.product,
              position: editData.position,
              startDate: editData.startDate,
              endDate: editData.endDate,
            }
          : ad
      )
    );

    setShowEditModal(false);
    setSelectedAd(null);
  };

  // فتح حذف
  const openDeleteModal = (ad) => {
    setSelectedAd(ad);
    setShowDeleteModal(true);
  };

  // تأكيد الحذف
  const confirmDelete = () => {
    setAdsList((prevAds) =>
      prevAds.filter((ad) => ad.product !== selectedAd.product)
    );

    setShowDeleteModal(false);
    setSelectedAd(null);
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[#F7FAFB] pt-20"
      style={{ fontFamily: "Cairo, sans-serif" }}
    >
      <AdminNavbar />
      {/* ================= المحتوى ================= */}

      <main className="min-h-screen bg-[#F8FBFC] px-[40px] pt-[24px]">

        {/* العنوان وزر الإضافة */}

        <div className="mb-[20px] flex items-center justify-between">

          <h1 className="m-0 text-[18px] font-bold text-[#2E5F87]">
            إدارة الإعلانات
          </h1>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="flex h-[37px] items-center gap-[5px] rounded-lg bg-gradient-to-l from-[#4F9D9E] to-[#3A73AA] px-[16px] text-[12px] font-semibold text-white shadow transition"
          >
            <span className="text-[16px]">
              +
            </span>

            إعلان جديد
          </button>

        </div>

        {/* ================= قائمة الإعلانات =============== */}

        <div className="flex flex-col gap-[12px]">

          {adsList.map((ad, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-[10px] border border-[#E5EAEC] bg-white px-[20px] py-[15px] shadow-sm"
            >

              {/* الأزرار */}

              <div className="flex items-center gap-[8px]">

                <button
                  onClick={() => openEditModal(ad)}
                  className="rounded-[6px] bg-[#FEF2F2] px-[12px] py-[5px] text-[12px] font-bold text-[#C10007] transition hover:bg-red-100"
                >
                  تعديل
                </button>

                <button
                  onClick={() => openDeleteModal(ad)}
                  className="rounded-[6px] bg-[#EFF6FF] px-[12px] py-[5px] text-[12px] font-bold text-[#1447E6] transition hover:bg-blue-100"
                >
                  حذف
                </button>

              </div>

              {/* التفاصيل */}

              <div className="flex items-center gap-[15px]">

                <div className="text-right">

                  <div className="mb-1 flex items-center justify-end gap-[8px]">

                    <h3 className="text-[15px] font-bold text-[#2E5F87]">
                      {ad.product}
                    </h3>

                    <span
                      className={`inline-flex items-center justify-center rounded-full px-[10px] py-[2px] text-[11px] font-bold ${
                        ad.status === "نشط"
                          ? "bg-[#DDF7E8] text-[#008236]"
                          : "bg-[#F1F5F9] text-[#64748B]"
                      }`}
                    >
                      {ad.status}
                    </span>

                  </div>

                  <p className="text-[12px] text-[#6B7280]">
                    {ad.startDate} → {ad.endDate}

                    &nbsp;&nbsp;

                    الموضع: {ad.position}

                    &nbsp;&nbsp;

                    المالك: {ad.owner}
                  </p>

                </div>

                <div
                  className={`flex h-[40px] w-[40px] items-center justify-center text-[#64748B] ${
                    index === 0 ? "text-[#D1D5DB]" : ""
                  }`}
                >
                  📢
                </div>

              </div>

            </div>

          ))}

        </div>

      </main>

      {/* ================================================= */}
      {/* ============== مودال إنشاء إعلان ================= */}
      {/* ================================================= */}

      {showCreateModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#6B7260]/60"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowCreateModal(false);
            }
          }}
        >

          <div className="w-full max-w-[540px] rounded-[24px] bg-white p-[35px] text-right shadow-2xl">

            <h2 className="mb-[24px] text-[20px] font-bold text-[#285F88]">
              إنشاء إعلان جديد
            </h2>

            <form
              className="flex flex-col gap-[18px]"
              onSubmit={(e) => {
                e.preventDefault();
                setShowCreateModal(false);
              }}
            >

              {/* المنتج */}

              <div className="flex flex-col gap-[6px]">

                <label className="text-[14px] font-bold text-[#285F88]">
                  المنتج
                </label>

                <input
                  type="text"
                  placeholder="اسم المنتج..."
                  className="h-[46px] w-full rounded-[10px] border border-[#E5EAEC] bg-white px-[14px] text-right text-[14px] text-[#2E5F87] outline-none placeholder:text-[#A7B1B7] focus:border-[#4384A5]"
                />

              </div>

              {/* الموضع */}

              <div className="flex flex-col gap-[6px]">

                <label className="text-[14px] font-bold text-[#285F88]">
                  الموضع
                </label>

                <div className="relative">

                  <select
                    className="h-[46px] w-full appearance-none rounded-[10px] border border-[#E5EAEC] bg-white px-[14px] pl-[28px] pr-[14px] text-[#2E5F87] outline-none focus:border-[#4384A5]"
                  >
                    <option>الرئيسية</option>
                    <option>السوق</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px] text-[#2E5F87]">
                    <span className="text-[12px]">
                      ▼
                    </span>
                  </div>

                </div>

              </div>

              {/* التواريخ */}

              <div className="grid grid-cols-2 gap-[15px]">

                <div className="flex flex-col gap-[6px]">

                  <label className="text-[14px] font-bold text-[#285F88]">
                    تاريخ البدء
                  </label>

                  <input
                    type="text"
                    className="h-[46px] w-full rounded-[10px] border border-[#E5EAEC] bg-white px-[14px] text-[14px] text-[#2E5F87] outline-none focus:border-[#4384A5]"
                  />

                </div>

                <div className="flex flex-col gap-[6px]">

                  <label className="text-[14px] font-bold text-[#285F88]">
                    تاريخ الانتهاء
                  </label>

                  <input
                    type="text"
                    className="h-[46px] w-full rounded-[10px] border border-[#E5EAEC] bg-white px-[14px] text-[14px] text-[#2E5F87] outline-none focus:border-[#4384A5]"
                  />

                </div>

              </div>

              {/* الأزرار */}

              <div className="mt-[10px] flex flex-row-reverse items-center justify-center gap-[10px]">

                <button
                  type="submit"
                  className="h-[44px] rounded-[10px] bg-gradient-to-l from-[#4C9FA0] to-[#3976AD] px-[24px] text-[14px] font-bold text-white shadow transition hover:opacity-95"
                >
                  نشر الإعلان
                </button>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="h-[44px] rounded-[10px] border border-[#DCE7EB] bg-white px-[24px] text-[14px] font-bold text-[#74838C] transition hover:bg-gray-50"
                >
                  إلغاء
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* ================ مودال التعديل ================== */}
      {/* ================================================= */}

      {showEditModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#6B7260]/60"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowEditModal(false);
            }
          }}
        >

          <div className="w-full max-w-[540px] rounded-[24px] bg-white p-[35px] text-right shadow-2xl">

            <h2 className="mb-[24px] text-[20px] font-bold text-[#285F88]">
              تعديل الإعلان
            </h2>

            <form
              className="flex flex-col gap-[18px]"
              onSubmit={saveEdit}
            >

              {/* المنتج */}

              <div className="flex flex-col gap-[6px]">

                <label className="text-[14px] font-bold text-[#285F88]">
                  المنتج
                </label>

                <input
                  type="text"
                  value={editData.product}
                  onChange={(e) =>
                    setEditData({
                      ...editData,
                      product: e.target.value,
                    })
                  }
                  className="h-[46px] w-full rounded-[10px] border border-[#E5EAEC] bg-white px-[14px] text-right text-[14px] text-[#000000] outline-none focus:border-[#4384A5]"
                />

              </div>

              {/* الموضع */}

              <div className="flex flex-col gap-[6px]">

                <label className="text-[14px] font-bold text-[#285F88]">
                  الموضع
                </label>

                <div className="relative">

                  <select
                    value={editData.position}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        position: e.target.value,
                      })
                    }
                    className="h-[46px] w-full appearance-none rounded-[10px] border border-[#E5EAEC] bg-white px-[14px] pl-[28px] pr-[14px] text-right text-[14px] text-[#000000] outline-none focus:border-[#4384A5]"
                  >
                    <option>الرئيسية</option>
                    <option>السوق</option>
                  </select>

                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-[14px] text-[#000000]">
                    <span className="text-[12px]">
                      ▼
                    </span>
                  </div>

                </div>

              </div>

              {/* التواريخ */}

              <div className="grid grid-cols-2 gap-[15px]">

                <div className="flex flex-col gap-[6px]">

                  <label className="text-[14px] font-bold text-[#285F88]">
                    تاريخ البدء
                  </label>

                  <input
                    type="text"
                    value={editData.startDate}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        startDate: e.target.value,
                      })
                    }
                    className="h-[46px] w-full rounded-[10px] border border-[#E5EAEC] bg-white px-[14px] text-right text-[14px] text-[#000000] outline-none focus:border-[#4384A5]"
                  />

                </div>

                <div className="flex flex-col gap-[6px]">

                  <label className="text-[14px] font-bold text-[#285F88]">
                    تاريخ الانتهاء
                  </label>

                  <input
                    type="text"
                    value={editData.endDate}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        endDate: e.target.value,
                      })
                    }
                    className="h-[46px] w-full rounded-[10px] border border-[#E5EAEC] bg-white px-[14px] text-right text-[14px] text-[#000000] outline-none focus:border-[#4384A5]"
                  />

                </div>

              </div>

              {/* الأزرار */}

              <div className="mt-[10px] flex items-center justify-center gap-[10px]">

                <button
                  type="submit"
                  className="h-[44px] rounded-[10px] bg-gradient-to-l from-[#4C9FA0] to-[#3976AD] px-[24px] text-[14px] font-bold text-white shadow transition hover:opacity-95"
                >
                  حفظ التعديلات
                </button>

                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="h-[44px] rounded-[10px] border border-[#DCE7EB] bg-white px-[24px] text-[14px] font-bold text-[#74838C] transition hover:bg-gray-50"
                >
                  إلغاء
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

      {/* ================================================= */}
      {/* ================= مودال الحذف =================== */}
      {/* ================================================= */}

      {showDeleteModal && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#6B7260]/60"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowDeleteModal(false);
            }
          }}
        >

          <div className="w-full max-w-[540px] rounded-[24px] bg-white p-[35px] text-right shadow-2xl">

            <h2 className="mb-[24px] text-[20px] font-bold text-[#285F88]">
              حذف الإعلان
            </h2>

            <div className="flex flex-col items-center justify-start gap-[10px] py-[20px] text-center">

              <p className="text-[16px] font-bold text-[#6B7280]">
                هل أنت متأكد من حذف هذا الإعلان؟
              </p>

              <p className="text-[14px] text-[#6B7280]">
                لا يمكن التراجع عن هذه العملية.
              </p>

            </div>

            {/* الأزرار */}

            <div className="mt-[10px] flex items-center justify-center gap-[10px]">

              <button
                type="button"
                onClick={confirmDelete}
                className="h-[44px] rounded-[10px] bg-[#FB2C36] px-[24px] text-[14px] font-bold text-white shadow transition hover:opacity-95"
              >
                حذف
              </button>

              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="h-[44px] rounded-[10px] border border-[#DCE7EB] bg-white px-[24px] text-[14px] font-bold text-[#74838C] transition hover:bg-gray-50"
              >
                إلغاء
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default Ads;

