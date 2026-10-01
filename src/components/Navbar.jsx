import React from 'react';
import { FaUser, FaChevronDown, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-l from-brand to-brand-light text-white shadow-md">
      <div className="w-[80%] mx-auto px-4 py-3 flex justify-between items-center">

        <div className="text-right">
          <img
            src="/images/logo.png"
            alt="بدلها"
            className="h-20 w-auto object-contain"
          />
        </div>

        <div className="hidden md:flex gap-8 text-base font-medium">
          <Link to="/" className="hover:text-brand-sky transition">الرئيسية</Link>
          <a href="#" className="hover:text-brand-sky transition">من نحن</a>
          <Link to="/products" className="hover:text-brand-sky transition">السوق</Link>
          <a href="#" className="hover:text-brand-sky transition">اتصل بنا</a>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 border border-white/60 px-4 py-2 rounded-full hover:bg-white hover:text-brand transition-all text-sm font-medium">
            <FaChevronDown size={10} /> دير البلح
          </button>

          <Link
            to="/add-product"
            className="flex items-center gap-2 border border-white/60 px-4 py-2 rounded-full hover:bg-white hover:text-brand transition-all text-sm font-medium"
          >
            <FaPlus size={12} /> اضافة منتج
          </Link>

          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur flex items-center justify-center border-2 border-white/40">
            <FaUser size={20} />
          </div>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;