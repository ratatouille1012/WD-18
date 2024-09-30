import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const dashboard = (props: Props) => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Người dùng',
            data: [30, 70, 100, 50, 90, 120, 180],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

      const products = [
        { id: 1, name: 'Giày Thể Thao A', sales: 150, imgSrc: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg' },
        { id: 2, name: 'Giày Da B', sales: 120, imgSrc: 'https://example.com/imageB.jpg' },
        { id: 3, name: 'Giày Chạy Bộ C', sales: 100, imgSrc: 'https://example.com/imageC.jpg' },
        { id: 4, name: 'Giày Sneaker D', sales: 80, imgSrc: 'https://example.com/imageD.jpg' },
        { id: 5, name: 'Giày Đi Bộ E', sales: 60, imgSrc: 'https://example.com/imageE.jpg' },
      ];
    
  return (
    <>
    <div className="p-6 bg-gray-100  w-full ">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Card 1 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Tổng số người dùng</h2>
            <p className="text-2xl font-bold">1,250</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Tổng số báo cáo</h2>
            <p className="text-2xl font-bold">75</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">Đang hoạt động</h2>
            <p className="text-2xl font-bold">230</p>
            </div>


        </div>

        {/* Chart Section */}
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Biểu đồ người dùng</h2>
            <Bar data={data} />
        </div>

        {/* Table Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h2 className="text-xl font-semibold mb-4">Bình luận sản phẩm</h2>
            <table className="min-w-full">
            <thead>
                <tr className="bg-gray-200">
                <th className="py-2 px-4 text-left">Người dùng</th>
                <th className="py-2 px-4 text-left">Bình luận</th>
                <th className="py-2 px-4 text-left">Id sản phẩm</th>
                <th className="py-2 px-4 text-left">Ngày</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className="border-b py-2 px-4">Thu</td>
                    <td className="border-b py-2 px-4">Good</td>
                    <td className="border-b py-2 px-4">1</td>
                    <td className="border-b py-2 px-4">2024-09-30</td>
                </tr>
                <tr>
                    <td className="border-b py-2 px-4">Thu</td>
                    <td className="border-b py-2 px-4">Good</td>
                    <td className="border-b py-2 px-4">1</td>
                    <td className="border-b py-2 px-4">2024-09-30</td>
                </tr>
                <tr>
                    <td className="border-b py-2 px-4">Thu</td>
                    <td className="border-b py-2 px-4">Good</td>
                    <td className="border-b py-2 px-4">1</td>
                    <td className="border-b py-2 px-4">2024-09-30</td>
                </tr>
            </tbody>
            </table>
        </div>



        <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Top Sản Phẩm Bán Chạy</h2>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 text-left">Id</th>
            <th className="py-2 px-4 text-left">Hình Ảnh</th>
            <th className="py-2 px-4 text-left">Tên Sản Phẩm</th>
            <th className="py-2 px-4 text-left">Số Lượng Bán</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>



    
    </>
  )
}

export default dashboard