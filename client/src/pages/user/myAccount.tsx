import { useState } from 'react';
import BillHis from '../../components/user/billhis';
import FilterAccount from '../../components/user/filterAccount';
import OrderDetail from '../../components/user/orderDetail';
import useOrder from '../../hook/useOder';
import Loading from '../../theme/loading';



const MyAccount = () => {
  const [activePage, setActivePage] = useState<string>('Tài khoản của tôi');
  const { order, loadingOrder } = useOrder();



  
  return (
    <>
    <Loading isShow={loadingOrder} />
    <div>
      <div className="flex mt-7 mb-16">
        <div className="w-1/4"> 
          <FilterAccount setActivePage={setActivePage} />
        </div>
        
        <div className="flex-1 w-3/4"> 
          {activePage === 'Đơn mua' && <BillHis orders={order}/>}  
          {activePage === 'Tài khoản của tôi' && <div>Hồ sơ của tôi</div>} 
        </div>
        {activePage === 'Chi Tiết Đơn Hàng' && <OrderDetail orderDT={order}/>}  
        
      </div>
    </div>
    </>
  );
};

export default MyAccount;