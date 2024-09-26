import React from 'react';

const BoxNewsText = ({ product }) => {
    return (
      <div className="border bg-[#EAEAEA] border-gray-300 mt-7 h-[200px] flex">
        <img src={product.img} alt={product.title} className="w-full h-auto" />
        <div className="px-3 py-4">
            <h3 className="text-lg font-semibold  line-clamp-1">{product.title}</h3>
            <p className="text-xs text-gray-500 ">{product.date}</p>
            <div className="text-[#D2D2D2]">_______</div>
            <p className="text-base line-clamp-3">{product.text}</p>
        </div>
      </div>
    );
  };
  

export default BoxNewsText;
