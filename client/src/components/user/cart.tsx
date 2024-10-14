import React, { useEffect, useState, useMemo } from 'react';
import Trash from '../../svg/trash';
import ButtonRemoveCart from '../../theme/buttonRemoveCart';

type CartItem = {
    idcart: number;
    name: string;
    price: number;
    quantity: number;
    color: string;
    size: string;
    image: string; 
};

const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
};

const Cart = () => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [checkOut, setischeckOut] = useState(false);
    const [shippingOption, setShippingOption] = useState('regular'); 
    const [shippingFee, setShippingFee] = useState(15000);
    const [voucherCode, setVoucherCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isVoucherValid, setIsVoucherValid] = useState(false);
    console.log(cartItems);

    useEffect(() => {
        const retrieveCartItems = () => {
            const storedItems = localStorage.getItem('cart');
            if (storedItems) {
                const parsedItems = JSON.parse(storedItems);
                console.log('Retrieved items:', parsedItems);
                setCartItems(parsedItems);
            }
        };

        retrieveCartItems();

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'cart') {
                retrieveCartItems();    
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const removeItem = (id: number) => {
        if (window.confirm('Bạn chắc chắn muốn xóa không?')) {
            const updatedItems = cartItems.filter(item => item.idcart !== id);
            setCartItems(updatedItems);
            localStorage.setItem('cart', JSON.stringify(updatedItems)); 
        }
    };

    const changeQuantity = (id: number, increment: boolean) => {
        const updatedItems = cartItems.map(item => {
            if (item.idcart === id) {
                const newQuantity = increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        setCartItems(updatedItems);
        localStorage.setItem('cart', JSON.stringify(updatedItems));
    };

    const handleCheckout = () => {
        setischeckOut(true);
    };

    const handleCheckoutClose = () =>{
        setischeckOut(false);
    }

    const handleShippingChange = (option) => {
        setShippingOption(option);
        setShippingFee(option === 'express' ? 30000 : 15000); 
    };

    const handleVoucherChange = (e) => {
        const code = e.target.value;
        setVoucherCode(code);
        validateVoucher(code); 
    };

    const validateVoucher = (code) => {
        if (code === 'DISCOUNT5') { 
            setDiscount(5); 
            setIsVoucherValid(true);
        } else {
            setDiscount(0); 
            setIsVoucherValid(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.removeItem('cart');
        setCartItems([]);
        setischeckOut(false);
        alert('Thanh toán thành công');
    };

    const totalAmount = useMemo(() => {
        return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }, [cartItems]);

    return (
        <>
            {cartItems.length === 0 ? (
                <p className='w-full text-center mt-7'>Chưa có sản phẩm trong giỏ hàng</p>
            ) : (
                <div className="w-full mt-10">
                    <div className="overflow-x-auto">
                        <table className='table w-full  text-[#666666]'>
                            <thead className='h-[64px]'>
                                <tr>
                                    <th className='border font-normal w-2/5'>Sản phẩm</th>
                                    <th className='border font-normal'>Giá</th>
                                    <th className='border font-normal'>Số lượng</th>
                                    <th className='border font-normal'>Tổng Tiền</th>
                                    <th className='border font-normal'></th>
                                </tr>
                            </thead>
                            <tbody className='text-black'>
                                {cartItems.map(item => (
                                    <tr key={item.idcart} className='h-[120px]'>
                                        <td className='border p-4'>
                                            <div className="flex gap-x-4">
                                                <img src={item.image} alt={item.name} className="h-full w-[120px]" />
                                                <div className='xs:hidden sm:hidden md:block'>
                                                    <h2 className='font-bold line-clamp-2'>{item.name}</h2>
                                                    <p className='font-medium text-[18px]'>Màu: <span className='text-[#666666]'>{item.color}</span></p>
                                                    <p className='font-medium text-[18px]'>Size: <span className='text-[#666666]'>{item.size}</span></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border p-4 text-center'>{formatPrice(item.price)}</td>
                                        <td className='border p-4'>
                                            <div className="flex items-center justify-between">
                                                <button onClick={() => changeQuantity(item.idcart, false)}>-</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => changeQuantity(item.idcart, true)}>+</button>
                                            </div>
                                        </td>
                                        <td className='border p-4 text-center'>{formatPrice(item.price * item.quantity)}</td>
                                        <td className='border text-center p-4'>
                                            <button onClick={() => removeItem(item.idcart)} aria-label="Remove item">
                                                <Trash />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-4 flex-row-reverse mt-4">
                        <h3>Tổng cộng: {formatPrice(totalAmount)}</h3>
                    </div>
                    <div className="flex gap-4 flex-row-reverse mt-2">
                        <ButtonRemoveCart setCartItems={setCartItems} />
                        <button onClick={() => handleCheckout()} className='bg-gray-700 mb-2 text-white font-bold py-2 px-4 rounded hover:bg-gray-800 transition duration-300'>
                            Thanh Toán
                        </button>
                    </div>
                </div>
            )}
            {checkOut && (
            <div className="fixed w-full top-0 left-0 h-full z-[300]">
                <div className="absolute inset-0 bg-black top-0 opacity-60" />
                <div className="absolute w-full sm:mt-0 md:mt-10">
                    <div className="font-[sans-serif] bg-white p-4 md:max-w-2xl max-w-xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-10">
                            <div className="lg:col-span-2 max-lg:order-1">
                                <form  onSubmit={handleSubmit} className="xs:flex xs:flex-col-reverse md:flex md:flex-row justify-between">
                                    <div className="max-w-lg">
                                        <h2 className="text-2xl font-extrabold text-gray-800">Thông tin người nhận</h2>
                                        <div className="grid gap-4 mt-8">
                                            <input type="text" placeholder="Họ và tên" className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none" />
                                            <div className="flex bg-white border-b-2 focus-within:border-gray-800 overflow-hidden">
                                                <input type="number" placeholder="SĐT" className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm outline-none" />
                                            </div>
                                            <div className=" grid xs:grid-cols-2 md:grid-cols-1 gap-6">
                                                <input type="text" placeholder="Địa chỉ" className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none" />
                                                <input 
                                                    value={voucherCode}
                                                    onChange={handleVoucherChange} 
                                                    type="text" placeholder="Voucher" 
                                                    className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none" 
                                                />
                                            </div>
                                            <div className="gap-x-2 flex mt-4">
                                                <h2 className='font-medium'>Vận chuyển:</h2>
                                                <div className="flex items-center">
                                                    <input type="radio" className="w-5 h-5 cursor-pointer" name="ship" value="regular" checked={shippingOption === 'regular'} onChange={() => handleShippingChange('regular')} />
                                                    <label htmlFor="regular" className="ml-4 flex gap-2 cursor-pointer">Thường</label>
                                                </div>
                                                <div className="flex items-center">
                                                    <input type="radio" className="w-5 h-5 cursor-pointer" name="ship" value="express" checked={shippingOption === 'express'} onChange={() => handleShippingChange('express')} />
                                                    <label htmlFor="express" className="ml-4 flex gap-2 cursor-pointer">Hỏa tốc</label>
                                                </div>
                                            </div>
                                            <div className="flex items-center">
                                                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                                                <label htmlFor="remember-me" className="ml-3 block text-sm">
                                                    Tôi chấp nhận <a href="javascript:void(0);" className="text-blue-600 font-semibold hover:underline ml-1">Các điều khoản và Điều kiện</a>
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-4 mt-8">
                                            <button onClick={() => handleCheckoutClose()} type="button" className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">Trở lại</button>
                                            <button type="submit" className="min-w-[150px] px-6 py-3.5 text-sm bg-gray-800 text-white rounded-md hover:bg-[#111]">Thanh toán</button>
                                        </div>
                                    </div>


                                    <div className="bg-gray-100 p-6 rounded-md">
                                        <h2 className="text-4xl font-extrabold text-gray-800">{formatPrice(totalAmount)}</h2>
                                        <ul className="text-gray-800 mt-8 space-y-4">
                                            <li className="flex flex-wrap gap-4 text-sm">Phí ship <span className="ml-auto font-bold">{shippingFee.toLocaleString()} VND</span></li>
                                            <li className="flex flex-wrap gap-4 text-sm">Voucher <span className="ml-auto font-bold">-{discount.toLocaleString()}%</span></li>
                                            <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">0%</span></li>
                                            <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total <span className="ml-auto">{(shippingFee + totalAmount - (totalAmount * discount/100)).toLocaleString()} VND</span></li>
                                        </ul>
                                    </div>
                                </form>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default Cart;
