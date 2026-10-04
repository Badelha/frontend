import React from 'react';
import { FaHeart, FaStar, FaStarHalfAlt, FaRegStar, FaExchangeAlt } from 'react-icons/fa';

const ProductCard = ({ product }) => {

  const renderBadge = () => {
    if (product.type === 'sale') {
      return (
        <span className="absolute top-2 right-2 bg-green-600 text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
          🏷️ بيع
        </span>
      );
    }
    if (product.type === 'exchange') {
      return (
        <span className="absolute top-2 right-2 bg-[#2c7a8a] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
          <FaExchangeAlt size={9} /> مقايضة
        </span>
      );
    }
    return (
      <span className="absolute top-2 right-2 bg-[#2c7a8a] text-white text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
        <FaExchangeAlt size={9} /> مقايضة / بيع
      </span>
    );
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) stars.push(<FaStar key={i} className="text-yellow-400" size={11} />);
      else if (rating >= i - 0.5) stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" size={11} />);
      else stars.push(<FaRegStar key={i} className="text-yellow-400" size={11} />);
    }
    return stars;
  };

  const renderAction = () => {
    const labels = {
      sale: 'أضف للسلة',
      exchange: 'اقتراح مقايضة',
      both: 'عرض الخيارات',
    };
    return (
      <button className="bg-[#2c7a8a] text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-[#1e3a5f] transition whitespace-nowrap">
        {labels[product.type] || 'عرض'}
      </button>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 group">

      <div className="relative h-36 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {renderBadge()}
      </div>

      <div className="p-3">

        <div className="flex items-center justify-between gap-2 mb-1.5">
          <button className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition flex-shrink-0">
            <FaHeart size={12} />
          </button>
          <h3 className="font-bold text-gray-800 text-sm text-right flex-1 line-clamp-1">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-end gap-1 mb-2">
          <span className="text-[10px] text-gray-500">({product.reviewsCount})</span>
          <div className="flex gap-0.5">{renderStars(product.rating)}</div>
        </div>

        <div className="flex items-center justify-between gap-2">
          {renderAction()}
          {product.price && (
            <span className="text-[#2c7a8a] font-extrabold text-base whitespace-nowrap">
              {product.price} <span className="text-[10px]">₪</span>
            </span>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductCard;