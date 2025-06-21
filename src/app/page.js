"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Hero from "@/components/Home/Hero";
import LastUpdates from "@/components/Home/LastUpdates";
import QuickAction from "@/components/Home/QuickAction";
import RecentOrders from "@/components/Home/RecentOrders";
import SalesAnalytics from "@/components/Home/SalesAnalytics";
import Navbar from "@/components/Navbar/Navbar";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("Seller"); 

  useEffect(() => {
  if (status === "loading") return;
  if (!session) {
    router.push("/login");
    return;
  }

  const fetchUsername = async () => {
    const token = session?.user?.token;

    if (!token) {
      console.error("No access token available");
      return;
    }

    try {
      const response = await fetch("https://y-balash.vercel.app/api/user/welcome", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok && typeof data.message === "string") {
        const match = data.message.match(/Welcome back, (.+?)!/);
        const extractedName = match?.[1] || "Seller";
        setUsername(extractedName);
      } else {
        console.error("Failed to fetch username:", data.message);
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  };

  fetchUsername();
}, [session, status, router]);

if (status === "loading" || !session) {
  return null;
}


  return (
    <div>
      <Navbar />
      <div className="container flex justify-between items-center lg:mt-12 mt-6">
        <div>
          <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-4 mb-2">
            Welcome Back, {username}
          </h2>
          <p className="text-gray-700 lg:text-md md:text-sm text-xs">22/4/2022 Thursday</p>
        </div>
        <div>
          <Link href="/add-product">
            <button className="py-2 px-4 bg-Main text-white rounded-xl lg:text-lg md:text-md text-sm">
              Add New Product
            </button>
          </Link>
        </div>
      </div>
      <Hero />
      <SalesAnalytics />
      <div className="lg:mt-12 mt-6 container lg:mb-12 mb-6">
        <h1 className="text-2xl font-medium text-gray-900 mb-6">Recent Orders</h1>
      </div>
      <RecentOrders restaurantId={session?.user?.restaurantId} />
      <QuickAction />
      <LastUpdates />
    </div>
  );
}
