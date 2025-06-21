"use client";

import React, { useState, useEffect } from 'react';

const TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk'; // تأكد أنه سليم وكامل

const RecentPayouts = () => {
  const [payouts, setPayouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        const response = await fetch('https://y-balash.vercel.app/api/seller/payouts/recent', {
          method: 'GET',
          headers: {
            Authorization: TOKEN,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch payouts: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched Payouts:', data);

        if (data.message === "Recent payouts retrieved successfully" && Array.isArray(data.payouts)) {
          setPayouts(data.payouts);
        } else {
          setPayouts([]);
        }

        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPayouts();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-4 bg-white rounded-xl shadow-sm mt-10">
        <h2 className="text-xl font-bold text-Main">Recent Payouts</h2>
        <div className="p-4 text-gray-500 animate-pulse">Loading payouts...</div>
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
      <h2 className="text-xl font-bold text-Main mb-4">Recent Payouts</h2>
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
            {payouts.length > 0 ? (
              payouts.map((payout, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4 text-[#374151]">{payout.date || 'N/A'}</td>
                  <td className="py-2 px-4 text-[#374151]">{payout.amount || 0}</td>
                  <td className="py-2 px-4 text-[#374151]">{payout.method || 'Unknown'}</td>
                  <td className="py-2 px-4">
                    {payout.status === 'Paid' ? (
                      <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-sm font-medium">
                        Paid
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-700 py-1 px-3 rounded-full text-sm font-medium">
                        Pending
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-[#6B7280]">
                  No payouts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentPayouts;
