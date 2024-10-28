import React, { useEffect, useState, useMemo } from 'react';
import Trash from '../../svg/trash';
import ButtonRemoveCart from '../../theme/buttonRemoveCart';
import useCart from '../../hook/useCart';
import useVariant from '../../hook/useVariant';
import useProduct from '../../hook/useProduct';
import useOrder from '../../hook/useOder';
const generateOrderCode = () => {
    return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
const Cart = () => {
    const [checkOut, setischeckOut] = useState(false);
    const [shippingOption, setShippingOption] = useState('regular'); 
    const [shippingFee, setShippingFee] = useState(15000);
    const [voucherCode, setVoucherCode] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isVoucherValid, setIsVoucherValid] = useState(false);
    const { cart, loadingCart,Delete,updateCart,setCart } = useCart();
    const { variant, loadingVariant,getOne } = useVariant();
    const { getProductByVariantId,productDetails } = useProduct();
    const [userName, setUserName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const {createOrder} = useOrder();
    const {DeleteAll } = useCart();

    const fetchProductDetails = async () => {
        await Promise.all(cart.map(item => {
            if (item.variantId) {
                return getProductByVariantId(item.variantId);
            }
        }));
    };

    useEffect(() => {
        fetchProductDetails();
    }, [cart]);

    useEffect(() => {
        fetchProductDetails();
        cart.forEach(item => {
            if (item.variantId) {
                getOne(item.variantId);
            }
        });
    }, [cart]);

    const calculateTotal = () => {
        if (!Array.isArray(cart)) {
            console.error("Cart is not an array:", cart);
            return 0; 
        }
    
        return cart.reduce((total, item) => {
            const product = productDetails[item.variantId];
            return product ? total + (product.price * item.variantQuantity) : total;
        }, 0);
    };
    
    const total = calculateTotal();
    const getUserId = () => {
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            return user._id; 
        }
        return null; 
    };
    const changeQuantity = async (itemId, increment) => {
        console.log(itemId, increment);
        
        const updatedCart = cart.map(item => {
            if (item._id === itemId) {
                const newQuantity = item.variantQuantity + increment;
    
                if (newQuantity < 1) {
                    alert('Số lượng không thể nhỏ hơn 1.');
                    return item;
                }
    
                const variants = variant[item.variantId];
                const availableQuantity = variants?.quantity || 0;
    
                if (newQuantity > availableQuantity) {
                    alert(`Chỉ còn ${availableQuantity} sản phẩm.`);
                    return item;
                }
    
                updateCart(item._id, newQuantity);
                return { ...item, variantQuantity: newQuantity };
            }
            return item;
        });
    
        setCart(updatedCart);
    };
    
    const userId = getUserId();
    console.log(userId);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderDetails = {
            user: getUserId(), 
            orderCode: generateOrderCode(),
            orderItems: cart,
            total: (shippingFee + total - (total * discount / 100)),
            voucherCode: discount > 0 ? voucherCode : null,
            name: userName,
            phone: phone,
            address: address,
        };

        try {
            const orderResponse = await createOrder(orderDetails);
            console.log('Order created successfully:', orderResponse);
            alert('Thanh toán thành công');
            localStorage.removeItem('cart');
            DeleteAll(userId)
        } catch (error) {
            console.error('Error creating order:', error);
            alert('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    console.log("cart:",cart);
    
    return (
        <>
            {cart.length === 0 ? (
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
                                {cart.map((item,index) => {
                                    const product = productDetails[item.variantId];
                                    const variants = variant[item.variantId];
                                    
                                    
                                    console.log("asdadqwfr",product,variants);
                                    if (!product) {
                                        console.warn(`Product not found for variant ID: ${item.variantId}`);
                                        return (
                                            <div key={index} className="flex justify-between items-center border-b py-2 px-2">
                                                <p>Product not found for variant ID: {item.variantId}</p>
                                            </div>
                                        );
                                    }
        
                                    if (!product) {
                                        return (
                                            <div key={index} className="flex justify-between items-center border-b py-2 px-2">
                                                <p>Product not found for variant ID: {item.variantId}</p>
                                            </div>
                                        );
                                    }
                                    const colorName = variants?.color?.name || 'N/A';
                                    const sizeName = variants?.size?.name || 'N/A';
                                    
                                    return (
                                        <tr key={index} className='h-[120px]'>
                                        <td className='border p-4'>
                                            <div className="flex gap-x-4">
                                                <img src={product.images[0]} alt={product.title} className="h-full w-[120px]" />
                                                <div className='xs:hidden sm:hidden md:block'>
                                                    <h2 className='font-bold line-clamp-2'>{product.title}</h2>
                                                    <p className='font-medium text-[18px]'>Màu: <span className='text-[#666666]'>{colorName}</span></p>
                                                    <p className='font-medium text-[18px]'>Size: <span className='text-[#666666]'>{sizeName}</span></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border p-4 text-center'>{product.price.toLocaleString()} VNĐ</td>
                                        <td className='border p-4'>
                                            <div className="flex items-center justify-between">
                                                <button onClick={() => changeQuantity(item._id, 1)}>+</button>
                                                <span>{item.variantQuantity}</span>
                                                <button onClick={() => changeQuantity(item._id, -1)}>-</button>
                                            </div>
                                        </td>
                                        <td className='border p-4 text-center'>{(product.price * item.variantQuantity).toLocaleString()} VNĐ</td>
                                        <td className='border text-center p-4'>
                                            <button onClick={() => Delete(item._id)} aria-label="Remove item">
                                                <Trash />
                                            </button>
                                        </td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex gap-4 flex-row-reverse mt-4">
                        <h3>Tổng cộng: {total.toLocaleString()} VNĐ</h3>
                    </div>
                    <div className="flex gap-4 flex-row-reverse mt-2">
                        <ButtonRemoveCart userId={userId} />
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
                                            <input type="text" placeholder="Họ và tên" value={userName} onChange={(e) => setUserName(e.target.value)} className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none" />
                                            <div className="flex bg-white border-b-2 focus-within:border-gray-800 overflow-hidden">
                                                <input type="number" placeholder="SĐT" value={phone} onChange={(e) => setPhone(e.target.value)} className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm outline-none" />
                                            </div>
                                            <div className=" grid xs:grid-cols-2 md:grid-cols-1 gap-6">
                                                <input type="text" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none" />
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


                                    <div className="bg-gray-100 p-6 rounded-md w-[300px]">
                                        <h2 className="text-4xl font-extrabold text-gray-800">{total.toLocaleString()} </h2>
                                        <div className="tt-2 max-h-52 overflow-y-auto ">
                                                {cart.map((item,index) => {
                                                    const product = productDetails[item.variantId];
                                                    const variants = variant[item.variantId];
                                                    
                                                    
                                                    console.log("asdadqwfr",product,variants);
                                                    if (!product) {
                                                        console.warn(`Product not found for variant ID: ${item.variantId}`);
                                                        return (
                                                            <div key={index} className="flex justify-between items-center border-b py-2 px-2">
                                                                <p>Product not found for variant ID: {item.variantId}</p>
                                                            </div>
                                                        );
                                                    }
                        
                                                    if (!product) {
                                                        return (
                                                            <div key={index} className="flex justify-between items-center border-b py-2 px-2">
                                                                <p>Product not found for variant ID: {item.variantId}</p>
                                                            </div>
                                                        );
                                                    }
                                                    return(
                                                        <div key={index} className="flex items-center border-b py-2">
                                                        <img src={product.images[0]} alt={product.title} className="h-12 w-12 object-cover mr-2" />
                                                        <div className="flex flex-col">
                                                            <span className="font-medium line-clamp-2">{product.title}</span>
                                                            <span className="text-sm">Số lượng: {item.variantQuantity}</span>
                                                            <span className="text-sm">{product.price.toLocaleString()} VNĐ</span>
                                                        </div>
                                                    </div>
                                                    )
                                                }
                                                )}
                                        </div>
                                        <ul className="text-gray-800 mt-8 space-y-4">
                                            <li className="flex flex-wrap gap-4 text-sm">Phí ship <span className="ml-auto font-bold">{shippingFee.toLocaleString()} VND</span></li>
                                            <li className="flex flex-wrap gap-4 text-sm">Voucher <span className="ml-auto font-bold">-{discount.toLocaleString()}%</span></li>
                                            <li className="flex flex-wrap gap-4 text-sm">Tax <span className="ml-auto font-bold">0%</span></li>
                                            <li className="flex flex-wrap gap-4 text-sm font-bold border-t-2 pt-4">Total <span className="ml-auto">{(shippingFee + total - (total * discount/100)).toLocaleString()} VND</span></li>
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
