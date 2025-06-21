'use client';

import React, { useState, useEffect } from 'react';
import { FaLongArrowAltUp, FaLongArrowAltDown } from 'react-icons/fa';
import { LuDollarSign } from 'react-icons/lu';
import { MdOutlineEventNote } from 'react-icons/md';
import { FaBox } from 'react-icons/fa6'; // بديل لـ AiFillProduct
import { FaChartLine } from 'react-icons/fa6';

const EarningHero = () => {
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [thisMonthEarnings, setThisMonthEarnings] = useState(0);
  const [averageOrders, setAverageOrders] = useState(0);
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

        // Fetch Total Earnings
        const totalEarningsRes = await fetch(`${baseUrl}/api/seller/monthly-earnings`, {
          method: 'GET',
          headers,
        });
        const totalEarningsData = await totalEarningsRes.json();
        const totalEarningsValue = Number(
          totalEarningsData.currentMonth ??
          totalEarningsData.earnings ??
          totalEarningsData.data?.currentMonth ??
          totalEarningsData.data?.earnings ??
          0
        );
        setTotalEarnings(isNaN(totalEarningsValue) ? 0 : totalEarningsValue);

        // Fetch Total Orders
        const totalOrdersRes = await fetch(`${baseUrl}/api/seller/orders/stats`, {
          method: 'GET',
          headers,
        });
        const totalOrdersData = await totalOrdersRes.json();
        const totalOrdersValue = Number(
          totalOrdersData.currentMonth ??
          totalOrdersData.total ??
          totalOrdersData.data?.currentMonth ??
          totalOrdersData.data?.total ??
          0
        );
        setTotalOrders(isNaN(totalOrdersValue) ? 0 : totalOrdersValue);

        // Fetch This Month Earnings
        const earningsRes = await fetch(`${baseUrl}/api/seller/earnings/current`, {
          method: 'GET',
          headers,
        });
        const earningsData = await earningsRes.json();
        const thisMonthEarningsValue = Number(
          earningsData.currentMonth ??
          earningsData.earnings ??
          earningsData.data?.currentMonth ??
          earningsData.data?.earnings ??
          0
        );
        setThisMonthEarnings(isNaN(thisMonthEarningsValue) ? 0 : thisMonthEarningsValue);

        // Fetch Average Orders
        const averageRes = await fetch(`${baseUrl}/api/seller/orders/average-value`, {
          method: 'GET',
          headers,
        });
        const averageData = await averageRes.json();
        const averageOrdersValue = Number(
          averageData.currentMonth ??
          averageData.average ??
          averageData.data?.currentMonth ??
          averageData.data?.average ??
          0
        );
        setAverageOrders(isNaN(averageOrdersValue) ? 0 : averageOrdersValue);

        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const calculatePercentage = (current, previous) => {
    if (!previous) return 0;
    return Number((((current - previous) / previous) * 100).toFixed(1));
  };

  // Placeholder values for percentage calculations
  const previousTotalEarnings = 100000;
  const previousTotalOrders = 100;
  const previousMonthEarnings = 10;
  const previousAverageOrders = 20;

  const stats = [
    {
      label: 'Total Earning',
      value: totalEarnings,
      previous: previousTotalEarnings,
      icon: <LuDollarSign className="text-[#2563EB] size-8" />,
      bg: 'bg-[#DBEAFE]',
    },
    {
      label: 'Total Orders',
      value: totalOrders,
      previous: previousTotalOrders,
      icon: <FaBox className="text-[#7C3AED] size-8" />,
      bg: 'bg-[#EDE9FE]',
    },
    {
      label: 'This Month',
      value: thisMonthEarnings,
      previous: previousMonthEarnings,
      icon: <FaChartLine className="text-[#D97706] size-8" />,
      bg: 'bg-[#FEF3C7]',
    },
    {
      label: 'Average Orders',
      value: averageOrders,
      previous: previousAverageOrders,
      icon: <MdOutlineEventNote className="text-[#059669] size-8" />,
      bg: 'bg-[#D1FAE5]',
    },
  ];

  return (
    <div className="container flex justify-between items-center flex-wrap lg:mt-12 mt-6 gap-6">
      {stats.map((item, index) => {
        const percentage = calculatePercentage(item.value, item.previous);
        const isPositive = percentage >= 0;

        return (
          <div
            key={index}
            className="flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl"
          >
            <div className="flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2">
              <p className="text-[#6B7280] text-lg font-bold">{item.label}</p>
              <p className="text-black text-xl font-bold">{item.value}</p>
              <div className="flex items-center">
                {isPositive ? (
                  <FaLongArrowAltUp className="text-[#10B981] text-sm font-semibold" />
                ) : (
                  <FaLongArrowAltDown className="text-red-600 text-sm font-semibold" />
                )}
                <p
                  className={`text-sm font-semibold ${
                    isPositive ? 'text-[#10B981]' : 'text-red-600'
                  }`}
                >
                  {Math.abs(percentage)}% Last Month
                </p>
              </div>
            </div>
            <div className={`p-2 rounded-lg ${item.bg} lg:mr-5 mr-2`}>
              {item.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EarningHero;
