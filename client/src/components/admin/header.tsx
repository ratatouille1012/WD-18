import React, { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <header className="bg-white shadow p-4 flex items-center justify-between relative">
      <div className="flex items-center">
        <div className="relative ml-6">
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="border border-gray-300 p-2 rounded w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex">
        <div className="flex items-center space-x-4 mx-8">
            <button className="relative mx-4">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z" />
            </svg>
            <span className="absolute top-[-5px] left-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
            </button>
            <button className="relative mx-4 ">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6l3 3v-3h2V9h-2M4 4h11v8H9l-3 3v-3H4V4Z" />
            </svg>
            <span className="absolute top-[-5px] left-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
        </div>
        <div className="flex items-center cursor-pointer" onClick={toggleDropdown} ref={dropdownRef}>
          <span className="ml-2 mx-3">Admin</span>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
            alt="Avatar"
            className="w-10 h-10 rounded-full"
          />
        </div>

        {isDropdownOpen && (
          <div className="absolute right-10 top-[66px] mt-2 w-48 bg-white border rounded shadow-lg">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Trang cá nhân</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Cài đặt</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Đăng xuất</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
