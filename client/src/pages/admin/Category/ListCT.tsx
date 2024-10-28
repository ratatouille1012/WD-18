import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';
import { Category } from '../../../types/categories';
import AddCategoryPopup from './AddCategoryPopup';
import EditPopup from './EditPopup ';

const List = () => {
    const { darkMode } = useTheme();
    const { setLoading } = useLoading();
    const [categories, setCategories] = useState<Category[]>([]);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (newCategory) => {
        try {
            setLoading(true);
            const slug = createSlug(newCategory.name); 
            const response = await axios.post("/api/categories", { ...newCategory, slug });
            setCategories([...categories, response.data]);
        } catch (error) {
            console.error("Error adding category:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditCategory = async (id, updatedName) => {
        try {
            setLoading(true);
            const slug = createSlug(updatedName);
            const token = window.localStorage.getItem('token');
            await axios.put(`/api/categories/update/${id}`, { name: updatedName, slug }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(categories.map(cat => (cat._id === id ? { ...cat, name: updatedName, slug } : cat)));
            closeEditPopup();
        } catch (error) {
            console.error("Error updating category:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteCategory = async (id) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
            await axios.delete(`/api/categories/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCategories(categories.filter(cat => cat._id !== id)); // Cập nhật danh sách sau khi xóa
        } catch (error) {
            console.error("Error deleting category:", error);
        } finally {
            setLoading(false);
        }
    };

    const createSlug = (name) => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[\s+]/g, '-')
            .replace(/[^\w-]+/g, '');
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedCategory(null);
    };

    return (
        <div className="pb-10">
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="flex justify-between">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Danh sách danh mục</h2>
                    <button 
                        className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                        onClick={() => setAddPopupOpen(true)}
                    >
                        Thêm danh mục
                    </button>
                </div>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                            <th className="py-2 px-4 text-left">Id</th>
                            <th className="py-2 px-4 text-left">Tên</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map(category => (
                            <tr key={category._id} className={`${darkMode ? 'text-meta-3' : ''}`}>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{category._id}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>{category.name}</td>
                                <td className={`${darkMode ? 'border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                    <button 
                                        className={`${darkMode ? 'bg-[#E94E77]' : 'bg-red-500'} text-white px-3 py-1 rounded-md mr-2 hover:bg-red-600`}
                                        onClick={() => handleDeleteCategory(category._id)}
                                    >
                                        Xóa
                                    </button>
                                    <button 
                                        className={`${darkMode ? 'bg-[#4CAF50]' : 'bg-green-500'} text-white px-3 py-1 rounded-md hover:bg-green-600`}
                                        onClick={() => {
                                            setSelectedCategory(category);
                                            setEditPopupOpen(true);
                                        }}
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditPopupOpen && selectedCategory && (
                    <EditPopup 
                        category={selectedCategory} 
                        onClose={closeEditPopup} 
                        darkMode={darkMode} 
                        onSave={handleEditCategory}
                    />
                )}
                {isAddPopupOpen && (
                    <AddCategoryPopup 
                        onClose={() => setAddPopupOpen(false)} 
                        onAdd={handleAddCategory} 
                        darkMode={darkMode} 
                    />
                )}
            </div>
        </div>
    );
};

export default List;
