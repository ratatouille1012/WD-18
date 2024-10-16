import { useState } from 'react';
import BillHis from '../../components/user/billhis';
import FilterAccount from '../../components/user/filterAccount';
import OrderDetail from '../../components/user/orderDetail';



const MyAccount = () => {
  const [activePage, setActivePage] = useState<string>('Tài khoản của tôi');

  return (
    <div>
      <div className="flex mt-7 mb-16">
        <div className="w-1/4"> 
          <FilterAccount setActivePage={setActivePage} />
        </div>
        
        <div className="flex-1 w-3/4"> 
          {activePage === 'Đơn mua' && <BillHis />}  
          {activePage === 'Tài khoản của tôi' && <div>Hồ sơ của tôi</div>} 
        </div>
        {activePage === 'Chi Tiết Đơn Hàng' && <OrderDetail />}  
      </div>
    </div>
  );
};

export default MyAccount;