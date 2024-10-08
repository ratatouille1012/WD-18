import React from 'react';

type Props = {
    setCartItems: (items: any[]) => void;
};

const ButtonRemoveCart: React.FC<Props> = ({ setCartItems,style }) => {
    const removeCart = () => {
        localStorage.removeItem('cart');
        setCartItems([]);
    };

    return (
        <button 
            onClick={removeCart} 
            className={`bg-red-500 mb-2 text-white font-bold  py-2 px-4 rounded hover:bg-red-700 transition duration-300 ${style}`}
        >
            Xóa Giỏ Hàng
        </button>
    );
};

export default ButtonRemoveCart;
