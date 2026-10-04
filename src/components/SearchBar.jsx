import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBar = ({ value, onChange }) => {
  return (
    <div className="relative max-w-xl mx-auto">
      <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="ابحث عن طعام، طاقة، مستلزمات..."
        className="w-full bg-gray-50 border border-gray-200 rounded-lg py-2.5 pr-11 pl-4 text-right text-sm focus:outline-none focus:border-[#2c7a8a] focus:bg-white transition"
      />
    </div>
  );
};

export default SearchBar;