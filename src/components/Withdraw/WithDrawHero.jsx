import React from 'react'

const WithDrawHero = () => {
  return (
    <div className='container bg-white shadow-xl rounded-xl flex items-center justify-between p-4 mt-6 mb-6'>
        <div className='flex flex-col items-center'>
            <p className='text-sm text-[#6B7280]'>Available Balance</p>
            <h1 className='font-bold text-lg text-Main'>EGP 5,200.00</h1>
        </div>
          <div className='flex flex-col items-center'>
            <p className='text-sm text-[#6B7280]'>Pending Balance </p>
            <h1 className='font-bold text-lg text-Main'>EGP 2,800.00</h1>
        </div>
          <div className='flex flex-col items-center'>
            <p className='text-sm text-[#6B7280]'>Last Withdrawal</p>
            <h1 className='font-bold text-lg text-Main'>April 15, 2025</h1>
        </div>
    </div>
  )
}

export default WithDrawHero