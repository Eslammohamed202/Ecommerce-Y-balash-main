'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarHome from '../NavbarHome/NavbarHome';

export default function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDU0YjFlZmQ3OTIwODE3ZDllYmI5YyIsImlhdCI6MTc0ODg2MDE5NiwiZXhwIjoxNzUxNDUyMTk2fQ.0fkUoakCkGAv4Shtp7Pz2BYkZ87RHB7wb02xOENSLnA";

  // جلب المنتجات المفضلة من API
  async function getFavorites() {
    try {
      const res = await axios.get("https://y-balash.vercel.app/api/favorites", {
        headers: {
          Authorization: token,
        },
      });
      setFavorites(res.data);
    } catch (error) {
      console.log("Error fetching favorites:", error);
    }
  }

  useEffect(() => {
    getFavorites();
  }, []);

  return <>
  
  <NavbarHome />
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-[#0B3B36] mb-6">Your Favorite Items</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(favorites) && favorites.length > 0 ? (
          favorites.map((fav) => {
            const product = fav.itemId;

            return (
              <div className="bg-white p-4 shadow-md rounded-md" key={product._id}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-contain mb-2 bg-gray-100"
                />
                <h3 className="text-lg font-semibold text-[#1C573E]">{product.name}</h3>
                <p className="text-yellow-500">{product.price}</p>
                <p className="text-sm text-gray-500">{product.quantity}</p>
              </div>
            );
          })
        ) : (
          <p className="text-gray-500">No favorite items found.</p>
        )}
      </div>
    </div>
  
  </>
}
