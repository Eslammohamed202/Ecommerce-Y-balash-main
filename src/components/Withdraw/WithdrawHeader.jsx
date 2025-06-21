import React from 'react';
import { MdArrowForwardIos } from "react-icons/md";

import Link from 'next/link';

const WithdrawHeader = () => {
    return (
        <div className='bg-white pt-2 pb-2'>
            <div className="flex justify-between items-center container mx-auto px-4">
                <div>
                    <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold  ">Withdraw Balance</h2>
                    <p className='lg:mb-4 mb-2 text-[#4B5563] ml-2'>Transfer your available earnings securely to your preferred account.</p>
                    <div className='flex items-center'>
                        <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/">Dashboard</Link>
                        <MdArrowForwardIos className='text-gray-700 lg:text-md md:text-sm text-xs mx-2' />
                        <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/earning">Earning</Link>
                         <MdArrowForwardIos className='text-gray-700 lg:text-md md:text-sm text-xs mx-2' />
                        <Link className="text-gray-700 lg:text-md md:text-sm text-xs" href="/Withdraw-balance">Withdraw Balance</Link>
                    </div>
                </div>
                <div>
                  
                </div>
            </div>

        </div>
    );
};

export default WithdrawHeader;