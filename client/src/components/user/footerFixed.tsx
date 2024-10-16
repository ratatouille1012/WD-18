import React from 'react';

type Props = {};

const FooterFixed = (props: Props) => {
  const user = JSON.parse(localStorage.getItem('user') || 'null'); 

  return (
    <div className="w-full h-[40px] flex fixed bottom-0 gap-x-[1px] z-[200]">
      <div className="xs:hidden md:flex xl:flex w-1/3 bg-[#7FC142] text-white items-center justify-center leading-[1.6] text-[18px]">
        <button>Thiết kế Web khởi Nghiệp</button>
      </div>
      <div className="xs:w-full md:w-1/3 xl:w-1/3 bg-[#7FC142] text-white flex items-center justify-center leading-[1.6] text-[18px]">
        {user ? (
          <button>Xin chào: {user.email}</button> 
        ) : (
          <button>Hotline: 09 3574 3575</button> 
        )}
      </div>
      <div className="xs:hidden md:flex xl:flex w-1/3 bg-[#7FC142] text-white items-center justify-center leading-[1.6] text-[18px]">
        <button>Đăng ký làm đối tác</button>
      </div>
    </div>
  );
};

export default FooterFixed;
