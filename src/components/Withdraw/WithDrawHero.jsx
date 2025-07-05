'use client';

import React, { useEffect, useState } from 'react';

const WithDrawHero = () => {
  const [availableBalance, setAvailableBalance] = useState(0);
  const [pendingBalance, setPendingBalance] = useState(0); // مش موجود في الـ API فهنخليه ثابت أو نحدثه لو اتوفر لاحقًا
  const [lastWithdrawal, setLastWithdrawal] = useState('N/A');

  useEffect(() => {
    const fetchEarnings = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        console.error('Token not found');
        return;
      }

      try {
        const res = await fetch('https://y-balash.vercel.app/api/seller/simplified-monthly-earnings', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (res.ok && data.success) {
          setAvailableBalance(data.netEarnings || 0);
          setPendingBalance(data.totalWithdrawn || 0);
          // ممكن تضيف هنا API تاني لو في بيانات تاريخ آخر سحب
        } else {
          console.error('Error in data:', data.message);
        }
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className='container bg-white shadow-xl rounded-xl flex items-center justify-between p-4 mt-6 mb-6'>
      <div className='flex flex-col items-center'>
        <p className='text-sm text-[#6B7280]'>Available Balance</p>
        <h1 className='font-bold text-lg text-Main'>EGP {availableBalance.toFixed(2)}</h1>
      </div>
      <div className='flex flex-col items-center'>
        <p className='text-sm text-[#6B7280]'>Pending Balance</p>
        <h1 className='font-bold text-lg text-Main'>EGP {pendingBalance.toFixed(2)}</h1>
      </div>
      <div className='flex flex-col items-center'>
        <p className='text-sm text-[#6B7280]'>Last Withdrawal</p>
        <h1 className='font-bold text-lg text-Main'>{lastWithdrawal}</h1>
      </div>
    </div>
  );
};

export default WithDrawHero;
