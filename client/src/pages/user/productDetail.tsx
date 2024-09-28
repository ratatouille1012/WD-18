import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import DetailP from '../../components/user/detailP';
import ProductNew from '../../components/user/productNew';
import Brand from '../../components/user/brand';

const ProductDetail = () => {

  return (
    <>
    <DetailP/>
    <div className="mt-24"><ProductNew/></div>
    <div className="mt-6"><Brand/></div>
    </>
  );
};

export default ProductDetail;
