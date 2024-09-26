import React, { useEffect, useState } from 'react';
import TitleMainLeft from '../../theme/titleMainLeft';
import BoxProduct from '../../theme/boxProduct';

const menuProduct = [
    {
        id: "1",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/nike-air-zoom-pegasus-38-cw7356-101-01-300x300.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 1000000,
        link: "/product/1",
    },
    {
        id: "2",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/ultraboost-pb-shoes-blue-eg0426-01-standard-400x400.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 4000000,
        link: "/product/2",
    },
    {
        id: "3",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/z-g28999-02-400x400.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 3000000,
        link: "/product/3",
    },
    {
        id: "4",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-furysole-dv4481-1-400x400.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 2000000,
        link: "/product/4",
    },
    {
        id: "5",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/puma-love-wns-372104-03-30861-1-400x400.jpg",
        name: "Giày chạy Nike Chính hãng – Air Zoom Pegasus 38  | JapanSport CW7356-101",
        price: 1000000,
        link: "/product/5",
    },
];

const ProductNew = () => {
    const [displayCount, setDisplayCount] = useState(5);
    useEffect(() => {
        const updateDisplayCount = () => {
            const width = window.innerWidth;
            if (width < 640) { 
                setDisplayCount(2);
            } else if (width >= 640 && width < 1024) { 
                setDisplayCount(3); 
            }else if (width >= 1024 && width < 1280) { 
                setDisplayCount(4); 
            }else { 
                setDisplayCount(5);
            }
        };

        updateDisplayCount(); 
        window.addEventListener('resize', updateDisplayCount); 

        return () => {
            window.removeEventListener('resize', updateDisplayCount); 
        };
    }, []);

    return (
        <>
            <TitleMainLeft text={`Sản phẩm mới về`} />
            <div className="flex gap-x-4 mt-7">
                {menuProduct.slice(0, displayCount).map((product) => (
                    <BoxProduct key={product.id} product={product} />
                ))}
            </div>
        </>
    );
}

export default ProductNew;
