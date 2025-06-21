// import React from 'react'
// import { FaShoppingCart } from "react-icons/fa";
// import { LuDollarSign } from "react-icons/lu";
// import { GoAlertFill } from "react-icons/go";
// import { AiFillProduct } from "react-icons/ai";
// import { FaLongArrowAltUp } from "react-icons/fa";
// import { FaLongArrowAltDown } from "react-icons/fa";
// import Link from 'next/link';

// const Hero = () => {
//     return (
//         <div className='container flex  justify-center items-center flex-wrap lg:mt-12 mt-6 gap-6'>

//             <Link href="/orders">
//                 <div className='flex  items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl'>
//                     <div className='  flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2 '>
//                         <p className='text-[#6B7280] text-lg font-bold'> Total Orders</p>
//                         <p className='text-black text-xl font-bold'> 1200</p>
//                         <div className='flex items-center'>
//                             <FaLongArrowAltDown className='text-[#10B981] text-sm font-semibold' />
//                             <p className='text-[#10B981] text-sm font-semibold'>
//                                 12% from yesterday</p>
//                         </div>

//                     </div>
//                     <div className='p-2 rounded-lg bg-Main lg:mr-5 mr-2'>
//                         <FaShoppingCart className='text-[#F7F2E8] size-8 ' />
//                     </div>
//                 </div>
//             </Link>
//             <Link href="/earning">
//                 <div className='flex  items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl'>
//                     <div className='  flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2 '>
//                         <p className='text-[#6B7280] text-lg font-bold'> Monthly Earnings </p>
//                         <p className='text-black text-xl font-bold'> $1200</p>
//                         <div className='flex items-center'>
//                             <FaLongArrowAltUp className='text-[#10B981] text-sm font-semibold' />
//                             <p className='text-[#10B981] text-sm font-semibold'>
//                                 12% from yesterday</p>
//                         </div>                </div>
//                     <div className='p-2 rounded-lg bg-[#D1FAE5] lg:mr-5 mr-2'>
//                         <LuDollarSign className='text-[#059669] size-8 ' />
//                     </div>
//                 </div>
//             </Link>
//             <Link href="/low-stock">
//                 <div className='flex  items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl'>
//                     <div className='  flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2 '>
//                         <p className='text-[#6B7280] text-lg font-bold'>  Low Stock Items </p>
//                         <p className='text-black text-xl font-bold'> 12</p>
//                         <p className='text-[#F97316] text-sm font-semibold'> Need Attention</p>
//                     </div>
//                     <div className='p-2 rounded-lg bg-[#FFEDD5] lg:mr-5 mr-2'>
//                         <GoAlertFill className='text-[#F97316] size-8 ' />
//                     </div>
//                 </div>
//             </Link>

//             <Link href="/products">
//                 <div className='flex  items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl'>
//                     <div className='  flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2 '>
//                         <p className='text-[#6B7280] text-lg font-bold'>  Total Product   </p>
//                         <p className='text-black text-xl font-bold'> 452</p>
//                         <p className='text-[#FFC433] text-sm font-semibold'> +5 New This Week</p>
//                     </div>
//                     <div className='p-2 rounded-lg bg-[#EDE9FE] lg:mr-5 mr-2'>
//                         <AiFillProduct className='text-[#FFCD29] size-8 ' />
//                     </div>
//                 </div>
//             </Link>


//         </div>
//     )
// }

// export default Hero 











"use client"
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaShoppingCart, FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { LuDollarSign } from "react-icons/lu";
import { GoAlertFill } from "react-icons/go";
import { AiFillProduct } from "react-icons/ai";
import Link from 'next/link';
import { fetchLowStockCount, fetchMonthlyEarnings, fetchOrdersStats, fetchProductsStats } from '@/lib/api';
import { useEffect, useState } from 'react';



const Hero = () => {
  const { data: ordersStats, isLoading: loadingOrders } = useQuery({
    queryKey: ['ordersStats'],
    queryFn: fetchOrdersStats,
  });

  const [staticProductCount, setStaticProductCount] = useState(0);

  useEffect(() => {
  const interval = setInterval(() => {
    const count = localStorage.getItem('totalProducts');
    setStaticProductCount(count ? parseInt(count) : 0);
  }, 1000);

  // تنظيف الـ interval عند خروج الـ component
  return () => clearInterval(interval);
}, []);


  const { data: earningsData, isLoading: loadingEarnings } = useQuery({
    queryKey: ['monthlyEarnings'],
    queryFn: fetchMonthlyEarnings,
  });

  const { data: lowStockData, isLoading: loadingLowStock } = useQuery({
    queryKey: ['lowStockCount'],
    queryFn: fetchLowStockCount,
  });

  const { data: productsStats, isLoading: loadingProducts } = useQuery({
    queryKey: ['productsStats'],
    queryFn: fetchProductsStats,
  });

  if (loadingOrders || loadingEarnings || loadingLowStock || loadingProducts) {
    return <div>Loading...</div>;
  }
  return (
    <div className='container flex justify-center items-center flex-wrap lg:mt-12 mt-6 gap-6'>
      <Link href="/orders">
        <div className='flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl'>
          <div className='flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2'>
            <p className='text-[#6B7280] text-lg font-bold'>Total Orders</p>
            <p className='text-black text-xl font-bold'>{ordersStats?.total_orders || 0}</p>
            <div className='flex items-center'>
              {parseFloat(ordersStats?.percentage_change) > 0 ? (
                <FaLongArrowAltUp className='text-[#10B981] text-sm font-semibold' />
              ) : (
                <FaLongArrowAltDown className='text-[#EF4444] text-sm font-semibold' />
              )}
              <p className={`text-sm font-semibold ${parseFloat(ordersStats?.percentage_change) > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {ordersStats?.percentage_change} from yesterday
              </p>
            </div>
          </div>
          <div className='p-2 rounded-lg bg-Main lg:mr-5 mr-2'>
            <FaShoppingCart className='text-[#F7F2E8] size-8' />
          </div>
        </div>
      </Link>

      <Link href="/earning">
        <div className='flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl'>
          <div className='flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2'>
            <p className='text-[#6B7280] text-lg font-bold'>Monthly Earnings</p>
            <p className='text-black text-xl font-bold'>
              {earningsData?.earnings?.currentMonth?.currency} {earningsData?.earnings?.currentMonth?.total}
            </p>
            <div className='flex items-center'>
              {parseFloat(earningsData?.earnings?.percentageChange) > 0 ? (
                <FaLongArrowAltUp className='text-[#10B981] text-sm font-semibold' />
              ) : (
                <FaLongArrowAltDown className='text-[#EF4444] text-sm font-semibold' />
              )}
              <p className={`text-sm font-semibold ${parseFloat(earningsData?.earnings?.percentageChange) > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
                {earningsData?.earnings?.percentageChange} from last month
              </p>
            </div>
          </div>
          <div className='p-2 rounded-lg bg-[#D1FAE5] lg:mr-5 mr-2'>
            <LuDollarSign className='text-[#059669] size-8' />
          </div>
        </div>
      </Link>

      <Link href="/low-stock">
        <div className='flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl'>
          <div className='flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2'>
            <p className='text-[#6B7280] text-lg font-bold'>Low Stock Items</p>
            <p className='text-black text-xl font-bold'>{lowStockData?.lowStockItemsCount || 0}</p>
            <p className='text-[#F97316] text-sm font-semibold'>Need Attention</p>
          </div>
          <div className='p-2 rounded-lg bg-[#FFEDD5] lg:mr-5 mr-2'>
            <GoAlertFill className='text-[#F97316] size-8' />
          </div>
        </div>
      </Link>

      <Link href="/products">
        <div className='flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl'>
          <div className='flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2'>
            <p className='text-[#6B7280] text-lg font-bold'>Total Products</p>
            <p className='text-black text-xl font-bold'>{staticProductCount}</p>
            <p className='text-[#FFC433] text-sm font-semibold'>
              +{productsStats?.stats?.currentWeekAdditions || 0} New This Week
            </p>
          </div>
          <div className='p-2 rounded-lg bg-[#EDE9FE] lg:mr-5 mr-2'>
            <AiFillProduct className='text-[#FFCD29] size-8' />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Hero;
