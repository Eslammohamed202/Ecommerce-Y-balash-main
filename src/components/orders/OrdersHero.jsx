"use client";

import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { MdLocalShipping, MdAccessTime } from "react-icons/md";
import { LuDollarSign } from "react-icons/lu";

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk';

const OrdersHero = () => {
    const [stats, setStats] = useState({
        totalOrders: 0,
        pendingOrders: 0,
        shippedOrders: 0,
        totalRevenue: 0,
        currency: "EGP"
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('https://y-balash.vercel.app/api/seller/restaurant-stats', {
                    method: 'GET',
                    headers: {
                        Authorization: TOKEN,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (data.message === "Restaurant statistics retrieved successfully" && data.stats) {
                    setStats(data.stats);
                } else {
                    throw new Error('Unexpected response');
                }

                setLoading(false);
            } catch (err) {
                setError('Failed to fetch statistics');
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return <div className="text-center py-6 text-gray-500">Loading...</div>;
    if (error) return <div className="text-center py-6 text-red-500">{error}</div>;

    return (
        <div className='container flex justify-center items-center flex-wrap lg:mt-12 mt-6 gap-6'>
            {/* Total Orders */}
            <div className='flex items-center justify-start p-2 h-[120px] w-[300px] bg-white rounded-xl shadow'>
                <div className='p-2 rounded-lg bg-Main mr-1'>
                    <FaShoppingCart className='text-[#F7F2E8] size-8' />
                </div>
                <div className='flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2'>
                    <p className='text-[#6B7280] text-lg font-bold'>Total Orders</p>
                    <p className='text-black text-xl font-bold'>{stats.totalOrders}</p>
                </div>
            </div>

            {/* Pending Orders */}
            <div className='flex items-center justify-start p-2 h-[120px] w-[300px] bg-white rounded-xl shadow'>
                <div className='p-2 rounded-lg bg-[#FEF3C7] mr-1'>
                    <MdAccessTime className='text-[#D97706] size-8' />
                </div>
                <div className='flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2'>
                    <p className='text-[#6B7280] text-lg font-bold'>Pending Orders</p>
                    <p className='text-black text-xl font-bold'>{stats.pendingOrders}</p>
                </div>
            </div>

            {/* Shipped Orders */}
            <div className='flex items-center justify-start p-2 h-[120px] w-[300px] bg-white rounded-xl shadow'>
                <div className='p-2 rounded-lg bg-[#D1FAE5] mr-1'>
                    <MdLocalShipping className='text-[#059669] size-8' />
                </div>
                <div className='flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2'>
                    <p className='text-[#6B7280] text-lg font-bold'>Shipped Orders</p>
                    <p className='text-black text-xl font-bold'>{stats.shippedOrders}</p>
                </div>
            </div>

            {/* Total Revenue */}
            <div className='flex items-center justify-start p-2 h-[120px] w-[300px] bg-white rounded-xl shadow'>
                <div className='p-2 rounded-lg bg-[#EDE9FE] mr-1'>
                    <LuDollarSign className='text-[#7C3AED] size-8' />
                </div>
                <div className='flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2'>
                    <p className='text-[#6B7280] text-lg font-bold'>Total Revenue</p>
                    <p className='text-black text-xl font-bold'>{stats.totalRevenue} {stats.currency}</p>
                </div>
            </div>
        </div>
    );
};

export default OrdersHero;
