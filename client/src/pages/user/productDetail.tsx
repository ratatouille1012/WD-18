import { useEffect, useState } from 'react';
import DetailP from '../../components/user/detailP';
import ProductNew from '../../components/user/productNew';
import Brand from '../../components/user/brand';
import Loading from '../../theme/loading';

const ProductDetail = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const productDetail = async () => {
    try {
      setLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    productDetail();
  }, []);
  return (
    <>
    <Loading isShow={loading} />
    <DetailP/>
    <div className="mt-24"><ProductNew/></div>
    <div className="mt-6"><Brand/></div>
    </>
  );
};

export default ProductDetail;
