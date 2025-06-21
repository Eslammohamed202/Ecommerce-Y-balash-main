import React from 'react';
import {   FiDollarSign } from 'react-icons/fi';
import { MdOutlineSecurity } from "react-icons/md";

const Security = () => {
  return (
    <div className="container p-6 bg-white rounded-xl shadow-md">
      <div className="flex items-center mb-4">
        <MdOutlineSecurity className=" text-2xl mr-3" />
        <h2 className="text-xl font-semibold text-gray-800">Security & Processing Information</h2>
      </div>
      
      <div className="flex items-start mb-4">
        <p className="text-gray-600">
          Withdrawals may take up to 2–3 business days to process. Make sure to verify your account details before requesting a withdrawal.
        </p>
      </div>
      
      <div className="flex items-center">
        <p className='py-[2px] px-[8px] rounded-full bg-[#6B7280] text-[12px] text-white font-bold mr-1'>i</p>
        <span className="text-gray-600">Minimum withdrawal amount: £100</span>
      </div>
    </div>
  );
};

export default Security;