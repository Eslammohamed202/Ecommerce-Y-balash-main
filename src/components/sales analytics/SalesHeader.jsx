import Link from 'next/link'
import React from 'react'
import { FaSave } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";


const SalesHeader = () => {
    return (
        <div className='bg-white pt-6 pb-6'>
            <div className="flex justify-between items-center container mx-auto px-4">
                <div>
                    <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-1 mb-1">Sales Analytics </h2>
                </div>
                <div className='flex gap-2 items-center'>
                      <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-Main">
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
                   <button className="py-2 mx-2 px-4  bg-Main rounded-xl lg:text-lg md:text-md text-sm  flex gap-1 items-center ">
                        <FaDownload className="text-white  cursor-pointer" />
                        <span className='text-white'> Export</span>
                    </button>
                </div>
            </div>


        </div>
    )
}

export default SalesHeader