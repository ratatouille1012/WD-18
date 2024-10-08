import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const Detail = () => {
    const { darkMode } = useTheme();
    const { id } = useParams();
    const productId = parseInt(id);
    const [products, setProducts] = useState(initialProducts);
    const product = products.find(p => p.id === productId);
    const [variants, setVariants] = useState([{}]); 
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [currentProduct, setCurrentProduct] = useState(null);

    useEffect(() => {
        const product = products.find(p => p.id === productId);
        if (product) {
            setCurrentProduct(product);
            setVariants(product.subBienthe);
            if (product.subDescriptions.length > 0) {
                setDescription(product.subDescriptions[0].description);
                setImageUrl(product.subDescriptions[0].imageUrl);
            }
        }
    }, [productId, products]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCurrentProduct(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedProducts = products.map(p =>
            p.id === productId ? {
                ...currentProduct,
                subDescriptions: [{ description, imageUrl }],
                subBienthe: variants,
            } : p
        );
        alert("Thành công!")
        setProducts(updatedProducts);
        console.log(updatedProducts);
    };

    const addVariant = () => {
        setVariants([...variants, {id: variants.length + 1}]); 
    };
    const removeVariant = (index) => {
        if (variants.length > 1) { 
            const newVariants = variants.filter((_, i) => i !== index);
            setVariants(newVariants);
        }else{
            alert('Phải có ít nhất 1 biến thể.');
        }
    };

    return (
        <>
        <div className="pb-10">
            <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-6`}>Chi tiết sản phẩm</h1>
            {/* Biến thể*/}
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
                <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Biến thể</h2>
                <form className="mt-10 ">
                    {variants.map((variant, index) => (
                    <div key={index} className="flex justify-between mt-6">
                        <div className="input-with-placeholder">
                        <select id={`color-${index}`} required>
                            {variants[index]?.idcolor ? (
                                <option value={variants[index].idcolor} hidden>
                                    {colors.find(color => color.id === variants[index].idcolor)?.colorName}
                                </option>
                            ) : (
                                <option value="" disabled selected hidden>Color</option>
                            )}
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
                                {variants[index]?.idsize ? (
                                    <option value={variants[index].idsize} hidden>
                                        {sizes.find(size => size.id === variants[index].idsize)?.sizeName}
                                    </option>
                                ) : (
                                    <option value="" disabled selected hidden>Size</option>
                                )}
                                {sizes.map(size => (
                                    <option key={size.id} value={size.sizeName}>
                                        {size.sizeName}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor={`size-${index}`}>Size</label>
                        </div>
                        <div className="input-with-placeholder1">
                            <input type="number" defaultValue={variant.price_import} id={`price-import-${index}`} required />
                            <label htmlFor={`price-import-${index}`}>Giá nhập</label>
                        </div>
                        <div className="input-with-placeholder1">
                            <input type="number" defaultValue={variant.price_list} id={`price-list-${index}`} required />
                            <label htmlFor={`price-list-${index}`}>Giá niêm yết</label>
                        </div>
                        <div className="input-with-placeholder1">
                            <input type="number" defaultValue={variant.price_selling} id={`price-selling-${index}`} required />
                            <label htmlFor={`price-selling-${index}`}>Giá bán</label>
                        </div>
                        <div className="input-with-placeholder1">
                            <input type="number" defaultValue={variant.quantity} id={`quantity-${index}`} required />
                            <label htmlFor={`quantity-${index}`}>Số lượng</label>
                        </div>
                        <button type="button" onClick={() => removeVariant(index)}><Trash/></button>
                    </div>
                    ))}
                    <div className=" mt-4">
                        <button type="button" onClick={addVariant} className={`${darkMode ? 'text-amber-500 border border-amber-500' : 'text-blue-700 border border-blue-700'} px-3 py-1 rounded-md mr-2 `}>
                            + Thêm biến thể
                        </button>
                        <button className={`${darkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-blue-600`}>
                            Lưu
                        </button>  
                    </div>
                </form>             
            </div> 
            <div className="flex gap-x-4">
                {/* Sản phẩm*/}
                <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 w-2/6 h-auto`}>
                    <div className="flex gap-x-4 w-full">
                        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>{product?.name}</h2>
                        <span className='text-sm '><mark>{product?.category}</mark></span>
                    </div>
                    <div className="flex ">
                        <div className="flex gap-x-4 justify-between ">
                            <img className='w-[100px] h-auto' src={product?.imgUrl1} alt="none" />
                            <img className='w-[100px] h-auto' src={product?.imgUrl2} alt="none" />
                            <img className='w-[100px] h-auto' src={product?.imgUrl3} alt="none" />
                        </div>    
                    </div>
                    {/* Thông tin chung */}
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4 mt-6`}>Thông tin sản phẩm</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="name"
                            placeholder="Tên sản phẩm"
                            value={currentProduct?.name || ''}
                            onChange={handleChange}
                            required
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <input
                            type="text"
                            name="category"
                            placeholder="Danh mục"
                            value={currentProduct?.category || ''}
                            onChange={handleChange}
                            required
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <input
                            type="text"
                            name="imgUrl1"
                            placeholder="Link ảnh 1"
                            value={currentProduct?.imgUrl1 || ''}
                            onChange={handleChange}
                            required
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <input
                            type="text"
                            name="imgUrl2"
                            placeholder="Link ảnh 2"
                            value={currentProduct?.imgUrl2 || ''}
                            onChange={handleChange}
                            required
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <input
                            type="text"
                            name="imgUrl3"
                            placeholder="Link ảnh 3"
                            value={currentProduct?.imgUrl3 || ''}
                            onChange={handleChange}
                            required
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <button
                            type="submit"
                            className={`${darkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'} px-3 py-3 mt-6 rounded-md`}
                        >
                            Cập nhật
                        </button>
                    </form>
                </div>
                {/* Mô tả*/}
                <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 w-4/6 h-auto`}>
                <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Mô tả</h2>
                    {product && product.subDescriptions.length > 0 ? (
                        <div>
                            {product.subDescriptions.map((sub, index) => (
                                <div key={index}>
                                    <p className={`${darkMode ? 'text-bodydark2' : ''}`}>{sub.description}</p>
                                    <img className='h-72 mt-2' src={sub.imageUrl} alt={`Image ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={`${darkMode ? 'text-bodydark2' : ''}`}>Chưa có mô tả....</div>
                    )}
                    <form className='mt-10' onSubmit={handleSubmit}>
                        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                            <div className="flex items-center justify-between px-3 py-2 border-b dark:border-gray-600">
                                <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse dark:divide-gray-600">
                                    <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                                        <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 20">
                                                    <path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"/>
                                                </svg>
                                            <span className="sr-only">Attach file</span>
                                        </button>
                                        <button type="button" className="p-2 text-gray-500 rounded hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 20"><path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/></svg>
                                            <span className="sr-only">Embed map</span>
                                        </button>
                                        <button type="button" className="p-2 text-gray-500 rounded hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 20"><path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"/><path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"/></svg>
                                            <span className="sr-only">Upload image</span>
                                        </button>
                                        <button type="button" className="p-2 text-gray-500 rounded hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 20"><path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/><path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z"/></svg>
                                            <span className="sr-only">Format code</span>
                                        </button>
                                        <button type="button" className="p-2 text-gray-500 rounded hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z"/></svg>
                                            <span className="sr-only">Add emoji</span>
                                        </button>
                                    </div>
                                </div>
                                <button type="button" className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 19 19">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 1h5m0 0v5m0-5-5 5M1.979 6V1H7m0 16.042H1.979V12M18 12v5.042h-5M13 12l5 5M2 1l5 5m0 6-5 5"/>
                                        </svg>
                                    <span className="sr-only">Full screen</span>
                                </button>
                            </div>
                            <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                <label htmlFor="editor" className="sr-only">Publish post</label>
                                <textarea
                                    id="editor"
                                    className="block w-full h-32 px-0 text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                                    placeholder="Mô tả..."
                                    required
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                ></textarea>
                                <input
                                    type="text" 
                                    placeholder="Link ảnh"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="mt-2 w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                        </div>
                        <button type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                            POST
                        </button>
                    </form>
                </div>
            </div>          
        </div>
        </>
    );
};

export default Detail;
