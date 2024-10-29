import React, { useEffect, useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import useOrder from '../../../hook/useOder';
import useVariant from '../../../hook/useVariant';
import useProduct from '../../../hook/useProduct';

const BillDetail = () => {
    const { darkMode } = useTheme();
    const { orders, loadingOrder } = useOrder();
    const { getProductByVariantId, productDetails } = useProduct();
    const { getOne, variant } = useVariant();
    const fetchedVariants = new Set(); 
    useEffect(() => {
        const fetchDetails = async (fetchFunction) => {
            if (!orders || !orders.orderItems) return;

            await Promise.all(
                orders.orderItems.map(async (item) => {
                    if (item.variantId && !fetchedVariants.has(item.variantId)) {
                        console.log(`Fetching details for variant ID: ${item.variantId}`);
                        await fetchFunction(item.variantId);
                        fetchedVariants.add(item.variantId);
                    }
                })
            );
        };

        fetchDetails(getProductByVariantId);
        fetchDetails(getOne);
    }, [orders]);

    if (loadingOrder) {
        return <p>Loading...</p>;
    }
    console.log("Orders:", orders);
    console.log("Product Details:", productDetails);

    return (
        <div className="pb-10">
            <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-6`}>Chi tiết đơn hàng: {orders?.orderCode}</h1>
            <RecipientInfo orders={orders} darkMode={darkMode} />
            <ProductInfo orders={orders} productDetails={productDetails} variant={variant} darkMode={darkMode} />
            <StatusHistory orders={orders} darkMode={darkMode} />
            <ChangeStatus  orders={orders} darkMode={darkMode} />
        </div>
    );
};

const RecipientInfo = ({ orders, darkMode }) => (
    <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
        <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin người nhận</h2>
        <div className="flex gap-x-4">
            <InputField label="Mã đơn" value={orders?.orderCode} />
            <InputField label="ID tài khoản đặt hàng" value={orders?.user} />
        </div>
        <div className="flex gap-x-4">
            <InputField label="Tên người nhận" value={orders?.name} />
            <InputField label="SĐT" value={orders?.phone} />
        </div>
        <InputField label="Địa chỉ" value={orders?.address} />
    </div>
);

const InputField = ({ label, value }) => (
    <div className="input-with-placeholder2 w-full">
        <label>{label}</label>
        <input type="text" value={value} disabled required />
    </div>
);

const ProductInfo = ({ orders, productDetails, variant, darkMode }) => {
    console.log(orders);
    
    const totalPrice = orders?.orderItems?.reduce((acc, item) => {
        const product = productDetails[item.variantId];
        const variants = variant[item.variantId];
        
        if (product && variants) {
            return acc + (variants.salePrice * item.variantQuantity);
        }
        return acc; 
    }, 0) || 0;

    return (
        <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
            <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Thông tin sản phẩm</h2>
            <table className="min-w-full mt-4">
                <thead>
                    <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)] ' : 'bg-gray-200'}`}>
                        <th className="py-2 px-4 text-left">STT</th>
                        <th className="py-2 px-4 text-left">Ảnh</th>
                        <th className="py-2 px-4 text-left">Tên sản phẩm</th>
                        <th className="py-2 px-4 text-left">Biến thể</th>
                        <th className="py-2 px-4 text-left">Số lượng</th>
                        <th className="py-2 px-4 text-left">Giá bán</th>
                        <th className="py-2 px-4 text-left">Thành tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.orderItems?.map((item, index) => {
                        const product = productDetails[item.variantId];
                        const variants = variant[item.variantId];

                        if (!product || !variants) {
                            console.error(`Product or variant not found for variant ID: ${item.variantId}`);
                            return (
                                <tr key={item.variantId}>
                                    <td colSpan="6">Product or variant not found for variant ID: {item.variantId}</td>
                                </tr>
                            );
                        }

                        return (
                            <tr key={index}>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{index + 1}</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}><img className='h-[100px]' src={product.images[0]} alt="" /></td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{product.title}</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>Màu: {variants.color?.name || 'N/A'}, Size: {variants.size?.name || 'N/A'}</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{item.variantQuantity}</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{(variants.salePrice).toLocaleString()} VNĐ</td>
                                <td className={`${darkMode ? ' border-[#313D4A] text-meta-3' : ''} border-b  py-2 px-4`}>{(variants.salePrice * item.variantQuantity).toLocaleString()} VNĐ</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className={`${darkMode ? 'text-bodydark2' : 'text-black'} w-full flex flex-col items-end px-[90px]`}>
                <p><strong>Tổng tiền sản phẩm:</strong> {totalPrice.toLocaleString()} VNĐ</p>
                <p><strong>Giá vận chuyển:</strong>15.000 VNĐ</p>
                <p><strong>Giảm giá voucher:</strong>0 VNĐ</p>
                <p><strong>Tổng tiền cả đơn:</strong> {(orders?.total !== undefined ? orders.total.toLocaleString() : 0)} VNĐ</p>
            </div>
        </div>
    );
};


const StatusHistory = ({ darkMode, orders }) => {
    // Kiểm tra nếu orders.updatedAt có giá trị hợp lệ
    const updatedAt = orders?.updatedAt ? new Date(orders?.updatedAt) : null;

    // Định dạng ngày giờ nếu updatedAt hợp lệ
    const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    };

    const formattedDate = updatedAt ? new Intl.DateTimeFormat('vi-VN', options).format(updatedAt) : 'N/A';

    return (
        <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6 pb-20`}>
            <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Lịch sử thay đổi trạng thái</h2>
            <ul>
                <li className={`${darkMode ? 'text-bodydark2' : 'text-black'} mb-2`}>
                    <strong>{orders?.orderStatus}</strong> - {formattedDate} <span className="text-gray-500"></span>
                </li>
            </ul>
        </div>
    );
};

const ChangeStatus = ({ orders, darkMode }) => {
    const { updateOrderById, loadingOrder } = useOrder(); 

    const handleUpdateOrderStatus = async (newStatus) => {
        const updatedData = {
            user: orders?.user,
            orderCode: orders?.orderCode,
            orderStatus: newStatus,
            name: orders?.name,
            address: orders?.address,
            phone: orders?.phone,
        };

        try {
            await updateOrderById(orders._id, updatedData); 
            alert(`Đơn hàng đã ${newStatus}.`);
            window.location.reload(); 
        } catch (error) {
            console.error("Error updating order status:", error); 
        }
    };

    return (
        <>
            {orders?.orderStatus === "Chờ xử lý" && (
                <div className="gap-x-4 flex">
                    <button 
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"  
                        onClick={() => handleUpdateOrderStatus("Đã xác nhận")} 
                        disabled={loadingOrder}
                    >
                        Đã xác nhận
                    </button>
                    <button 
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded" 
                        onClick={() => handleUpdateOrderStatus("Đã hủy")} 
                        disabled={loadingOrder}
                    >
                        Hủy đơn hàng
                    </button>
                </div>
            )}
            {orders?.orderStatus === "Đã xác nhận" && (
                <div className="mt-4">
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded"
                    onClick={() => handleUpdateOrderStatus("Đang giao hàng")} 
                    disabled={loadingOrder}
                    >
                        Đang giao hàng
                    </button>
                </div>
            )}
            {orders?.orderStatus === "Đang giao hàng" && (
                <div className="mt-4">
                    <button className="bg-yellow-400 text-white px-4 py-2 rounded"
                    onClick={() => handleUpdateOrderStatus("Giao hàng thành công")} 
                    disabled={loadingOrder}
                    >
                        Giao hàng thành công
                    </button>
                </div>
            )}
            {(orders?.orderStatus === "Giao hàng thành công" || orders?.orderStatus === "Đã hủy") && (
                <div className="mt-4">
                    <button 
                        className="bg-amber-300 text-white px-4 py-2 rounded"
                    >
                        Lịch sử đơn hàng
                    </button>
                </div>
            )}
        </>
    );
};

export default BillDetail;
