'use client';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cartContext } from '../Context/AuthContext/CartContext';
import { FaRegHeart, FaHeart, FaCarSide } from "react-icons/fa";
import { GiMilkCarton } from "react-icons/gi";
import NavbarHome from '../NavbarHome/NavbarHome';

export default function DiaryProduct() {
  const [getAllCategories, setGetAllCategories] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const { addProduct } = useContext(cartContext);

  // ✅ جلب التوكن ديناميكيًا من localStorage
  const getToken = () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      return token ? `Bearer ${token}` : "";
    }
    return "";
  };

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
      categoryId: "6790c4ef7b560c31cdb96905"
    })
    .then((x) => setGetAllCategories(x.data))
    .catch((error) => console.log(error));
  };

  useEffect(() => {
    viewCategories();
    fetchFavorites();
  }, []);

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
            {/* <div className="flex items-center justify-between mx-6">
                <h1 className="text-3xl font-inter text-[#0B3B36]">Just for you</h1>
                <button className="text-[#7F2E31]"><i className="fa-solid fa-arrow-right mr-2"></i>see more</button>
            </div> */}
            
            <div className='py-5 mx-6'>
                <div className='flex gap-5 '>
                    <GiMilkCarton className='bg-[#E5E7EB] text-[#185C32] p-3 text-6xl rounded-full ' />
                    <h2 className='font-poppins font-extrabold text-[30px] text-[#185C32] '>Dairy</h2>
                </div>
                <p className=' py-3 font-poppins font-medium text-[18px] text-[#796E5F] '>
                    Browse our fresh, daily-delivered dairy products
                </p>
                <div className=' flex gap-3'>
                    <FaCarSide className=' text-[#FFB66C] text-3xl ' />
                    <h5 className=' font-poppins font-light text-[14px] text-[#A7A29B] '>In-store delivery • Comical free</h5>
                </div>
            </div>

            {getAllCategories ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mx-6 my-4 gap-6">
                          {getAllCategories.map((product) => (
                            <div
                              key={product._id}
                              className="bg-white flex flex-col justify-between p-4 rounded shadow min-h-[350px] max-h-[350px]"
                            >
                              <Link href={`/ProductDetails/${product._id}`} className="flex flex-col items-center h-full">
                                <img
                                  src={product.imageUrl}
                                  alt={product.name}
                                  className="h-[160px] w-full object-contain bg-gray-100 rounded mb-3"
                                />
                                <div className="flex justify-between items-center w-full mb-2">
                                  <h3 className="text-[#1C573E] font-semibold text-sm truncate w-[80%]">{product.name}</h3>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      toggleFavorite(product._id);
                                    }}
                                  >
                                    {favorites.includes(product._id) ? (
                                      <FaHeart className="text-red-500" />
                                    ) : (
                                      <FaRegHeart />
                                    )}
                                  </button>
                                </div>
                                <div className="text-center mb-3 gap-3 flex items-center justify-center">
                                    <h5 className="text-sm text-gray-500 line-through">
                                        {product.originalPrice} EGP
                                    </h5>
                                    <h5 className="text-[#FFCD29] font-bold text-base">
                                        {product.discountedPrice} EGP
                                    </h5>
                                </div>
                
                                <h5 className="text-center text-[#1C573E] font-bold text-sm mb-3">{product.restaurant.name}</h5>
                              </Link>
                              <button
                                onClick={() => handleAddProduct(product._id)}
                                className="w-full py-2 bg-[#1C573E] text-white rounded"
                              >
                                +
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex justify-center items-center h-screen">
                          <FallingLines color="#4fa94d" width="100" visible={true} />
                        </div>
                      )}
        </>
    );
}