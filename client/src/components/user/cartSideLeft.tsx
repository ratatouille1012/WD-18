import React, { FC, useEffect, useState } from 'react';
import ButtonRemoveCart from '../../theme/buttonRemoveCart';

type Props = {
    toggleOBCL: () => void;
};

const CartSideLeft: FC<Props> = ({ toggleOBCL }) => {
    const [isOpenCartLeft, setOpenCartLeft] = useState(true);
    const [cartItems, setCartItems] = useState<any[]>([]);

    const closeOPCL = () => {
        setOpenCartLeft(!isOpenCartLeft);
        toggleOBCL();
    };

    const retrieveCartItems = () => {
        const storedItems = localStorage.getItem('cart');
        if (storedItems) {
            setCartItems(JSON.parse(storedItems));
        }
    };

    const removeItem = (idcart: string) => {
        const updatedCart = cartItems.filter(item => item.idcart !== idcart); 
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    

    const calculateTotal = () =>{
        return cartItems.reduce((total,item) => total + item.price * item.quantity, 0);
    };

    useEffect(() => {
        retrieveCartItems();
    }, []);

    return (
        <div className={`fixed top-0 left-0 w-full h-full z-[300] ${isOpenCartLeft ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="h-full w-[260px] bg-[rgba(255,255,255)] pt-[20px] relative z-10">
                <h2 className='w-full text-center font-bold text-[22px]'>Giỏ Hàng</h2>
                <div className="w-full">
                    <div className="w-[40px] mx-auto mt-3 h-1 bg-slate-300"></div>
                </div>
                <div className="mt-6 overflow-y-auto h-[500px] border-b-2">
                    {cartItems.length === 0 ? (
                        <p className='w-full text-center'>Chưa có sản phẩm trong giỏ hàng</p>
                    ) : (
                        cartItems.map(item => (
                            <div key={item.idcart} className="flex justify-between items-center border-b py-2 px-2">
                                <a href={`/product/${item.id}?label=Sản%20phẩm`} className='w-36'><img src={item.image} alt={item.name} className="w-16 h-16 object-cover" /></a>
                                <div className="ml-2 flex-grow">
                                    <h3 className="text-sm font-semibold line-clamp-3">{item.name}</h3>
                                    <div className="flex gap-x-4">
                                        <p className="text-xs text-gray-500">Màu: {item.color}</p>
                                        <p className="text-xs text-gray-500">Kích cỡ: {item.size}</p>
                                    </div>    
                                    <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>                               
                                    <p className="text-xs text-gray-500">
                                        Giá: {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </p>
                                </div>
                                <button onClick={() => removeItem(item.idcart)} className="text-red-500 text-lg ml-2">
                                    X
                                </button>
                            </div>
                        ))
                    )}
                </div>
                <div className="absolute bottom-0  w-full p-4">
                    <div className="">Tổng: <span className='font-medium text-red-500'>{calculateTotal().toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span></div>
                    <div className="flex mt-4 gap-x-2">
                        <a className='w-full' href={`/cart/?label=Giỏ%20Hàng`}>
                            <button className="bg-blue-500  mb-2 text-white font-bold w-full py-2 px-4 rounded hover:bg-blue-700 transition duration-300">
                            Giỏ Hàng
                            </button>
                        </a>
                        <ButtonRemoveCart style={`w-full`} setCartItems={setCartItems}/>
                    </div>
                </div>
            </div>
            <button onClick={closeOPCL} className="absolute top-2 right-3 text-[24px] text-white">X</button> 
        </div>
    );
};

export default CartSideLeft;
