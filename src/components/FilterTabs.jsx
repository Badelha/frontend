import React from 'react';

const tabs = [
  { id: 'all', label: 'الكل' },
  { id: 'sale', label: 'بيع' },
  { id: 'exchange', label: 'تبادل' },
  { id: 'both', label: 'بيع / تبادل' },
];

const FilterTabs = ({ active, onChange }) => {
  return (
    <div className="flex gap-2 justify-center mt-4 flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`px-5 py-1.5 rounded-md border text-sm font-bold transition ${
            active === tab.id
              ? 'bg-[#2c7a8a] text-white border-[#2c7a8a]'
              : 'bg-white text-gray-600 border-gray-300 hover:border-[#2c7a8a] hover:text-[#2c7a8a]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;