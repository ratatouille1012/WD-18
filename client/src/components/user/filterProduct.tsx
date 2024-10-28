import React, { useState } from 'react';
import ButtonReset from '../../theme/buttonReset';
import useCategory from '../../hook/useCategory';
import useBrand from '../../hook/useBrand';
import useSize from '../../hook/useSize';
import useColor from '../../hook/useColor';



function FilterProduct() {
    const [checkedItems, setCheckedItems] = useState({});
    const { categories,loadingCategories } = useCategory();
    const { brand,loadingBrand } = useBrand();
    const { size,loadingSize } = useSize();
    const { color,loadingColor } = useColor()
    const menuFilter = [
        {
            id: "1",
            title: "Danh mục sản phẩm",
            subMenu: categories
        },
        {
            id: "2",
            title: "Size",
            subMenu: size
        },
        {
            id: "3",
            title: "Màu sắc",
            subMenu: color
        },
        {
            id: "4",
            title: "Thương hiệu",
            subMenu: brand
        },
    ];
    const handleCheckboxChange = (_id) => {
        setCheckedItems((prev) => ({
            ...prev,
            [_id]: !prev[_id]
        }));
    };

    const resetFilters = () => {
        setCheckedItems({});
    };

    const isAnyChecked = Object.values(checkedItems).some(value => value);
    console.log(menuFilter);
    
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
                            <label key={subMenuu._id} className="flex items-center cursor-pointer mr-4 py-4">
                                <input
                                    type="checkbox"
                                    name={subMenuu._id}
                                    checked={!!checkedItems[subMenuu._id]}
                                    onChange={() => handleCheckboxChange(subMenuu._id)}
                                    className="hidden peer"
                                />
                                <span className="w-6 h-6 border border-gray-300 rounded-sm flex items-center justify-center mr-2 peer-checked:border-red-500 peer-checked:bg-red-500 hover:border-red-500 transition text-white">X</span>
                                <span className='font-semibold'>{subMenuu.name}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default FilterProduct;
