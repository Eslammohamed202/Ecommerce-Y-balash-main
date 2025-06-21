import React from 'react'
import { BiDollar } from "react-icons/bi";
import { AiFillProduct } from "react-icons/ai";
import { FaUsers , FaLongArrowAltDown ,FaLongArrowAltUp} from "react-icons/fa";
import { GiChessQueen } from "react-icons/gi";


const SalesHero = () => {
    return (
        <div className=' flex  justify-center items-center flex-wrap lg:mt-12 mt-6 gap-6'>

            <div className='flex  items-start p-4 justify-between  h-[196px] w-[330px] bg-white rounded-xl'>

                <div className='  flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2 '>
                    <div className='p-2 rounded-lg bg-[#DBEAFE] lg:mr-5 mr-2'>
                        <BiDollar className='text-[#1E3A8A] size-8 ' />
                    </div>
                    <p className='text-[#6B7280] text-sm '>  Total Revenue   </p>
                    <p className='font-bold text-lg text-Main'>48,585 EGP</p>
                    <p className='text-[#6B7280] text-xs '> vs last week</p>


                </div>
                <div className='text-[#10B981]  text-sm font-semibold flex gap-0 items-center'>
                    <FaLongArrowAltUp />
                    <p className=' '> 5% </p>

                </div>
            </div>

            <div className='flex  items-start p-4 justify-between  h-[196px] w-[330px] bg-white rounded-xl'>

                <div className='  flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2 '>
                    <div className='p-2 rounded-lg bg-[#FEF3C7] lg:mr-5 mr-2'>
                        <AiFillProduct className='text-[#D97706] size-8 ' />
                    </div>
                    <p className='text-[#6B7280] text-sm '>  Total Orders   </p>
                    <p className='font-bold text-lg text-Main'>48,585 EGP</p>
                    <p className='text-[#6B7280] text-xs '> vs last week</p>


                </div>
                <div className='text-[#10B981]  text-sm font-semibold flex gap-0 items-center'>
                    <FaLongArrowAltUp />
                    <p className=' '> 5% </p>

                </div>
            </div>

             <div className='flex  items-start p-4 justify-between  h-[196px] w-[330px] bg-white rounded-xl'>

                <div className='  flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2 '>
                    <div className='p-2 rounded-lg bg-[#D1FAE5] lg:mr-5 mr-2'>
                        <FaUsers className='text-[#059669] size-8 ' />
                    </div>
                    <p className='text-[#6B7280] text-sm '>  New Customers   </p>
                    <p className='font-bold text-lg text-Main'>48,585 EGP</p>
                    <p className='text-[#6B7280] text-xs '> vs last week</p>


                </div>
                <div className='text-[#EF4444]  text-sm font-semibold flex gap-0 items-center'>
                    <FaLongArrowAltDown />
                    <p className=' '> 8% </p>

                </div>
            </div>

             <div className='flex  items-start p-4 justify-between  h-[196px] w-[330px] bg-white rounded-xl'>

                <div className='  flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2 '>
                    <div className='p-2 rounded-lg bg-[#EDE9FE] lg:mr-5 mr-2'>
                        <GiChessQueen className='text-[#7C3AED] size-8 ' />
                    </div>
                    <p className='text-[#6B7280] text-sm '>  Top Product   </p>
                    <p className='font-bold text-lg text-Main'>Cheese Cake</p>
                    <p className='text-[#6B7280] text-xs '> 142 units sold</p>


                </div>
                <div className='text-[#10B981]  text-sm font-semibold flex gap-0 items-center'>
                    <FaLongArrowAltUp />
                    <p className=' '> 5% </p>

                </div>
            </div>

        </div>
    )
}

export default SalesHero 