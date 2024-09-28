import React from 'react';
import BoxNewsText from '../../theme/boxNewsText';
import { useLocation } from 'react-router-dom'; // Import useLocation từ react-router-dom

const menuNewsText = [
    {
        id: "1",
        categoryNews:"sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/D%C3%A9p-Puma-Fenty-m%E1%BA%ABu-m%E1%BB%9Bi-nh%E1%BA%A5t-c%E1%BB%A7a-Rihanna-768x576.jpg",
        title: "Dép Puma Fenty mẫu mới nhất của Rihanna",
        date: "22 Tháng Mười, 2019",
        text: "Riri đã chính thức bước chân vào làng thời trang thế giới, khi trở thành giám đốc sáng tạo của thương [...]"
    },
    {
        id: "2",
        categoryNews:"sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Cho%C3%A1ng-ng%E1%BB%A3p-v%E1%BB%9Bi-t%E1%BB%A7-gi%C3%A0y-h%C3%A0ng-tr%C4%83m-%C4%91%C3%B4i-768x576.jpg",
        title: "Choáng ngợp với tủ giày hàng trăm đôi",
        date: "22 Tháng Mười, 2019",
        text: "Văn Mai Hương vốn là một mỹ nhân có niềm đam mê cực lớn với giày dép. Cô từng [...]"
    },
    {
        id: "3",
        categoryNews:"sale",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Ch%E1%BB%8Dn-gi%C3%A0y-d%C3%A9p-l%C3%BAc-n%C3%A0o-c%C5%A9ng-v%E1%BB%ABa-in-ch%C3%A2n-768x576.jpg",
        title: "Chọn giày dép lúc nào cũng vừa in chân",
        date: "22 Tháng Mười, 2019",
        text: "Mũi giày hay gót giày không bị biến dạng quá lâu khi bạn cầm lên và bóp nhẹ [...]"
    },
    {
        id: "4",
        categoryNews:"news",
        img: "https://giaythethao1.giaodienwebmau.com/wp-content/uploads/2019/10/Th%C3%AAm-5-%C4%91%C3%B4i-sneaker-m%C3%A0u-ng%E1%BB%8Dt-l%E1%BB%8Bm-768x576.jpg",
        title: "Thêm 5 đôi sneaker màu ngọt lịm",
        date: "22 Tháng Mười, 2019",
        text: "Nếu bạn vừa mê sneaker màu hồng lại vừa thích chất liệu da lộn thì phiên bản Gazelle màu Easy [...]"
    },
];

const SaleNews = () => {
  const location = useLocation(); 

  const filteredProducts = location.pathname === '/sale' 
  ? menuNewsText.filter(product => product.categoryNews === 'sale') 
  : location.pathname === '/new'
  ? menuNewsText.filter(product => product.categoryNews === 'news') 
  : [];
  return (
    <div className='gap-y-9 flex flex-col'>
        {filteredProducts.map((product) => (
            <div key={product.id}>
                <BoxNewsText 
                    categoryNews={product.categoryNews} 
                    imgstyle={`w-auto h-full`} 
                    h3={`text-lg font-semibold line-1`} 
                    style={`h-[200px] flex`} 
                    product={product} 
                />
            </div>
        ))}
    </div>
  );
}

export default SaleNews;
