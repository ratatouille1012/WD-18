import React, { useState } from 'react';

// Định nghĩa interface cho đơn hàng
interface Order {
  billhis_id: number; // ID của bảng billHis
  bill_id: number;    // ID của hóa đơn
  status: string;     // Trạng thái
  user_id: number;    // ID của người dùng
  time: string;       // Thời gian
}

const BillHis = () => {
  // Dữ liệu giả lập cho các đơn hàng
  const [orders, setOrders] = useState<Order[]>([
    { billhis_id: 1, bill_id: 1001, status: 'Đã hoàn thành', user_id: 1, time: '2024-10-01' },
    { billhis_id: 2, bill_id: 1002, status: 'Đang xử lý', user_id: 2, time: '2024-10-10' },
  ]);

  // Hàm để cập nhật trạng thái đơn hàng
  
  return (
    <div>
      {/* Tiêu đề bảng */}
      <h2 className="text-lg font-semibold mb-4">Trạng thái đơn hàng</h2>

      {/* Bảng trạng thái đơn hàng */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">BillHis ID</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Bill ID</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Thời gian</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Trạng thái</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">User ID</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.billhis_id}>
              <td className="border-b border-gray-300 p-4">{order.billhis_id}</td>
              <td className="border-b border-gray-300 p-4">{order.bill_id}</td>
              <td className="border-b border-gray-300 p-4">{order.time}</td>
              <td className="border-b border-gray-300 p-4">{order.status}</td>
              <td className="border-b border-gray-300 p-4">{order.user_id}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillHis;