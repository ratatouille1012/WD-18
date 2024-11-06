import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { Category } from '../../../types/categories';
import { TPproducts } from '../../../types/products';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { TPbrand } from '../../../types/brand';
import Trash from '../../../svg/trash';
import { TPcolor } from '../../../types/color';
import { TPsize } from '../../../types/size';

const AddProduct = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [categories, setCategories] = useState<Category[]>([]);
    const [brands, setBrands] = useState<TPbrand[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const nav = useNavigate();
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [colors, setColors] = useState<TPcolor[]>([]);
    const [sizes, setSizes] = useState<TPsize[]>([]);
    const [variants, setVariants] = useState([{ color: '', size: '', importPrice: '', listPrice: '', salePrice: '', quantity: '' }]);

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

    const handleAddImageFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length + imageFiles.length <= 4) {
            setImageFiles(prev => [...prev, ...Array.from(files)]);
            setErrorMessage(null);
        } else {
            setErrorMessage("You can only add up to 4 images.");
        }
    };

    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const addProduct = async (values: TPproducts) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');

            if (imageFiles.length === 0) {
                setErrorMessage("At least one image must be provided.");
                return;
            }

            const formData = new FormData();
            formData.append('brand', values.brand);
formData.append('category', values.category);
            formData.append('title', values.title);
            formData.append('price', values.price);

            imageFiles.forEach(file => {
                formData.append('images', file);
            });

            const productResponse = await axios.post("/api/products", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('====================================');
            console.log(productResponse);
            console.log('====================================');
            alert("Product added successfully!");
            nav('/admin/product/list');

        } catch (error) {
            console.error('Error creating product:', error);
            if (error.response) {
                console.error('Server responded with:', error.response.data);
                setErrorMessage("Error creating product: " + error.response.data.message || "An error occurred");
            } else {
                setErrorMessage("Error creating product. Please check the console for details.");
            }
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (values: TPproducts) => {
        addProduct(values);
    };

    const addVariant = () => {
        setVariants([...variants, { color: '', size: '', importPrice: '', listPrice: '', salePrice: '', quantity: '' }]);
    };

    const removeVariant = (index: number) => {
        if (variants.length > 1) {
            setVariants(variants.filter((_, i) => i !== index));
        } else {
            alert('At least one variant must remain.');
        }
    };

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
                setErrorMessage("Failed to load colors or sizes.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [setLoading]);

    return (
        <div className="pb-10">
            <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-6`}>Thêm sản phẩm</h1>
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-10`}>
                <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin sản phẩm</h2>
                {errorMessage && <div className="text-red-500">{errorMessage}</div>}
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
<div className="flex gap-x-4 w-full">
                        <input
                            type="text"
                            placeholder="Tên sản phẩm"
                            {...register('title', { required: "Product name is required" })}
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} w-full border p-2 rounded`}
                        />
                        {errors.title && <span className="text-red-500">{errors.title.message}</span>}

                        <input
                            type="number"
                            placeholder="Giá"
                            {...register('price', { required: "Product price is required" })}
                            className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} w-full border p-2 rounded`}
                        />
                        {errors.price && <span className="text-red-500">{errors.price.message}</span>}
                    </div>
                    <div className="flex gap-x-4 w-full">
                        <select
                            {...register('brand', { required: "Brand is required" })}
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
                            {...register('category', { required: "Category is required" })}
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

                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleAddImageFiles}
                        className="border p-2 rounded"
                    />
                    <div className="text-sm text-gray-500">Chọn tối đa 4 ảnh</div>
<div className="flex flex-wrap gap-2 mt-2">
                        {imageFiles.map((file, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(file)}
                                    alt={`product-${index}`}
                                    className="w-24 h-24 object-cover rounded"
                                />
                                <button type="button" onClick={() => removeImage(index)} className="absolute top-0 right-0 text-red-500">
                                    <Trash />
                                </button>
                            </div>
                        ))}
                    </div>

                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mt-6`}>Biến thể</h2>
                    {variants.map((variant, index) => (
                        <div key={index} className="flex gap-x-4">
                            <select
                                value={variant.color}
                                onChange={e => {
                                    const newVariants = [...variants];
                                    newVariants[index].color = e.target.value;
                                    setVariants(newVariants);
                                }}
                                className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border w-full p-2 rounded`}
                            >
                                <option value="" disabled hidden>Màu</option>
                                {colors.map(color => (
                                    <option key={color._id} value={color.name}>
                                        {color.name}
                                    </option>
                                ))}
                            </select>

                            <select
                                value={variant.size}
                                onChange={e => {
                                    const newVariants = [...variants];
                                    newVariants[index].size = e.target.value;
                                    setVariants(newVariants);
                                }}
                                className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border w-full p-2 rounded`}
                            >
                                <option value="" disabled hidden>Kích cỡ</option>
                                {sizes.map(size => (
                                    <option key={size._id} value={size.name}>
                                        {size.name}
                                    </option>
                                ))}
                            </select>

                            <input
                                type="number"
placeholder="Giá nhập"
                                value={variant.importPrice}
                                onChange={e => {
                                    const newVariants = [...variants];
                                    newVariants[index].importPrice = e.target.value;
                                    setVariants(newVariants);
                                }}
                                className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                            />

                            <input
                                type="number"
                                placeholder="Giá niêm yết"
                                value={variant.listPrice}
                                onChange={e => {
                                    const newVariants = [...variants];
                                    newVariants[index].listPrice = e.target.value;
                                    setVariants(newVariants);
                                }}
                                className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                            />

                            <input
                                type="number"
                                placeholder="Giá bán"
                                value={variant.salePrice}
                                onChange={e => {
                                    const newVariants = [...variants];
                                    newVariants[index].salePrice = e.target.value;
                                    setVariants(newVariants);
                                }}
                                className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                            />

                            <input
                                type="number"
                                placeholder="Số lượng"
                                value={variant.quantity}
                                onChange={e => {
                                    const newVariants = [...variants];
                                    newVariants[index].quantity = e.target.value;
                                    setVariants(newVariants);
                                }}
                                className={`${darkMode ? 'bg-[#2c3945] text-white' : 'bg-white text-black'} border p-2 rounded`}
                            />

                            <button type="button" onClick={() => removeVariant(index)} className="text-red-500">
                                <Trash />
                            </button>
                        </div>
                    ))}
                    <button type="button" onClick={addVariant} className="text-blue-500 p-2 border border-blue-500">Thêm Biến thể</button>
<button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded">Thêm sản phẩm</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;