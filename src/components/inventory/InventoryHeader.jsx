import React from 'react';
import { MdArrowForwardIos } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import Link from 'next/link';

const InventoryHeader = () => {
  return (
    <div className='bg-white pt-6 pb-6'>
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-4 mb-2">Inventory</h2>
          <div className='flex items-center'>
            <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/">Dashboard</Link>
            <MdArrowForwardIos className='text-gray-700 lg:text-md md:text-sm text-xs mx-2' />
            <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/inventory">Inventory</Link>
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

   
    </div>
  );
};

export default InventoryHeader;