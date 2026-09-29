import React from 'react';
import { categories } from '../data/mockProducts';

const Sidebar = ({ activeCategory, onChange }) => {
  return (
    <aside className="w-full lg:w-44 flex-shrink-0">
      <ul className="space-y-1">
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => onChange(cat.id)}
              className={`w-full text-right px-3 py-2 text-sm transition rounded-md ${
                activeCategory === cat.id
                  ? 'text-[#2c7a8a] font-bold'
                  : 'text-gray-600 hover:text-[#2c7a8a]'
              }`}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;