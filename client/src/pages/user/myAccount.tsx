import React, { useState } from 'react';
import BillHis from '../../components/user/billhis';
import FilterAccount from '../../components/user/filterAccount';
import OrderDetail from '../../components/user/orderDetail';



const MyAccount = () => {
  const [activePage, setActivePage] = useState<string>('Tài khoản của tôi');

  return (
    <div>
      <div className="flex mt-7 mb-16">
        {/* Thanh menu bên trái */}
        <div className="w-1/3"> {/* 30% chiều rộng cho menu */}
          <FilterAccount setActivePage={setActivePage} />
        </div>
        
        {/* Nội dung bên phải */}
        <div className="flex-1 w-2/3"> {/* 70% chiều rộng cho nội dung */}
          {activePage === 'Đơn mua' && <BillHis />}  
          {activePage === 'Tài khoản của tôi' && <div>Hồ sơ của tôi</div>} {/* Thay thế với nội dung thực tế */}
        </div>
        {activePage === 'Chi Tiết Đơn Hàng' && <OrderDetail />}  
      </div>
    </div>
  );
};

export default MyAccount;