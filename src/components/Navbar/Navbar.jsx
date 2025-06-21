"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import Link from 'next/link';
import { MdKeyboardArrowDown } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { usePathname } from 'next/navigation';
import { signOut } from "next-auth/react";

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const pathname = usePathname();

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    return (
        <div className="">
            <div className="h-[60px] bg-Main w-full flex justify-between items-center px-4 md:px-6 lg:px-8 relative z-50">
                {/* Left div - always visible */}
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            width={96}
                            height={96}
                            className="w-24 h-8 md:w-28 md:h-9 lg:w-32 lg:h-10 object-contain"
                        />
                    </Link>
                </div>

                {/* Links for Desktop (lg and above) */}
                <div className="hidden lg:flex lg:gap-6 items-center text-white">
                    <Link
                        href="/products"
                        className={`font-semibold text-md hover:text-gray-300 transition ${pathname === '/products' ? 'border-b-2 border-white' : ''}`}
                    >
                        Products
                    </Link>
                    <Link
                        href="/orders"
                        className={`font-semibold text-md hover:text-gray-300 transition ${pathname === '/orders' ? 'border-b-2 border-white' : ''}`}
                    >
                        Orders
                    </Link>
                    <Link
                        href="/inventory"
                        className={`font-semibold text-md hover:text-gray-300 transition ${pathname === '/inventory' ? 'border-b-2 border-white' : ''}`}
                    >
                        Inventory
                    </Link>
                    <Link
                        href="/earning"
                        className={`font-semibold text-md hover:text-gray-300 transition ${pathname === '/earning' ? 'border-b-2 border-white' : ''}`}
                    >
                        Earning
                    </Link>
                    <Link
                        href="/Notifications"
                        className={`font-semibold text-md hover:text-gray-300 transition ${pathname === '/Notifications' ? 'border-b-2 border-white' : ''}`}
                    >
                        <IoIosNotifications className='size-6' />
                    </Link>
                </div>

                {/* Dropdown Menu for Mobile and Tablet (below lg) */}
                <div className="lg:hidden relative">
                    <button
                        onMouseEnter={() => setIsDropdownOpen(true)}
                        onMouseLeave={() => setIsDropdownOpen(false)}
                        className="flex items-center text-white focus:outline-none"
                    >
                        <FaBars size={24} />
                    </button>
                    {isDropdownOpen && (
                        <div
                            className="absolute top-12 right-0 bg-Main rounded-lg shadow-lg py-2 w-40 z-50"
                            onMouseEnter={() => setIsDropdownOpen(true)}
                            onMouseLeave={() => setIsDropdownOpen(false)}
                        >
                            <Link href="inventory" className="block px-4 py-2 text-white hover:bg-gray-700 transition">Inventory</Link>
                            <Link href="orders" className="block px-4 py-2 text-white hover:bg-gray-700 transition">Orders</Link>
                            <Link href="products" className="block px-4 py-2 text-white hover:bg-gray-700 transition">Products</Link>
                            <Link href="earning" className="block px-4 py-2 text-white hover:bg-gray-700 transition">Earning</Link>
                            <Link href="" className="block px-4 py-2 text-white hover:bg-gray-700 transition">
                                <IoIosNotifications />
                            </Link>
                        </div>
                    )}
                </div>

                {/* User Profile Section */}
                <div className="relative flex items-center gap-2">
                    <button onClick={toggleUserMenu} className="flex items-center focus:outline-none">
                        <Image
                            src="/user.jpg"
                            alt="User"
                            width={96}
                            height={96}
                            className="w-8 h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full object-cover"
                        />
                        <MdKeyboardArrowDown className="text-white text-lg md:text-xl lg:text-2xl" />
                    </button>

                    {isUserMenuOpen && (
                        <div className="absolute right-0 mt-24 bg-Main rounded-lg shadow-lg py-2 w-36 z-50">
                            <button
                                onClick={() => signOut()}
                                className="block w-full text-left px-4 py-2 text-white  transition"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
