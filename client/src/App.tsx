import { useRoutes, useLocation } from 'react-router-dom';
import './App.css';
import HomePage from './pages/user/homePage';
import AllProduct from './pages/user/allProduct';
import Header from './components/user/header';
import Banner from './components/user/Banner';
import FooterFixed from './components/user/footerFixed';
import Footer from './components/user/footer';
import Register from './pages/user/register';
import Login from './pages/user/login';
import LoginFixed from './components/user/LoginFixed';
import FilterSlect from './theme/filterSlect';
import SaleNews from './pages/user/saleNews';
import Contact from './pages/user/contact';
import ProductDetail from './pages/user/productDetail';

const routeConfig = [
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
];

function App() {
  const routes = useRoutes(routeConfig);
  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isHomePage = location.pathname === '/';
  return (
    <>
      {!isAuthPage && <Header />}
      {isHomePage && <Banner />}
      {!isAuthPage && !isHomePage && <FilterSlect style={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`} id={`filter`}/>}
      <main className='xs:px-[20px] xl:px-[150px]'>{routes}</main>
      {!isAuthPage && <LoginFixed />}
      {!isAuthPage && <FooterFixed />}
      {!isAuthPage && <Footer />}
    </>
  );
}

export default App;
