import React, { FC, useState } from 'react'

type Props = {
    toggleOBCL: () => void;
};

const cartSideLeft: FC<Props> = ({ toggleOBCL }) => {
    const [isOprnCartLeft, setOprnCartLeft] = useState(true);

    const closeOPCL = () => {
        setOprnCartLeft(!isOprnCartLeft);
        toggleOBCL();
    };
  return (
    <div className={`fixed top-0 left-0 w-full h-full z-50 ${isOprnCartLeft ? 'block' : 'hidden'}`}>
            <div className="absolute inset-0 bg-black opacity-60" />
            <div className="h-full w-[260px] bg-[rgba(255,255,255)] pt-[20px] relative z-10">
                <h2 className='w-full text-center font-bold text-[22px]'>Giỏ Hàng</h2>
                <div className="w-full"><div className="w-[40px] mx-auto mt-3 h-1 bg-slate-300"></div></div>
                <div className="mt-6">
                    <p className='w-full text-center'>Chưa có sản phẩm trong giỏ hàng</p>
                </div>
            </div>
            <button onClick={closeOPCL}  className="absolute top-2 right-3 text-[24px] text-white">X</button>
        </div>
  )
}

export default cartSideLeft