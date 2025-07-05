'use client';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cartContext } from '../Context/AuthContext/CartContext';
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from 'react-icons/fa';
import Cookies from 'js-cookie';

export default function AllItems() {
  const [getAllCategories, setGetAllCategories] = useState(null);
  const { addProduct } = useContext(cartContext);
  const [favorites, setFavorites] = useState([]);

  // ✅ دالة للحصول على التوكن من localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      return token ? `Bearer ${token}` : '';
    }
    return '';
  };

  useEffect(() => {
    fetchFavorites();
    viewCategories();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await axios.get("https://y-balash.vercel.app/api/favorites", {
        headers: { Authorization: getToken() }
      });
      setFavorites(res.data);
    } catch (error) {
      console.error("Error fetching favorites", error);
    }
  };

  const isFavorite = (productId) => {
    return favorites.some(fav => {
      const favId = typeof fav.itemId === 'object' ? fav.itemId._id : fav.itemId;
      return favId === productId;
    });
  };

  const toggleFavorite = async (productId) => {
    const alreadyFav = isFavorite(productId);

    try {
      if (alreadyFav) {
        await axios.delete(`https://y-balash.vercel.app/api/favorites/remove/${productId}`, {
          headers: { Authorization: getToken() }
        });
        toast.success("Removed from favorites");
      } else {
        await axios.post("https://y-balash.vercel.app/api/favorites/add", {
          itemId: productId
        }, {
          headers: { Authorization: getToken() }
        });
        toast.success("Added to favorites");
      }
      fetchFavorites();
    } catch (error) {
      console.error("Toggle favorite error:", error);
      toast.error("Something went wrong");
    }
  };

  const viewCategories = () => {
    axios.get('https://y-balash.vercel.app/api/images/all', {
      headers: { Authorization: getToken() }
    })
      .then((x) => {
        setGetAllCategories(x.data);
      })
      .catch((error) => {
        console.log(error);
        toast.error("Unauthorized or expired session");
      });
  };

  const handleAddProduct = async (id) => {
    try {
      const res = await axios.post('https://y-balash.vercel.app/api/cart/add', {
        itemId: id,
        quantity: 1
      }, {
        headers: { Authorization: getToken() }
      });

      if (res.status === 200) {
        toast.success("Item added to cart");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding to cart");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-4">
        <h2 className="text-[#1C573E] text-xl font-poppins text-[36px] pl-2 font-bold mb-4">You might need</h2>
        <Link href="/DiaryProduct" className="text-[24px] underline flex items-center font-poppins text-[#1C573E] ">
          See more
        </Link>
      </div>

      {getAllCategories ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mx-6 my-4 gap-6">
          {getAllCategories.map((product) => (
            <div className="flex flex-col items-center p-6 gap-5 bg-[#FFFFFF]" key={product._id}>
              <Link href={`/productdetails/${product._id}`}>
                <img className='h-[226px] w-[226px] object-contain bg-[#E5E7EB]' src={product.imageUrl} alt={product.name} />
                <div className='flex justify-between items-center gap-20 mt-[15px]'>
                  <h3 className="text-[#1C573E] font-poppins font-semibold text-[16px] truncate">{product.name}</h3>
                  <button onClick={(e) => { e.preventDefault(); toggleFavorite(product._id); }}>
                    {isFavorite(product._id) ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-500" />
                    )}
                  </button>
                </div>
              </Link>
              <div className="text-center mb-3 gap-3 flex items-center justify-center">
                <h5 className="text-sm text-gray-500 line-through">
                  {product.originalPrice} EGP
                </h5>
                <h5 className="text-[#FFCD29] font-bold text-base">
                  {product.discountedPrice} EGP
                </h5>
              </div>
              <h5 className="text-center text-[#1C573E] font-bold text-sm mb-3">{product.restaurant.name}</h5>
              <button
                onClick={() => handleAddProduct(product._id)}
                className="w-full h-[35px] flex items-center justify-center bg-[#1C573E] text-[#FFFFFF] rounded mt-3"
              >
                +
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
          />
        </div>
      )}
    </>
  );
}
