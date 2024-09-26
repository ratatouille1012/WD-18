import React from 'react';
import TitleMainLeft from '../../theme/titleMainLeft';
import BoxProduct from '../../theme/boxProduct';
import BoxBgIMG from '../../theme/boxBgIMG';
import Slider from "react-slick"; 

const menuContentProduct = [
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

const ContentProduct = () => {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            
        ]
    };

    return (
        <>
            <TitleMainLeft text={`Giày thể thao nữ`} />
            <div className="flex gap-x-4 mt-7">
                <BoxBgIMG fullIMG={`https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/nu.jpg`} />
                <div className="slider-container">
                    <Slider {...settings}>
                        {menuContentProduct.map((product) => (
                            <div key={product.id} style={{ padding: '10px' }}>
                                <BoxProduct product={product} className="box-product" />
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>
        </>
    );
}

export default ContentProduct;
