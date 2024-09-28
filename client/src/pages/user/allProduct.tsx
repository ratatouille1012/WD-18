import FilterProduct from '../../components/user/filterProduct'
import FullProduct from '../../components/user/fullProduct'
import Brand from '../../components/user/brand'
import SettingSVG from '../../svg/settingSVG'
import FilterBarLeft from '../../components/user/filterBarLeft'
import { useState } from 'react'

const allProduct = () => {
  const [isOprnBarLeft, setOprnBarLeft] = useState(false);

  const buttonOBL = () => {
    setOprnBarLeft(!isOprnBarLeft);
  };
  return (
    <>
    <button onClick={buttonOBL} className="w-full xs:flex md:hidden flex justify-center mt-5 items-center"><SettingSVG/><span className='mx-1 uppercase font-bold text-xl '>Lọc </span></button>
    <div className="flex mt-7 mb-16">
      <div className="xs:hidden sm:hidden md:block md:w-1/4"><FilterProduct/></div>
      <div className="xs:w-full sm:w-full md:w-3/4"><FullProduct/></div>
    </div>
    <div className="mb-28"><Brand/></div>
    {isOprnBarLeft &&<FilterBarLeft toggleOBL={buttonOBL}/>}
    </>
  )
}

export default allProduct