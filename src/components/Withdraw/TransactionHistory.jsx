"use client";
import React, { useState, useEffect } from "react";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("https://y-balash.vercel.app/api/seller/transactions", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk"
          },
        });

        const data = await response.json();
        if (response.ok) {
          setTransactions(data);
        } else {
          setError(`Failed to fetch transactions: ${data.message || response.statusText}`);
        }
      } catch (err) {
        setError(`An error occurred while fetching transactions: ${err.message}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-white rounded-xl shadow-md mb-6">
      <h2 className="text-xl font-bold text-Main mb-4">Transaction History</h2>

      {loading && <p className="text-gray-500">Loading transactions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && transactions.length === 0 && (
        <p className="text-gray-500">No transactions found.</p>
      )}

      {!loading && !error && transactions.length > 0 && (
        <table className="w-full text-left border">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="py-2 px-4 text-[#6B7280]">Date</th>
              <th className="py-2 px-4 text-[#6B7280]">Amount</th>
              <th className="py-2 px-4 text-[#6B7280]">Method</th>
              <th className="py-2 px-4 text-[#6B7280]">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-b">
                <td className="py-2 px-4 text-[#6B7280]">
                  {transaction.date ? new Date(transaction.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="py-2 px-4 text-[#6B7280]">{transaction.amount}</td>
                <td className="py-2 px-4 text-[#6B7280]">{transaction.method}</td>
                <td className="py-2 px-4">
                  {transaction.status === "Paid" ? (
                    <div className="bg-[#D1FAE5] text-[#047857] py-1 px-3 rounded-full text-sm text-center">
                      Paid
                    </div>
                  ) : (
                    <div className="bg-[#FEF3C7] text-[#B45309] py-1 px-3 rounded-full text-sm text-center">
                      Pending
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionHistory;
