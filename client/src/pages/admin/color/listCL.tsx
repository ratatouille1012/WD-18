import React, { useState } from 'react';
import { useTheme } from '../../../contexts/theme';

const colors = [
    { id: 1, name: 'Đỏ', code: '#FF0000' },
    { id: 2, name: 'Xanh lá', code: '#00FF00' },
    { id: 3, name: 'Xanh dương', code: '#0000FF' },
];

const AddColorPopup = ({ onClose, onAdd, darkMode }) => {
    const [newColor, setNewColor] = useState('');
    const [newColorCode, setNewColorCode] = useState('');

    const handleAdd = () => {
        if (newColor && newColorCode) {
            onAdd(newColor, newColorCode);
            setNewColor('');
            setNewColorCode('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
                <h2 className="text-xl">Thêm Màu</h2>
                <input 
                    type="text" 
                    value={newColor} 
                    onChange={(e) => setNewColor(e.target.value)} 
                    className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                    placeholder="Nhập tên màu"
                />
                <input 
                    type="text" 
                    value={newColorCode} 
                    onChange={(e) => setNewColorCode(e.target.value)} 
                    className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                    placeholder="Nhập mã màu (ví dụ: #FF5733)"
                />
                <div className="mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                    <button 
                        className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1`}
                        onClick={handleAdd}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

const EditColorPopup = ({ color, onClose, darkMode }) => {
    const [colorName, setColorName] = useState(color.name);
    const [colorCode, setColorCode] = useState(color.code);

    const handleSave = () => {
        onClose(color.id, { name: colorName, code: colorCode });
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
                <h2 className="text-xl">Sửa Màu</h2>
                <input 
                    type="text" 
                    value={colorName} 
                    onChange={(e) => setColorName(e.target.value)} 
                    className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                />
                <input 
                    type="text" 
                    value={colorCode} 
                    onChange={(e) => setColorCode(e.target.value)} 
                    className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                />
                <div className="mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                    <button 
                        className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1`}
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};


const ColorList = () => {
    const { darkMode } = useTheme();
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleAddColor = (name, code) => {
        colors.push({ id: colors.length + 1, name, code });
    };

    const handleEditClick = (color) => {
        setSelectedColor(color);
        setEditPopupOpen(true);
    };

    const handleSaveEdit = (id, updatedColor) => {
        const index = colors.findIndex(color => color.id === id);
        colors[index] = { id, ...updatedColor };
        setEditPopupOpen(false);
        setSelectedColor(null);
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
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                            <th className="py-2 px-4 text-left">Id</th>
                            <th className="py-2 px-4 text-left">Tên</th>
                            <th className="py-2 px-4 text-left">Mã màu</th>
                            <th className="py-2 px-4 text-left">Demo</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {colors.map(color => (
                            <tr className={`${darkMode ? ' text-meta-3 ' : ''}`} key={color.id}>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>{color.id}</td>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>{color.name}</td>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>{color.code}</td>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                    <div 
                                        className="h-10 w-10" 
                                        style={{ backgroundColor: color.code }} // Use inline style for dynamic background color
                                    ></div>
                                </td>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                    <button className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}>
                                        Xóa
                                    </button>
                                    <button 
                                        className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}
                                        onClick={() => handleEditClick(color)}
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
