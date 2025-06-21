import React from 'react'
import { FaEye } from 'react-icons/fa6'
import { FaSave } from "react-icons/fa";


const AddHeader = () => {
    return (
        <div className='bg-white pt-6 pb-6'>
            <div className="flex justify-between items-center container mx-auto px-4">
                <div>
                    <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-1 mb-1">Add Product</h2>
                </div>
                <div className='flex gap-2 items-center'>
                    <button className="py-2 mx-2 px-4 border-[1px] border-Main/10 text-white rounded-xl lg:text-lg md:text-md text-sm  flex gap-1 items-center ">
                        <FaEye className="text-Main  cursor-pointer" />
                        <span className='text-Main'>Perview</span>
                    </button>
                   <button className="py-2 mx-2 px-4 border-[1px] border-Main/10 text-white rounded-xl lg:text-lg md:text-md text-sm  flex gap-1 items-center ">
                        <FaSave className="text-Main  cursor-pointer" />
                        <span className='text-Main'>Save Draft</span>
                    </button>
                </div>
            </div>


        </div>
    )
}

export default AddHeader