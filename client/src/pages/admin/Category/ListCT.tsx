import React, { useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { Link } from 'react-router-dom';

const categories = [
    { id: 1, name: 'Giày thể thao' },
    { id: 2, name: 'Giày nam' },
    { id: 3, name: 'Giày nữ' },
];

const AddCategoryPopup = ({ onClose, onAdd, darkMode }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAdd = () => {
      if (newCategory) {
          onAdd(newCategory);
          setNewCategory('');
          onClose();
      }
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
              <h2 className="text-xl">Thêm danh mục</h2>
              <input 
                  type="text" 
                  value={newCategory} 
                  onChange={(e) => setNewCategory(e.target.value)} 
                  className={`${darkMode ? 'bg-[#3E4A58] text-white p-2' : 'border p-2'} mt-2 w-full`} 
                  placeholder="Nhập danh mục"
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


const EditPopup = ({ category, onClose, darkMode }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className={`${darkMode ? 'bg-[#24303F] text-white' : 'bg-white text-black'} p-5 rounded`}>
            <h2 className="text-xl">Sửa danh mục</h2>
            <input 
                type="text" 
                defaultValue={category.name} 
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
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        setEditPopupOpen(true);
    };

    const closeEditPopup = () => {
        setEditPopupOpen(false);
        setSelectedCategory(null);
    };

    const handleAddCategory = (newCategory) => {
        categories.push({ id: categories.length + 1, name: newCategory }); // Update your state logic appropriately
    };

    return (
        <div className="pb-10">
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="flex justify-between">
                    <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Danh sách danh mục</h2>
                    <button 
                        className={`${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'} px-3 py-1 rounded-md hover:bg-gray-600`}
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
                            <tr className={`${darkMode ? ' text-meta-3 ' : ''}`} key={category.id}>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>{category.id}</td>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>{category.name}</td>
                                <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b py-2 px-4`}>
                                    <button className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}>
                                        Xóa
                                    </button>
                                    <button 
                                        className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}
                                        onClick={() => handleEditClick(category)}
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isEditPopupOpen && selectedCategory && (
                    <EditPopup category={selectedCategory} onClose={closeEditPopup} darkMode={darkMode} />
                )}
                {isAddPopupOpen && (
                    <AddCategoryPopup onClose={() => setAddPopupOpen(false)} onAdd={handleAddCategory} darkMode={darkMode} />
                )}
            </div>
        </div>
    );
}

export default List;
