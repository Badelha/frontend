import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import { motion } from 'framer-motion';
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
  const sectionVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        staggerChildren: 0.18,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };
  /* حركة Why Badelha */ const whySectionVariants = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  };
  const whyHeaderVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  const whyItemsVariants = {
    hidden: { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.15 } },
  };
  const whyCardVariants = {
    hidden: { opacity: 0, scale: 0.88 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: 'easeOut' } },
  };
  const ctaSectionVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };
  const ctaTextVariants = {
    hidden: { opacity: 0, x: 25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.15 } },
  };
  const ctaButtonVariants = {
    hidden: { opacity: 0, x: -25 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 } },
  };
  return (
    <>
      <Navbar />
      <main>
        {/* HERO SECTION */}

        <section
          id="hero"
          className=" relative flex min-h-[680px] sm:min-h-[700px] md:min-h-[720px] lg:min-h-[730px] w-full items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 pt-[90px] sm:pt-[95px] lg:pt-[80px] ">
          {' '}
          {/* ============================= */} {/* Background Animation */}{' '}
          {/* ============================= */}{' '}
          <iframe
            src="/image/barter-animation-realistic.html"
            className=" pointer-events-none absolute inset-0 h-full w-full border-0 "
            title="Animation"
          />{' '}
          {/* ============================= */} {/* Gradient Overlay */}{' '}
          {/* ============================= */}{' '}
          <div className=" absolute inset-0 bg-[linear-gradient(90deg,rgba(58,115,170,0.18),rgba(79,157,158,0.12),rgba(0,0,0,0.15))] " />{' '}
          {/* ============================= */} {/* Blur Overlay */}{' '}
          {/* ============================= */}{' '}
          <div className=" absolute inset-0 bg-white/5 backdrop-blur-[1px] " />{' '}
          {/* ============================= */} {/* CONTENT */}{' '}
          {/* ============================= */}{' '}
          <div className=" relative z-10 flex w-full max-w-[1100px] flex-col items-center text-center px-1 sm:px-4 md:px-6 ">
            {' '}
            {/* ============================= */} {/* TITLE */}{' '}
            {/* ============================= */}{' '}
            <h1 className=" w-full text-white text-[29px] leading-[1.35] sm:text-[38px] sm:leading-[1.3] md:text-[48px] md:leading-[1.25] lg:text-[56px] lg:leading-[1.25] xl:text-[60px] font-extrabold tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.12)] ">
              {' '}
              بدّلها.. بادل، بيع، أو اشترِ <br />{' '}
              <span className=" bg-[linear-gradient(90deg,#6FA6CC_0%,#79C2BE_100%)] bg-clip-text text-transparent ">
                {' '}
                كل احتياجاتك بمنصة واحدة.{' '}
              </span>{' '}
            </h1>{' '}
            {/* ============================= */} {/* DESCRIPTION */}{' '}
            {/* ============================= */}{' '}
            <p className=" mt-5 sm:mt-6 md:mt-7 w-full max-w-[720px] px-2 text-[#013B59] text-[14px] leading-[1.8] sm:text-[16px] sm:leading-[1.9] md:text-[18px] font-medium drop-shadow-[0_1px_4px_rgba(255,255,255,0.3)] ">
              {' '}
              وفر الكاش وبادل بالموجود بين إيديك، تخلص من فائض ما لديك{' '}
              <br className="hidden sm:block" /> واحصل على ما تحتاج بكل سهولة وأمان في غزة.{' '}
            </p>{' '}
            {/* ============================= */} {/* SEARCH BOX */}{' '}
            {/* ============================= */}{' '}
            <div className=" relative mt-7 sm:mt-8 md:mt-9 w-full max-w-[550px] sm:max-w-[620px] md:max-w-[650px] ">
              {' '}
              <input
                type="text"
                placeholder="ابحث عن طعام، طاقة، مستلزمات..."
                className=" h-[54px] sm:h-[58px] md:h-[62px] w-full rounded-[15px] sm:rounded-[17px] md:rounded-[18px] bg-white/90 backdrop-blur-md border border-white/60 px-[48px] sm:px-[55px] pr-[18px] sm:pr-[25px] text-[13px] sm:text-[15px] md:text-[16px] text-[#013B59] placeholder:text-[#8A949B] outline-none shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 focus:bg-white focus:border-[#4F9D9E] focus:shadow-[0_10px_35px_rgba(0,0,0,0.20)] "
              />{' '}
              <i className=" fa-solid fa-magnifying-glass absolute left-[17px] sm:left-[20px] md:left-[22px] top-1/2 -translate-y-1/2 text-[#4F9D9E] text-[17px] sm:text-[19px] md:text-[20px] " />{' '}
            </div>{' '}
            {/* ============================= */} {/* BUTTONS */}{' '}
            {/* ============================= */}{' '}
            <div className=" mt-6 sm:mt-7 flex w-full max-w-[550px] flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 ">
              {' '}
              {/* عرض سلعتك */}{' '}
              <button
                type="button"
                className=" w-full sm:w-auto min-w-0 sm:min-w-[180px] h-[50px] sm:h-[52px] px-6 sm:px-8 rounded-[14px] sm:rounded-[15px] bg-[linear-gradient(90deg,#3A73AA_0%,#4F9D9E_100%)] text-white text-[14px] sm:text-[15px] font-bold shadow-[0_8px_20px_rgba(58,115,170,0.25)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_12px_25px_rgba(58,115,170,0.35)] active:scale-[0.98] ">
                {' '}
                اعرض سلعتك{' '}
              </button>{' '}
              {/* تصفح العروض */}{' '}
              <button
                type="button"
                className=" w-full sm:w-auto min-w-0 sm:min-w-[180px] h-[50px] sm:h-[52px] px-6 sm:px-8 rounded-[14px] sm:rounded-[15px] bg-white/90 backdrop-blur-md text-[#4181A6] text-[14px] sm:text-[15px] font-bold border border-white shadow-[0_8px_20px_rgba(0,0,0,0.10)] transition-all duration-300 hover:bg-white hover:scale-[1.03] hover:shadow-[0_12px_25px_rgba(0,0,0,0.15)] active:scale-[0.98] ">
                {' '}
                تصفح العروض{' '}
              </button>{' '}
            </div>{' '}
          </div>{' '}
        </section>
        {/*THE END HERO SECTION */}
        {/* section two */}
        <section
          id="about"
          className="bg-[#eff7fc] px-4 py-[50px] sm:px-6 md:px-10 lg:px-[60px] lg:py-[60px]">
          {/* Section Header */}
          <motion.div
            className="mx-auto max-w-[1100px] text-center lg:text-right"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}>
            <motion.h3
              variants={itemVariants}
              className="my-2 text-[26px] font-bold text-[#306061] sm:text-[30px] md:text-[33px]">
              كيف تشتغل بدّلها؟
            </motion.h3>

            <motion.p
              variants={itemVariants}
              className="text-[14px] leading-7 text-[#989797] sm:text-[15px]">
              ثلاث خطوات بسيطة تفصلك عن أول عملية تبادل أو بيع ناجحة.
            </motion.p>
          </motion.div>

          {/* Steps */}
          <motion.div
            className="mx-auto mt-10 grid max-w-[1100px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-3 lg:gap-7"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}>
            {/* Step 1 */}
            {[
              {
                number: '1',
                title: 'انشر اللي عندك',
                description: (
                  <>
                    صوّر الغرض، اكتب وصفه، وحدد إذا بدك
                    <br className="hidden sm:block" />
                    تبيعه أو تبادله بشي تاني.
                  </>
                ),
              },
              {
                number: '2',
                title: 'لاقِ البديل المناسب',
                description: (
                  <>
                    تصفح العروض القريبة منك أو خلي
                    <br className="hidden sm:block" />
                    المهتمين يوصلولك بعروضهم مباشرة.
                  </>
                ),
              },
              {
                number: '3',
                title: 'بدّل أو بيع بأمان',
                description: (
                  <>
                    حدد مكان التقاء آمن قريب منك وأكمل
                    <br className="hidden sm:block" />
                    الصفقة وجهًا لوجه.
                  </>
                ),
              },
            ].map((step) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.25 },
                }}
                className="
          group flex min-h-[230px] flex-col items-center
          rounded-2xl border border-transparent
          bg-transparent px-5 py-5 text-center
          transition-all duration-300 ease-in-out
          hover:border-[#d8e4e8]
          hover:bg-[#f7f7f7]
          hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]
          lg:items-start lg:text-right
        ">
                <motion.span
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.25 }}
                  className="
            flex h-[65px] w-[65px] shrink-0
            items-center justify-center
            rounded-full border border-[#ecebeb]
            bg-white text-[21px] font-bold
            text-[#3b5869]
            shadow-[0_0_15px_#80808033]
          ">
                  {step.number}
                </motion.span>

                <h4 className="mt-5 text-[19px] font-bold text-[#3b5869] sm:text-[20px]">
                  {step.title}
                </h4>

                <p className="mt-2 text-[14px] leading-7 text-[#8a8b8b] sm:text-[15px]">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </section>
        {/* the end section two */}

        {/* section three */}

        {/* Market Section */}
        <section
          id="market"
          className="scroll-mt-24 bg-white px-4 py-[45px] sm:px-6 sm:py-[50px] md:px-10 lg:px-[60px] lg:py-[60px]">
          {/* Section Header */}
          <motion.div
            className="mx-auto flex max-w-[1200px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}>
            <div>
              <h2 className="my-2 text-[26px] font-bold text-[#306061] sm:text-[30px] md:text-[33px]">
                تصفح المنتجات
              </h2>

              <p className="text-[14px] leading-7 text-[#aaa7a7] sm:text-[15px]">
                عشر فئات تغطي أغلب احتياجاتك اليومية.
              </p>
            </div>

            {/* Show All Button */}
            <motion.button
              type="button"
              onClick={() => setShowAll(!showAll)}
              whileHover={{ x: -4 }}
              whileTap={{ scale: 0.96 }}
              className="flex w-fit cursor-pointer items-center gap-2 text-[14px] font-medium transition-all duration-300 hover:opacity-75 sm:text-[15px]">
              <span className="text-[#4F9D9E]">
                {showAll ? 'إخفاء المنتجات' : 'عرض جميع المنتجات'}
              </span>

              <motion.i
                animate={{ rotate: showAll ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="fa-solid fa-arrow-left-long text-[#4F9D9E]"
              />
            </motion.button>
          </motion.div>

          {/* Products Grid */}
          <div
            className="
      mx-auto mt-8 grid max-w-[1200px]
      grid-cols-2 gap-4
      sm:mt-10 sm:grid-cols-2 sm:gap-5
      md:grid-cols-4
      lg:grid-cols-5 lg:gap-5
    ">
            {[
              {
                image: one,
                title: 'عدة وأدوات عمل',
                count: '١٥٨ عرض',
              },
              {
                image: two,
                title: 'سيارات',
                count: '٢١٤ عرض',
              },
              {
                image: three,
                title: 'طاقة وبطاريات',
                count: '٩٧ عرض',
              },
              {
                image: four,
                title: 'أدوات وخياطة',
                count: '٧٤ عرض',
              },
              {
                image: five,
                title: 'هواتف ذكية',
                count: '٣٤٦ عرض',
              },
              {
                image: six,
                title: 'أثاث',
                count: '١٨٩ عرض',
              },
              {
                image: seven,
                title: 'ملابس',
                count: '٤١٢ عرض',
              },
              {
                image: eight,
                title: 'مستلزمات أطفال',
                count: '١٦٣ عرض',
              },
              {
                image: nine,
                title: 'مؤن وغذاء',
                count: '٢٦٨ عرض',
              },
              {
                image: ten,
                title: 'الصحة والمرأة',
                count: '١٢١ عرض',
              },
            ]
              .slice(0, showAll ? 10 : 5)
              .map((product, index) => (
                <motion.div
                  key={product.title}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    y: 12,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                    y: 0,
                  }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: (index % 5) * 0.08,
                    ease: 'easeOut',
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: { duration: 0.25 },
                  }}
                  className="
            group flex h-[165px] w-full cursor-pointer
            flex-col items-center justify-center
            rounded-2xl border border-[#ecebeb]
            bg-white px-2
            shadow-[0_0_15px_#80808033]
            transition-colors duration-300 ease-in-out
            hover:bg-gradient-to-r
            hover:from-[#4F9D9E]
            hover:to-[#3A73AA]
            hover:shadow-[0_4px_15px_rgba(0,0,0,0.08)]
            sm:h-[175px]
          ">
                  {/* Product Image */}
                  <motion.img
                    src={product.image}
                    alt={product.title}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.3 }}
                    className={`
              ${
                index < 3
                  ? 'h-[68px] w-[68px] sm:h-[75px] sm:w-[75px]'
                  : 'h-[65px] w-[65px] sm:h-[72px] sm:w-[72px]'
              }
              ${index < 3 ? 'rounded-full' : ''}
              object-cover
            `}
                  />

                  {/* Product Title */}
                  <h4 className="mt-2 text-center text-[14px] font-bold text-[#4181A6] transition-colors duration-300 group-hover:text-white sm:text-[16px]">
                    {product.title}
                  </h4>

                  {/* Product Count */}
                  <p className="mt-1 text-[12px] text-[#b9b7b7] transition-colors duration-300 group-hover:text-white sm:text-[13px]">
                    {product.count}
                  </p>
                </motion.div>
              ))}
          </div>
        </section>
        {/*the end section threee */}

        {/* section four */}
        <motion.section
          id="why-badelha"
          variants={whySectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className=" bg-[#eff7fc] px-4 py-[45px] sm:px-6 sm:py-[50px] md:px-10 lg:px-[60px] lg:py-[60px] ">
          {' '}
          {/* Section Header */}{' '}
          <motion.div variants={whyHeaderVariants} className="mx-auto max-w-[1200px]">
            {' '}
            <h3 className=" my-2 text-[26px] font-bold text-[#306061] sm:text-[30px] md:text-[33px] ">
              {' '}
              لماذا بدّلها؟{' '}
            </h3>{' '}
            <p className=" max-w-[850px] text-[14px] leading-7 text-[#989797] sm:text-[15px] ">
              {' '}
              بنينا المنصة على أساس اللي محتاجه أهل غزة فعليًا: بدون تعقيد، وبدون رسوم مخفية.{' '}
            </p>{' '}
          </motion.div>{' '}
          {/* Features */}{' '}
          <motion.div
            variants={whyItemsVariants}
            className=" mx-auto mt-8 grid max-w-[1200px] grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:mt-12 lg:grid-cols-4 lg:gap-5 ">
            {' '}
            {/* ================= Feature 1 ================= */}{' '}
            <motion.div
              variants={whyCardVariants}
              className=" group flex min-h-[250px] w-full flex-col items-center rounded-2xl border border-[#dfe9ed] bg-[#f7f7f7] px-5 py-5 text-center shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:items-start sm:text-right ">
              {' '}
              <motion.span
                className=" flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-2xl border border-[#ecebeb] bg-[#eff7fc] text-[#306061] shadow-[0_0_15px_#80808033] "
                whileHover={{ scale: 1.1, rotate: 6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}>
                {' '}
                <i className="fa-regular fa-square-check text-[28px] text-[#3b5869]"></i>{' '}
              </motion.span>{' '}
              <h4 className=" mt-5 text-[19px] font-bold text-[#3b5869] sm:text-[20px] ">
                {' '}
                تحقق من الهوية{' '}
              </h4>{' '}
              <p className=" mt-2 text-[14px] leading-7 text-[#8a8b8b] sm:text-[15px] ">
                {' '}
                كل مستخدم يوثّق رقمه قبل ما يقدر <br className="hidden sm:block" /> ينشر أو يتواصل
                مع غيره.{' '}
              </p>{' '}
            </motion.div>{' '}
            {/* ================= Feature 2 ================= */}{' '}
            <motion.div
              variants={whyCardVariants}
              className=" group flex min-h-[250px] w-full flex-col items-center rounded-2xl border border-[#dfe9ed] bg-[#f7f7f7] px-5 py-5 text-center shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:items-start sm:text-right ">
              {' '}
              <motion.span
                className=" flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-2xl border border-[#ecebeb] bg-[#eff7fc] text-[#306061] shadow-[0_0_15px_#80808033] "
                whileHover={{ scale: 1.1, rotate: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}>
                {' '}
                <i className="fa-regular fa-heart text-[28px] text-[#3b5869]"></i>{' '}
              </motion.span>{' '}
              <h4 className=" mt-5 text-[19px] font-bold text-[#3b5869] sm:text-[20px] ">
                {' '}
                بلا رسوم خفية{' '}
              </h4>{' '}
              <p className=" mt-2 text-[14px] leading-7 text-[#8a8b8b] sm:text-[15px] ">
                {' '}
                النشر والتصفح مجانيين بالكامل، وما <br className="hidden sm:block" /> في نسبة مقتطعة
                من أي صفقة.{' '}
              </p>{' '}
            </motion.div>{' '}
            {/* ================= Feature 3 ================= */}{' '}
            <motion.div
              variants={whyCardVariants}
              className=" group flex min-h-[250px] w-full flex-col items-center rounded-2xl border border-[#dfe9ed] bg-[#f7f7f7] px-5 py-5 text-center shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:items-start sm:text-right ">
              {' '}
              <motion.span
                className=" flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-2xl border border-[#ecebeb] bg-[#eff7fc] text-[#306061] shadow-[0_0_15px_#80808033] "
                whileHover={{ scale: 1.1, rotate: 6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}>
                {' '}
                <i className="fa-solid fa-location-dot text-[28px] text-[#3b5869]"></i>{' '}
              </motion.span>{' '}
              <h4 className=" mt-5 text-[19px] font-bold text-[#3b5869] sm:text-[20px] ">
                {' '}
                تبادل قريب منك{' '}
              </h4>{' '}
              <p className=" mt-2 text-[14px] leading-7 text-[#8a8b8b] sm:text-[15px] ">
                {' '}
                فلترة حسب منطقتك بغزة عشان <br className="hidden sm:block" /> تلتقي بالطرف التاني
                بأمان وسهولة.{' '}
              </p>{' '}
            </motion.div>{' '}
            {/* ================= Feature 4 ================= */}{' '}
            <motion.div
              variants={whyCardVariants}
              className=" group flex min-h-[250px] w-full flex-col items-center rounded-2xl border border-[#dfe9ed] bg-[#f7f7f7] px-5 py-5 text-center shadow-[0_4px_15px_rgba(0,0,0,0.08)] transition-all duration-500 ease-out hover:-translate-y-1 hover:bg-white hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] sm:items-start sm:text-right ">
              {' '}
              <motion.span
                className=" flex h-[75px] w-[75px] shrink-0 items-center justify-center rounded-2xl border border-[#ecebeb] bg-[#eff7fc] text-[#306061] shadow-[0_0_15px_#80808033] "
                whileHover={{ scale: 1.1, rotate: -6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}>
                {' '}
                <i className="fa-solid fa-headset text-[28px] text-[#3b5869]"></i>{' '}
              </motion.span>{' '}
              <h4 className=" mt-5 text-[19px] font-bold text-[#3b5869] sm:text-[20px] ">
                {' '}
                دعم مباشر{' '}
              </h4>{' '}
              <p className=" mt-2 text-[14px] leading-7 text-[#8a8b8b] sm:text-[15px] ">
                {' '}
                فريق دعم عبر واتساب يرد عليك <br className="hidden sm:block" /> بسرعة إذا واجهتك أي
                مشكلة.{' '}
              </p>{' '}
            </motion.div>{' '}
          </motion.div>{' '}
        </motion.section>
        {/*the end section four */}
        {/* section five */}
        <section
          className="
    bg-[#FCFEFF]
    px-4 py-[55px]
    sm:px-6 sm:py-[65px]
    md:px-10
    lg:px-[60px] lg:py-[80px]
  ">
          <div
            className="
      mx-auto
      grid
      max-w-[1200px]
      grid-cols-2
      gap-3
      rounded-[20px]
      bg-[#013B59]
      p-5
      shadow-[0_8px_30px_rgba(1,59,89,0.12)]

      sm:gap-5
      sm:p-7

      md:gap-6
      md:p-8

      lg:grid-cols-4
      lg:gap-5
      lg:p-10
    ">
            {/* users */}
            <div
              className="
        flex min-h-[120px] flex-col items-center justify-center
        rounded-2xl
        px-2 py-4
        text-center
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-white/5
        sm:min-h-[135px]
        sm:px-4
      ">
              <h3
                className="
          text-[25px] font-bold
          text-[#8fc1c2]
          sm:text-[29px]
          md:text-[32px]
        ">
                +<Counter end={8500} />
              </h3>

              <p className="mt-1 text-[13px] text-white sm:text-[15px]">مستخدم مسجّل</p>
            </div>

            {/* deals */}
            <div
              className="
        flex min-h-[120px] flex-col items-center justify-center
        rounded-2xl
        px-2 py-4
        text-center
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-white/5
        sm:min-h-[135px]
        sm:px-4
      ">
              <h3
                className="
          text-[25px] font-bold
          text-[#8fc1c2]
          sm:text-[29px]
          md:text-[32px]
        ">
                +<Counter end={900} />
              </h3>

              <p className="mt-1 text-[13px] text-white sm:text-[15px]">صفقة تمت بنجاح</p>
            </div>

            {/* offers */}
            <div
              className="
        flex min-h-[120px] flex-col items-center justify-center
        rounded-2xl
        px-2 py-4
        text-center
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-white/5
        sm:min-h-[135px]
        sm:px-4
      ">
              <h3
                className="
          text-[25px] font-bold
          text-[#8fc1c2]
          sm:text-[29px]
          md:text-[32px]
        ">
                +<Counter end={3200} />
              </h3>

              <p className="mt-1 text-[13px] text-white sm:text-[15px]">عرض منشور حاليًا</p>
            </div>

            {/* areas */}
            <div
              className="
        flex min-h-[120px] flex-col items-center justify-center
        rounded-2xl
        px-2 py-4
        text-center
        transition-all duration-300
        hover:-translate-y-1
        hover:bg-white/5
        sm:min-h-[135px]
        sm:px-4
      ">
              <h3
                className="
          text-[25px] font-bold
          text-[#8fc1c2]
          sm:text-[29px]
          md:text-[32px]
        ">
                <Counter end={5} />
              </h3>

              <p className="mt-1 text-[13px] text-white sm:text-[15px]">مناطق بغزة</p>
            </div>
          </div>
        </section>
        {/*the end section five */}
        {/* section six */}
        <motion.section
          variants={ctaSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          className=" bg-[#eff7fc] px-4 py-[45px] sm:px-6 sm:py-[55px] md:px-10 lg:px-[60px] lg:py-[60px] ">
          {' '}
          <div className=" mx-auto flex max-w-[1100px] flex-col items-center justify-between gap-7 rounded-[25px] bg-[#4a9596] px-5 py-7 text-center shadow-[0_8px_30px_rgba(74,149,150,0.15)] sm:px-7 sm:py-8 md:px-10 md:py-9 lg:flex-row lg:gap-10 lg:rounded-[30px] lg:px-12 lg:py-9 lg:text-right ">
            {' '}
            {/* Text */}{' '}
            <motion.div variants={ctaTextVariants} className="flex-1">
              {' '}
              <h2 className=" m-0 text-[23px] font-bold leading-[1.5] text-white sm:text-[27px] md:text-[30px] ">
                {' '}
                جاهز تبدأ أول صفقة إلك؟{' '}
              </h2>{' '}
              <p className=" mt-2 text-[13px] leading-7 text-[#e5eeee] sm:text-[14px] md:text-[15px] ">
                {' '}
                انضم لآلاف المستخدمين اللي وفروا وقتهم وفلوسهم عن طريق بدّلها.{' '}
              </p>{' '}
            </motion.div>{' '}
            {/* Button */}{' '}
            <motion.div variants={ctaButtonVariants}>
              {' '}
              <Link
                to="/register"
                className=" flex w-full items-center justify-center gap-2 rounded-[30px] bg-white px-6 py-3 text-center font-bold transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(0,0,0,0.12)] sm:w-auto sm:min-w-[190px] sm:px-7 ">
                {' '}
                <i className="fa-solid fa-plus text-[#4a9596]"></i>{' '}
                <span className=" text-[14px] text-[#4a9596] sm:text-[15px] ">
                  {' '}
                  أنشئ حسابك الآن{' '}
                </span>{' '}
              </Link>{' '}
            </motion.div>{' '}
          </div>{' '}
        </motion.section>
        {/*the end section six */}
      </main>

      <Footer />
      <link rel="stylesheet" href="menagehad" />
    </>
  );
}

export default Home;
