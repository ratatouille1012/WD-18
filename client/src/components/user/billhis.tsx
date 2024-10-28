import { Button } from '@material-tailwind/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

interface Product {
  product_id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Bill {
  billhis_id: number;
  bill_id: number;
  time: string;
  status: string;
  products: Product[]; // Danh sách sản phẩm trong hóa đơn
}

const BillHis = () => {
  // Danh sách hóa đơn ban đầu
  const [bills] = useState<Bill[]>([
    {
      billhis_id: 1,
      bill_id: 101,
      time: '2024-10-15',
      status: 'Đã hoàn thành',
      products: [
        { product_id: 1, name: 'Sản phẩm A', price: 2000000, quantity: 2 },
      ],
    },
    {
      billhis_id: 2,
      bill_id: 102,
      time: '2024-10-16',
      status: 'Đang xử lý',
      products: [
        { product_id: 2, name: 'Sản phẩm B', price: 4000000, quantity: 1 },
      ],
    },
  ]);

  return (
    <div>
      {/* Bảng danh sách hóa đơn */}
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">BillHis ID</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Bill ID</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Thời gian</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Sản phẩm</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Trạng thái</th>
            <th className="border-b border-gray-300 p-4 text-left text-sm font-medium text-gray-600">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(bill => (
            <tr key={bill.billhis_id}>
              <td className="border-b border-gray-300 p-4">{bill.billhis_id}</td>
              <td className="border-b border-gray-300 p-4">{bill.bill_id}</td>
              <td className="border-b border-gray-300 p-4">{bill.time}</td>
              <td className="border-b border-gray-300 p-4">
                {bill.products.map(product => (
                  <div key={product.product_id}>
                    {product.name} - Số lượng: {product.quantity} - Giá: {product.price.toLocaleString()} đ
                  </div>
                ))}
              </td>
              <td className="border-b border-gray-300 p-4">{bill.status}</td>
              <td className="border-b border-gray-300 p-4">
                <Link to={`/detail/${bill.billhis_id}`}>
                  <Button type='primary'>Chi tiết</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillHis;