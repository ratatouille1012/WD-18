import React, { useState } from 'react'
import { useTheme } from '../../../contexts/theme';
import Trash from '../../../svg/trash';

const colors = [
    {
        id: "1",
        colorName: "Đen",
        colorCode: "#000000",
    },
    {
        id: "2",
        colorName: "Trắng",
        colorCode: "#FFFFFF",
    },
    {
        id: "3",
        colorName: "Vàng",
        colorCode: "#FFFF00",
    },
    {
        id: "4",
        colorName: "Đỏ",
        colorCode: "#FF0000",
    },
    {
        id: "5",
        colorName: "Xanh",
        colorCode: "#0000FF",
    },
    {
        id: "6",
        colorName: "Hồng",
        colorCode: "#FF69B4",
    },
];

const sizes = [
    { id: "1", sizeName: "39" },
    { id: "2", sizeName: "40" },
    { id: "3", sizeName: "42" },
    { id: "4", sizeName: "43" },
];

const initialProducts = [
    { id: 1, name: 'Giày Thể Thao A', category: "Giày thể thao", imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg',
         subDescriptions: [
            {
                description: "Được thiết kế phù hợp phong cách thường ngày, những đôi giày nam táo bạo mang hơi hướng thời trang đường phố từ cảm hứng dáng điệu từ những đôi Reebok tiền bối. Chúng được thiết kế với đế đệm ngoài riêng biệt thể hiện sự tôn kính đối với mẫu giày chạy bộ của những năm 90. Mũi giày mang đến cảm giác vững chắc mà vẫn tinh tế. Miếng lót giày xốp EVA có thể tháo rời giúp bạn thoải mái cả ngày dài, trong khi đó đế ngoài bằng cao su làm tăng sức bền cho đôi giày.",
                imageUrl: "https://bizweb.dktcdn.net/100/347/092/files/z-dv6923-01.jpg?v=1580908389890",
            }
        ],  
        subBienthe:[
            {   
                id:"1",
                idcolor:"1",
                idsize:"3",
                price_import:150000,
                price_list:250000,
                price_selling:200000,
                quantity:2
            },
            {   
                id:"2",
                idcolor:"3",
                idsize:"4",
                price_import:100000,
                price_list:250000,
                price_selling:200000,
                quantity:3
            }
        ]
    },
    { id: 2, name: 'Giày Da B', category: "Giày Nữ",  imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', 
        subDescriptions: [] ,
        subBienthe:[{}]
    },
    { id: 3, name: 'Giày Chạy Bộ C', category: "Giày Nam",  imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', 
        subDescriptions: [] ,
        subBienthe:[{}]
    },
    { id: 4, name: 'Giày Sneaker D', category: "Giày Nam",  imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', 
        subDescriptions: [] ,
        subBienthe:[{}]
    },
    { id: 5, name: 'Giày Đi Bộ E', category: "Giày Nữ",  imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', 
        subDescriptions: [] ,
        subBienthe:[{}]
    },
];

const add = () => {
    const { darkMode } = useTheme();
    const [variants, setVariants] = useState([{}]); 

    const addVariant = () => {
        setVariants([...variants, {}]); 
    };
    const removeVariant = (index) => {
        if (variants.length > 1) { 
            const newVariants = variants.filter((_, i) => i !== index);
            setVariants(newVariants);
        } else {
            alert('Phải có ít nhất 1 biến thể.');
        }
    };
  return (
    <>
    <div className="pb-10">
            <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-6`}>Thêm sản phẩm</h1>
                {/* Thông tin chung */}
                <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-10`}>
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin chung</h2>
                    <form  className="flex flex-col gap-4">
                        <input 
                            type="text" 
                            placeholder="Tên sản phẩm"   
                            required 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <input 
                            type="text" 
                            placeholder="Danh mục" 
                            required 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <input 
                            type="text" 
                            placeholder="Link ảnh 1" 
                            required 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <input 
                            type="text" 
                            placeholder="Link ảnh 2" 
                            required 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <input 
                            type="text" 
                            placeholder="Link ảnh 3"  
                            required 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <button 
                            type="submit" 
                            className={`${darkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'} px-3 py-3 mt-6 rounded-md`}
                        >
                            Thêm sản phẩm
                        </button>
                    </form>
                </div>  
            {/* Biến thể*/}
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
                <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Biến thể</h2>
                <form className="mt-10">
                    {variants.map((_, index) => (
                        <div key={index} className="flex justify-between mt-6">
                            <div className="input-with-placeholder">
                                <select id={`color-${index}`} required>
                                    <option value="" disabled selected hidden>Color</option>
                                    {colors.map(color => (
                                        <option key={color.id} value={color.colorCode}>
                                            {color.colorName}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor={`color-${index}`}>Color</label>
                            </div>
                            <div className="input-with-placeholder">
                                <select id={`size-${index}`} required>
                                    <option value="" disabled selected hidden>Size</option>
                                    {sizes.map(size => (
                                        <option key={size.id} value={size.sizeName}>
                                            {size.sizeName}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor={`size-${index}`}>Size</label>
                            </div>
                            <div className="input-with-placeholder1">
                                <input type="number" id={`price-import-${index}`} required />
                                <label htmlFor={`price-import-${index}`}>Giá nhập</label>
                            </div>
                            <div className="input-with-placeholder1">
                                <input type="number" id={`price-list-${index}`} required />
                                <label htmlFor={`price-list-${index}`}>Giá niêm yết</label>
                            </div>
                            <div className="input-with-placeholder1">
                                <input type="number" id={`price-selling-${index}`} required />
                                <label htmlFor={`price-selling-${index}`}>Giá bán</label>
                            </div>
                            <div className="input-with-placeholder1">
                                <input type="number" id={`quantity-${index}`} required />
                                <label htmlFor={`quantity-${index}`}>Số lượng</label>
                            </div>
                            <button type="button" onClick={() => removeVariant(index)}><Trash/></button>
                        </div>
                    ))}
                    <div className="mt-4">
                        <button type="button" onClick={addVariant} className={`${darkMode ? 'text-amber-500 border border-amber-500' : 'text-blue-700 border border-blue-700'} px-3 py-1 rounded-md mr-2`}>
                            + Thêm biến thể
                        </button>
                        <button className={`${darkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-blue-600`}>
                            Lưu
                        </button>
                    </div>
                </form>          
            </div>          
        </div>
    </>
  )
}

export default add