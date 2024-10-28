import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import ColorTable from '../../../components/admin/tableColor';
import AddColorPopup from './addCl';
import EditColorPopup from './editCl';
import { TPcolor } from '../../../types/color';
import { useLoading } from '../../../contexts/loading';
import axios from 'axios';

const ColorList = () => {
    const { darkMode } = useTheme();
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);
    const { setLoading } = useLoading();
    const [colors, setColors] = useState<TPcolor[]>([]);
    
    const getAllColor = async () => {
        try {
          setLoading(true);
          const { data } = await axios.get("/api/color");
          setColors(data.data);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        getAllColor();
      },[]);
    
    const handleAddColor = (name, code) => {
        setColors([...colors, { id: colors.length + 1, name, code }]);
    };

    const handleEditClick = (color) => {
        setSelectedColor(color);
        setEditPopupOpen(true);
    };

    const handleSaveEdit = (id, updatedColor) => {
        setColors(colors.map(color => (color.id === id ? { id, ...updatedColor } : color)));
        setEditPopupOpen(false);
        setSelectedColor(null);
    };

    const handleDeleteColor = async (colorId: string) => {
        try {
            setLoading(true);
            const token = window.localStorage.getItem('token');
             await axios.delete(`/api/color/delete/${colorId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            window.location.reload(); 
        } catch (error) {
            if (error.response?.data?.message === "Token invalid") {
                console.error("Token is invalid. Please log in again.");
            } else {
                console.error("Error adding category:", error.response?.data || error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    

    return (
        <div className="pb-10">
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="flex justify-between">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Danh sách màu</h2>
                    <button 
                        className={`${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'} px-3 py-1 rounded-md hover:bg-gray-600`}
                        onClick={() => setAddPopupOpen(true)}
                    >
                        Thêm màu
                    </button>
                </div>
                <ColorTable 
                    colors={colors} 
                    darkMode={darkMode} 
                    onEdit={handleEditClick} 
                    onDelete={handleDeleteColor}
                />
                {isAddPopupOpen && (
                    <AddColorPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddColor} darkMode={darkMode} />
                )}
                {isEditPopupOpen && selectedColor && (
                    <EditColorPopup color={selectedColor} onClose={(id, updatedColor) => handleSaveEdit(id, updatedColor)} darkMode={darkMode} />
                )}
            </div>
        </div>
    );
};

export default ColorList;
