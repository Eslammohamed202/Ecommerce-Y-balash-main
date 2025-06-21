import Link from 'next/link'
import React from 'react'
import { FaDownload } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";

const LowHero = () => {
    return (
        <div className='container flex justify-between items-center'>
            <div className='flex items-center gap-2'>
                <Link href="/">
                    <button className="py-2 px-4 bg-Main text-white rounded-xl lg:text-lg md:text-md text-sm" > <div className='flex items-center gap-2 text-md'> <FaDownload/> DownLoad Report</div>   </button>
                </Link>
                <Link href="/">
                    <button className="py-2 px-4 bg-[#FFCD29] text-white rounded-xl lg:text-lg md:text-md text-sm" > <div className='flex items-center gap-2 text-md'> <IoIosNotifications/>  Notify Me</div>   </button>
                </Link>
            </div>
            
    <div>
                        {/* Date Dropdown */}
                        <div className="relative">
                            <select className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-none">
                                <option> Stok Level (L To H)</option>
                                <option>we</option>
                                <option>e f f</option>
                                <option>ff pp</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </div>
                        </div>       
                </div>


        </div>
    )
}

export default LowHero