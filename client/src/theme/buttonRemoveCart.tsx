import React from 'react';
import useCart from '../hook/useCart';

type Props = {
    setCartItems: (items: any[]) => void;
};

const ButtonRemoveCart: React.FC<Props> = ({ userId,style }) => {
    const {DeleteAll } = useCart();
    const removeCart = () => {
        DeleteAll(userId)
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
