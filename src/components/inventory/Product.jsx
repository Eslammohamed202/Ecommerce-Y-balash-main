"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaEdit, FaTrash, FaEye, FaFileExport } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";
import { FiSearch } from "react-icons/fi";

const getStockStatus = (stock) => {
  if (stock === 0)
    return <span className="text-xs px-2 py-1 bg-[#FEE2E2] text-[#ED2226] rounded-full">Out of Stock</span>;
  if (stock <= 5)
    return <span className="text-xs px-2 py-1 bg-[#FEF3C7] text-[#D97706] rounded-full">Low Stock ({stock})</span>;
  return <span className="text-xs px-2 py-1 bg-[#D1FAE5] text-[#059669] rounded-full">In Stock ({stock})</span>;
};

const Product = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productsData, setProductsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://y-balash.vercel.app/api/seller/restaurant-products', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        let productsArray = Array.isArray(data) ? data : data.products || [];

        productsArray = productsArray.map(product => ({
          id: product._id || product.id || Math.random().toString(36).substr(2, 9),
          name: product.name || 'Unknown',
          sku: product.sku || 'N/A',
          stock: Number(product.stock) || 0,
          price: Number(product.price) || 0,
          date: product.updatedAt ? new Date(product.updatedAt).toLocaleDateString() : 'N/A',
          image: product.image || '/caake.png',
        }));

        setProductsData(productsArray);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 mt-2 container">
      {/* 🔍 Search */}
      <div className="flex flex-wrap justify-between items-center bg-white rounded-xl mt-8 p-4 mb-8 gap-4">
        <div className="relative w-full lg:w-[500px]">
          <input
            type="text"
            placeholder="Search products..."
            className="p-3 pl-10 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-Main/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="flex gap-2">
          <select className="border border-gray-300 rounded-xl px-4 py-2">
            <option>Sort: By</option>
            <option>Oldest</option>
            <option>A-Z</option>
            <option>Z-A</option>
          </select>
          <select className="border border-gray-300 rounded-xl px-4 py-2">
            <option>Filtered By Categories</option>
            <option>Category A</option>
            <option>Category B</option>
          </select>
        </div>
      </div>

      {/* 🧰 Actions */}
      <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 bg-white p-4 rounded-xl">
        <button className="flex items-center gap-1 text-[#ED2226] font-semibold"><FaTrash className='size-5' /> Delete</button>
        <button className="flex items-center gap-1 text-[#34A853] font-semibold"><FaFileExport className='size-5' /> Export</button>
        <button className="flex items-center gap-1 text-[#164A93] font-semibold"><MdEdit className='size-5' /> Edit Stock</button>
      </div>

      {/* 📦 Table */}
      <table className="w-full text-sm text-left bg-white">
        <thead className="bg-gray-100 text-gray-600 uppercase">
          <tr>
            <th className="p-2"><input type="checkbox" /></th>
            <th className="p-2 text-[#1C573E]">Product</th>
            <th className="p-2 text-[#1C573E]">SKU</th>
            <th className="p-2 text-[#1C573E]">Stock</th>
            <th className="p-2 text-[#1C573E]">Price</th>
            <th className="p-2 text-[#1C573E]">Last Updated</th>
            <th className="p-2 text-[#1C573E]">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <tr key={product.id} className="border-b hover:bg-gray-50">
                <td className="p-2"><input type="checkbox" /></td>
                <td className="p-2 flex items-center gap-2 text-[#1C573E]">
                  <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full" />
                  {product.name}
                </td>
                <td className="p-2">{product.sku}</td>
                <td className="p-2">{getStockStatus(product.stock)}</td>
                <td className="p-2">EGP {product.price.toFixed(2)}</td>
                <td className="p-2">{product.date}</td>
                <td className="p-2 flex gap-2 text-[#164A93]">
                  <Link href={`/edit-product/${product.id}`}><FaEdit className="cursor-pointer" /></Link>
                  <button><FaTrash className="text-[#ED2226] cursor-pointer" /></button>
                  <button><FaEye className="text-[#4B5563] cursor-pointer" /></button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="p-4 text-center text-gray-400">No products found.</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between text-sm text-gray-500 mt-6 mb-6">
        <span>Showing 1 to {filteredProducts.length} of {productsData.length} entries</span>
        <div className="flex gap-2">
          <button className="px-2 py-1 border border-Main/10 rounded">Previous</button>
          <button className="px-2 py-1 border border-Main/10 rounded bg-Main text-white">1</button>
          <button className="px-2 py-1 border border-Main/10 rounded">2</button>
          <button className="px-2 py-1 border border-Main/10 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
