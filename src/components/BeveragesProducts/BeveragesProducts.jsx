'use client';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cartContext } from '../Context/AuthContext/CartContext';
import { FaRegHeart, FaHeart, FaCarSide } from "react-icons/fa";
import { MdEmojiFoodBeverage } from "react-icons/md";
import NavbarHome from '../NavbarHome/NavbarHome';

export default function BeveragesProducts() {
  const [getAllCategories, setGetAllCategories] = useState(null);
  const { addProduct } = useContext(cartContext);
  const [favorites, setFavorites] = useState([]);

  // ✅ دالة لجلب التوكن ديناميكيًا من localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      return token ? `Bearer ${token}` : "";
    }
    return "";
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
    axios.post('https://y-balash.vercel.app/api/categories/items', {
      categoryId: "6790c799a732af882708e444"
    })
      .then((x) => {
        setGetAllCategories(x.data);
      })
      .catch((error) => {
        console.log(error);
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
      <NavbarHome />

      <div className='py-5 mx-6'>
        <div className='flex gap-5 '>
          <MdEmojiFoodBeverage className='bg-[#E5E7EB] text-[#185C32] p-3 text-6xl rounded-full ' />
          <h2 className='font-poppins font-extrabold text-[30px] text-[#185C32] '>Beverages</h2>
        </div>
        <p className=' py-3 font-poppins font-medium text-[18px] text-[#796E5F] '>
          Sip, refresh, and energize — your favorite drinks, delivered chilled and fast.
        </p>
        <div className=' flex gap-3'>
          <FaCarSide className=' text-[#FFB66C] text-3xl ' />
          <h5 className=' font-poppins font-light text-[14px] text-[#A7A29B] '>In-store delivery • Comical free</h5>
        </div>
      </div>

      {getAllCategories ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mx-6 my-4 gap-6">
          {getAllCategories.map((product) => (
            <div className="flex flex-col items-center justify-between p-6 gap-5 bg-[#FFFFFF]" key={product._id}>
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

              <h5 className="text-center text-[#1C573E] font-bold text-sm mt-[-25px] ">
                {product.restaurant?.name || 'Unknown'}
              </h5>

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
