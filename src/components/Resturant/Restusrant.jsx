// components/RestaurantsList.jsx
"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import NavbarHome from "../NavbarHome/NavbarHome";
import { FaCarSide } from "react-icons/fa6";


export default function Restaurant() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    axios.get("https://y-balash.vercel.app/api/restaurants/all")
      .then(res => setRestaurants(res.data))
      .catch(err => console.error(err));
  }, []);

  return <>
    <NavbarHome />
    <div className="bg-[#F5F1E9] px-4 ">
        
        <div className="py-6 px-5" >
            <h2 className="text-[#1C573E] text-xl font-poppins text-[36px] font-bold ">Restaurants</h2>
            <p className="font-poppins font-medium text-[18px] text-[#796E5F] py-3 ">
                Craving something special? Order from your favorite restaurants and enjoy quick delivery to your doorstep!
            </p>
            <div className=' flex gap-3'>
                <FaCarSide className=' text-[#FFB66C] text-3xl ' />
                <h5 className=' font-poppins font-light text-[14px] text-[#A7A29B] '>In-store delivery • Comical free</h5>
            </div>
        </div>

        <div className="grid py-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {restaurants.map((restaurant) => (
                <div
                    key={restaurant._id}
                    className="rounded-2xl overflow-hidden shadow-md"
                >
                {/* الجزء العلوي  */}
                <div className="bg-[#8A8A8A] h-[100px] relative flex justify-center">
                    <div className="absolute top-[65%] w-[60px] h-[60px] rounded-full overflow-hidden border-[3px] border-white shadow">
                        <img
                            src={restaurant.imageUrl}
                            alt={restaurant.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* الجزء السفلي  */}
                <div className="bg-white text-center pt-10 pb-4">
                    <p className="text-[#000000] font-bold text-[16px]">{restaurant.name}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
  </>
}


