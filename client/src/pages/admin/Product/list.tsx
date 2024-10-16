import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { Link } from 'react-router-dom';
import { useLoading } from '../../../contexts/loading';
import { TPproducts } from '../../../types/products';
import axios from 'axios';
import { Category } from '../../../types/categories';
import { TPbrand } from '../../../types/brand';

const List = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<TPproducts[]>([]);
    const [brands, setBrands] = useState<TPbrand[]>([]);

    const getAllBrand = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/api/brand");
          setBrands(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get("/api/categories");
            setCategories(response.data.data || []);
        } catch (error) {
            console.error("Error fetching categories:", error);
        } finally {
            setLoading(false);
        }
    };

    const getAllProduct = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get("/api/products");
            setProducts(data.data);
            console.log(data.data);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
            } else {
                console.error('Error:', error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const deleteProduct = async (id: string) => {
        const token = window.localStorage.getItem('token');
    
        if (!token) {
            console.error("No token found!");
            return;
        }
    
        if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
            try {
                setLoading(true);
                await axios.delete(`/api/products/delete/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                getAllProduct();
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error('Error response:', error.response?.data);
                    setErrorMessage(error.response?.data.message || "Error occurred");
                } else {
                    console.error('Error:', error.message);
                }
            } finally {
                setLoading(false);
            }
        }
    };
    

    useEffect(() => {
        getAllProduct();
        fetchCategories();
        getAllBrand();
    }, []);

    return (
        <div className="pb-10">
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="flex justify-between">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Danh sách sản phẩm</h2>
                    <button className={`${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'} px-3 py-1 rounded-md hover:bg-gray-600`}>
                        <Link to={'../product/add'}>Thêm sản phẩm</Link>
                    </button>
                </div>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)] ' : 'bg-gray-200'}`}>
                            <th className="py-2 px-4 text-left">Id</th>
                            <th className="py-2 px-4 text-left">Tên</th>
                            <th className="py-2 px-4 text-left">Giá</th>
                            <th className="py-2 px-4 text-left">Thương hiệu</th>
                            <th className="py-2 px-4 text-left">Danh mục</th>
                            <th className="py-2 px-4 text-left">Hình ảnh</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr className={`${darkMode ? 'text-meta-3' : ''}`} key={product._id}>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{product._id}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{product.title}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{product.price}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{product.brand.name}</td> 
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{product.category.name}</td> 
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                    <div className="flex space-x-2">
                                        {product.images.map((img, index) => (
                                            <img key={index} src={img} alt={product.title} className="w-16 h-16 object-cover" />
                                        ))}
                                    </div>
                                </td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4flex`}>
                                    <button 
                                        onClick={() => deleteProduct(product._id)} 
                                        className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}
                                    >
                                        Xóa
                                    </button>
                                    <Link to={`../product/detail/${product._id}`}>
                                        <button className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}>
                                            Chi tiết
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default List;
