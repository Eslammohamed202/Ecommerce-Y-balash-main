"use client";

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FiInfo } from 'react-icons/fi';

const Balance = () => {
  const [currentBalance, setCurrentBalance] = useState('EGP 0');
  const [availableWithdrawal, setAvailableWithdrawal] = useState('EGP 0');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk';

  const fetchBalanceData = async () => {
    try {
      // Fetch current balance
      const balanceResponse = await fetch(
        'https://y-balash.vercel.app/api/seller/current-balance',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!balanceResponse.ok) {
        throw new Error(
          `Failed to fetch current balance: ${balanceResponse.status} ${balanceResponse.statusText}`
        );
      }

      const balanceData = await balanceResponse.json();
      setCurrentBalance(`${balanceData.currency} ${balanceData.balance}`);

      // Fetch available for withdrawal
      const withdrawalResponse = await fetch(
        'https://y-balash.vercel.app/api/seller/available-for-withdrawal',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!withdrawalResponse.ok) {
        throw new Error(
          `Failed to fetch available withdrawal amount: ${withdrawalResponse.status} ${withdrawalResponse.statusText}`
        );
      }

      const withdrawalData = await withdrawalResponse.text();
      setAvailableWithdrawal(`EGP ${withdrawalData}`);

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
          {/* Current Account Balance */}
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

          {/* Available for Withdrawal */}
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
