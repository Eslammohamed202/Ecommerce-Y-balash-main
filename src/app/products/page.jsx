import Navbar from '@/components/Navbar/Navbar';
import Header from '@/components/products/Header';
import ProductCard from '@/components/products/ProductCard';
import Image from 'next/image';
import React from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const page = () => {
  return (
    <div className="bg-[#F9F6EE] ">
      <Navbar />
      <Header />


      <ProductCard />



    </div>
  );
};

export default page;
