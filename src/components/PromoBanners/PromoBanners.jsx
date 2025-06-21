// components/PromoBanners.js
import React, { useContext, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cartContext } from '../Context/AuthContext/CartContext';
import { FallingLines } from 'react-loader-spinner';
import axios from 'axios';
import { FaRegHeart, FaHeart, FaBoxArchive } from "react-icons/fa6";
import { CiCreditCard1 } from "react-icons/ci";
import AllItems from '../AllItems/AllItems';
import { toast } from 'react-hot-toast';

const PromoBanners = () => {
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
            categoryId: "6790c50f7b560c31cdb96907"
        })
            .then((x) => {
                setGetAllCategories(x.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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

    return <>
        {/* البانرات */}
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Banner 1 */}
                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                    <Image src="/glass.jpg" alt="Fresh Milk" layout="fill" objectFit="cover" quality={100} />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="relative h-full flex flex-col justify-center items-start p-6 text-white">
                        <div className="text-2xl font-bold">100% Fresh</div>
                        <div className="text-xl mt-2">Cow Milk</div>
                        <div className="mt-4">Starting on 50 EGP</div>
                        <Link href="/DiaryProduct" className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">Shop Now →</Link>
                    </div>
                </div>
                {/* Banner 2 */}
                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                    <Image src='/water.jpg' alt="Drinks Sale" layout="fill" objectFit="cover" quality={100} />
                    <div className="relative h-full flex flex-col justify-center items-start p-6 text-white">
                        <div className="text-2xl font-bold ml-[240px]">DRINK SALE</div>
                        <div className="text-xl mt-2 ml-[240px]">Water & Soft Drink</div>
                        <Link href="/BeveragesProducts" className="mt-10 ml-[240px] bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">Shop Now →</Link>
                    </div>
                </div>
                {/* Banner 3 */}
                <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
                    <Image src="/breakfast.jpg" alt="Quick Breakfast" layout="fill" objectFit="cover" quality={100} />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="relative h-full flex flex-col justify-center items-start p-6 text-white">
                        <div className="text-2xl font-bold ml-[240px]">100% Organic</div>
                        <div className="text-xl mt-2 ml-[240px]">Quick Breakfast</div>
                        <div className="mt-4 ml-[240px]">Starting on 50 EGP</div>
                        <Link href="/Bakery" className="mt-6 ml-[240px] bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">Shop Now →</Link>
                    </div>
                </div>
            </div>
        </div>

        {/* Best Selling */}
        <div className="flex items-center justify-between px-4">
            <h2 className="text-[#1C573E] text-xl font-poppins text-[36px] pl-2 font-bold mb-4">Best Selling</h2>
            <Link href="/DessertsProducts" className="text-[24px] underline flex items-center font-poppins text-[#1C573E] ">See more</Link>
        </div>

        {getAllCategories ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 mx-6 my-4 gap-6">
                {getAllCategories.map((product) => (
                    <div className="flex flex-col items-center p-6 gap-5 bg-[#FFFFFF]" key={product._id}>
                        <Link href={`/productdetails/${product._id}`}>
                            <img className='h-[226px] w-[226px] object-contain bg-[#E5E7EB]' src={product.imageUrl} alt={product.name} />
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
                <FallingLines color="#4fa94d" width="100" visible={true} ariaLabel="falling-circles-loading" />
            </div>
        )}

        {/* عروض */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mx-8 mt-8 mb-20">
            <div className="w-full md:w-1/2 h-[200px] rounded-3xl">
                <div className='bg-[#0F4273] rounded-3xl p-4'>
                    <button className="bg-[#A6E4E1] rounded-xl flex items-center py-2 px-6 gap-3 ">
                        <FaBoxArchive className='text-[#0F4273]' />
                        <h6 className="font-inter font-medium text-[#0F4273]">Free delivery</h6>
                    </button>
                    <div className="flex items-center justify-between">
                        <h1 className='font-inter font-bold text-2xl text-[#AAE5E6]'>
                            Get up to 50% off <br />
                            Delivery by 12:15pm <br />
                            Fast and free
                        </h1>
                        <Image className='md:w-[200px] md:h-[170px]' src='/removebg.png' alt="" width={400} height={400} />
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/2 h-[200px] rounded-3xl">
                <div className='bg-[#A43D22] rounded-3xl p-4'>
                    <button className="bg-[#F1C046] flex items-center rounded-xl py-2 px-6 gap-3">
                        <CiCreditCard1 className='text-[#9F3820] text-[20px]' />
                        <h6 className="font-inter font-medium text-[#9F3820]">Membership Card</h6>
                    </button>
                    <div className="flex items-center justify-between">
                        <h1 className='font-inter font-bold text-2xl text-[#F3BE49]'>
                            You can enjoy a 5% <br />
                            discount using our <br />
                            health card
                        </h1>
                        <Image className='md:w-[200px] md:h-[170px]' src='/clock.png' alt="" width={400} height={400} />
                    </div>
                </div>
            </div>
        </div>

        <AllItems />
    </>;
};

export default PromoBanners;
