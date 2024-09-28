import React, { useState } from 'react';
import ButtonReset from '../../theme/buttonReset';

const menuFilter = [
    {
        id: "1",
        title: "Danh mục sản phẩm",
        subMenu: [
            { id: "1-1", title: "Boots" },
            { id: "1-2", title: "Cao gót" },
            { id: "1-3", title: "Đế bệt" },
            { id: "1-4", title: "Đế gỗ" },
            { id: "1-5", title: "Giày búp bê" },
            { id: "1-6", title: "Sneaker" },
            { id: "1-7", title: "Thể thao" }
        ]
    },
    {
        id: "2",
        title: "Size",
        subMenu: [
            { id: "2-1", title: "39" },
            { id: "2-2", title: "40" },
            { id: "2-3", title: "41" },
            { id: "2-4", title: "42" },
            { id: "2-5", title: "43" },
            { id: "2-6", title: "44" },
            { id: "2-7", title: "45" }
        ]
    },
    {
        id: "3",
        title: "Màu sắc",
        subMenu: [
            { id: "3-1", title: "Cam" },
            { id: "3-2", title: "Đen" },
            { id: "3-3", title: "Rêu" },
            { id: "3-4", title: "Trắng" },
            { id: "3-5", title: "Xanh Nhớt" }
        ]
    },
    {
        id: "4",
        title: "Thương hiệu",
        subMenu: [
            { id: "4-1", title: "Adidas" },
            { id: "4-2", title: "Nike" },
            { id: "4-3", title: "Biti's Hunter" },
            { id: "4-4", title: "Rebook" }
        ]
    },
];

function FilterProduct() {
    const [checkedItems, setCheckedItems] = useState({});

    const handleCheckboxChange = (id) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const resetFilters = () => {
        setCheckedItems({});
    };

    const isAnyChecked = Object.values(checkedItems).some(value => value);

    return (
        <div className="pr-4">
            {isAnyChecked && (
                <div className="mb-9">
                    <ButtonReset onReset={resetFilters} />
                </div>
            )}
            {menuFilter.map((menu) => (
                <div key={menu.id}>
                    <h2 className='w-full px-2 border-l-[#FF6634] border-l-8 py-1 text-xl font-bold bg-[#F5F5F5]'>{menu.title}</h2>
                    <div className="flex flex-wrap gap-x-2">
                        {menu.subMenu.map((subMenuu) => (
                            <label key={subMenuu.id} className="flex items-center cursor-pointer mr-4 py-4">
                                <input
                                    type="checkbox"
                                    name={subMenuu.id}
                                    checked={!!checkedItems[subMenuu.id]}
                                    onChange={() => handleCheckboxChange(subMenuu.id)}
                                    className="hidden peer"
                                />
                                <span className="w-6 h-6 border border-gray-300 rounded-sm flex items-center justify-center mr-2 peer-checked:border-red-500 peer-checked:bg-red-500 hover:border-red-500 transition text-white">X</span>
                                <span className='font-semibold'>{subMenuu.title}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilterProduct;
