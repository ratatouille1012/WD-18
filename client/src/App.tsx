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
import Dashboard from './pages/admin/dashboard';
import AddProduct from './pages/admin/addProduct';

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
        path: "product",
        element:<AddProduct/>,
      }
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
