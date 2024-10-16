import React from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  product_id: number;
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  ship_id: string;
  order_id: number;
  status: string;
  products: Product[];
  total_amount: number;
  delivery_status: string;
}

interface Bill {
    billhis_id: number;
    bill_id: number;
    time: string;
    status: string;
    products: Product[]; // Danh sách sản phẩm trong hóa đơn
  }
  

const MenuDetail: React.FC<{ order: Order, bill: Bill }> = ({ order, bill }) => {

    const navigate = useNavigate(); 

  const handleGoBack = () => {
    navigate(-1); 
  };

  return (
    <div>
        <div>
            <button 
                onClick={handleGoBack} 
                className="flex items-center text-gray-500 hover:text-blue-500 transition duration-200"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 10l4.293-4.293L10 3.293 2 10l8 6.707 1.586-1.414L7.293 10z"
                        clipRule="evenodd"
                    />
                </svg>
                Trở lại
            </button>
        </div>
        <div className="p-4 max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        
      <h2 className="text-2xl font-bold mb-4">Mã đơn hàng: <span className="font-semibold">{bill.bill_id}</span></h2>
      <p className="text-gray-600">Trạng thái: <span className="font-semibold">{order.status}</span></p>
      <p className="text-gray-600">Phương thức vận chuyển: <span className="font-semibold">{order.ship_id}</span></p>
      <p className="text-gray-600">Trạng thái giao hàng: <span className="font-semibold">{order.delivery_status}</span></p>
      
      <h3 className="text-xl font-semibold mt-4">Sản phẩm:</h3>
      <ul className="list-disc pl-5">
        {order.products.map((product) => (
          <li key={product.product_id} className="flex justify-between py-2">
            <span>{product.name} (x{product.quantity})</span>
            <span>{product.price.toLocaleString()} đ</span>
          </li>
        ))}
      </ul>

      
      <div className="mt-4 font-bold text-lg">Tổng tiền: {order.total_amount.toLocaleString()} đ</div>
      
      <div className="mt-6 flex gap-4">
        <button className="bg-orange-500 text-white px-4 py-2 rounded">Đánh Giá</button>
      </div>
    </div>
    </div>
    
    
  );
};

// Dữ liệu giả lập
const orderData: Order = {
  
  ship_id: "Hỏa tốc",
  order_id: 1,
  status: 'Hoàn Thành',
  delivery_status: 'Giao hàng thành công',
  total_amount: 2000000,
  products: [
    { product_id: 1, name: 'Sản phẩm A', quantity: 2, price: 2000000 },
  ],
};

const billData: Bill = {
    billhis_id: 1,
    bill_id: 101, // Thêm mã hóa đơn giả lập
    time: '2024-10-16',
    status: 'Hoàn thành',
    products: orderData.products,
  };

const OrderDetail: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <MenuDetail order={orderData} bill={billData} />
    </div>
  );
};

export default OrderDetail;
