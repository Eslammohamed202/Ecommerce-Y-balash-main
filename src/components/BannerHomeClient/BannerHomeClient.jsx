'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BannerHome() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('https://y-balash.vercel.app/api/categories/all');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      {/* Start Banner */}
      <div className="flex items-center justify-between bg-[#1C573E] mx-6 my-4 rounded-2xl h-[400px] mb-[50px]">
        <div>
          <Image
            className="relative left-[-30px] top-[30px] opacity-[0.19]"
            width={155}
            height={155}
            src="/photoBanner.png"
            alt=""
          />
          <Image
            className="relative top-[170px] left-[-25px] opacity-[0.19]"
            width={155}
            height={155}
            src="/cabbage.png"
            alt=""
          />
          <Image
            className="relative left-[330px] top-[35px] opacity-[0.19]"
            width={155}
            height={155}
            src="/photoBanner.png"
            alt=""
          />
        </div>

        <div className="mx-[120px]">
          <h1 className="font-bold font-inria-sans text-[#F5F6DB] text-3xl leading-[40px]">
            Your favorite shop, <br /> just a doorstep away.
          </h1>
          <button className="bg-[#F7F2E8] w-[120px] h-[40px] rounded-xl mt-5 text-[#0E554F]">
            Shop now
          </button>
        </div>

        <div className="relative w-[500px] h-[400px] overflow-hidden mx-[120px]">
          <Image
            className="absolute top-0 left-0 mt-[70px]"
            width={400}
            height={400}
            src="/photos.png"
            alt=""
          />
        </div>
      </div>
      {/* End Banner */}

      <h2 className="text-[#1C573E] pl-[25px] font-bold leading-24 text-[36px]">
        Categories
      </h2>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 ml-6 mr-6 my-4 mb-[50px] ml-[25px]">
        {categories.map((cat) => (
          <div key={cat._id} className="flex items-center justify-between bg-[#FFFFFF] rounded-3xl">
            <Link href={`/${typeof cat.name === 'string' ? cat.name.replace(/\s+/g, '') : ''}Product`}>
  <div className="bg-[#FFFFFF] mb-[65px] cursor-pointer">
    <h3 className="ml-[15px] text-[#0B332B] font-inter font-semibold text-[24px]">
      {cat.name || 'Unnamed Category'}
    </h3>
  </div>
</Link>
            <Image
              className="mt-[15px] relative right-[28px] top-2"
              width={155}
              height={155}
              src={cat.imageUrl}
              alt={cat.name}
            />
          </div>
        ))}
      </div>
    </>
  );
}
