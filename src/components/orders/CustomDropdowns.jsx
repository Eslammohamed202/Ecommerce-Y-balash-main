'use client';

import React from 'react';
import { FiSearch } from "react-icons/fi";
import PropTypes from 'prop-types';

const CustomDropdowns = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="flex lg:flex-row md:flex-row flex-col justify-between items-center bg-white rounded-xl mt-4 p-4 lg:mx-12">
            <div className="relative w-full lg:w-auto">
                <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-3 pl-10 w-full lg:w-[500px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-Main/50 transition duration-200"
                />
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>
            <div className="relative">
                <select className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-Main">
                    <option>Sort: Newest</option>
                    <option>Sort: Oldest</option>
                    <option>Sort: A-Z</option>
                    <option>Sort: Z-A</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
};

CustomDropdowns.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};

export default CustomDropdowns;