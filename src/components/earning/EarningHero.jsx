'use client';

import React, { useState, useEffect } from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { LuDollarSign } from 'react-icons/lu';
import { MdOutlineEventNote } from 'react-icons/md';
import { FaBox } from 'react-icons/fa6';
import { FaChartLine } from 'react-icons/fa6';

const EarningHero = () => {
  const [totalCashEarnings, setTotalCashEarnings] = useState(0);
  const [netEarnings, setNetEarnings] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [averageOrders, setAverageOrders] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) throw new Error('Token not found in localStorage');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://y-balash.vercel.app';

        // Total Cash Earnings
        const cashRes = await fetch(`${baseUrl}/api/total-cash-earnings`, { headers });
        const cashData = await cashRes.json();
        const cashValue = Number(cashData.totalCashEarnings ?? 0);
        setTotalCashEarnings(isNaN(cashValue) ? 0 : cashValue);

        // Net Earnings
        const earningsRes = await fetch(`${baseUrl}/api/seller/simplified-monthly-earnings`, { headers });
        const earningsData = await earningsRes.json();
        const netValue = Number(earningsData.netEarnings ?? 0);
        setNetEarnings(isNaN(netValue) ? 0 : netValue);

        // Total Orders
        const ordersRes = await fetch(`${baseUrl}/api/seller/orders/stats`, { headers });
        const ordersData = await ordersRes.json();
        const ordersValue = Number(ordersData.total_orders ?? 0);
        setTotalOrders(isNaN(ordersValue) ? 0 : ordersValue);

        // Average Order Value
        const averageRes = await fetch(`${baseUrl}/api/seller/orders/average-value`, { headers });
        const averageData = await averageRes.json();
        const avgValue = Number(averageData.average_order_value ?? 0);
        setAverageOrders(isNaN(avgValue) ? 0 : avgValue);

        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;

  const stats = [
    {
      label: 'Total Cash Earnings',
      value: totalCashEarnings.toFixed(2) + ' EGP',
      icon: <LuDollarSign className="text-[#2563EB] size-8" />,
      bg: 'bg-[#DBEAFE]',
    },
    {
      label: 'Net Earnings',
      value: netEarnings.toFixed(2) + ' EGP',
      icon: <FaChartLine className="text-[#D97706] size-8" />,
      bg: 'bg-[#FEF3C7]',
    },
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: <FaBox className="text-[#7C3AED] size-8" />,
      bg: 'bg-[#EDE9FE]',
    },
    {
      label: 'Average Order Value',
      value: averageOrders.toFixed(2) + ' EGP',
      icon: <MdOutlineEventNote className="text-[#059669] size-8" />,
      bg: 'bg-[#D1FAE5]',
    },
  ];

  return (
    <div className="container flex justify-between items-center flex-wrap lg:mt-12 mt-6 gap-6">
      {stats.map((item, index) => (
        <div key={index} className="flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl">
          <div className="flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2">
            <p className="text-[#6B7280] text-lg font-bold">{item.label}</p>
            <p className="text-black text-xl font-bold">{item.value}</p>
          </div>
          <div className={`p-2 rounded-lg ${item.bg} lg:mr-5 mr-2`}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EarningHero;
