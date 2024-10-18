import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/theme';
import Trash from '../../../svg/trash';
import axios from 'axios';
import { useLoading } from '../../../contexts/loading';
import { TPcolor } from '../../../types/color';
import { TPsize } from '../../../types/size';
import { TPproducts } from '../../../types/products';
import { useForm } from 'react-hook-form';
import { Category } from '../../../types/categories';
import { TPbrand } from '../../../types/brand';

const Detail = () => {
    const { darkMode } = useTheme();
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();
    const [variants, setVariants] = useState([{}]);
    const { setLoading } = useLoading();
    const [colors, setColors] = useState<TPcolor[]>([]);
    const [sizes, setSizes] = useState<TPsize[]>([]);
    const [brands, setBrands] = useState<TPbrand[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [product, setProduct] = useState<TPproducts | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const fetchBrands = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/brand'); 
            setBrands(response.data.data);
            console.log(response.data.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
                console.error('Axios error:', error.response);
            } else {
                setErrorMessage('An unexpected error occurred. Please try again.');
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/categories'); 
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setErrorMessage('Could not fetch category list.');
        } finally {
            setLoading(false);
        }
    };

    const fetchProduct = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/products/${id}`);
            setProduct(response.data.data);
            console.log(response.data.data);
            
        } catch (error) {
            console.error('Error fetching product:', error);
            setErrorMessage('Could not fetch product details.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
        fetchBrands(); 
        fetchCategories();
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [colorResponse, sizeResponse] = await Promise.all([
                    axios.get("/api/color"),
                    axios.get("/api/size"),
                ]);
                setColors(colorResponse.data.data);
                setSizes(sizeResponse.data.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [setLoading]);

    const addVariant = () => {
        setVariants([...variants, { id: variants.length + 1 }]);
    };

    const removeVariant = (index) => {
        if (variants.length > 1) {
            setVariants(variants.filter((_, i) => i !== index));
        } else {
            alert('Phải có ít nhất 1 biến thể.');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        // Cập nhật giá trị cho brand và category
        if (name === 'brand' || name === 'category') {
            setProduct(prev => ({
                ...prev,
                [name]: { _id: value }
            }));
        } else {
            setProduct(prev => ({ ...prev, [name]: value }));
        }
    };
    
    

    const handleAddImageURL = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            const value = event.currentTarget.value.trim();
            if (value) {
                if (product?.images.length < 4) {
                    setProduct(prev => ({...prev,images: [...prev.images, value]}));
                    event.currentTarget.value = '';
                } else {
                    setErrorMessage("Bạn chỉ có thể thêm tối đa 4 ảnh.");
                }
            }
        }
    };

    const handleUpdate = async (values: TPproducts) => {
        const token = localStorage.getItem('token');
    
        const { _id, createdAt, updatedAt, ...updatedValues } = values;
        if (!updatedValues.thumbnail || updatedValues.thumbnail === "none") {
            delete updatedValues.thumbnail;  
        }
    
        updatedValues.brand = values.brand._id;  
        updatedValues.category = values.category._id; 
    
        try {
            const response = await axios.put(`/api/products/update/${id}`, updatedValues, {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            console.log('Product updated:', response.data);
            nav("/admin/product/list");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Axios error:', error.response?.data);
                setErrorMessage(error.response?.data?.message || 'An error occurred. Please try again.');
            } else {
                console.error('Error:', error.message);
                setErrorMessage('An unexpected error occurred. Please try again.');
            }
        }
    };
    
    
    

    return (
        <div className="pb-10">
            <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-6`}>Chi tiết sản phẩm</h1>
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
                <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Biến thể</h2>
                <form className="mt-10">
                    {variants.map((variant, index) => (
                        <div key={index} className="flex justify-between mt-6">
                            <div className="input-with-placeholder">
                                <select id={`color-${index}`} required>
                                    <option value="" disabled hidden>Color</option>
                                    {colors.map(color => (
                                        <option key={color._id} value={color._id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                                <label htmlFor={`color-${index}`}>Color</label>
                            </div>
                            <div className="input-with-placeholder">
                                <select id={`size-${index}`} required>
                                    <option value="" disabled hidden>Size</option>
                                    {sizes.map(size => (
                                        <option key={size._id} value={size._id}>
                                            {size.name}
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
                            <button type="button" onClick={() => removeVariant(index)}>
                                <Trash />
                            </button>
                        </div>
                    ))}
                    <div className="mt-4">
                        <button type="button" onClick={addVariant} className={`${darkMode ? 'text-amber-500 border border-amber-500' : 'text-blue-700 border border-blue-700'} px-3 py-1 rounded-md mr-2 `}>
                            + Thêm biến thể
                        </button>
                        <button type="submit" className={`${darkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'} px-3 py-1 rounded-md`}>
                            Lưu
                        </button>
                    </div>
                </form>
            </div>

            <div className="flex gap-x-4">
                {/* Product Information */}
                <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 w-2/6`}>
                    
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4 mt-6`}>Thông tin sản phẩm</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(product); }}  className="flex flex-col gap-4">
                        <input
                            type="text"
                            name="title"
                            placeholder="Tên sản phẩm"
                            value={product?.title || ''}
                            onChange={handleChange}
                            required
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                        <input
                            type="text"
                            name="price"
                            placeholder="Giá"
                            value={product?.price || ''}
                            onChange={handleChange}
                            required
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        />
                         <select
                            name="brand"
                            value={product?.brand._id || ''}
                            onChange={handleChange}
                            required
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        >
                            <option value="2" disabled hidden>Thương hiệu</option>
                            {brands.map(brand => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        <select
                            name="category"
                            value={product?.category._id || ''}
                            onChange={handleChange}
                            required
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                        >
                            <option value="1" disabled hidden>Danh mục</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.name}
                                </option>
                            ))}
                        </select> 
                        <input 
                            type="text" 
                            placeholder="Địa chỉ hình ảnh (URL)" 
                            onKeyDown={handleAddImageURL} 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`} 
                        />
                        <div className="text-sm text-gray-500">Nhập URL cho hình ảnh của sản phẩm và nhấn Enter</div>
                        {/* Display added image URLs */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {product?.images.map((url, index) => (
                                <div key={index} className="relative">
                                    <img 
                                        src={url} 
                                        alt={`Image ${index + 1}`} 
                                        className="h-16 w-16 object-cover rounded"
                                    />
                                    <button 
                                        type="button" 
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                        onClick={() => {
                                            if (product) {
                                                setProduct({ 
                                                    ...product, 
                                                    images: product.images.filter((_, i) => i !== index) 
                                                });
                                            }
                                        }}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>

                        <button
                            type="submit"
                            className={`${darkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'} px-3 py-3 mt-6 rounded-md`}
                        >
                            Cập nhật
                        </button>
                    </form>
                </div>

                {/* Description Section */}
                {/* <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 w-4/6`}>
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Mô tả</h2>
                    {product && product.subDescriptions.length > 0 ? (
                        <div>
                            {product.subDescriptions.map((sub, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className={`${darkMode ? 'text-white' : ''} font-bold`}>{sub.title}</h3>
                                    <p className={`${darkMode ? 'text-gray-400' : 'text-black'}`}>{sub.content}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className={`${darkMode ? 'text-gray-400' : 'text-black'}`}>Chưa có mô tả cho sản phẩm này.</p>
                    )}
                    <form className='mt-10' onSubmit={handleSubmit}>
                        <textarea
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} block w-full h-32 p-2 border rounded`}
                            placeholder="Mô tả..."
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Link ảnh"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} mt-2 w-full p-2 border border-gray-300 rounded`}
                            required
                        />
                        <button type="submit" className={`${darkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'} inline-flex items-center px-5 py-2.5 text-sm font-medium rounded-lg mt-4`}>
                            POST
                        </button>
                    </form>
                </div> */}
            </div>
        </div>
    );
};

export default Detail;
