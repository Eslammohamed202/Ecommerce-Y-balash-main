// components/RestaurantsList.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function RestaurantsList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("https://y-balash.vercel.app/api/restaurants/all")
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="bg-[#F5F1E9] py-6 px-4 ">
      <div className="flex items-center justify-between">
        <h2 className="text-[#1C573E] text-xl font-poppins text-[36px] font-bold mb-4">Restaurants</h2>
        <Link href="/Resturant" className="text-[24px] underline flex items-center font-poppins text-[#1C573E] ">
             See more
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant._id}
            className="rounded-2xl overflow-hidden shadow-md"
          >
            {/* الجزء العلوي باللون الرمادي */}
            <div className="bg-[#8A8A8A] h-[100px] relative flex justify-center">
  <div className="absolute top-[65%] w-[60px] h-[60px] rounded-full overflow-hidden border-[3px] border-white shadow">
    <img
      src={restaurant.imageUrl}
      alt={restaurant.name}
      className="w-full h-full object-contain"
    />
  </div>
</div>

            {/* الجزء السفلي باللون الأبيض */}
            <div className="bg-white text-center pt-10 pb-4">
              <p className="text-[#000000] font-bold text-[16px]">{restaurant.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
