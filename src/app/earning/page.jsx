'use client';

import React, { useState, useEffect } from 'react';
import Balance from '@/components/earning/Balance';
import EarningHeader from '@/components/earning/EarningHeader';
import EarningHero from '@/components/earning/EarningHero';
import RecentPayouts from '@/components/earning/RecentPayouts';
import Navbar from '@/components/Navbar/Navbar';
import { FaCheckCircle, FaCrown, FaUndo } from 'react-icons/fa';

const Page = () => {
  const [refunds, setRefunds] = useState({ amount: 0, count: 0 });
  const [bestSeller, setBestSeller] = useState({ name: 'N/A', unitsSold: 0 });
  const [completedOrders, setCompletedOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk';

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';

        // Refunds
        const refundsRes = await fetch(`${baseUrl}/api/seller/refunds/monthly`, {
          method: 'GET',
          headers,
        });

        if (!refundsRes.ok) {
          throw new Error(`Refunds API failed: ${refundsRes.status} ${refundsRes.statusText}`);
        }

        const refundsData = await refundsRes.json();
        console.log('Refunds Data:', refundsData);

        setRefunds({
          amount: Number(refundsData.amount ?? refundsData.data?.amount ?? 0),
          count: Number(refundsData.count ?? refundsData.data?.count ?? 0),
        });

        // Best Seller
        const bestSellerRes = await fetch(`${baseUrl}/api/seller/analytics/best-seller`, {
          method: 'GET',
          headers,
        });

        if (!bestSellerRes.ok) {
          throw new Error(`Best Seller API failed: ${bestSellerRes.status} ${bestSellerRes.statusText}`);
        }

        const bestSellerData = await bestSellerRes.json();
        console.log('Best Seller Data:', bestSellerData);

        setBestSeller({
          name: bestSellerData.name ?? bestSellerData.data?.name ?? 'N/A',
          unitsSold: Number(bestSellerData.unitsSold ?? bestSellerData.data?.unitsSold ?? 0),
        });

        // Completed Orders
        const completedOrdersRes = await fetch(`${baseUrl}/api/seller/orders/completed-this-month`, {
          method: 'GET',
          headers,
        });

        if (!completedOrdersRes.ok) {
          throw new Error(`Completed Orders API failed: ${completedOrdersRes.status} ${completedOrdersRes.statusText}`);
        }

        const completedOrdersData = await completedOrdersRes.json();
        console.log('Completed Orders Data:', completedOrdersData);

        setCompletedOrders(
          Number(completedOrdersData.count ?? completedOrdersData.data?.count ?? 0)
        );

        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">Error: {error}</div>;

  return (
    <div>
      <Navbar />
      <EarningHeader />
      <Balance />
      <EarningHero />
      <RecentPayouts />

      <div className="flex flex-wrap items-center justify-between container mt-12 mb-12">
        {/* Refunds */}
        <div className="bg-white shadow-sm p-6 rounded-lg flex items-start justify-between w-[370px] mt-2 mb-2">
          <div className="flex flex-col gap-2 items-start">
            <p className="text-md text-Main font-bold">Refunds</p>
            <p className="text-xl text-[#FFCD29] font-bold">EGP {refunds.amount}</p>
            <p className="text-sm text-[#6B7280]">{refunds.count} refunds this month</p>
          </div>
          <div>
            <FaUndo className="text-[#EF4444]" size={24} />
          </div>
        </div>

        {/* Best Seller */}
        <div className="bg-white p-6 rounded-lg flex items-start justify-between w-[370px] mt-2 mb-2">
          <div className="flex flex-col gap-2 items-start">
            <p className="text-md text-Main font-bold">Best Seller</p>
            <p className="text-xl text-[#FFCD29] font-bold">{bestSeller.name}</p>
            <p className="text-sm text-[#6B7280]">{bestSeller.unitsSold} units sold</p>
          </div>
          <FaCrown className="text-[#FFCD29]" size={24} />
        </div>

        {/* Completed Orders */}
        <div className="bg-white p-6 rounded-lg flex items-start justify-between w-[370px] mt-2 mb-2">
          <div className="flex flex-col gap-2 items-start">
            <p className="text-md text-Main font-bold">Completed Orders</p>
            <p className="text-xl text-[#FFCD29] font-bold">{completedOrders}</p>
            <p className="text-sm text-[#6B7280]">This month</p>
          </div>
          <FaCheckCircle className="text-[#10B981]" size={24} />
        </div>
      </div>
    </div>
  );
};

export default Page;
