import React from 'react';

type Props = {
  product: {
    id: string;
    img: string;
    name: string;
    price: number;
    link: string;
  };
};

const BoxProduct: React.FC<Props> = ({ product,className }) => {
  return (
    <>
    <div className={`border border-300 p-2 pb-5 text-center ${className}`}>
      <a  href={`/product/${product.id}?label=Sản%20phẩm`} className="text-gray-900 no-underline ">
      <div className="overflow-hidden">
        <img 
          src={product.img} 
          alt={product.name} 
          className="transition-transform duration-300 ease-in-out transform hover:scale-125 w-full h-auto" 
        />
      </div>
        <h3 className="mt-2 text-sm line-clamp-2">{product.name}</h3>
        <p className="mt-1 text-red-700 font-medium">
          {product.price.toLocaleString()} VND
        </p>
      </a>
    </div>
    </>
  );
};

export default BoxProduct;
