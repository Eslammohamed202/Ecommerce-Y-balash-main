import Link from 'next/link'
import React from 'react'
import { FaEye, FaTrash } from 'react-icons/fa6'


const EditHeader = () => {
    return (
        <div className='bg-white pt-6 pb-6'>
            <div className="flex justify-between items-center container mx-auto px-4">
                <div>
                    <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-1 mb-1">Edit Product</h2>
                    <div className='flex items-center'>
                        <p className='text-[#4B5563] text-sm'>Update your product details below</p>
                    </div>
                </div>
                <div className='flex gap-2 items-center'>
                    <button className="py-2 mx-2 px-4 bg-[#F3F4F6] text-white rounded-xl lg:text-lg md:text-md text-sm  flex gap-1 items-center ">
                        <FaEye className="text-[#374151]  cursor-pointer" />
                        <span className='text-[#374151]'>Perview</span>
                    </button>
                    <button className="py-2 mx-2 px-4 bg-[#FEF2F2] text-white rounded-xl lg:text-lg md:text-md text-sm  flex gap-1 items-center ">
                        <FaTrash className="text-[#ED2226] cursor-pointer" />
                        <span className='text-[#ED2226]'>Delete</span>
                    </button>
                </div>
            </div>


        </div>
    )
}

export default EditHeader