import Link from 'next/link';
import React from 'react';
import { FaEdit, FaTrash, FaEye, FaFileExport } from 'react-icons/fa';
import { MdEdit } from "react-icons/md";

const products = [
  {
    id: 1,
    name: 'Cheese Cake',
    units: '120',
    Revenue: 4262,
    price: 129.99,
    image: '/caake.png',
  },
  {
    id: 2,
    name: 'Bread X2',
    units: '235',
    Revenue: 457856,
    price: 199.99,
    image: '/caake.png',
  },
  {
    id: 3,
    name: 'Donuts',
    units: '236',
    Revenue: 741,
    price: 249.99,
    image: '/caake.png',
  },
];



const TopSelling = () => {
  return (
   <div className="p-4 mt-8 mb-8 container bg-white rounded-md">
  <h1 className='text-Main text-lg mb-4 font-semibold'>Top Selling Products</h1>

  {/* ✅ لف الجدول هنا */}
  <div className="overflow-x-auto">
    <table className="w-full text-sm text-left min-w-[600px]">
      <thead className="uppercase">
        <tr>
          <th className="p-2 text-[#1C573E]">Product</th>
          <th className="p-2 text-[#1C573E]">Price</th>
          <th className="p-2 text-[#1C573E]">Units Sold</th>
          <th className="p-2 text-[#1C573E]">Revenue</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} className="border-b hover:bg-gray-50">
            <td className="p-2 flex items-center gap-2 text-[#1C573E]">
              <img src={product.image} alt={product.name} className="w-10 h-10 rounded-full" />
              {product.name}
            </td>
            <td className="p-2">EGP {product.price.toFixed(2)}</td>
            <td className="p-2">{product.units}</td>
            <td className="p-2">{product.Revenue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};

export default TopSelling;
