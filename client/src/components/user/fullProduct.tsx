import React from 'react'
import BoxProduct from '../../theme/boxProduct'
import useProduct from '../../hook/useProduct';
import Loading from '../../theme/loading';


const fullProduct = () => {
    const { products, loading } = useProduct();
  return (
    <><Loading isShow={loading} />
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 mt-7">
            {products.map((product) => (
                <BoxProduct key={product._id} product={product} />
            ))}
        </div>

    </>
  )
}

export default fullProduct