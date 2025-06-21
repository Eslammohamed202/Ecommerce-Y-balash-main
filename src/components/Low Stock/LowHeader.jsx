import React from 'react';
import { MdArrowForwardIos } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import Link from 'next/link';

const LowHeader = () => {
    return (
                <div className="bg-white flex justify-between items-center p-4 mb-6 mx-auto px-4">
                    <div>
                        <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-4 mb-2">Low Stock Items</h2>
                    </div>
                </div>


            

    );
};

export default LowHeader;