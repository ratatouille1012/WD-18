import { useRoutes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/user/homePage';
import AllProduct from './pages/user/allProduct';
import Register from './pages/user/register';
import Login from './pages/user/login';
import SaleNews from './pages/user/saleNews';
import Contact from './pages/user/contact';
import ProductDetail from './pages/user/productDetail';
import DetailNews from './pages/user/detailNews';
import ClientLayout from './layouts/clientlayout';
import AdminLayout from './layouts/adminlayout';
import Dashboard from './pages/admin/Dashboard/dashboard';
import CheckOut from './pages/user/checkOut';
import Cart from './pages/user/cart';
import List from './pages/admin/Product/list';
import Detail from './pages/admin/Product/detail';
import Add from './pages/admin/Product/add';
import ListCT from './pages/admin/Category/ListCT';
import ListSize from './pages/admin/size/listSize';
import ListCL from './pages/admin/color/listCL';
import ListBill from './pages/admin/bill/listBill';
import DetailBill from './pages/admin/bill/detailBill';

const routeConfig = [
  {
  path: "admin",
    element: <AdminLayout />,
    children: [
      {
        path: "product/dashboard",
        element:<Dashboard/>,
      },
      {
        path: "product/list",
        element:<List/>,
      },
      {
        path: "product/detail/:id",
        element:<Detail/>,
      },
      {
        path: "product/add",
        element:<Add/>,
      },
      {
        path: "category/list",
        element: <ListCT/>,
      },
      {
        path: "size/list",
        element: <ListSize/>,
      },
      {
        path: "color/list",
        element: <ListCL/>,
      },
      {
        path: "bill/list",
        element: <ListBill/>,
      },
      {
        path: "bill/detail/:billId",
        element:<DetailBill/>,
      },
    ],
  },
  {
    path:"/",
    element:<ClientLayout/>,
    children:[
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/product',
        element: <AllProduct />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/sale',
        element: <SaleNews />,
      },
      {
        path: '/new',
        element: <SaleNews />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: 'product/:id',
        element: <ProductDetail />,
      },
      {
        path: 'newSale/:id',
        element: <DetailNews />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <CheckOut />,
      },
    ]
  }
  
];

function App() {
  const routes = useRoutes(routeConfig);

  return (
    <>
      <main>{routes}</main>
    </>
  );
}

export default App;
