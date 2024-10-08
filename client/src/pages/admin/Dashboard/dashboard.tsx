import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { useTheme } from '../../../contexts/theme';

Chart.register(...registerables);

const dashboard = (props: Props) => {
  const { darkMode } = useTheme();
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
    <div className="pb-10">
        <h1 className={`${darkMode ? 'text-white' : ''} text-3xl font-bold mb-6`}>Dashboard</h1>

        <div className={`${darkMode ? 'text-bodydark2' : ''}  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6`}>
            {/* Card 1 */}
            <div className={`${darkMode ? 'bg-[#24303F]' : ''} p-4 rounded-lg shadow-md`}>
            <h2 className="text-xl font-bold">Tổng số người dùng</h2>
            <p className={`${darkMode ? 'text-meta-3' : ''} text-xl font-semibold`}>1,250</p>
            </div>

            {/* Card 2 */}
            <div className={`${darkMode ? 'bg-[#24303F]' : ''} p-4 rounded-lg shadow-md`}>
            <h2 className="text-xl font-bold">Tổng doanh thu</h2>
            <p className={`${darkMode ? 'text-meta-3' : ''} text-xl font-semibold`}>250.000.000 đ</p>
            </div>

            {/* Card 3 */}
            <div className={`${darkMode ? 'bg-[#24303F]' : ''} p-4 rounded-lg shadow-md`}>
            <h2 className="text-xl font-bold">Đang hoạt động</h2>
            <p className={`${darkMode ? 'text-meta-3' : ''} text-xl font-semibold`}>350</p>
            </div>


        </div>

        {/* Chart Section */}
        <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md`}>
            <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Biểu đồ người dùng</h2>
            <Bar data={data} />
        </div>

        {/* Table Section */}
        <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
            <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Bình luận sản phẩm</h2>
            <table className="min-w-full">
            <thead>
                <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)] ' : 'bg-gray-200'} `}>
                  <th className="py-2 px-4 text-left">Người dùng</th>
                  <th className="py-2 px-4 text-left">Bình luận</th>
                  <th className="py-2 px-4 text-left">Id sản phẩm</th>
                  <th className="py-2 px-4 text-left">Ngày</th>
                </tr>
            </thead>
            <tbody>
                <tr className={`${darkMode ? ' text-meta-3 ' : ''} `}>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>Thu</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>Good</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>1</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>2024-09-30</td>
                </tr>
                <tr className={`${darkMode ? ' text-meta-3 ' : ''} `}>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>Thu</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>Good</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>1</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>2024-09-30</td>
                </tr>
                <tr className={`${darkMode ? ' text-meta-3 ' : ''} `}>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>Thu</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>Good</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>1</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>2024-09-30</td>
                </tr>
            </tbody>
            </table>
        </div>


        {/* TOp sell product*/}
        <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
          <h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Top Sản Phẩm Bán Chạy</h2>
          <table className="min-w-full">
            <thead>
            <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)] ' : 'bg-gray-200'} `}>
                <th className="py-2 px-4 text-left">Id</th>
                <th className="py-2 px-4 text-left">Hình Ảnh</th>
                <th className="py-2 px-4 text-left">Tên Sản Phẩm</th>
                <th className="py-2 px-4 text-left">Số Lượng Bán</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr className={`${darkMode ? ' text-meta-3 ' : ''} `} key={product.id}>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{product.id}</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>
                        <img src={product.imgSrc} alt={product.name} className="w-16 h-16 object-cover" />
                    </td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{product.name}</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{product.sales}</td>
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