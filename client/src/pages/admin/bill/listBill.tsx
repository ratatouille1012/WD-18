import React, { useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { Link } from 'react-router-dom';

const initialProducts = [
    {
        product_id: 1,
        name: 'Giày Thể Thao Nike Air Max',
        category_id: 1,
        brand_id: 1,
        description: 'Giày thể thao với đệm khí thoải mái, phù hợp cho mọi hoạt động thể thao.',
        price: 2500000,
        product_img: 'link-to-nike-air-max.jpg',
    },
    {
        product_id: 2,
        name: 'Giày Da Nam Converse',
        category_id: 2,
        brand_id: 2,
        description: 'Giày da cổ điển, phong cách nam tính, thích hợp cho đi làm hoặc đi chơi.',
        price: 1800000,
        product_img: 'link-to-converse-classic.jpg',
    },
    {
        product_id: 3,
        name: 'Giày Cao Gót Nữ H&M',
        category_id: 3,
        brand_id: 3,
        description: 'Giày cao gót thanh lịch, phù hợp cho các dịp tiệc tùng.',
        price: 2200000,
        product_img: 'link-to-hm-heels.jpg',
    },
    {
        product_id: 4,
        name: 'Giày Chạy Bộ Adidas Ultraboost',
        category_id: 1,
        brand_id: 1,
        description: 'Giày chạy bộ với công nghệ đệm tối ưu, hỗ trợ tốt cho người chạy.',
        price: 3000000,
        product_img: 'link-to-adidas-ultraboost.jpg',
    },
    {
        product_id: 5,
        name: 'Giày Lười Nữ Zara',
        category_id: 2,
        brand_id: 4,
        description: 'Giày lười phong cách thời trang, dễ dàng kết hợp với nhiều trang phục.',
        price: 1500000,
        product_img: 'link-to-zara-loafers.jpg',
    },
];

const initialVariants = [
    {
        variant_id: 1,
        product_id: 1,
        color_id: 1,
        size_id: 1,
        variant_quantity: 50,
        variant_import_price: 1000000,
        variant_list_price: 2500000,
        variant_sale_price: 2000000,
        isShow: true,
    },
    {
        variant_id: 2,
        product_id: 2, 
        color_id: 2,
        size_id: 1,
        variant_quantity: 30,
        variant_import_price: 800000,
        variant_list_price: 1800000,
        variant_sale_price: 1600000,
        isShow: true,
    },
    {
        variant_id: 3,
        product_id: 3, 
        color_id: 1,
        size_id: 2,
        variant_quantity: 20,
        variant_import_price: 1200000,
        variant_list_price: 2200000,
        variant_sale_price: 2000000,
        isShow: true,
    },
    {
        variant_id: 4,
        product_id: 4,
        color_id: 3,
        size_id: 3,
        variant_quantity: 10,
        variant_import_price: 1500000,
        variant_list_price: 3000000,
        variant_sale_price: 2800000,
        isShow: true,
    },
    {
        variant_id: 5,
        product_id: 5, // Zara Loafers
        color_id: 1,
        size_id: 2,
        variant_quantity: 15,
        variant_import_price: 900000,
        variant_list_price: 1500000,
        variant_sale_price: 1300000,
        isShow: true,
    },
];

const initialBills = [
    { bill_id: 1, user_id: 101, bill_code: 'BILL001', status: 'Chờ xử lý', total_bill: 2000000, voucher_id: 'VOUCHER1', ship_id: 'SHIP1' },
    { bill_id: 2, user_id: 102, bill_code: 'BILL002', status: 'Chờ xử lý', total_bill: 1500000, voucher_id: null, ship_id: 'SHIP2' },
];

const initialBillItems = [
    { bill_item_id: 1, bill_id: 1, variant_id: 1, quantity: 1, variant_price: 2000000 }, 
    { bill_item_id: 2, bill_id: 1, variant_id: 2, quantity: 1, variant_price: 1600000 },
    { bill_item_id: 3, bill_id: 2, variant_id: 3, quantity: 1, variant_price: 2000000 },
    { bill_item_id: 4, bill_id: 2, variant_id: 5, quantity: 1, variant_price: 1300000 }, 
];

const initialRecipients = [
    { recipient_id: 1, name: 'Nguyễn Văn A', phone: '0123456789', address: 'Hà Nội' },
    { recipient_id: 2, name: 'Trần Thị B', phone: '0987654321', address: 'Trịnh Văn Bô' },
    { recipient_id: 3, name: 'Lê Văn C', phone: '0912345678', address: 'Trịnh Văn Bô' },
    { recipient_id: 4, name: 'Phạm Thị D', phone: '0901234567', address: 'Trịnh Văn Bô' },
];




const OrdersList = () => {
    const { darkMode } = useTheme();
    const [bills, setBills] = useState(initialBills);

    return (
        <div className="pb-10">
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="flex justify-between">
                    <h2 className={`${darkMode ? 'text-white' : 'text-black'} text-xl font-semibold mb-4`}>Danh sách đơn hàng</h2>x
                </div>
                <table className="min-w-full mt-4">
                    <thead>
                        <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)]' : 'bg-gray-200'}`}>
                            <th className="py-2 px-4 text-left">Bill ID</th>
                            <th className="py-2 px-4 text-left">User ID</th>
                            <th className="py-2 px-4 text-left">Mã Đơn</th>
                            <th className="py-2 px-4 text-left">Trạng Thái</th>
                            <th className="py-2 px-4 text-left">Tổng Tiền</th>
                            <th className="py-2 px-4 text-left">Voucher ID</th>
                            <th className="py-2 px-4 text-left">Ship ID</th>
                            <th className="py-2 px-4 text-left"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {bills.map(bill => (
                            <tr key={bill.bill_id} className={`${darkMode ? 'bg-[#2A323D] text-white' : 'bg-white text-black'}`}>
                                <td className="border-b py-2 px-4">{bill.bill_id}</td>
                                <td className="border-b py-2 px-4">{bill.user_id}</td>
                                <td className="border-b py-2 px-4">{bill.bill_code}</td>
                                <td className="border-b py-2 px-4">{bill.status}</td>
                                <td className="border-b py-2 px-4">{bill.total_bill}</td>
                                <td className="border-b py-2 px-4">{bill.voucher_id}</td>
                                <td className="border-b py-2 px-4">{bill.ship_id}</td>
                                <td className="border-b py-2 px-4">
                                <Link to={`../bill/detail/${bill.bill_id}`}>
                                        <button className={`${darkMode ? 'bg-blue-600' : 'bg-blue-500'} text-white px-3 py-1`}>Chi tiết</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrdersList;
