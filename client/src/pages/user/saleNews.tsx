import React from 'react'
import SaleNews from '../../components/user/saleNews'
import MenuNews from '../../components/user/menuNews'
import Brand from '../../components/user/brand'

type Props = {}

const saleNews = (props: Props) => {
  return (
    <>
    <div className="xs:flex-none md:flex-none lg:flex py-8">
        <div className="xs:w-full lg:w-3/4 border-r pr-5"><SaleNews/></div>
        <div className="xs:mt-5 xs:w-full lg:w-1/4 pl-6"><MenuNews/></div>
    </div>
    <Brand/>
    </>
  )
}

export default saleNews