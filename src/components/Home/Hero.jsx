"use client";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FaShoppingCart, FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";
import { LuDollarSign } from "react-icons/lu";
import { GoAlertFill } from "react-icons/go";
import { AiFillProduct } from "react-icons/ai";
import Link from "next/link";
import {
  fetchLowStockCount,
  fetchMonthlyEarnings,
  fetchOrdersStats,
  fetchProductsStats,
} from "@/lib/api";
import { useRouter } from "next/navigation";

const Hero = () => {
  const [enabled, setEnabled] = useState(false);
  // const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    } else {
      setEnabled(true);
    }
  }, [router]);

  const { data: ordersStats, isLoading: loadingOrders } = useQuery({
    queryKey: ["ordersStats"],
    queryFn: fetchOrdersStats,
    enabled,
  });

  const { data: earningsData, isLoading: loadingEarnings } = useQuery({
    queryKey: ["monthlyEarnings"],
    queryFn: fetchMonthlyEarnings,
    enabled,
  });

  const { data: lowStockData, isLoading: loadingLowStock } = useQuery({
    queryKey: ["lowStockCount"],
    queryFn: fetchLowStockCount,
    enabled,
  });

  const { data: productsStats, isLoading: loadingProducts } = useQuery({
    queryKey: ["productsStats"],
    queryFn: fetchProductsStats,
    enabled,
  });

  if (loadingOrders || loadingEarnings || loadingLowStock || loadingProducts || !enabled) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="container flex justify-center items-center flex-wrap lg:mt-12 mt-6 gap-6">
      {/* Orders */}
      <Link href="/orders">
        <div className="flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl">
          <div className="flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2">
            <p className="text-[#6B7280] text-lg font-bold">Total Orders</p>
            <p className="text-black text-xl font-bold">{ordersStats?.total_orders || 0}</p>
            <div className="flex items-center">
              {parseFloat(ordersStats?.percentage_change) > 0 ? (
                <FaLongArrowAltUp className="text-[#10B981] text-sm font-semibold" />
              ) : (
                <FaLongArrowAltDown className="text-[#EF4444] text-sm font-semibold" />
              )}
              <p
                className={`text-sm font-semibold ${
                  parseFloat(ordersStats?.percentage_change) > 0
                    ? "text-[#10B981]"
                    : "text-[#EF4444]"
                }`}
              >
                {ordersStats?.percentage_change}% from yesterday
              </p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-Main lg:mr-5 mr-2">
            <FaShoppingCart className="text-[#F7F2E8] size-8" />
          </div>
        </div>
      </Link>

      {/* Earnings */}
      <Link href="/earning">
        <div className="flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl">
          <div className="flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2">
            <p className="text-[#6B7280] text-lg font-bold">Monthly Earnings</p>
            <p className="text-black text-xl font-bold">
              {earningsData?.totalEarnings?.toFixed(2)} EGP
            </p>
            <div className="flex items-center">
              {parseFloat(earningsData?.percentageChange) > 0 ? (
                <FaLongArrowAltUp className="text-[#10B981] text-sm font-semibold" />
              ) : (
                <FaLongArrowAltDown className="text-[#EF4444] text-sm font-semibold" />
              )}
              <p
                className={`text-sm font-semibold ${
                  parseFloat(earningsData?.percentageChange) > 0
                    ? "text-[#10B981]"
                    : "text-[#EF4444]"
                }`}
              >
                {earningsData?.percentageChange} from last month
              </p>
            </div>
          </div>
          <div className="p-2 rounded-lg bg-[#D1FAE5] lg:mr-5 mr-2">
            <LuDollarSign className="text-[#059669] size-8" />
          </div>
        </div>
      </Link>

      {/* Low Stock */}
      <Link href="/low-stock">
        <div className="flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl">
          <div className="flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2">
            <p className="text-[#6B7280] text-lg font-bold">Low Stock Items</p>
            <p className="text-black text-xl font-bold">{lowStockData?.lowStockItemsCount || 0}</p>
            <p className="text-[#F97316] text-sm font-semibold">Need Attention</p>
          </div>
          <div className="p-2 rounded-lg bg-[#FFEDD5] lg:mr-5 mr-2">
            <GoAlertFill className="text-[#F97316] size-8" />
          </div>
        </div>
      </Link>

      {/* Products */}
      <Link href="/products">
        <div className="flex items-center justify-between p-2 h-[150px] w-[300px] bg-white rounded-xl">
          <div className="flex flex-col items-start justify-center gap-2 lg:pl-5 pl-2">
            <p className="text-[#6B7280] text-lg font-bold">Total Products</p>
            <p className="text-black text-xl font-bold">
              {productsStats?.stats?.totalProducts || 0}
            </p>
            {/* <p className="text-[#FFC433] text-sm font-semibold">
              +{productsStats?.stats?.currentWeekAdditions || 0} New This Week
            </p> */}
          </div>
          <div className="p-2 rounded-lg bg-[#EDE9FE] lg:mr-5 mr-2">
            <AiFillProduct className="text-[#FFCD29] size-8" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Hero;
