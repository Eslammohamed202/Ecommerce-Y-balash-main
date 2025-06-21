import React from 'react';
import { MdArrowForwardIos } from "react-icons/md";

import Link from 'next/link';
import { IoIosNotifications } from "react-icons/io";

const EarningHeader = () => {
    return (
        <div className='bg-white pt-2 pb-2'>
            <div className="flex justify-between items-center container mx-auto px-4">
                <div>
                    <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-4 mb-2">Earning</h2>
                    <div className='flex items-center'>
                        <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/">Dashboard</Link>
                        <MdArrowForwardIos className='text-gray-700 lg:text-md md:text-sm text-xs mx-2' />
                        <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/earning">Earning</Link>
                    </div>
                </div>
                <div>
                    <button className="py-2 px-4 text-white rounded-xl lg:text-lg md:text-md text-sm hover:bg-Main/90 transition duration-200">
                        {/* Date Dropdown */}
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-Main">
                                <option>This Month</option>
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                                <option>Custom Range</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>       
                   </button>
                </div>
            </div>

        </div>
    );
};

export default EarningHeader;