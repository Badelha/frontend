import { useState } from 'react';
import menaImage from '../assets/images/mena.jpg';
import m20 from '../assets/images/20.jpg';
import m21 from '../assets/images/21.jpg';
/* ================= البيانات =================
   لكل منتج حقل img فيه مسار صورته.
   حطي صورك بمجلد public/images وسميها 1.jpg و 2.jpg ... حسب رقم المنتج (id)
   أو غيري المسار لأي اسم بدك: img: "/images/tamr.jpg"
   لو الصورة مش موجودة بتظهر خانة رمادية بدالها
   type: "b" = بيع ، "s" = تبادل ، "m" = بيع / تبادل
*/
const PRODUCTS = [
  {
    id: 1,
    name: 'تمر مجدول فاخر',
    cat: 'مؤن وغذاء',
    type: 'b',
    price: 45,
    rating: 3,
    reviews: 132,
    img: m20,
  },
  {
    id: 2,
    name: 'طقم أواني فخارية',
    cat: 'مؤن وغذاء',
    type: 's',
    price: 0,
    rating: 5,
    reviews: 54,
    img: menaImage,
  },
  {
    id: 3,
    name: 'خزف يدوي ملون',
    cat: 'مؤن وغذاء',
    type: 'm',
    price: 60,
    rating: 5,
    reviews: 87,
    img: m21,
  },
  {
    id: 4,
    name: 'ساعة ذكية Series 7',
    cat: 'أجهزة ذكية',
    type: 'b',
    price: 250,
    rating: 4,
    reviews: 40,
    img: '/images/4.jpg',
  },
  {
    id: 5,
    name: 'سماعات بلوتوث',
    cat: 'أجهزة ذكية',
    type: 'm',
    price: 90,
    rating: 4,
    reviews: 22,
    img: '/images/5.jpg',
  },
  {
    id: 6,
    name: 'آيفون 12 مستعمل',
    cat: 'هواتف ذكية',
    type: 'm',
    price: 1500,
    rating: 5,
    reviews: 63,
    img: '/images/6.jpg',
  },
  {
    id: 7,
    name: 'سامسونج A54',
    cat: 'هواتف ذكية',
    type: 'b',
    price: 1100,
    rating: 4,
    reviews: 31,
    img: '/images/7.jpg',
  },
  {
    id: 8,
    name: 'شنيور بوش كهربائي',
    cat: 'أدوات وعدد',
    type: 'm',
    price: 280,
    rating: 4,
    reviews: 18,
    img: '/images/8.jpg',
  },
  {
    id: 9,
    name: 'سلم المنيوم',
    cat: 'أدوات وعدد',
    type: 's',
    price: 0,
    rating: 3,
    reviews: 9,
    img: '/images/9.jpg',
  },
  {
    id: 10,
    name: 'عربة أطفال',
    cat: 'مستلزمات أطفال',
    type: 'm',
    price: 300,
    rating: 5,
    reviews: 45,
    img: '/images/10.jpg',
  },
  {
    id: 11,
    name: 'ألعاب تعليمية',
    cat: 'مستلزمات أطفال',
    type: 's',
    price: 0,
    rating: 4,
    reviews: 27,
    img: '/images/11.jpg',
  },
  {
    id: 12,
    name: 'جاكيت جلد',
    cat: 'ملابس',
    type: 'm',
    price: 200,
    rating: 4,
    reviews: 33,
    img: '/images/12.jpg',
  },
  {
    id: 13,
    name: 'ثوب تراثي مطرز',
    cat: 'ملابس',
    type: 's',
    price: 0,
    rating: 5,
    reviews: 71,
    img: '/images/13.jpg',
  },
  {
    id: 14,
    name: 'جهاز قياس ضغط',
    cat: 'الصحة والمرأة',
    type: 'b',
    price: 85,
    rating: 4,
    reviews: 15,
    img: '/images/14.jpg',
  },
  {
    id: 15,
    name: 'عطر نسائي',
    cat: 'الصحة والمرأة',
    type: 's',
    price: 0,
    rating: 5,
    reviews: 38,
    img: '/images/15.jpg',
  },
  {
    id: 16,
    name: 'إطارات مستعملة 4 قطع',
    cat: 'سيارات',
    type: 'm',
    price: 400,
    rating: 3,
    reviews: 12,
    img: '/images/16.jpg',
  },
  {
    id: 17,
    name: 'بطارية سيارة',
    cat: 'سيارات',
    type: 'b',
    price: 220,
    rating: 4,
    reviews: 20,
    img: '/images/17.jpg',
  },
  {
    id: 18,
    name: 'لوح طاقة شمسية 300W',
    cat: 'طاقة وبطاريات',
    type: 'm',
    price: 450,
    rating: 5,
    reviews: 58,
    img: '/images/18.jpg',
  },
  {
    id: 19,
    name: 'بطارية ليثيوم 100Ah',
    cat: 'طاقة وبطاريات',
    type: 'b',
    price: 1200,
    rating: 5,
    reviews: 41,
    img: '/images/19.jpg',
  },
  {
    id: 20,
    name: 'عسل جبلي',
    cat: 'مؤن وغذاء',
    type: 'b',
    price: 90,
    rating: 5,
    reviews: 96,
    img: '/images/20.jpg',
  },
  {
    id: 21,
    name: 'طاولة خشبية',
    cat: 'أثاث',
    type: 'b',
    price: 350,
    rating: 5,
    reviews: 24,
    img: '/images/20.jpg',
  },
  {
    id: 22,
    name: 'كرسي مكتب',
    cat: 'أثاث',
    type: 'm',
    price: 180,
    rating: 4,
    reviews: 18,
    img: '/images/20.jpg',
  },
  {
    id: 23,
    name: 'خزانة ملابس',
    cat: 'أثاث',
    type: 's',
    price: 600,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 24,
    name: 'طاولة جانبية ',
    cat: 'أثاث',
    type: 'm',
    price: 300,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 25,
    name: 'دولاب غرفة نوم',
    cat: 'أثاث',
    type: 's',
    price: 300,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 26,
    name: '  سرير مفرد',
    cat: 'أثاث',
    type: 's',
    price: 400,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 27,
    name: ' مكتب دراسة',
    cat: 'أثاث',
    type: 's',
    price: 150,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 28,
    name: ' خزانة أحذية',
    cat: 'أثاث',
    type: 's',
    price: 500,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 29,
    name: 'تسريحة مع مرآة',
    cat: 'أثاث',
    type: 's',
    price: 250,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 30,
    name: ' ماكينة خياطة منزلية ',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 300,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 31,
    name: ' ماكينة تطريز ',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 350,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 32,
    name: ' مقص خياطة احترافي ',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 30,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 33,
    name: 'بكرة خيوط ملونة',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 50,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 34,
    name: ' قماش تطريز ',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 100,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 35,
    name: 'طارة تطريز خشبية ',
    cat: 'أدوات وخياطة',
    type: 'm',
    price: 100,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 36,
    name: 'مسطرة خياطة',
    cat: 'أدوات وخياطة',
    type: 'b',
    price: 30,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 37,
    name: ' دانتيل وشرائط ',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 250,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 38,
    name: ' علبة دبابيس خياطة',
    cat: 'أدوات وخياطة',
    type: 'm',
    price: 250,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 39,
    name: '  أزرار ملابس متنوعة',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 250,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 40,
    name: 'طاولة طعام خشبية',
    cat: 'أثاث',
    type: 's',
    price: 450,
    rating: 5,
    reviews: 24,
    img: '/images/20.jpg',
  },
  {
    id: 41,
    name: 'كنبة منزلية',
    cat: 'أثاث',
    type: 's',
    price: 700,
    rating: 4,
    reviews: 18,
    img: '/images/20.jpg',
  },
  {
    id: 42,
    name: 'سرير خشبي',
    cat: 'أثاث',
    type: 's',
    price: 850,
    rating: 5,
    reviews: 27,
    img: '/images/20.jpg',
  },
  {
    id: 43,
    name: 'مكتب دراسة',
    cat: 'أثاث',
    type: 's',
    price: 300,
    rating: 4,
    reviews: 15,
    img: '/images/20.jpg',
  },

  {
    id: 44,
    name: 'ماكينة خياطة كهربائية',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 400,
    rating: 5,
    reviews: 22,
    img: '/images/20.jpg',
  },
  {
    id: 45,
    name: 'طقم أدوات خياطة',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 120,
    rating: 5,
    reviews: 19,
    img: '/images/20.jpg',
  },
  {
    id: 46,
    name: 'ماكينة قص أقمشة',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 280,
    rating: 4,
    reviews: 14,
    img: '/images/20.jpg',
  },
  {
    id: 47,
    name: 'طقم خيوط وألوان',
    cat: 'أدوات وخياطة',
    type: 's',
    price: 80,
    rating: 5,
    reviews: 26,
    img: '/images/20.jpg',
  },

  {
    id: 48,
    name: 'هاتف سامسونج',
    cat: 'هواتف ذكية',
    type: 's',
    price: 900,
    rating: 5,
    reviews: 35,
    img: '/images/20.jpg',
  },
  {
    id: 49,
    name: 'هاتف آيفون',
    cat: 'هواتف ذكية',
    type: 's',
    price: 1200,
    rating: 5,
    reviews: 41,
    img: '/images/20.jpg',
  },
  {
    id: 50,
    name: 'هاتف شاومي',
    cat: 'هواتف ذكية',
    type: 's',
    price: 650,
    rating: 4,
    reviews: 23,
    img: '/images/20.jpg',
  },
  {
    id: 51,
    name: 'هاتف هواوي',
    cat: 'هواتف ذكية',
    type: 's',
    price: 550,
    rating: 4,
    reviews: 17,
    img: '/images/20.jpg',
  },

  {
    id: 52,
    name: 'طقم مفكات وأدوات',
    cat: 'عدة وأدوات عمل',
    type: 's',
    price: 180,
    rating: 5,
    reviews: 29,
    img: '/images/20.jpg',
  },
  {
    id: 53,
    name: 'صندوق عدة متكامل',
    cat: 'عدة وأدوات عمل',
    type: 's',
    price: 350,
    rating: 5,
    reviews: 32,
    img: '/images/20.jpg',
  },
  {
    id: 54,
    name: 'مثقاب كهربائي',
    cat: 'عدة وأدوات عمل',
    type: 's',
    price: 420,
    rating: 4,
    reviews: 21,
    img: '/images/20.jpg',
  },
  {
    id: 55,
    name: 'منشار كهربائي',
    cat: 'عدة وأدوات عمل',
    type: 's',
    price: 500,
    rating: 5,
    reviews: 18,
    img: '/images/20.jpg',
  },

  {
    id: 56,
    name: 'عربة أطفال',
    cat: 'مستلزمات أطفال',
    type: 's',
    price: 300,
    rating: 5,
    reviews: 28,
    img: '/images/20.jpg',
  },
  {
    id: 57,
    name: 'سرير أطفال',
    cat: 'مستلزمات أطفال',
    type: 's',
    price: 450,
    rating: 4,
    reviews: 16,
    img: '/images/20.jpg',
  },
  {
    id: 58,
    name: 'كرسي طعام للأطفال',
    cat: 'مستلزمات أطفال',
    type: 's',
    price: 180,
    rating: 5,
    reviews: 20,
    img: '/images/20.jpg',
  },
  {
    id: 59,
    name: 'حقيبة مستلزمات أطفال',
    cat: 'مستلزمات أطفال',
    type: 's',
    price: 100,
    rating: 5,
    reviews: 25,
    img: '/images/20.jpg',
  },

  {
    id: 60,
    name: 'فستان نسائي',
    cat: 'ملابس',
    type: 's',
    price: 180,
    rating: 5,
    reviews: 31,
    img: '/images/20.jpg',
  },
  {
    id: 61,
    name: 'بدلة رجالية',
    cat: 'ملابس',
    type: 's',
    price: 350,
    rating: 4,
    reviews: 19,
    img: '/images/20.jpg',
  },
  {
    id: 62,
    name: 'ملابس أطفال',
    cat: 'ملابس',
    type: 's',
    price: 100,
    rating: 5,
    reviews: 27,
    img: '/images/20.jpg',
  },
  {
    id: 63,
    name: 'جاكيت شتوي',
    cat: 'ملابس',
    type: 's',
    price: 220,
    rating: 5,
    reviews: 24,
    img: '/images/20.jpg',
  },

  {
    id: 64,
    name: 'جهاز قياس ضغط',
    cat: 'الصحة والمرأة',
    type: 's',
    price: 150,
    rating: 5,
    reviews: 18,
    img: '/images/20.jpg',
  },
  {
    id: 65,
    name: 'جهاز قياس السكر',
    cat: 'الصحة والمرأة',
    type: 's',
    price: 120,
    rating: 5,
    reviews: 23,
    img: '/images/20.jpg',
  },
  {
    id: 66,
    name: 'جهاز عناية بالبشرة',
    cat: 'الصحة والمرأة',
    type: 's',
    price: 200,
    rating: 4,
    reviews: 15,
    img: '/images/20.jpg',
  },
  {
    id: 67,
    name: 'مجفف شعر',
    cat: 'الصحة والمرأة',
    type: 's',
    price: 180,
    rating: 5,
    reviews: 29,
    img: '/images/20.jpg',
  },

  {
    id: 68,
    name: 'إطارات سيارات',
    cat: 'سيارات',
    type: 's',
    price: 600,
    rating: 5,
    reviews: 21,
    img: '/images/20.jpg',
  },
  {
    id: 69,
    name: 'بطارية سيارة',
    cat: 'سيارات',
    type: 's',
    price: 450,
    rating: 5,
    reviews: 26,
    img: '/images/20.jpg',
  },
  {
    id: 70,
    name: 'مسجل سيارة',
    cat: 'سيارات',
    type: 's',
    price: 250,
    rating: 4,
    reviews: 17,
    img: '/images/20.jpg',
  },
  {
    id: 71,
    name: 'مرايا جانبية للسيارة',
    cat: 'سيارات',
    type: 's',
    price: 180,
    rating: 4,
    reviews: 13,
    img: '/images/20.jpg',
  },

  {
    id: 72,
    name: 'بطارية طاقة شمسية',
    cat: 'طاقة وبطاريات',
    type: 's',
    price: 900,
    rating: 5,
    reviews: 34,
    img: '/images/20.jpg',
  },
  {
    id: 73,
    name: 'لوح طاقة شمسية',
    cat: 'طاقة وبطاريات',
    type: 's',
    price: 750,
    rating: 5,
    reviews: 28,
    img: '/images/20.jpg',
  },
  {
    id: 74,
    name: 'منظم شحن للطاقة الشمسية',
    cat: 'طاقة وبطاريات',
    type: 's',
    price: 220,
    rating: 4,
    reviews: 16,
    img: '/images/20.jpg',
  },
  {
    id: 75,
    name: 'محول كهرباء',
    cat: 'طاقة وبطاريات',
    type: 's',
    price: 300,
    rating: 5,
    reviews: 22,
    img: '/images/20.jpg',
  },

  {
    id: 76,
    name: 'سلة مواد غذائية',
    cat: 'مؤن وغذاء',
    type: 's',
    price: 250,
    rating: 5,
    reviews: 30,
    img: '/images/20.jpg',
  },
  {
    id: 77,
    name: 'كرتونة مواد تموينية',
    cat: 'مؤن وغذاء',
    type: 's',
    price: 180,
    rating: 5,
    reviews: 24,
    img: '/images/20.jpg',
  },
  {
    id: 78,
    name: 'زيت زيتون',
    cat: 'مؤن وغذاء',
    type: 's',
    price: 150,
    rating: 5,
    reviews: 36,
    img: '/images/20.jpg',
  },
  {
    id: 79,
    name: 'طقم بهارات',
    cat: 'مؤن وغذاء',
    type: 's',
    price: 70,
    rating: 4,
    reviews: 18,
    img: '/images/20.jpg',
  },
  {
    id: 80,
    name: 'سلة فواكه وخضروات',
    cat: 'مؤن وغذاء',
    type: 's',
    price: 100,
    rating: 5,
    reviews: 27,
    img: '/images/20.jpg',
  },
];

const CATS = [
  'الكل',
  'أثاث',
  'أدوات وخياطة',
  'هواتف ذكية',
  'عدة وأدوات عمل',
  'مستلزمات أطفال',
  'ملابس',
  'الصحة والمرأة',
  'سيارات',
  'طاقة وبطاريات',
  'مؤن وغذاء',
];
const TYPES = [
  ['all', 'الكل'],
  ['b', 'بيع'],
  ['s', 'تبادل'],
  ['m', 'بيع / تبادل'],
];
const TYPE_LABEL = { b: 'بيع', s: 'تبادل', m: 'تبادل / بيع' };
const PER_PAGE = 8;

export default function BadilMarket() {
  const [cat, setCat] = useState('الكل');
  const [type, setType] = useState('all');
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('def');
  const [page, setPage] = useState(1);
  const [favs, setFavs] = useState([]); // أرقام المنتجات المفضلة
  const [cart, setCart] = useState([]); // [{id, qty}]
  const [modal, setModal] = useState(null); // { kind: "options"|"swap"|"cart"|"favs", product }
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1800);
  };

  /* ---------- فلترة وترتيب ---------- */
  let list = PRODUCTS.filter(
    (p) =>
      (cat === 'الكل' || p.cat === cat) &&
      (type === 'all' || p.type === type) &&
      (p.name.includes(q) || p.cat.includes(q))
  );
  if (sort === 'low') list = [...list].sort((a, b) => a.price - b.price);
  if (sort === 'high') list = [...list].sort((a, b) => b.price - a.price);
  if (sort === 'rate') list = [...list].sort((a, b) => b.rating - a.rating);

  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const current = Math.min(page, pages);
  const items = list.slice((current - 1) * PER_PAGE, current * PER_PAGE);

  /* ---------- الأفعال ---------- */
  const toggleFav = (id) =>
    setFavs(favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]);

  const addToCart = (id) => {
    const found = cart.find((i) => i.id === id);
    setCart(
      found
        ? cart.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [...cart, { id, qty: 1 }]
    );
    setModal(null);
    showToast('انضافت للسلة 🛒');
  };

  const changeQty = (id, d) =>
    setCart(cart.map((i) => (i.id === id ? { ...i, qty: i.qty + d } : i)).filter((i) => i.qty > 0));

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const find = (id) => PRODUCTS.find((p) => p.id === id);
  const total = cart.reduce((s, i) => s + find(i.id).price * i.qty, 0);

  const chooseCat = (c) => {
    setCat(c);
    setPage(1);
  };

  /* ---------- زر الإجراء حسب نوع المنتج ---------- */
  const ActionBtn = ({ p }) => {
    if (p.type === 'b')
      return (
        <button
          onClick={() => addToCart(p.id)}
          className="px-3 py-1.5 rounded-full text-xs text-white bg-teal-500 hover:bg-teal-600">
          أضف للسلة
        </button>
      );
    if (p.type === 's')
      return (
        <button
          onClick={() => setModal({ kind: 'swap', product: p })}
          className="px-3 py-1.5 rounded-full text-xs text-white bg-emerald-700 hover:bg-emerald-800">
          اقترح مقايضة
        </button>
      );
    return (
      <button
        onClick={() => setModal({ kind: 'options', product: p })}
        className="px-3 py-1.5 rounded-full text-xs text-white bg-teal-700 hover:bg-teal-800">
        عرض الخيارات
      </button>
    );
  };

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50 py-[80px] text-slate-800">
      {/* ===== الهيدر ===== */}
      <header className="sticky top-0 z-30 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-3 py-3 flex items-center gap-3">
          <h1 className="text-xl font-bold text-teal-700">بادل</h1>
          <div className="relative flex-1">
            <input
              type="search"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setPage(1);
              }}
              placeholder="ابحث عن طعام، طاقة، مستلزمات..."
              className="w-full rounded-full bg-slate-100 border border-slate-200 py-2 pr-10 pl-4 text-sm outline-none focus:ring-2 focus:ring-teal-400"
            />
            <span className="absolute right-3 top-2 text-slate-400">🔍</span>
          </div>
          <button onClick={() => setModal({ kind: 'favs' })} className="relative text-xl">
            ❤️
            <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">
              {favs.length}
            </span>
          </button>
          <button onClick={() => setModal({ kind: 'cart' })} className="relative text-xl">
            🛒
            <span className="absolute -top-2 -left-2 bg-teal-600 text-white text-[10px] rounded-full w-4 h-4 grid place-items-center">
              {cartCount}
            </span>
          </button>
        </div>

        {/* أقسام الموبايل: شريط أفقي */}
        <nav className="lg:hidden flex gap-2 overflow-x-auto px-3 pb-3">
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => chooseCat(c)}
              className={`shrink-0 px-3 py-1 rounded-full text-sm border ${c === cat ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-teal-700 border-teal-200'}`}>
              {c}
            </button>
          ))}
        </nav>
      </header>

      <div className="max-w-7xl mx-auto px-3 py-4 flex gap-6">
        {/* ===== المحتوى ===== */}
        <main className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {TYPES.map(([k, label]) => (
              <button
                key={k}
                onClick={() => {
                  setType(k);
                  setPage(1);
                }}
                className={`px-3 py-1 rounded-md border text-sm ${k === type ? 'bg-teal-600 text-white border-teal-600' : 'bg-white text-teal-700 border-teal-300 hover:bg-teal-50'}`}>
                {label}
              </button>
            ))}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="mr-auto rounded-lg border border-slate-300 bg-white text-sm px-2 py-1">
              <option value="def">الترتيب الافتراضي</option>
              <option value="low">السعر: الأقل</option>
              <option value="high">السعر: الأعلى</option>
              <option value="rate">الأعلى تقييماً</option>
            </select>
          </div>

          <p className="text-sm text-slate-500 mb-3">{list.length} منتج</p>

          {items.length === 0 && (
            <p className="text-center text-slate-500 py-16">ما لقينا نتائج 😕</p>
          )}

          {/* الشبكة: 2 موبايل / 3 تابلت / 4 كمبيوتر */}
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
            {items.map((p) => (
              <article
                key={p.id}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col hover:shadow-lg transition">
                {/* الصورة */}
                <div className="relative aspect-[4/3] bg-slate-200">
                  <ProductImage src={p.img} alt={p.name} />
                  <span className="absolute top-2 right-2 bg-emerald-700 text-white text-[11px] px-2 py-0.5 rounded">
                    {TYPE_LABEL[p.type]}
                  </span>
                </div>

                <div className="p-3 flex flex-col gap-2 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm leading-snug">{p.name}</h3>
                    <button
                      onClick={() => toggleFav(p.id)}
                      className={`text-lg leading-none ${favs.includes(p.id) ? 'text-red-500' : 'text-slate-300'}`}>
                      {favs.includes(p.id) ? '♥' : '♡'}
                    </button>
                  </div>
                  <div className="text-amber-400 text-xs">
                    {'★'.repeat(p.rating)}
                    {'☆'.repeat(5 - p.rating)}
                    <span className="text-slate-400"> ({p.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between mt-auto pt-1">
                    <ActionBtn p={p} />
                    {p.price > 0 && (
                      <span className="text-sm font-bold text-teal-700">{p.price} ₪</span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* الترقيم */}
          {pages > 1 && (
            <div className="flex flex-wrap justify-center items-center gap-1 mt-8 text-sm">
              <button
                disabled={current === 1}
                onClick={() => setPage(current - 1)}
                className="px-2.5 py-1 text-teal-700 disabled:opacity-40">
                السابقة
              </button>
              {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`px-2.5 py-1 rounded ${n === current ? 'bg-teal-600 text-white' : 'text-teal-700 hover:bg-teal-50'}`}>
                  {n}
                </button>
              ))}
              <button
                disabled={current === pages}
                onClick={() => setPage(current + 1)}
                className="px-2.5 py-1 text-teal-700 disabled:opacity-40">
                التالية
              </button>
            </div>
          )}
        </main>

        {/* ===== أقسام الكمبيوتر: قائمة جانبية ===== */}
        <aside className="hidden lg:block w-52 shrink-0">
          <ul className="sticky top-20 space-y-1">
            {CATS.map((c) => (
              <li key={c}>
                <button
                  onClick={() => chooseCat(c)}
                  className={`w-full text-right px-3 py-1.5 rounded-lg ${c === cat ? 'bg-teal-600 text-white font-bold' : 'text-teal-700 hover:bg-teal-50'}`}>
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* ===== النوافذ المنبثقة ===== */}
      {modal && (
        <div
          className="fixed inset-0 z-50 bg-black/50 grid place-items-center p-4"
          onClick={() => setModal(null)}>
          <div
            className="bg-white rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto p-5 relative"
            onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setModal(null)}
              className="absolute top-3 left-3 text-xl text-slate-400">
              ✕
            </button>

            {modal.kind === 'options' && (
              <>
                <h2 className="text-lg font-bold mb-1">{modal.product.name}</h2>
                <p className="text-sm text-slate-500 mb-4">اختاري الطريقة اللي تناسبك:</p>
                <button
                  onClick={() => addToCart(modal.product.id)}
                  className="w-full mb-2 py-2.5 rounded-lg bg-teal-600 text-white">
                  🛒 شراء بـ {modal.product.price} ₪
                </button>
                <button
                  onClick={() => setModal({ kind: 'swap', product: modal.product })}
                  className="w-full py-2.5 rounded-lg border-2 border-teal-600 text-teal-700">
                  🔄 اقتراح مقايضة
                </button>
              </>
            )}

            {modal.kind === 'swap' && (
              <SwapForm
                product={modal.product}
                onSend={() => {
                  setModal(null);
                  showToast('تم إرسال عرض المقايضة ✅');
                }}
              />
            )}

            {modal.kind === 'cart' && (
              <>
                <h2 className="text-lg font-bold mb-2">سلة المشتريات</h2>
                {cart.length === 0 && (
                  <p className="text-center py-8 text-slate-500">السلة فاضية 🛒</p>
                )}
                {cart.map((i) => {
                  const p = find(i.id);
                  return (
                    <div key={i.id} className="flex items-center gap-2 py-2 border-b text-sm">
                      <span className="flex-1">{p.name}</span>
                      <button
                        onClick={() => changeQty(i.id, -1)}
                        className="w-6 h-6 rounded bg-slate-100">
                        −
                      </button>
                      <span>{i.qty}</span>
                      <button
                        onClick={() => changeQty(i.id, 1)}
                        className="w-6 h-6 rounded bg-slate-100">
                        +
                      </button>
                      <span className="w-14 text-left font-bold">{p.price * i.qty}₪</span>
                    </div>
                  );
                })}
                {cart.length > 0 && (
                  <>
                    <div className="flex justify-between font-bold my-3">
                      <span>المجموع</span>
                      <span>{total} ₪</span>
                    </div>
                    <button
                      onClick={() => {
                        setCart([]);
                        setModal(null);
                        showToast('تم إرسال طلبك ✅');
                      }}
                      className="w-full py-2.5 rounded-lg bg-teal-600 text-white">
                      إتمام الطلب
                    </button>
                  </>
                )}
              </>
            )}

            {modal.kind === 'favs' && (
              <>
                <h2 className="text-lg font-bold mb-2">المفضلة</h2>
                {favs.length === 0 && (
                  <p className="text-center py-8 text-slate-500">ما في مفضلات لسا ♡</p>
                )}
                {favs.map((id) => (
                  <div key={id} className="flex items-center gap-2 py-2 border-b text-sm">
                    <span className="flex-1">{find(id).name}</span>
                    <button onClick={() => toggleFav(id)} className="text-red-500 text-lg">
                      ♥
                    </button>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* رسالة صغيرة */}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-sm px-4 py-2 rounded-full z-50">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------- نموذج المقايضة ---------- */
function SwapForm({ product, onSend }) {
  const [offer, setOffer] = useState('');
  const [note, setNote] = useState('');
  return (
    <>
      <h2 className="text-lg font-bold mb-3">مقايضة على: {product.name}</h2>
      <label className="text-sm">شو بدك تعرضي بالمقابل؟</label>
      <input
        value={offer}
        onChange={(e) => setOffer(e.target.value)}
        placeholder="مثال: سماعات + 50 شيكل"
        className="w-full border rounded-lg p-2 my-2 text-sm"
      />
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={3}
        placeholder="ملاحظات للبائع (اختياري)"
        className="w-full border rounded-lg p-2 mb-3 text-sm"
      />
      <button
        onClick={() => offer.trim() && onSend()}
        disabled={!offer.trim()}
        className="w-full py-2.5 rounded-lg bg-emerald-700 text-white disabled:opacity-50">
        إرسال العرض
      </button>
    </>
  );
}

/* ---------- صورة المنتج (مع بديل لو الصورة مش موجودة) ---------- */
function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed)
    return (
      <div className="w-full h-full grid place-items-center text-slate-400 text-sm">
        لا توجد صورة
      </div>
    );
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="w-full h-full object-cover"
    />
  );
}
