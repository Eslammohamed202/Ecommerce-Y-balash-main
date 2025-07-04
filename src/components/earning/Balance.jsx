"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FiInfo } from 'react-icons/fi';

const Balance = () => {
  const [currentBalance, setCurrentBalance] = useState('EGP 0');
  const [availableWithdrawal, setAvailableWithdrawal] = useState('EGP 0');
  const [totalEarnings, setTotalEarnings] = useState('EGP 0');
  const [totalCashEarnings, setTotalCashEarnings] = useState('EGP 0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBalanceData = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      if (!token) throw new Error('Token not found in localStorage');

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://y-balash.vercel.app';

      // Current balance
      const balanceRes = await fetch(`${baseUrl}/api/seller/current-balance`, { headers });
      if (!balanceRes.ok) throw new Error('Failed to fetch current balance');
      const balanceData = await balanceRes.json();
      setCurrentBalance(`${balanceData.currency} ${balanceData.balance}`);

      // Available for withdrawal
      const withdrawalRes = await fetch(`${baseUrl}/api/seller/available-for-withdrawal`, { headers });
      if (!withdrawalRes.ok) throw new Error('Failed to fetch available withdrawal amount');
      const withdrawalText = await withdrawalRes.text();
      setAvailableWithdrawal(`EGP ${withdrawalText}`);

      // Total earnings since start
      const totalEarningsRes = await fetch(`${baseUrl}/api/seller/total-earnings-since-start`, { headers });
      if (!totalEarningsRes.ok) throw new Error('Failed to fetch total earnings');
      const totalEarningsData = await totalEarningsRes.json();
      setTotalEarnings(`EGP ${Number(totalEarningsData.totalEarnings).toFixed(2)}`);

      // Total cash earnings
      const cashRes = await fetch(`${baseUrl}/api/seller/total-cash-earnings`, { headers });
      if (!cashRes.ok) throw new Error('Failed to fetch total cash earnings');
      const cashData = await cashRes.json();
      setTotalCashEarnings(`EGP ${Number(cashData.totalCashEarnings).toFixed(2)}`);

      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalanceData();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error: {error}
        <button
          className="ml-4 bg-[#1C573E] text-white px-4 py-2 rounded-lg text-sm font-medium"
          onClick={() => {
            setLoading(true);
            setError(null);
            fetchBalanceData();
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 md:p-6 mt-6 container">
      <h3 className="text-[#1C573E] font-semibold text-md w-full md:w-auto mb-4">
        Current balance
      </h3>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between w-full gap-6 md:gap-10">

          {/* Current Balance */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[#1C573E] text-white rounded-full flex items-center justify-center text-lg font-bold">
              ₦
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                Current account balance <FiInfo className="inline" />
              </p>
              <h2 className="text-[#1C573E] text-xl font-bold">{currentBalance}</h2>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-12 w-px bg-gray-200" />

          {/* Available Withdrawal */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-yellow-400 text-white rounded-full flex items-center justify-center text-lg font-bold">
              Ⓦ
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                Available for withdrawal <FiInfo className="inline" />
              </p>
              <h2 className="text-[#1C573E] text-xl font-bold">{availableWithdrawal}</h2>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-12 w-px bg-gray-200" />

          {/* Total Earnings */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-200 text-blue-800 rounded-full flex items-center justify-center text-lg font-bold">
              ₮
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                Total Earnings <FiInfo className="inline" />
              </p>
              <h2 className="text-[#1C573E] text-xl font-bold">{totalEarnings}</h2>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-12 w-px bg-gray-200" />

          {/* Total Cash Earnings */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-200 text-green-800 rounded-full flex items-center justify-center text-lg font-bold">
              💵
            </div>
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-1">
                Total Cash Earnings <FiInfo className="inline" />
              </p>
              <h2 className="text-[#1C573E] text-xl font-bold">{totalCashEarnings}</h2>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-12 w-px bg-gray-200" />

          {/* Withdraw Button */}
          <Link href="/Withdraw-balance">
            <button className="bg-[#1C573E] text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap">
              Withdraw balance
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Balance;
