'use client';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { FallingLines } from 'react-loader-spinner';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { FaRegHeart, FaHeart } from "react-icons/fa";

export default function GetCategories() {
    const [getAllCategories, setGetAllCategories] = useState([]);
    const [favorites, setFavorites] = useState([]);

    const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDU0YjFlZmQ3OTIwODE3ZDllYmI5YyIsImlhdCI6MTc0ODg2MDE5NiwiZXhwIjoxNzUxNDUyMTk2fQ.0fkUoakCkGAv4Shtp7Pz2BYkZ87RHB7wb02xOENSLnA";

    const viewCategories = () => {
        axios.post('https://y-balash.vercel.app/api/categories/items', {
            categoryId: "6790c4ef7b560c31cdb96905"
        })
        .then((res) => setGetAllCategories(res.data))
        .catch(console.error);
    };

    const fetchFavorites = () => {
        axios.get('https://y-balash.vercel.app/api/favorites', {
            headers: { Authorization: token }
        })
        .then((res) => {
            const favoriteIds = res.data.map((fav) => fav.itemId._id);
            setFavorites(favoriteIds);
        })
        .catch(console.error);
    };

    useEffect(() => {
        viewCategories();
        fetchFavorites();
    }, []);

    const toggleFavorite = async (itemId) => {
        const isFav = favorites.includes(itemId);
        try {
            if (isFav) {
                await axios.delete(`https://y-balash.vercel.app/api/favorites/remove/${itemId}`, {
                    headers: { Authorization: token }
                });
                setFavorites(favorites.filter(id => id !== itemId));
            } else {
                await axios.post(`https://y-balash.vercel.app/api/favorites/add`, {
                    itemId: itemId
                }, {
                    headers: { Authorization: token }
                });
                setFavorites([...favorites, itemId]);
            }
        } catch (err) {
            console.error(err);
        }
    };

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
        <div className="flex items-center justify-between mx-6">
            <h1 className="text-3xl font-inter text-[#0B3B36]">Just for you</h1>
            <Link href="/DiaryProduct" className="text-[#1C573E] text-[24px] underline font-poppins">
                See more
            </Link>
        </div>

        {getAllCategories.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mx-6 my-4 gap-6">
                {getAllCategories.map((product) => (
                    <div className="flex flex-col items-center p-6 gap-5 bg-white" key={product._id}>
                        <Link href={`/ProductDetails/${product._id}`}>
                            <img
                                className="h-[226px] w-[226px] object-contain bg-[#E5E7EB]"
                                src={product.imageUrl}
                                alt={product.name}
                            />
                            <div className="flex justify-between items-center gap-20 mt-[15px]">
                                <h3 className="text-[#1C573E] font-poppins font-semibold text-[16px]">
                                    {product.name}
                                </h3>
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
                        </Link>
                        <h5 className="text-center text-[#FFCD29]">{product.price}</h5>
                        <button
                            onClick={() => handleAddProduct(product._id)}
                            className="w-full h-[35px] flex items-center justify-center bg-[#1C573E] text-white rounded mt-3"
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