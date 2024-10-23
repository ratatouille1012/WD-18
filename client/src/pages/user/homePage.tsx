import { useEffect, useState } from 'react'
import Brand from '../../components/user/brand'
import Content2Product from '../../components/user/content2Product'
import ContentProduct from '../../components/user/contentProduct'
import NewsNoText from '../../components/user/newsNoText'
import NewsText from '../../components/user/newsText'
import ProductNew from '../../components/user/productNew'
import TabSUport from '../../components/user/tabSUport'
import Loading from '../../theme/loading'
import axios from 'axios'
import { TPproducts } from '../../types/products'

function homePage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<TPproducts[]>([]);
  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/products");
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, []);
  return (
    <>
      <Loading isShow={loading} />
      <TabSUport/>
      <NewsNoText/>
      <ProductNew />
      <div className="mt-4"><ContentProduct /></div>
      <div className="mt-4"><Content2Product/></div>
      <div className="mt-11"><NewsText/></div>
      <div className="mt-20"><Brand/></div>
    </>
  )
}

export default homePage