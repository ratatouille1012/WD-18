import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Rating } from "@material-tailwind/react";

const menuProduct = [
    {
        id: "1",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/nike-air-zoom-pegasus-38-cw7356-101-01-300x300.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 1000000,
        link: "/product/1",
        submenu: [
            {   
                img1:"https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/nike-air-zoom-pegasus-38-cw7356-101-01-300x300.jpg",
                img2:"https://bizweb.dktcdn.net/100/413/756/products/air-zoom-pegasus-38-running-shoes-hmsj6q.jpg?v=1633072850363",
                img3:"https://bizweb.dktcdn.net/100/413/756/products/air-zoom-pegasus-38-running-shoes-hmsj6q-1.jpg?v=1633072850363",
                img4:"https://bizweb.dktcdn.net/100/413/756/products/air-zoom-pegasus-38-running-shoes-hmsj6q-2.jpg?v=1633072850363",
                title:"Reebok SOLEFURY DV6923",
                text:(`
                Được thiết kế phù hợp phong cách thường ngày, những đôi giày nam táo bạo mang hơi hướng thời trang đường phố từ cảm hứng dáng điệu từ những đôi Reebok tiền bối.

                Chúng được thiết kế với đế đệm ngoài riêng biệt thể hiện sự tôn kính đối với mẫu giày chạy bộ của những năm 90. Mũi giày mang đến cảm giác vững chắc mà vẫn tinh tế.

                Miếng lót giày xốp EVA có thể tháo rời giúp bạn thoải mái cả ngày dài, trong khi đó đế ngoài bằng cao su làm tăng sức bền cho đôi giày.

                `),
                imgTitle:"https://bizweb.dktcdn.net/100/347/092/files/z-dv6923-01.jpg?v=1580908389890",
            }
        ]
    },
    {
        id: "2",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/ultraboost-pb-shoes-blue-eg0426-01-standard-400x400.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 4000000,
        link: "/product/2",
    },
    {
        id: "3",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/z-g28999-02-400x400.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 3000000,
        link: "/product/3",
    },
    {
        id: "4",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-furysole-dv4481-1-400x400.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 2000000,
        link: "/product/4",
    },
    {
        id: "5",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/puma-love-wns-372104-03-30861-1-400x400.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 1000000,
        link: "/product/5",
    },
];

const menuFilter = [
    {
        id: "2",
        title: "Size",
        subMenu: [
            { id: "2-1", title: "39" },
            { id: "2-2", title: "40"  },
            { id: "2-3", title: "41"  },
            { id: "2-4", title: "42"  },
            { id: "2-5", title: "43" },
            { id: "2-6", title: "44" },
            { id: "2-7", title: "45" }
        ]
    },
    {
        id: "3",
        title: "Màu",
        subMenu: [
            { id: "3-1", title: "Xanh",style:"blue" },
            { id: "3-2", title: "Đỏ",style:"red" },
            { id: "3-3", title: "Trắng",style:"white" },
            { id: "3-4", title: "Đen",style:"black" },
            { id: "3-5", title: "Vàng",style:"yellow" }
        ]
    }
];

const DetailP = () => {
    const { id } = useParams();
    const product = menuProduct.find(item => item.id === id);
    const [currentImage, setCurrentImage] = useState(product.img);
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [count, setCount] = useState(1);
    const [activeButton, setActiveButton] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const handleImageClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleClick = (index) => {
        setActiveButton(index);
    };

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    const handleChange = (event) => {
        setSelectedSize(event.target.value);
    };
    
    const handleChangeColor = (event) => {
        setSelectedColor(event.target.value);
    };

    const generateRandomId = () => {
        return 'cart-' + Math.random().toString(36).substr(2, 9);
    };
    const handleAddToCart = () => {
        const cartItem = {
            idcart: generateRandomId(),
            id: product.id,
            name: product.name,
            price: product.price,
            image: currentImage,
            size: selectedSize,
            color: selectedColor,
            quantity: count,
        };
    
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItemIndex = existingCart.findIndex(item => 
            item.id === cartItem.id && item.size === cartItem.size && item.color === cartItem.color
        );
    
        if (existingItemIndex > -1) {
            existingCart[existingItemIndex].quantity += cartItem.quantity;
        } else {
            existingCart.push(cartItem);
        }
    
        localStorage.setItem('cart', JSON.stringify(existingCart));
        setCount(1);
        setSelectedSize('');
        setSelectedColor('');
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    
        window.location.reload();
    }
    
    
    if (!product) {
        return <div>Không tìm thấy sản phẩm.</div>;
    }

    const submenuImages = product.submenu && product.submenu[0] 
        ? Object.values(product.submenu[0]).slice(0, 4) 
        : [];

    const submenu = product.submenu && product.submenu[0];
    return (
        <>
            <div className="font-sans bg-white mt-16 mb-10">
                <div className=" lg:max-w-7xl max-w-4xl mx-auto">
                    <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12 ">
                    <div className="lg:col-span-3 flex w-full lg:sticky top-0 text-center">
                    <div className="flex flex-col gap-y-6 mr-4">
                            {submenuImages.length > 0 ? (
                                submenuImages.map((img, index) => (
                                    <div key={index} className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] cursor-pointer" onClick={() => setCurrentImage(img)}>
                                        <img src={img} alt={`Product image ${index + 1}`} className="w-full" />
                                    </div>
                                ))
                            ) : (
                                <div className="w-24 h-20 flex items-center justify-center rounded-lg p-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]">
                                    <img src="https://via.placeholder.com/150" alt="No images available" className="w-full" />
                                </div>
                            )}
                        </div>
                        <div className="px-4 py-10 w-full h- rounded-lg shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] relative">
                            <img src={currentImage} alt="Product" className="w-3/4 rounded object-cover mx-auto" onClick={handleImageClick} />
                            {isOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={handleClose}>
                                <img 
                                    src={currentImage} 
                                    alt="Product" 
                                    className="max-h-screen max-w-full object-contain" 
                                />
                                </div>
                            )}
                            <button type="button" className="absolute top-4 right-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20px" fill="#ccc" className="mr-1 hover:fill-[#333]" viewBox="0 0 64 64">
                                    <path d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z" />
                                </svg>
                            </button>
                        </div>
                    </div>


                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-extrabold text-gray-800">{product.name}</h2>
                            <div className="text-2xl text-[#E5E5E5]">__________</div>
                            <div className="text-[#FF6634] font-bold text-[1.5em] py-3">{product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</div>
                            <div className="leading-[1.6] font-bold">Hàng xách tay Nhật, Fullbox, Cam kết 100% chính hãng, Phát hiện hàng giả xin đền 10 lần tiền. </div>
                            <div className="leading-[1.6] font-bold py-6">Miễn phí đổi size | đổi mẫu trong 1 tuần !!!</div>
                            <div className="flex"><span className='mr-2 font-semibold'>Size:</span>{selectedSize && <h2 className=""> {selectedSize}</h2>}</div>
                            <div className="flex gap-x-2 my-2">
                            {menuFilter[0].subMenu.map((item) => (
                                <div key={item.id} className="relative w-9 h-9">
                                    <input
                                        type="radio"
                                        className="w-9 h-9 absolute appearance-none border  checked:border-gray-300 border-black checked:border-[3px] checked:border-transparent rounded-sm cursor-pointer z-10"
                                        value={item.title}
                                        name="size"
                                        onChange={handleChange}
                                    />
                                    <label className="w-9 h-9 flex justify-center items-center relative">
                                        {item.title}
                                    </label>
                                </div>
                            ))}
                            </div>
                            <div className="flex"><span className='mr-2 font-semibold'>Màu:</span>{selectedColor && <h2 className=""> {selectedColor}</h2>}</div>
                            <div className="flex gap-x-2 my-2">
                            {menuFilter[1].subMenu.map((item) => (
                                <div key={item.id} className="relative w-9 h-9">
                                    <input
                                        type="radio"
                                        style={{ backgroundColor: item.style }}
                                        className={`w-6 h-6 absolute appearance-none border rounded-full border-gray-300 checked:border-black checked:border-[3px] checked:border-transparent cursor-pointer z-10`}
                                        value={item.title}
                                        name="color"
                                        onChange={handleChangeColor}
                                    />
                                </div>
                            ))}
                            </div>
                            <div className="border-dashed border-t mt-8 py-6 flex gap-x-6">
                                <div className="flex items-center w-28 justify-between border">
                                    <button 
                                        className="bg-[#F9F9F9] boder p-2 "
                                        onClick={handleDecrement}
                                    >
                                        -
                                    </button>
                                    <span className="text-xl  px-6">{count}</span>
                                    <button 
                                        className="bg-[#F9F9F9] border p-2 "
                                        onClick={handleIncrement}
                                    >
                                        +
                                    </button>
                                </div>
                                <button  onClick={handleAddToCart} className='uppercase bg-[#FF6633] text-white font-bold text-[18px] px-4 py-2'>thêm vào giỏ hàng</button>
                            </div>
                            <div className="border-dashed border-t py-2"><span>Mã:</span> N/A</div>
                            <div className="border-dashed border-t py-2"><span>Danh mục:</span> N/A</div>
                            <div className="border-dashed border-t py-2"><span>Brand:</span> N/A</div>
                        </div>
                    </div>
                    <div className="border-t flex gap-x-4 mt-28">
                        <div>
                            <button
                                className={`font-medium text-[14px] inline border-t-4 ${activeButton === 0 ? 'border-[#FF6633]' : 'border-transparent'}`}
                                onClick={() => handleClick(0)}
                            >
                                Mô tả 
                            </button>
                        </div>
                        <div>
                            <button
                                className={`font-medium text-[14px] inline border-t-4 ${activeButton === 1 ? 'border-[#FF6633]' : 'border-transparent'}`}
                                onClick={() => handleClick(1)}
                            >
                                Đánh giá
                            </button>
                        </div>
                    </div>
                    {activeButton === 0 && (
                        <div className="mt-10">
                            <h3 className="text-xl font-bold text-gray-800">{submenu && submenu.title}</h3>
                            <p className='text-base leading-6 text-gray-700 mt-4'>{submenu ? submenu.text : 'Mô tả trống.'}</p>
                            <img className='h-[500px] w-auto mt-5' src={submenu && submenu.imgTitle} alt="none" />
                        </div>
                    )}
                    {activeButton === 1 && (
                        <div className="mt-10 ">
                            <form action="">
                            <h3 className="text-xl font-bold text-gray-800">Đánh giá</h3>
                            <p className='mt-2'>Chưa có đánh giá nào.</p>
                            <div className="mt-6 w-full border-2 py-4 px-6 border-[#FF6633]">
                                <h2 className='font-bold text-[20px] line-clamp-1'>Hãy là người đầu tiên nhận xét “{product.name}” </h2>
                                <h2 className='mt-2 mb-2 font-medium'>Đánh giá của bạn <span className='text-red-600 font-bold'>*</span></h2>
                                <Rating value={5} unratedColor="amber" ratedColor="amber" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
                                <h2 className='mt-4 font-medium'>Nhận xét của bạn <span className='text-red-600 font-bold'>*</span></h2>
                                <textarea name="" className='w-full mt-1 p-2 h-[200px] border shadow-lg' id=""></textarea>
                                <p className='mt-4 font-medium text-red-600'>Lưu Ý: * là những ô bắt buộc phải nhập.</p>
                                <button className='uppercase mt-4 mb-12 py-2 px-4 border bg-[#FF6633] font-bold text-white'>Gửi đi</button>
                            </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default DetailP;
