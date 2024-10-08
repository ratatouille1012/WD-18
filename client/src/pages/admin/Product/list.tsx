import React from 'react'
import { useTheme } from '../../../contexts/theme';
import { Link } from 'react-router-dom';

const products = [
    { id: 1, name: 'Giày Thể Thao A',category:"Giày thể thao", imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg' },
    { id: 2, name: 'Giày Da B',category:"Giày Nữ", imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg' },
    { id: 3, name: 'Giày Chạy Bộ C',category:"Giày Nam", imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg' },
    { id: 4, name: 'Giày Sneaker D',category:"Giày Nam", imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg' },
    { id: 5, name: 'Giày Đi Bộ E',category:"Giày Nữ", imgUrl1: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl2: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg', imgUrl3: 'https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2021/09/reebok-dmx-series-2k-dv9724-01-400x400.jpg' },
  ];

const list = () => {
    const { darkMode } = useTheme();
  return (
    <div className="pb-10"> 
        <div className={`${darkMode ? 'bg-[#24303F]' : 'bg-white'} p-4 rounded-lg shadow-md mt-6`}>
          <div className="flex justify-between"><h2 className={`${darkMode ? 'text-white' : ''} text-xl font-semibold mb-4`}>Danh sách sản phẩm</h2><button className={`${darkMode ? 'bg-gray-500 text-white' : 'bg-gray-500 text-white'} px-3 py-1 rounded-md hover:bg-gray-600`}><Link to={'../product/add'}>Thêm sản phẩm</Link></button></div>
          <table className="min-w-full mt-4">
            <thead>
            <tr className={`${darkMode ? 'bg-[#313D4A] text-[rgb(174,183,192)] ' : 'bg-gray-200'} `}>
                <th className="py-2 px-4 text-left">Id</th>
                <th className="py-2 px-4 text-left">Tên</th>
                <th className="py-2 px-4 text-left">Danh mục</th>
                <th className="py-2 px-4 text-left">Hình ảnh</th>
                <th className="py-2 px-4 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr className={`${darkMode ? ' text-meta-3 ' : ''} `} key={product.id}>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{product.id}</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{product.name}</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>{product.category}</td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>
                        <div className="flex space-x-2">
                            <img src={product.imgUrl1} alt={product.name} className="w-16 h-16 object-cover" />
                            <img src={product.imgUrl2} alt={product.name} className="w-16 h-16 object-cover" />
                            <img src={product.imgUrl3} alt={product.name} className="w-16 h-16 object-cover" />
                        </div>
                    </td>
                    <td className={`${darkMode ? ' border-[#313D4A]' : ''} border-b  py-2 px-4`}>
                        <button className={`${darkMode ? 'bg-[#E94E77] text-white' : 'bg-red-500 text-white'} px-3 py-1 rounded-md mr-2 hover:bg-red-600`}>
                            Xóa
                        </button>
                        <Link to={`../product/detail/${product.id}`}>
                        <button className={`${darkMode ? 'bg-[#4CAF50] text-white' : 'bg-green-500 text-white'} px-3 py-1 rounded-md hover:bg-green-600`}>
                            Chi tiết
                        </button>
                        </Link>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default list 