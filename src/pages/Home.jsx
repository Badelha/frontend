import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
// import heroImage from '../assets/image/badelha2.png';
// import bater from '../assets/image/barter-animation-realistic.html';
// import { Car, Smartphone, Shirt, Sofa, Briefcase, Gamepad2, Repeat2 } from 'lucide-react';
import one from '../assets/images/1.webp';

import two from '../assets/images/2.png';
import three from '../assets/images/3.png';
import four from '../assets/images/4.png';

import five from '../assets/images/5.webp';

import six from '../assets/images/6.png';
import seven from '../assets/images/7.png';

import eight from '../assets/images/8.webp';
import nine from '../assets/images/9.png';
import ten from '../assets/images/10.png';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Counter
function Counter({ end, duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{count.toLocaleString('ar-EG')}</>;
}

function Home() {
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}
        <section
          id="hero"
          className="relative w-full h-[730px] overflow-hidden flex items-center justify-center">
          {/* Background Animation */}
          <iframe
            src="/image/barter-animation-realistic.html"
            className="absolute inset-0 w-full h-full border-0 pointer-events-none"
            title="Animation"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(58,115,170,0.18),rgba(79,157,158,0.12),rgba(0,0,0,0.15))]"></div>

          {/* Blur Overlay */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>

          {/* Content */}
          <div className="relative z-10 w-full max-w-[1100px] px-5 sm:px-8 text-center flex flex-col items-center">
            <h1 className="text-white text-[32px] sm:text-[45px] md:text-[58px] lg:text-[50px] leading-[1.25] font-extrabold tracking-tight">
              بدّلها.. بادل، بيع، أو اشترِ
              <br />
              <span className="bg-[linear-gradient(90deg,#6FA6CC_0%,#79C2BE_100%)] bg-clip-text text-transparent">
                كل احتياجاتك بمنصة واحدة.
              </span>
            </h1>

            <p className="mt-5 max-w-[750px] text-[#013B59] text-[15px] sm:text-[17px] md:text-[18px] leading-[1.9] font-medium">
              وفر الكاش وبادل بالموجود بين إيديك، تخلص من فائض ما لديك واحصل على
              <br className="hidden sm:block" />
              ما تحتاج بكل سهولة وأمان في غزة.
            </p>

            {/* Search Box */}
            <div className="relative mt-8 w-full max-w-[650px]">
              <input
                type="text"
                placeholder="ابحث عن طعام، طاقة، مستلزمات..."
                className="
                  w-full
                  h-[60px]
                  rounded-[18px]
                  bg-white/90
                  backdrop-blur-md
                  border
                  border-white/50
                  px-[55px]
                  pr-[25px]
                  text-[#013B59]
                  placeholder:text-[#8A949B]
                  outline-none
                  shadow-[0_8px_30px_rgba(0,0,0,0.12)]
                  transition-all
                  duration-300
                  focus:bg-white
                  focus:shadow-[0_10px_35px_rgba(0,0,0,0.20)]
                  focus:border-[#4F9D9E]
                "
              />

              <i className="fa-solid fa-magnifying-glass absolute left-[22px] top-1/2 -translate-y-1/2 text-[#4F9D9E] text-[20px]"></i>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-7">
              <button className="min-w-[180px] h-[52px] px-8 rounded-[15px] bg-[linear-gradient(90deg,#3A73AA_0%,#4F9D9E_100%)] text-white font-bold shadow-[0_8px_20px_rgba(58,115,170,0.25)] hover:scale-[1.05] hover:shadow-[0_12px_25px_rgba(58,115,170,0.35)] transition-all duration-300">
                اعرض سلعتك
              </button>

              <button className="min-w-[180px] h-[52px] px-8 rounded-[15px] bg-white/90 backdrop-blur-md text-[#4181A6] font-bold border border-white shadow-[0_8px_20px_rgba(0,0,0,0.10)] hover:bg-white hover:scale-[1.05] hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] transition-all duration-300">
                تصفح العروض
              </button>
            </div>
          </div>
        </section>

        {/* section two */}

        <section id="about" className="py-[40px] px-[60px] bg-[#eff7fc]">
          <div className="flex items-center justify-between ">
            <div>
              <h3 className="text-[33px] font-bold my-[8px] text-[#306061]">كيف تشتغل بدّلها؟</h3>
              <p className=" text-[#989797]">
                ثلاث خطوات بسيطة تفصلك عن أول عملية تبادل أو بيع ناجحة.
              </p>
            </div>
            <div></div>
          </div>
          <div className="m-[60px] flex items-center justify-center gap-[150px]">
            <div className="rounded-xl h-[200px]  border-transparent transition-all duration-300 ease-in-out hover:border-[#ccc] hover:bg-[#f7f7f7] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <span className="inline-flex w-[70px] h-[70px] mx-[50px] items-center justify-center text-center border border-[#ecebeb] text-[#306061] rounded-full shadow-[0_0_15px_#80808033] my-[10px] font-bold text-[#3b5869]">
                1
              </span>
              <h4 className="text-[20px] mx-[20px] mt-[15px] font-bold text-[#3b5869]">
                انشر اللي عندك
              </h4>
              <p className=" text-[15px] text-[#8a8b8b] mt-[10px]">
                صوّر الغرض، اكتب وصفه، وحدد إذا بدك <br />
                تبيعه أو تبادله بشي تاني
              </p>
            </div>
            <div className="rounded-xl h-[200px]  border-transparent transition-all duration-300 ease-in-out hover:border-[#ccc] hover:bg-[#f7f7f7] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <span className="inline-flex w-[70px] h-[70px]  mx-[50px] items-center justify-center border border-[#ecebeb] text-[#306061] rounded-full shadow-[0_0_15px_#80808033]  my-[10px] font-bold text-[#3b5869]">
                2
              </span>
              <h4 className="text-[20px]  mx-[10px] mt-[15px] font-bold text-[#3b5869]">
                لاقِ البديل المناسب
              </h4>
              <p className=" text-[15px] text-[#8a8b8b] mt-[10px]">
                تصفح العروض القريبة منك أو خلي <br />
                المهتمين يوصلولك بعروضهم مباشرة.
              </p>
            </div>
            <div className="rounded-xl h-[200px]  border-transparent transition-all duration-300 ease-in-out hover:border-[#ccc] hover:bg-[#f7f7f7] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <span className="inline-flex w-[70px] h-[70px]   mx-[50px] items-center justify-center border border-[#ecebeb] text-[#306061] rounded-full shadow-[0_0_15px_#80808033] my-[10px] font-bold text-[#3b5869]">
                3
              </span>
              <h4 className="text-[20px] mx-[20px] mt-[15px] font-bold text-[#3b5869]">
                بدّل أو بيع بأمان
              </h4>
              <p className=" text-[15px] text-[#8a8b8b] mt-[10px]">
                حدد مكان التقاء آمن قريب منك وأكمل <br />
                الصفقة وجهًا لوجه.{' '}
              </p>
            </div>
          </div>
        </section>
        {/* the end section two */}
        {/* section threee */}
        <section id="market" className=" scroll-mt-24 py-[40px] px-[60px] bg-[#fff]">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-[33px] font-bold my-[8px] text-[#306061]">تصفح المنتجات</h2>

              <p className="text-[#aaa7a7]">عشر فئات تغطي أغلب احتياجاتك اليومية.</p>
            </div>

            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-[8px] cursor-pointer">
              <p className="text-[#4F9D9E]">{showAll ? 'إخفاء المنتجات' : 'عرض جميع المنتجات'}</p>

              <i
                className={`fa-solid ${
                  showAll ? 'fa-arrow-up' : 'fa-arrow-left-long'
                } text-[#4F9D9E]`}></i>
            </button>
          </div>

          <div className="m-[40px] grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-[20px] justify-items-center">
            {/* المنتج الأول */}
            <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <img src={one} alt="" className="w-[80px] h-[80px] object-cover rounded-full" />

              <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                عدة وأدوات عمل
              </h4>

              <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                ١٥٨ عرض
              </p>
            </div>

            {/* المنتج الثاني */}
            <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <img src={two} alt="" className="w-[80px] h-[80px] object-cover rounded-full" />

              <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                سيارات
              </h4>

              <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                ٢١٤ عرض
              </p>
            </div>

            {/* المنتج الثالث */}
            <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <img src={three} alt="" className="w-[80px] h-[80px] object-cover rounded-full" />

              <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                طاقة وبطاريات
              </h4>

              <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                ٩٧ عرض
              </p>
            </div>

            {/* المنتج الرابع */}
            <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <img src={four} alt="" className="w-[70px] h-[70px] object-cover" />

              <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                أدوات وخياطة
              </h4>

              <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                ٧٤ عرض
              </p>
            </div>

            {/* المنتج الخامس */}
            <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
              <img src={five} alt="" className="w-[70px] h-[70px] object-cover" />

              <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                هواتف ذكية
              </h4>

              <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                ٣٤٦ عرض
              </p>
            </div>

            {/* المنتجات من 6 إلى 10 */}
            {showAll && (
              <>
                {/* المنتج السادس */}
                <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                  <img src={six} alt="" className="w-[100px] h-[100px] object-cover" />

                  <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                    أثاث
                  </h4>

                  <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                    ١٨٩ عرض
                  </p>
                </div>

                {/* المنتج السابع */}
                <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                  <img src={seven} alt="" className="w-[90px] h-[90px] object-cover" />

                  <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                    ملابس
                  </h4>

                  <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                    ٤١٢ عرض
                  </p>
                </div>

                {/* المنتج الثامن */}
                <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                  <img src={eight} alt="" className="w-[90px] h-[90px] object-cover" />

                  <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                    مستلزمات أطفال
                  </h4>

                  <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                    ١٦٣ عرض
                  </p>
                </div>

                {/* المنتج التاسع */}
                <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                  <img src={nine} alt="" className="w-[90px] h-[90px] object-cover" />

                  <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                    مؤن وغذاء
                  </h4>

                  <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                    ٢٦٨ عرض
                  </p>
                </div>

                {/* المنتج العاشر */}
                <div className="group w-[250px] h-[150px] cursor-pointer border shadow-[0_0_15px_#80808033] rounded-[16px] border-[#ecebeb] flex flex-col items-center justify-center transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-[#4F9D9E] hover:to-[#3A73AA] hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1">
                  <img src={ten} alt="" className="w-[90px] h-[90px] object-cover" />

                  <h4 className="text-[16px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white">
                    الصحة والمرأة
                  </h4>

                  <p className="text-[13px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white">
                    ١٢١ عرض
                  </p>
                </div>
              </>
            )}
          </div>
        </section>
        {/*the end section threee */}
        {/*  section four */}
        <section id="" className="py-[40px] px-[60px] bg-[#eff7fc]">
          <div className="flex items-center justify-between ">
            <div>
              <h3 className="text-[33px] font-bold my-[8px] text-[#306061]">لماذا بدّلها؟</h3>
              <p className=" text-[#989797]">
                بنينا المنصة على أساس اللي محتاجه أهل غزة فعليًا: بدون تعقيد، وبدون رسوم مخفية.
              </p>
            </div>
          </div>
          <div className="m-[60px] flex items-center justify-center gap-[30px]">
            <div className="rounded-xl w-[300px] h-[250px] pr-[20px] pt-[10px] border-transparent transition-all duration-300 ease-in-out border-[#ccc] bg-[#f7f7f7] shadow-[0_4px_15px_rgba(0,0,0,0.08)] -translate-y-1">
              <span className="inline-flex w-[80px] h-[80px]  items-center justify-center text-center border border-[#ecebeb] text-[#306061] rounded-[16px] shadow-[0_0_15px_#80808033] my-[10px] font-bold text-[#3b5869] bg-[#eff7fc]">
                <i className="fa-regular fa-square-check text-[30px]"></i>
              </span>
              <h4 className="text-[20px]  mt-[15px] font-bold text-[#3b5869]">تحقق من الهوية</h4>
              <p className=" text-[15px] text-[#8a8b8b] mt-[10px]">
                كل مستخدم يوثّق رقمه قبل ما يقدر
                <br /> ينشر أو يتواصل مع غيره.
              </p>
            </div>
            <div className="rounded-xl w-[300px] h-[250px] pr-[20px] pt-[10px] border-transparent transition-all duration-300 ease-in-out border-[#ccc] bg-[#f7f7f7] shadow-[0_4px_15px_rgba(0,0,0,0.08)] -translate-y-1">
              <span className="inline-flex w-[80px] h-[80px]  items-center justify-center text-center border border-[#ecebeb] text-[#306061] rounded-[16px] shadow-[0_0_15px_#80808033] my-[10px] font-bold text-[#3b5869] bg-[#eff7fc]">
                <i className="fa-regular fa-heart text-[30px]"></i>
              </span>
              <h4 className="text-[20px]  mt-[15px] font-bold text-[#3b5869]">بلا رسوم خفية</h4>
              <p className=" text-[15px] text-[#8a8b8b] mt-[10px]">
                النشر والتصفح مجانيين بالكامل، وما
                <br /> في نسبة مقتطعة من أي صفقة.
              </p>
            </div>
            <div className="rounded-xl w-[300px] h-[250px] pr-[20px] pt-[10px] border-transparent transition-all duration-300 ease-in-out border-[#ccc] bg-[#f7f7f7] shadow-[0_4px_15px_rgba(0,0,0,0.08)] -translate-y-1">
              <span className="inline-flex w-[80px] h-[80px]  items-center justify-center text-center border border-[#ecebeb] text-[#306061] rounded-[16px] shadow-[0_0_15px_#80808033] my-[10px] font-bold text-[#3b5869] bg-[#eff7fc]">
                <i className="fa-solid fa-location-dot text-[30px]"></i>
              </span>
              <h4 className="text-[20px]  mt-[15px] font-bold text-[#3b5869]">تبادل قريب منك</h4>
              <p className=" text-[15px] text-[#8a8b8b] mt-[10px]">
                فلترة حسب منطقتك بغزة عشان
                <br /> تلتقي بالطرف التاني بأمان وسهولة.
              </p>
            </div>
            <div className="rounded-xl w-[300px] h-[250px] pr-[20px] pt-[10px] border-transparent transition-all duration-300 ease-in-out border-[#ccc] bg-[#f7f7f7] shadow-[0_4px_15px_rgba(0,0,0,0.08)] -translate-y-1">
              <span className="inline-flex w-[80px] h-[80px]  items-center justify-center text-center border border-[#ecebeb] text-[#306061] rounded-[16px] shadow-[0_0_15px_#80808033] my-[10px] font-bold text-[#3b5869] bg-[#eff7fc]">
                <i className="fa-solid fa-hand-holding-medical text-[30px]"></i>
              </span>
              <h4 className="text-[20px]  mt-[15px] font-bold text-[#3b5869]">دعم مباشر</h4>
              <p className=" text-[15px] text-[#8a8b8b] mt-[10px]">
                فريق دعم عبر واتساب يرد عليك <br /> بسرعة إذا واجهتك أي مشكلة.
              </p>
            </div>
          </div>
        </section>
        {/*the end section four */}
        {/* section five */}
        <section className="py-[100px] px-[60px]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-[30px] bg-[#013B59] p-[40px] rounded-[20px] ">
            <div className="text-center">
              <h3 className="text-[32px] font-bold text-[#8fc1c2]">
                +<Counter end={8500} />
              </h3>
              <p className="text-[#fff]">مستخدم مسجّل</p>
            </div>

            <div className="text-center">
              <h3 className="text-[32px] font-bold text-[#8fc1c2]">
                +<Counter end={900} />
              </h3>
              <p className="text-[#fff]">صفقة تمت بنجاح</p>
            </div>

            <div className="text-center">
              <h3 className="text-[32px] font-bold text-[#8fc1c2]">
                +<Counter end={3200} />
              </h3>
              <p className="text-[#fff]">عرض منشور حاليًا</p>
            </div>

            <div className="text-center">
              <h3 className="text-[32px] font-bold text-[#8fc1c2]">
                <Counter end={5} />
              </h3>
              <p className="text-[#fff]">مناطق بغزة</p>
            </div>
          </div>
        </section>
        {/*the end section five */}
        {/*section six */}
        <section className="py-[40px] px-[60px] bg-[#eff7fc]">
          <div className="flex items-center justify-between bg-[#4a9596] p-[40px] mx-[150px] rounded-[30px]">
            <div>
              <h2 className="text-[#fff] text-[30px] font-bold m-[10px]">
                جاهز تبدأ أول صفقة إلك؟
              </h2>
              <p className="text-[#ccc]">
                انضم لآلاف المستخدمين اللي وفروا وقتهم وفلوسهم عن طريق بدّلها.
              </p>
            </div>
            <Link
              to="/register"
              className="flex items-center gap-[8px] bg-[#fff] p-[10px] px-[20px] rounded-[30px] cursor-pointer hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)] hover:-translate-y-1 font-bold transition-all duration-300">
              <i className="fa-solid fa-plus text-[#4a9596]"></i>
              <p className="text-[#4a9596]">أنشئ حسابك الآن</p>
            </Link>
          </div>
        </section>
        {/*the end section six */}
      </main>

      <Footer />
      <link rel="stylesheet" href="menagehad" />
    </>
  );
}

export default Home;
