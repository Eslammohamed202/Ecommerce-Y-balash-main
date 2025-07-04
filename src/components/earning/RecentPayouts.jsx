"use client";

import React, { useState, useEffect } from 'react';

const RecentPayouts = () => {
  const [payouts, setPayouts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (!token) throw new Error('Token not found in localStorage');

        const headers = {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://y-balash.vercel.app';

        // Fetch payouts
        const payoutsRes = await fetch(`${baseUrl}/api/seller/payouts/recent`, { headers });
        if (!payoutsRes.ok) throw new Error(`Payouts fetch error: ${payoutsRes.statusText}`);
        const payoutsData = await payoutsRes.json();
        setPayouts(payoutsData.payouts || []);

        // Fetch last 7 days orders
        const ordersRes = await fetch(`${baseUrl}/api/seller/last-7-days-orders`, { headers });
        if (!ordersRes.ok) throw new Error(`Orders fetch error: ${ordersRes.statusText}`);
        const ordersData = await ordersRes.json();
        setOrders(ordersData.orders || []);

        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-sm mt-10">
        <h2 className="text-xl font-bold text-Main">Recent Payouts</h2>
        <div className="p-4 text-gray-500 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-sm mt-10">
        <h2 className="text-xl font-bold text-Main">Recent Payouts</h2>
        <div className="p-4 text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-white rounded-xl shadow-sm mt-10">
      {/* Payouts Table */}
      <h2 className="text-xl font-bold text-Main mb-4">Recent Payouts</h2>
      <div className="overflow-x-auto mb-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-2 px-4 text-[#6B7280]">Date</th>
              <th className="py-2 px-4 text-[#6B7280]">Amount</th>
              <th className="py-2 px-4 text-[#6B7280]">Payment Method</th>
              <th className="py-2 px-4 text-[#6B7280]">Status</th>
            </tr>
          </thead>
          <tbody>
            {payouts.length > 0 ? (
              payouts.map((payout, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-[#374151]">{payout.date || 'N/A'}</td>
                  <td className="py-2 px-4 text-[#374151]">{payout.amount || 0}</td>
                  <td className="py-2 px-4 text-[#374151]">{payout.method || 'Unknown'}</td>
                  <td className="py-2 px-4">
                    {payout.status === 'Paid' ? (
                      <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-sm font-medium">Paid</span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-sm font-medium">Pending</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-[#6B7280]">No payouts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Orders Table */}
      <h2 className="text-xl font-bold text-Main mb-4">Last 7 Days Orders</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="py-2 px-4 text-[#6B7280]">Date</th>
              <th className="py-2 px-4 text-[#6B7280]">Amount</th>
              <th className="py-2 px-4 text-[#6B7280]">Payment Method</th>
              <th className="py-2 px-4 text-[#6B7280]">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-[#374151]">{order.date || 'N/A'}</td>
                  <td className="py-2 px-4 text-[#374151]">{order.totalAmount?.toFixed(2) || 0}</td>
                  <td className="py-2 px-4 text-[#374151]">{order.paymentMethod || 'Unknown'}</td>
                  <td className="py-2 px-4">
                    <span className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-sm font-medium">{order.status}</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-[#6B7280]">No recent orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPayouts;
