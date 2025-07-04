'use client';

import React, { useState, useEffect } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { GoAlertFill } from 'react-icons/go';
import { AiFillProduct } from 'react-icons/ai';

const InventoryHero = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [outOfStock, setOutOfStock] = useState(0);
  const [lowStock, setLowStock] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

        if (!token) throw new Error("Token not found in localStorage");

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://y-balash.vercel.app';

        // 1. ✅ Fetch Total Products
        const productStatsRes = await fetch(`${baseUrl}/api/seller/products-stats`, {
          method: 'GET',
          headers,
        });
        const productStatsData = await productStatsRes.json();
        const totalProductsValue = productStatsData?.stats?.totalProducts ?? 0;
        setTotalProducts(totalProductsValue);

        // 2. ✅ Fetch Out Of Stock
        const outOfStockRes = await fetch(`${baseUrl}/api/out-of-stock-items`, {
          method: 'GET',
          headers,
        });
        const outOfStockData = await outOfStockRes.json();
        const outOfStockCount = outOfStockData?.count ?? 0;
        setOutOfStock(outOfStockCount);

        // 3. ✅ Fetch Low Stock Count
        const lowStockRes = await fetch(`${baseUrl}/api/seller/low-stock-count`, {
          method: 'GET',
          headers,
        });
        const lowStockData = await lowStockRes.json();
        const lowStockCount = lowStockData?.lowStockItemsCount ?? 0;
        setLowStock(lowStockCount);

        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-gray-600 p-4">Loading...</div>;
  if (error) return <div className="text-red-600 p-4">Error: {error}</div>;

  return (
    <div className="container flex justify-between items-center flex-wrap lg:mt-12 mt-6 gap-6">
      {/* Total Products */}
      <div className="flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl">
        <div className="flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2">
          <p className="text-[#6B7280] text-lg font-bold">Total Products</p>
          <p className="text-black text-xl font-bold">{totalProducts}</p>
        </div>
        <div className="p-2 rounded-lg bg-[#EDE9FE] lg:mr-5 mr-2">
          <AiFillProduct className="text-[#FFCD29] size-8" />
        </div>
      </div>

      {/* Out Of Stock */}
      <div className="flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl">
        <div className="flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2">
          <p className="text-[#6B7280] text-lg font-bold">Out Of Stock</p>
          <p className="text-black text-xl font-bold">{outOfStock}</p>
        </div>
        <div className="p-2 rounded-lg bg-Main lg:mr-5 mr-2">
          <FaShoppingCart className="text-[#F7F2E8] size-8" />
        </div>
      </div>

      {/* Low Stock */}
      <div className="flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl">
        <div className="flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2">
          <p className="text-[#6B7280] text-lg font-bold">Low Stock Items</p>
          <p className="text-black text-xl font-bold">{lowStock}</p>
        </div>
        <div className="p-2 rounded-lg bg-[#FFEDD5] lg:mr-5 mr-2">
          <GoAlertFill className="text-[#F97316] size-8" />
        </div>
      </div>
    </div>
  );
};

export default InventoryHero;
