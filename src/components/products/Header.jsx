"use client"
import React, { useState, useContext, useEffect } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import Link from 'next/link';
import { ProductContext } from '@/app/utils/ProductContext';

const Header = () => {
  const { searchProducts, searchQuery } = useContext(ProductContext); // إضافة searchQuery
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  useEffect(() => {
    setLocalSearchQuery(searchQuery || '');
  }, [searchQuery]);

  const handleSearch = (e) => {
    const query = e.target.value;
    setLocalSearchQuery(query);
    searchProducts(query);
  };

  return (
    <div className="bg-white pt-6 pb-6">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-4 mb-2">Products</h2>
          <div className="flex items-center">
            <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/">
              Dashboard
            </Link>
            <MdArrowForwardIos className="text-gray-700 lg:text-md md:text-sm text-xs mx-2" />
            <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/products">
              Products
            </Link>
          </div>
        </div>
        <div>
          <Link href="/add-product">
            <button className="py-2 px-4 bg-Main text-white rounded-xl lg:text-lg md:text-md text-sm hover:bg-Main/90 transition duration-200">
              Add New Product
            </button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        <div className="flex flex-col lg:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm">
          <div className="relative w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={localSearchQuery}
              onChange={handleSearch}
              className="p-3 pl-10 w-full lg:w-[500px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-Main/50 transition duration-200"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
            <select className="p-3 border border-[#E5E7EB] rounded-lg w-full lg:w-[150px] focus:outline-none focus:ring-2 focus:ring-Main/50 transition duration-200">
              <option>All Status</option>
            </select>
            <select className="p-3 border border-[#E5E7EB] rounded-lg w-full lg:w-[150px] focus:outline-none focus:ring-2 focus:ring-Main/50 transition duration-200">
              <option>All Categories</option>
            </select>
            <select className="p-3 border border-[#E5E7EB] rounded-lg w-full lg:w-[150px] focus:outline-none focus:ring-2 focus:ring-Main/50 transition duration-200">
              <option>Price Range</option>
            </select>
            <div className="flex gap-2 items-center justify-center">
              <button className="p-3 border border-[#E5E7EB] rounded-lg hover:bg-gray-100 transition duration-200">
                <FaRegQuestionCircle className="text-gray-500" />
              </button>
              <button className="p-3 border border-[#E5E7EB] rounded-lg hover:bg-gray-100 transition duration-200">
                <IoMdMenu className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;