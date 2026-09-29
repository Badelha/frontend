import React from 'react';

const Pagination = ({ current, total, onChange }) => {
  const pages = [];
  for (let i = 1; i <= Math.min(total, 6); i++) pages.push(i);

  return (
    <div className="flex justify-center items-center gap-4 mt-10 text-sm">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="text-gray-600 hover:text-[#2c7a8a] font-medium disabled:opacity-40"
      >
        الصفحة السابقة
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`transition ${
            current === p
              ? 'text-[#2c7a8a] font-extrabold'
              : 'text-gray-600 hover:text-[#2c7a8a]'
          }`}
        >
          {p}
        </button>
      ))}

      <span className="text-gray-400">......</span>

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="text-gray-600 hover:text-[#2c7a8a] font-medium disabled:opacity-40"
      >
        الصفحة التالية
      </button>
    </div>
  );
};

export default Pagination;