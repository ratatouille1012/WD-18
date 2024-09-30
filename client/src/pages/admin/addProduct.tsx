import { useState } from "react";

const addProduct = () => {
    const products= [
        { id: 1, name: 'Giày Thể Thao A', sales: 150, price: 500000, description: 'Giày thể thao thoải mái.', imgSrc: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/giay-stan-smith-trang-m20324-01-standard-400x400.jpg' },
        { id: 2, name: 'Giày Da B', sales: 120, price: 700000, description: 'Giày da sang trọng.', imgSrc: 'https://example.com/imageB.jpg' },
        { id: 3, name: 'Giày Chạy Bộ C', sales: 100, price: 600000, description: 'Giày chạy bộ nhẹ nhàng.', imgSrc: 'https://example.com/imageC.jpg' },
        { id: 4, name: 'Giày Sneaker D', sales: 80, price: 550000, description: 'Giày sneaker thời thượng.', imgSrc: 'https://example.com/imageD.jpg' },
        { id: 5, name: 'Giày Đi Bộ E', sales: 60, price: 450000, description: 'Giày đi bộ bền bỉ.', imgSrc: 'https://example.com/imageE.jpg' },
      ];


      const [selectedProduct, setSelectedProduct] = useState(null);
      const [formData, setFormData] = useState({});
    
      const handleDetailClick = (product) => {
        setSelectedProduct(product);
      };
    
      const handleEditClick = (product) => {
        setFormData(product);
        setSelectedProduct(null); 
      };
    
      const closeModal = () => {
        setSelectedProduct(null);
      };
  return (
    <div className="p-6 bg-gray-100  w-full ">
        <h2 className="text-2xl mb-4 mt-10 font-bold">Thêm sản phẩm</h2>
        <form  className="">
            <div className="flex flex-col">
            <div className="flex gap-x-4">
                <input
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="number"
                name="sales"
                placeholder="Số lượng bán"
                className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="flex gap-x-4">
                <input
                type="number"
                name="price"
                placeholder="Giá (VNĐ)"
                className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                type="text"
                name="imgSrc"
                placeholder="URL hình ảnh"
                className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <textarea name="description" placeholder="Mô tả sản phẩm" className="border border-gray-300 p-2 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-300">Thêm sản phẩm</button>
        </form>

        <h2 className="text-2xl mb-4 mt-10 font-bold">Danh sách sản phẩm</h2>
        <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Id</th>
            <th className="py-2 px-4 text-left">Hình Ảnh</th>
            <th className="py-2 px-4 text-left">Tên Sản Phẩm</th>
            <th className="py-2 px-4 text-left">Số Lượng Sản Phẩm</th>
            <th className="py-2 px-4 text-left">Giá (VNĐ)</th>
            <th className="py-2 px-4 text-left"></th>
          </tr>
        </thead>
        <tbody>
            {products.map(product => (
            <tr key={product.id}>
              <td className="border-b py-2 px-4">{product.id}</td>
              <td className="border-b py-2 px-4">
                <img src={product.imgSrc} alt={product.name} className="w-16 h-16 object-cover" />
              </td>
              <td className="border-b py-2 px-4">{product.name}</td>
              <td className="border-b py-2 px-4">{product.sales}</td>
              <td className="border-b py-2 px-4">{product.price.toLocaleString()} VNĐ</td>
              <td className="border-b py-2 px-4">
              <button onClick={() => handleEditClick(product)} className="bg-yellow-500 text-white p-1 rounded mr-2 hover:bg-yellow-600">Sửa</button>
                <button className="bg-red-500 text-white p-1 mr-2 rounded hover:bg-red-600">Xóa</button>
                <button onClick={() => handleDetailClick(product)} className="bg-blue-500 text-white p-1 rounded hover:bg-blue-600">Chi tiết</button>
              </td>
            </tr>
            ))}
        </tbody>
      </table>


        {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">{selectedProduct.name}</h3>
            <img src={selectedProduct.imgSrc} alt={selectedProduct.name} className="w-full h-32 object-cover mb-4" />
            <p><strong>Giá:</strong> {selectedProduct.price.toLocaleString()} VNĐ</p>
            <p><strong>Số lượng bán:</strong> {selectedProduct.sales}</p>
            <p><strong>Mô tả:</strong> {selectedProduct.description}</p>
            <button onClick={closeModal} className="mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600">Đóng</button>
          </div>
        </div>
        )}


        {formData.id && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Chỉnh Sửa Sản Phẩm</h3>
            <div className="flex flex-col mb-4">
              <input
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                value={formData.name || ''}
                className="border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="sales"
                placeholder="Số lượng bán"
                value={formData.sales || ''}
                className="border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                name="price"
                placeholder="Giá (VNĐ)"
                value={formData.price.toLocaleString() || ''}
                className="border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="imgSrc"
                placeholder="URL hình ảnh"
                value={formData.imgSrc || ''}
                className="border border-gray-300 p-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                name="description"
                placeholder="Mô tả sản phẩm"
                value={formData.description || ''}
                className="border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="bg-green-500 text-white p-2 rounded hover:bg-green-600">Cập nhật</button>
            <button onClick={() => setFormData({})} className="bg-red-500 text-white p-2 rounded hover:bg-red-600 ml-2">Đóng</button>
          </div>
        </div>
        )}
    </div>
  );
};

export default addProduct;
