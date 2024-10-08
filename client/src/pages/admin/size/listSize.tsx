import React, { useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { Link } from 'react-router-dom';

const sizes = [
    { id: 1, size: '39' },
    { id: 2, size: '40' },
    { id: 3, size: '41' },
    { id: 4, size: '42' },
    { id: 5, size: '43' },
    { id: 6, size: '44' },
    { id: 7, size: '45' },
];

const AddPopup = ({ onClose, onAdd, darkMode }) => {
    const [newSize, setNewSize] = useState('');

    const handleAdd = () => {
        if (newSize) {
            onAdd(newSize);
            setNewSize('');
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
                <h2 className="text-xl">Thêm kích thước</h2>
                <input 
                    type="text" 
                    value={newSize} 
                    onChange={(e) => setNewSize(e.target.value)} 
                    className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                    placeholder="Nhập kích thước"
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


const EditPopup = ({ size, onClose, darkMode }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
            <h2 className="text-xl">Sửa kích thước</h2>
            <input 
                type="text" 
                defaultValue={size.size} 
                className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
            />
            <div className="mt-4">
                <button onClick={onClose} className="bg-gray-500 text-white px-3 py-1 mr-2">Cancel</button>
                <button className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1`}>Save</button>
            </div>
        </div>
    </div>
);

const List = () => {
    const { darkMode } = useTheme();
    const [isEditPopupOpen, setEditPopupOpen] = useState(false);
    const [isAddPopupOpen, setAddPopupOpen] = useState(false);
    const [selectedSize, setSelectedSize] = useState(null);

    const handleEditClick = (size) => {
        setSelectedSize(size);
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedSize(null);
    };

    const handleAddSize = (newSize) => {
        sizes.push({ id: sizes.length + 1, size: newSize }); // Update your state logic appropriately
    };

    return (
        <div className="pb-10">
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="flex justify-between">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Danh sách kích thước</h2>
                    <button 
                        className={`${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'} px-3 py-1 rounded-md hover:bg-gray-600`}
                        onClick={() => setAddPopupOpen(true)}
                    >
                        Thêm kích thước
                    </button>
                </div>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                            <th className="py-2 px-4 text-left">Id</th>
                            <th className="py-2 px-4 text-left">Kích thước</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sizes.map(size => (
                            <tr className={`${darkMode ? ' text-meta-3 ' : ''}`} key={size.id}>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>{size.id}</td>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>{size.size}</td>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                    <button className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}>
                                        Xóa
                                    </button>
                                    <button 
                                        className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}
                                        onClick={() => handleEditClick(size)}
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditPopupOpen && selectedSize && (
                    <EditPopup size={selectedSize} onClose={closeEditPopup} darkMode={darkMode} />
                )}
                {isAddPopupOpen && (
                    <AddPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddSize} darkMode={darkMode} />
                )}
            </div>
        </div>
    );
}

export default List;
