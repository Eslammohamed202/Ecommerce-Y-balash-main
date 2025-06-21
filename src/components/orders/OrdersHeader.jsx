import React from 'react';
import { MdArrowForwardIos } from "react-icons/md";

import Link from 'next/link';
import { IoIosNotifications } from "react-icons/io";

const OrdersHeader = () => {
  return (
    <div className='bg-white pt-2 pb-2'>
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-4 mb-2">Orders</h2>
          <div className='flex items-center'>
            <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/">Dashboard</Link>
            <MdArrowForwardIos className='text-gray-700 lg:text-md md:text-sm text-xs mx-2' />
            <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/orders">Orders</Link>
          </div>
        </div>
        <div>
          <button className="py-2 px-4 bg-Main text-white rounded-xl lg:text-lg md:text-md text-sm hover:bg-Main/90 transition duration-200">
           <IoIosNotifications/>
          </button>
        </div>
      </div>

    </div>
  );
};

export default OrdersHeader;