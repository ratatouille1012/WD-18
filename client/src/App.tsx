import { useRoutes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/user/homePage'
import AllProduct from './pages/user/allProduct';
import Header from './components/user/header';
import Banner from './components/user/Banner';
import FooterFixed from './components/user/footerFixed';
import Footer from './components/user/footer';

const routeConfig = [
  {
    path:"/",
    element: <HomePage/>
  },
  {
    path:"/product",
    element: <AllProduct/>
  }
]

function App() {
  const routes = useRoutes(routeConfig);
  return (
    <>
    <Header/>
    <Banner/>
    <main className='xs:px-[20px]  xl:px-[150px]'>{routes}</main>;
    <FooterFixed/>
    <Footer/>
    </>
  )
  
  
}

export default App
