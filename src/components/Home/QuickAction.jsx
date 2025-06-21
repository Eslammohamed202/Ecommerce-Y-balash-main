import Link from 'next/link';
import React from 'react'
import { IoMdAdd } from "react-icons/io";
import { MdInventory } from "react-icons/md";
import { FaChartLine } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { CgMenuCake } from "react-icons/cg";


const QuickAction = () => {
  return (
    <div className='lg:mt-12 mt-6 lg:mb-12 mb-6 container '>

      <div className='flex  justify-center items-center flex-wrap lg:mt-12 mt-6 gap-6'>
        <Link href="add-product">
          <div className='h-[130px] bg-white lg:w-[250px] md:w-[250px] w-[200px] rounded-xl flex flex-col justify-center items-center text-[#4B5563] font-bold '>
            <IoMdAdd className='lg:text-3xl mb-1 text-3xl' />
            <p className='lg:text-xl md:text-xl text-lg'>Add Product</p>
          </div>
        </Link>

        <Link href="/inventory">
          <div className='h-[130px] bg-white lg:w-[250px] md:w-[250px] w-[200px] rounded-xl flex flex-col justify-center items-center text-[#4B5563] font-bold '>
          <MdInventory className='lg:text-3xl mb-1 text-3xl' />
            <p className='lg:text-xl md:text-xl text-lg'>Manage Inventory</p>
          </div>
        </Link>

        <Link href="/earning">
          <div className='h-[130px] bg-white lg:w-[250px] md:w-[250px] w-[200px] rounded-xl flex flex-col justify-center items-center text-[#4B5563] font-bold '>
          <FaChartLine className='lg:text-3xl mb-1 text-3xl' />
            <p className='lg:text-xl md:text-xl text-lg'> View Earning</p>
          </div>
        </Link>
        <Link href="/Notifications">
          <div className='h-[130px] bg-white lg:w-[250px] md:w-[250px] w-[200px] rounded-xl flex flex-col justify-center items-center text-[#4B5563] font-bold '>
          <IoNotifications className='lg:text-3xl mb-1 text-3xl' />
            <p className='lg:text-xl md:text-xl text-lg'> Notifications </p>
          </div>
        </Link>
        <Link href="orders">
          <div className='h-[130px] bg-white lg:w-[250px] md:w-[250px] w-[200px] rounded-xl flex flex-col justify-center items-center text-[#4B5563] font-bold '>
          <CgMenuCake className='lg:text-3xl mb-1 text-3xl' />
            <p className='lg:text-xl md:text-xl text-lg'> View All Orders </p>
          </div>
        </Link>


      </div>
    </div>

  )
}

export default QuickAction