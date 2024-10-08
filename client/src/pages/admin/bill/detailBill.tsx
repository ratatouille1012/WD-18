import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTheme } from '../../../contexts/theme';

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

const initialColors = [
    { color_id: 1, name: 'Đen', hex: '#000000' },
    { color_id: 2, name: 'Trắng', hex: '#FFFFFF' },
    { color_id: 3, name: 'Xanh', hex: '#0000FF' },
];

const initialSizes = [
    { size_id: 1, size: '36' },
    { size_id: 2, size: '37' },
    { size_id: 3, size: '38' },
    { size_id: 4, size: '39' },
    { size_id: 5, size: '40' },
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
        product_id: 5, 
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
    { bill_item_id: 1, bill_id: 1, variant_id: 1,recipient_id:1, quantity: 1, variant_price: 2000000 }, 
    { bill_item_id: 2, bill_id: 1, variant_id: 2,recipient_id:1, quantity: 1, variant_price: 1600000 },
    { bill_item_id: 3, bill_id: 2, variant_id: 3,recipient_id:3, quantity: 1, variant_price: 2000000 },
    { bill_item_id: 4, bill_id: 2, variant_id: 5,recipient_id:3, quantity: 1, variant_price: 1300000 }, 
];

const initialRecipients = [
    { recipient_id: 1, name: 'Nguyễn Văn A', phone: '0123456789', address: 'Hà Nội' },
    { recipient_id: 2, name: 'Trần Thị B', phone: '0987654321', address: 'Trịnh Văn Bô' },
    { recipient_id: 3, name: 'Lê Văn C', phone: '0912345678', address: 'Trịnh Văn Bô' },
    { recipient_id: 4, name: 'Phạm Thị D', phone: '0901234567', address: 'Trịnh Văn Bô' },
];

const initialShips = [
    { ship_id: 'SHIP1', name: 'Giao hàng tiêu chuẩn', price: 50000 },
    { ship_id: 'SHIP2', name: 'Giao hàng nhanh', price: 100000 },
];

const statusOptions = ['Chờ xử lý', 'Đang giao', 'Đã nhận', 'Đã hủy'];

const BillDetail = () => {
    const { darkMode } = useTheme();
    const { billId } = useParams();
    const bill = initialBills.find(b => b.bill_id === parseInt(billId));
    const billItems = initialBillItems.filter(item => item.bill_id === bill.bill_id);

    const initialRecipient = initialRecipients.find(r => r.recipient_id === billItems[0].recipient_id);
    const ship = initialShips.find(s => s.ship_id === bill.ship_id);

    const [status, setStatus] = useState(bill.status);
    const [recipientData, setRecipient] = useState(initialRecipient || {});

    const [note, setNote] = useState('');

    const [statusHistory, setStatusHistory] = useState([]);


    const handleChangeNote = (e) => {
        setNote(e.target.value);
    };

    

    const handleChangeStatus = (e) => {
        setStatus(e.target.value);
    };

    const handleSaveChanges = () => {
        const newEntry = {
            status: status,
            note: note,
            time: new Date().toLocaleString(),
        };
        setStatusHistory(prev => [...prev, newEntry]);
        setNote(''); 
    };

    const handleChangeRecipient = (e) => {
        const { name, value } = e.target;
        setRecipient(prev => ({ ...prev, [name]: value }));
    };

    const totalPrice = billItems.reduce((total, item) => total + item.variant_price * item.quantity, 0);
    const discount = bill.voucher_id ? 0.1 * totalPrice : 0;
    const finalTotal = totalPrice + ship.price - discount;

    return (
        <div className="pb-10">
            <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-6`}>Chi tiết đơn hàng: {bill.bill_code}</h1>
            {/* TT người nhận*/}
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
                <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin người nhận</h2>
                {recipientData ? (
                    <>  
                    <div className="flex gap-x-4">
                        <div className="input-with-placeholder2 w-full ">
                            <label htmlFor="bill-code">Mã đơn</label>   
                            <input
                                type="text"
                                name="bill_code"
                                value={bill.bill_code}
                                disabled
                                required
                                id="bill_code"
                            />
                        </div>
                        <div className="input-with-placeholder2 w-full ">
                            <label htmlFor="user_id">ID tài khoản đặt hàng</label>
                            <input
                                type="text"
                                name="name"
                                value={bill.user_id}
                                disabled
                                required
                                id="user_id"
                            />
                        </div>
                    </div>       
                    <div className="flex gap-x-4">                
                        <div className="input-with-placeholder2 w-full">
                            <label htmlFor="recipient-name">Tên người nhận</label>
                            <input
                                type="text"
                                name="name"
                                value={recipientData.name}
                                onChange={handleChangeRecipient}
                                disabled={status !== 'Chờ xử lý'}
                                required
                                id="recipient-name"
                            />
                        </div>
                        <div className="input-with-placeholder2 w-full">
                            <label htmlFor="recipient-phone">SĐT</label>
                            <input
                                type="text"
                                name="phone"
                                value={recipientData.phone}
                                onChange={handleChangeRecipient}
                                disabled={status !== 'Chờ xử lý'}
                                required
                                id="recipient-phone"
                            />
                        </div>
                    </div> 
                    <div className="input-with-placeholder2">
                        <label htmlFor="recipient-address">Địa chỉ</label>
                        <input
                            type="text"
                            name="address"
                            value={recipientData.address}
                            onChange={handleChangeRecipient}
                            disabled={status !== 'Chờ xử lý'}
                            required
                            id="recipient-address"
                        />
                    </div>
                    </>
                ) : (
                    <p><strong>Không tìm thấy thông tin người nhận.</strong></p>
                )}
            </div>
            {/* TT người sản phẩm*/}
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
                <div className="flex justify-between"><h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Tông tin sản phẩm</h2></div>
                <table className="min-w-full mt-4">
                    <thead>
                    <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)] ' : 'bg-gray-200'} `}>
                        <th className="py-2 px-4 text-left">Id</th>
                        <th className="py-2 px-4 text-left">Tên sản phẩm</th>
                        <th className="py-2 px-4 text-left">Biến thể</th>
                        <th className="py-2 px-4 text-left">Số lượng</th>
                        <th className="py-2 px-4 text-left">Giá bán</th>
                        <th className="py-2 px-4 text-left">Thành tiền</th>
                    </tr>
                    </thead>
                    <tbody>
                    {billItems.map(item => {
                        const variant = initialVariants.find(v => v.variant_id === item.variant_id);
                        const product = initialProducts.find(p => p.product_id === variant.product_id);
                        const color = initialColors.find(c => c.color_id === variant.color_id);
                        const size = initialSizes.find(s => s.size_id === variant.size_id);
                        const itemTotalPrice = item.variant_price * item.quantity;
                        return (
                        <tr className={`${darkMode ? ' text-meta-3 ' : ''} `} key={item.bill_item_id}>
                            <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{product.product_id}</td>
                            <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{product.name}</td>
                            <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>Màu: {color.name}, Size: {size.size}</td>
                            <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{item.quantity}</td>
                            <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{item.variant_price}</td>
                            <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{itemTotalPrice}</td>
                        </tr>
                    )})}
                    </tbody>
                </table>
                <div className="w-full flex flex-col items-end px-[90px]">
                    <p><strong>Tổng tiền sản phẩm:</strong> {totalPrice.toLocaleString()} </p>
                    <p><strong>Giá vận chuyển:</strong> {(ship ? ship.price : 0).toLocaleString()} </p>
                    <p><strong>Giảm giá voucher:</strong> {discount.toLocaleString()} </p>
                    <p><strong>Tổng tiền cả đơn:</strong> {finalTotal.toLocaleString()} </p>
                </div>
            </div>    
            {/* Lịch sử hay đổi trạng thái*/}
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
                <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Lịch sử thay đổi trạng thái </h2>
                <ul>
                    {statusHistory.map((entry, index) => (
                        <li key={index} className="mb-2">
                            <strong>{entry.status}</strong> - {entry.note} <span className="text-gray-500">({entry.time})</span>
                        </li>
                    ))}
                </ul>
            </div>           
            {/* Thay đổi trạng thái*/}
            <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
                <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thay đổi trạng thái đơn hàng</h2>
                <div className="input-with-placeholder">
                        <select value={status} onChange={handleChangeStatus} id={`stt`}>
                            {statusOptions.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                            <label htmlFor={`stt`}>Trạng thái</label>
                        </div>
                <div className="input-with-placeholder2 mt-4">
                <input
                    type="text"
                    value={note}
                    onChange={handleChangeNote}
                    placeholder="Ghi chú ..."
                    className={`${darkMode ? 'bg-[#2C394A] text-white border border-gray-700' : 'bg-white text-black border border-gray-300'} w-full h-[90px] p-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out`}
                />
                </div>      
            </div>
            <button 
                    className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={handleSaveChanges}
                >   
                    Lưu thay đổi
            </button>
        </div>
    );
};

export default BillDetail;


