import React, { useState } from 'react';
import { useTheme } from '../../../contexts/theme';
import { Link } from 'react-router-dom';
import useOrder from '../../../hook/useOder';

const OrdersList = () => {
    const { darkMode } = useTheme();
    const { order, loadingOrder } = useOrder();
    
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
                        {order?.map((bill,index) => (
                            <tr key={index} className={`${darkMode ? 'bg-[#2A323D] text-meta-3' : 'bg-white text-black'}`}>
                                <td className="border-b py-2 px-4">{index+1}</td>
                                <td className="border-b py-2 px-4">{bill.user}</td>
                                <td className="border-b py-2 px-4">{bill.orderCode}</td>
                                <td className="border-b py-2 px-4">{bill.orderStatus}</td>
                                <td className="border-b py-2 px-4">{bill.total}</td>
                                <td className="border-b py-2 px-4">{bill.voucher || "none"}</td>
                                <td className="border-b py-2 px-4">{bill.ship || "none"}</td>
                                <td className="border-b py-2 px-4">
                                <Link to={`../bill/detail/${bill._id}`}>
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
