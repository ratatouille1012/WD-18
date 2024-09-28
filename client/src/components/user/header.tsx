import React, { useState } from 'react';
import Logo from '../../theme/logo';
import MenuHeader from '../../theme/menuHeader';
import { Link } from 'react-router-dom';
import InputSearch from '../../theme/inputSearch';
import SearchSVG from '../../svg/searchSVG';
import CartSVG from '../../svg/cartSVG';
import BarSVG from '../../svg/barSVG';
import BarLeft from './barLeft';

const Header = () => {
    const [searchVisible, setSearchVisible] = useState(false);

    const menus = [
        { label: "Trang chủ", link: "/" },
        { label: "Sản phẩm", link: "/product" },
        { label: "Khuyến mãi", link: "/sale" },
        { label: "Tin tức", link: "/new" },
        { label: "Liên hệ", link: "/contact" },
        {
            label: (
                <div className="relative group">
                     <SearchSVG width={`25px`} height={`25px`} color={`black`} setSearchVisible={setSearchVisible}  />
                    {searchVisible && (
                        <div 
                            className="absolute bg-white p-7 z-50 rounded shadow-md"
                            style={{ left: '-300px' }}
                            onMouseEnter={() => setSearchVisible(true)} 
                            onMouseLeave={() => setSearchVisible(false)} 
                        >
                            <InputSearch ml={`ml-[-10px]`} width={`w-[280px]`} rounded={`rounded`} padding={`p-1`} border={`border`} setSearchVisible={setSearchVisible} />
                        </div>
                    )}
                </div>
            ),
            link: "#",
        },
        {
            label: (
                <CartSVG/>
            ),
            link: "/cart",
        },
    ];

    const [isOprnBarLeft, setOprnBarLeft] = useState(false);

    const buttonOBL = () => {
        setOprnBarLeft(!isOprnBarLeft);
    };

    return (
        <>
        <header>
            <div className="w-full xs:justify-between flex xs:px-4 sm:px-4 lg:px-5 xl:px-[150px] border-b items-center">
                <button onClick={buttonOBL} className="xs:block md:hidden xl:hidden"><BarSVG /></button>
                <Logo size={`xs:w-[60px] md:w-[100px] xl:w-[100px]`} />
                <a href='' className="xs:block md:hidden xl:hidden"><CartSVG/></a>
                <div className="md:flex xs:hidden w-full justify-end">
                    {menus.map((menu, index) => (
                        <Link  to={`${menu.link}?label=${encodeURIComponent(menu.label)}`}  key={index}>
                            <MenuHeader style={`xs:hidden sm:hidden md:block lg:block xl:block mx-3 flex tracking-[0.02em] leading-[16px] p-[5px]`} font={`font-[600]`} size={`text-[18px]`} menu={menu.label} menuCT={undefined} />
                        </Link>
                    ))}
                </div>
            </div>
        </header>
        {isOprnBarLeft && <BarLeft toggleOBL={buttonOBL} />}
        </>
    );
}

export default Header;
