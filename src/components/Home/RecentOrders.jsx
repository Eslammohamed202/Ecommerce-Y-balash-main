'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaEye, FaTruck } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';

const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk';

const RecentOrders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://y-balash.vercel.app/api/seller/orders-details', {
          method: 'GET',
          headers: {
            Authorization: TOKEN,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        setAllOrders(data.orders || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = allOrders.filter(order => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order._id?.toLowerCase().includes(searchLower) ||
      order.customer?.toLowerCase().includes(searchLower) ||
      order.status?.toLowerCase().includes(searchLower) ||
      order.date?.toLowerCase().includes(searchLower) ||
      order.total?.toString().toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="lg:mt-12 mt-6 container lg:mb-12 mb-6">
      {/* Search & Sort */}
      <div className="flex flex-col lg:flex-row justify-between items-center bg-white rounded-xl p-4 mb-4 gap-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 pl-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="relative w-full lg:w-auto">
          <select className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-8 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 w-full">
            <option>Sort: Newest</option>
            <option>Sort: Oldest</option>
            <option>Sort: A-Z</option>
            <option>Sort: Z-A</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="min-w-[800px]">
          <div className="grid grid-cols-6 gap-4 p-4 border-b border-gray-200 text-sm font-medium text-gray-500">
            <div>Order ID</div>
            <div>Customer</div>
            <div>Status</div>
            <div>Date</div>
            <div>Total</div>
            <div>Actions</div>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">Loading orders...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">Error: {error}</div>
          ) : filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div
                key={order._id}
                className="grid grid-cols-6 gap-4 p-4 items-center text-sm text-gray-700 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="text-black font-medium">{order._id}</div>
                <div className="flex items-center gap-2">
                  <Image
                    src="/user.jpg"
                    alt="Customer"
                    width={24}
                    height={24}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>{order.customer || 'Unknown'}</span>
                </div>
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'Delivered'
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'Processing'
                      ? 'bg-yellow-100 text-yellow-700'
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status || 'Pending'}
                  </span>
                </div>
                <div>{order.date || '-'}</div>
                <div className="font-medium">{order.total || '0.00'} EGP</div>
                <div className="flex gap-4">
                  <Link href={`/orders/${order._id}`} className="text-gray-500 hover:text-green-600 transition-colors">
                    <FaEye size={16} />
                  </Link>
                  <Link href={`/orders/${order._id}/track`} className="text-gray-500 hover:text-green-600 transition-colors">
                    <FaTruck size={16} />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              {searchQuery ? 'No orders match your search' : 'No orders found'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentOrders;
