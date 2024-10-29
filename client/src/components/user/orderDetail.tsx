import { useNavigate, useParams } from 'react-router-dom';
import useOrder from '../../hook/useOder';
import useVariant from '../../hook/useVariant';
import useProduct from '../../hook/useProduct';
import { useEffect } from 'react';


const OrderDetail = () => {
    const { orderDT, loadingOrder } = useOrder();
    const { getProductByVariantId, productDetails } = useProduct();
    const { getOne, variant } = useVariant();
    console.log(orderDT?.orderItems);
    
    const navigate = useNavigate(); 
    const handleGoBack = () => {
        navigate(-1); 
    };

  useEffect(() => {
    fetchProductDetails();
    orderDT?.orderItems.forEach(item => {
        if (item.variantId) {
            getOne(item.variantId);
        }
    });
}, [orderDT]);

const fetchProductDetails = async () => {
  await Promise.all(orderDT.orderItems.map(item => {
      if (item.variantId) {
          return getProductByVariantId(item.variantId);
      }
  }));
};

useEffect(() => {
  fetchProductDetails();
}, [orderDT]);

    return (
        <div className='pb-10'>
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
                <h2 className="text-2xl font-bold mb-4">Mã đơn hàng: {orderDT?.orderCode}<span className="font-semibold"></span></h2>
                <div className="flex ">
                    <div className="w-1/2">
                        <p className="text-gray-600">Tên người nhận: {orderDT?.name}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Số điện thoại: {orderDT?.phone}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Địa chỉ nhận hàng: {orderDT?.address}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Ngày đặt hàng: {orderDT?.createdAt}<span className="font-semibold"></span></p>
                    </div>
                    <div className="w-1/2 ">
                        <p className="text-gray-600">Trạng thái: {orderDT?.orderStatus}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Phương thức vận chuyển: {orderDT?.ship || "none"}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Trạng thái giao hàng: {orderDT?.orderStatus}<span className="font-semibold"></span></p>
                        <p className="text-gray-600">Voucher: {orderDT?.voucher || "none"}<span className="font-semibold"></span></p>
                    </div>
                </div>
                <h3 className="text-xl font-semibold mt-4">Sản phẩm:</h3>
                <div className="overflow-x-auto">
                        <table className='table w-full mt-4  text-[#666666]'>
                            <thead className='h-[30px]'>
                              <tr>
                                <th className='border font-normal w-2/5'>Sản phẩm</th>
                                <th className='border font-normal'>Giá</th>
                                <th className='border font-normal'>Số lượng</th>
                                <th className='border font-normal'>Tổng Tiền</th>
                              </tr>
                            </thead>
                            <tbody className='text-black'>
                              {orderDT?.orderItems?.map((item,index)=>{
                                const product = productDetails[item.variantId];
                                const variants = variant[item.variantId];
                                console.log("hHHhH",product,variants);

                                if (!product) {
                                  return (
                                      <tr className='h-[100px]'>
                                          <td className='border p-4' colSpan="4">
                                              Product not found for variant ID: {item.variantId}
                                          </td>
                                      </tr>
                                  );
                              }

                                const colorName = variants?.color?.name || 'N/A';
                                const sizeName = variants?.size?.name || 'N/A';
                                const salePrice = variants?.salePrice || 'N/A';
                                return (
                                  <tr className='h-[100px]'>
                                    <td className='border p-4'>
                                      <div className="flex gap-x-4">
                                          <img src={product.images[0]} alt={``} className=" h-[80px]" />
                                          <div className='xs:hidden sm:hidden md:block'>
                                            <h2 className='font-bold line-clamp-2'>{product.title}</h2>
                                            <p className='font-medium text-[18px]'>Màu: <span className='text-[#666666]'>{colorName}</span></p>
                                            <p className='font-medium text-[18px]'>Size: <span className='text-[#666666]'>{sizeName}</span></p>
                                          </div>
                                        </div>
                                    </td>
                                    <td className='border p-4 text-center'>{salePrice.toLocaleString()} VNĐ</td>
                                    <td className='border p-4'>
                                      <div className="text-center">
                                        {item.variantQuantity}
                                      </div>
                                    </td>
                                    <td className='border p-4 text-center'>{(item.variantQuantity * salePrice).toLocaleString()} VNĐ</td>
                                  </tr>
                                )
                              })}
                            </tbody>
                        </table>
                </div>
                <div className="mt-4 font-bold text-lg">Tổng tiền thanh toán: <span className='text-red-500'>{orderDT?.total?.toLocaleString()} VNĐ</span></div>
                
                <div className="mt-6 flex gap-4">
                  {orderDT?.orderStatus === "Chờ xử lý" && (
                    <div className="mt-6 flex gap-4">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded">Hủy đơn hàng</button>
                    </div>
                  )}
                </div>
            </div>
        </div>
    );
};

export default OrderDetail;
