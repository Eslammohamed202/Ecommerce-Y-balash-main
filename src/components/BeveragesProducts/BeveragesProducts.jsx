'use client';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { cartContext } from '../Context/AuthContext/CartContext';
import { FaRegHeart } from "react-icons/fa6";
import NavbarHome from '../NavbarHome/NavbarHome';
import { MdEmojiFoodBeverage } from "react-icons/md";
import { FaCarSide } from "react-icons/fa6";
import { FaHeart } from 'react-icons/fa';


export default function BeveragesProducts() {
    const [getAllCategories, setGetAllCategories] = useState(null);
    const { addProduct } = useContext(cartContext);
    const [favorites, setFavorites] = useState([]);

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDU0YjFlZmQ3OTIwODE3ZDllYmI5YyIsImlhdCI6MTc0ODg2MDE5NiwiZXhwIjoxNzUxNDUyMTk2fQ.0fkUoakCkGAv4Shtp7Pz2BYkZ87RHB7wb02xOENSLnA";

    useEffect(() => {
        fetchFavorites();
        viewCategories();
    }, []);

    const fetchFavorites = async () => {
        try {
            const res = await axios.get("https://y-balash.vercel.app/api/favorites", {
                headers: { Authorization: token }
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
                    headers: { Authorization: token }
                });
                toast.success("Removed from favorites");
            } else {
                await axios.post("https://y-balash.vercel.app/api/favorites/add", {
                    itemId: productId
                }, {
                    headers: { Authorization: token }
                });
                toast.success("Added to favorites");
            }
            fetchFavorites();
        } catch (error) {
            console.error("Toggle favorite error:", error);
            toast.error("Something went wrong");
        }
    };

    function viewCategories() {
        axios.post('https://y-balash.vercel.app/api/categories/items', {
            categoryId: "6790c799a732af882708e444"
        })
        .then((x) => {
            setGetAllCategories(x.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        viewCategories();
    }, []);

    // async function handleAddProduct(id) {
    //     const resFlag = await addProduct(id, 10000);
    //     if (resFlag) {
    //         toast.success('Item added to cart');
    //     } else {
    //         toast.error("Token is not valid");
    //     }
    // }

    const handleAddProduct = async (id) => {
        try {
            const res = await axios.post('https://y-balash.vercel.app/api/cart/add', {
                itemId: id,
                quantity: 1
            }, {
                headers: {
                    Authorization: token
                }
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
                        <div className="flex flex-col items-center p-6 gap-5 bg-[#FFFFFF]" key={product._id}>
                            <Link href={`/productdetails/${product._id}`}>
                                <img className='h-[226px] w-[226px] object-contain bg-[#E5E7EB]' src={product.imageUrl} alt="name" />
                                <div className='flex justify-between items-center gap-20 mt-[15px]'>
                                    <h3 className="text-[#1C573E] font-poppins font-semibold text-[16px]">{product.name}</h3>
                                    <button onClick={(e) => { e.preventDefault(); toggleFavorite(product._id); }}>
                                                                        {isFavorite(product._id) ? (
                                                                            <FaHeart className="text-red-500" />
                                                                        ) : (
                                                                            <FaRegHeart className="text-gray-500" />
                                                                        )}
                                                                    </button>
                                </div>
                            </Link>
                            <h5 className="text-center block text-[#FFCD29]">{product.price}</h5>
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