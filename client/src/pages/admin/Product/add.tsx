import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { Category } from '../../../types/categories';
import { TPproducts } from '../../../types/products';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TPbrand } from '../../../types/brand';

const AddProduct = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<TPbrand[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const nav = useNavigate();
    const [imageURLs, setImageURLs] = useState<string[]>([]);

    const { register, handleSubmit, formState: { errors } } = useForm<TPproducts>();

    useEffect(() => {
        const fetchBrandsAndCategories = async () => {
            try {
                setLoading(true);
                const [brandsResponse, categoriesResponse] = await Promise.all([
                    axios.get("/api/brand"),
                    axios.get("/api/categories"),
                ]);
                setBrands(brandsResponse.data.data);
                setCategories(categoriesResponse.data.data);
            } catch (error) {
                console.error(error);
                setErrorMessage("Failed to load brands or categories.");
            } finally {
                setLoading(false);
            }
        };

        fetchBrandsAndCategories();
    }, [setLoading]);

    const handleAddImageURL = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const value = event.currentTarget.value.trim();

            if (value) {
                if (imageURLs.length < 4) {
                    setImageURLs(prev => [...prev, value]);
                    event.currentTarget.value = ''; 
                } else {
                    setErrorMessage("Bạn chỉ có thể thêm tối đa 4 ảnh.");
                }
            }
        }
    };

    const removeImage = (index: number) => {
        setImageURLs(prev => prev.filter((_, i) => i !== index));
    };

    const addProduct = async (values: TPproducts) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');

            if (imageURLs.length === 0) {
                setErrorMessage("Ít nhất một URL hình ảnh phải được cung cấp.");
                return;
            }

            const requestBody = {
                ...values,
                images: imageURLs,
            };

            console.log("Request Body:", requestBody);

            await axios.post("/api/products", requestBody, {
                headers: { Authorization: `Bearer ${token}` }
            });

            nav("/admin/product/list");
        } catch (error) {
            console.error('Error response:', error.response);
            if (axios.isAxiosError(error)) {
                setErrorMessage(error.response?.data.message || "Something went wrong.");
            } else {
                setErrorMessage("An unexpected error occurred.");
            }
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (values: TPproducts) => {
        console.log("Form submitted with values:", values);
        addProduct(values);
    };

    return (
        <div className="pb-10">
            <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-6`}>Thêm sản phẩm</h1>
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-10`}>
                <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin chung</h2>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <div className="flex gap-x-4 w-full">
                        <input 
                            type="text" 
                            placeholder="Tên sản phẩm"   
                            {...register('title', { required: "Tên sản phẩm là bắt buộc" })} 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} w-full border p-2 rounded`}
                        />
                        {errors.title && <span className="text-red-500">{errors.title.message}</span>}
                        
                        <input 
                            type="number" 
                            placeholder="Giá sản phẩm"   
                            {...register('price', { required: "Giá sản phẩm là bắt buộc" })} 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} w-full border p-2 rounded`}
                        />
                        {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                    </div>
                    <div className="flex gap-x-4 w-full">
                        <select 
                            {...register('brand', { required: "Thương hiệu là bắt buộc" })} 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border w-full p-2 rounded`}
                        >
                            <option value="" disabled hidden>Thương hiệu</option>
                            {brands.map(brand => (
                                <option key={brand._id} value={brand._id}>
                                    {brand.name}
                                </option>
                            ))}
                        </select>
                        {errors.brand && <span className="text-red-500">{errors.brand.message}</span>}

                        <select 
                            {...register('category', { required: "Danh mục là bắt buộc" })} 
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border w-full p-2 rounded`}
                        >
                            <option value="" disabled hidden>Danh mục</option>
                            {categories.map(cate => (
                                <option key={cate._id} value={cate._id}>
                                    {cate.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-500">{errors.category.message}</span>}
                    </div>

                    {/* Input for Image URLs */}
                    <input 
                        type="text" 
                        placeholder="Địa chỉ hình ảnh (URL)" 
                        onKeyDown={handleAddImageURL} 
                        className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`} 
                    />
                    <div className="text-sm text-gray-500">Nhập URL cho hình ảnh của sản phẩm và nhấn Enter</div>

                    {/* Display added image URLs */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {imageURLs.map((url, index) => (
                            <div key={index} className="relative">
                                <img 
                                    src={url} 
                                    alt={`Image ${index + 1}`} 
                                    className="h-24 w-24 object-cover rounded"
                                />
                                <button 
                                    type="button" 
                                    onClick={() => removeImage(index)} 
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                    {imageURLs.length >= 4 && <div className="text-red-500">Bạn đã đạt giới hạn 4 ảnh.</div>}

                    <button 
                        type="submit" 
                        className={`${darkMode ? 'bg-blue-400 text-white' : 'bg-blue-500 text-white'} px-3 py-3 mt-6 rounded-md`}
                    >
                        Thêm sản phẩm
                    </button>
                </form>
            </div>  
        </div>
    );
};

export default AddProduct;
