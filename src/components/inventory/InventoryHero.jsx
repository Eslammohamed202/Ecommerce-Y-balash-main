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
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk';

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://y-balash.vercel.app';

        // Fetch Stock Stats
        const stockStatsRes = await fetch(`${baseUrl}/api/seller/stock-stats`, {
          method: 'GET',
          headers,
        });

        if (!stockStatsRes.ok) {
          throw new Error(`Stock Stats API failed: ${stockStatsRes.status} ${stockStatsRes.statusText}`);
        }

        const stockStatsData = await stockStatsRes.json();
        console.log('Stock Stats Data:', stockStatsData);

        const outOfStockValue = Number(
          stockStatsData.outOfStock ??
          stockStatsData.out_of_stock ??
          stockStatsData.data?.outOfStock ??
          stockStatsData.data?.out_of_stock ??
          0
        );

        const lowStockValue = Number(
          stockStatsData.lowStock ??
          stockStatsData.low_stock ??
          stockStatsData.data?.lowStock ??
          stockStatsData.data?.low_stock ??
          0
        );

        setOutOfStock(isNaN(outOfStockValue) ? 0 : outOfStockValue);
        setLowStock(isNaN(lowStockValue) ? 0 : lowStockValue);

        // Fetch Products Stats
        const productsStatsRes = await fetch(`${baseUrl}/api/seller/products-stats`, {
          method: 'GET',
          headers,
        });

        if (!productsStatsRes.ok) {
          throw new Error(`Products Stats API failed: ${productsStatsRes.status} ${productsStatsRes.statusText}`);
        }

        const productsStatsData = await productsStatsRes.json();
        console.log('Products Stats Data:', productsStatsData);

        const totalProductsValue = Number(
          productsStatsData.totalProducts ??
          productsStatsData.total_products ??
          productsStatsData.data?.totalProducts ??
          productsStatsData.data?.total_products ??
          0
        );

        setTotalProducts(isNaN(totalProductsValue) ? 0 : totalProductsValue);
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
