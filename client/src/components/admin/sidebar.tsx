import React from 'react'
import { Link } from 'react-router-dom'

const sidebar = () => {
  return (
    <div className="flex flex-col  bg-gray-800 text-white w-64 h-screen ">
        <h2 className="text-2xl font-bold mb-4 w-full h-[100px] flex justify-center items-center">
        <span>QA&FR</span>
        </h2>
        <nav className="flex-1 w-full border-t">
        <ul>
          <li className="mb-2">
            <Link to="product/dashboard" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link to="product" className="block p-2 hover:bg-gray-700 rounded">Sản phẩm</Link>
          </li>
        </ul>
        </nav>
        <footer className="mt-auto">
            <div className="w-full border-t"></div>
        </footer>
    </div>
  )
}

export default sidebar