"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaRocketchat } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import { signOut } from "next-auth/react";
import { IoCartOutline } from "react-icons/io5";
import { FaHome, FaStoreAlt, FaRegUser } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { BsCart3 } from "react-icons/bs";
import { FaHeadset } from "react-icons/fa";


export default function NavbarHome() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null);
  const [searchTerms, setSearchTerms] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  async function handleSearch(e) {
    const term = e.target.value;
    setSearchTerms(term);
    if (term.trim() === "") return setSearchResults([]);

    try {
      const res = await axios.get(
        `https://y-balash.vercel.app/api/images/search?name=${term}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search error:", err);
      setSearchResults([]);
    }
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      <nav className="w-full px-4 py-4">
        <div className="bg-green-800 flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl">
          {/* Sidebar & Logo */}
          <div className="cursor-pointer flex items-center mb-10 md:mb-0">
            <div>
              <div onClick={toggleMenu} className="w-8 h-6 flex flex-col justify-between cursor-pointer m-4">
                <div className="h-1 bg-white rounded" />
                <div className="h-1 bg-white rounded" />
                <div className="h-1 bg-white rounded" />
              </div>

              <div
                ref={sidebarRef}
                className={`fixed top-0 left-0 h-full w-64 bg-white transition-transform duration-300 z-20 ${
                  isOpen ? "translate-x-0" : "-translate-x-64"
                }`}
              >
                <div className="flex flex-col items-start p-4">
                  <Link href="/client-home">
                    <Image
                      src="/logoFresh.png"
                      alt="Logo"
                      width={115}
                      height={115}
                      className="mx-auto block w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
                    />
                  </Link>

                  <Link href="/client-home" className="hover:bg-[#6C7072] hover:text-[#1C573E] hover:rounded-full hover:w-full flex items-center justify-center gap-3 p-[5px] text-[#0F0F0F]">
                    <FaHome className="w-[24px] h-[24px] text-current" />
                    <span className="py-3 font-inter font-medium text-[18px] w-full text-current">Home</span>
                  </Link>

                  <Link href="/client-home" className="hover:bg-[#6C7072] hover:text-[#1C573E] hover:rounded-full hover:w-full flex items-center justify-center gap-3 p-[5px] text-[#0F0F0F]">
                    <FaStoreAlt className="w-[24px] h-[24px] text-current" />
                    <span className="py-3 font-inter font-medium text-[18px] w-full text-current">Stores</span>
                  </Link>

                  <Link href="/Favorite" className="hover:bg-[#6C7072] hover:text-[#1C573E] hover:rounded-full hover:w-full flex items-center justify-center gap-3 p-[5px] text-[#0F0F0F]">
                    <CiHeart className="w-[24px] h-[24px] text-current hover:text-[red]" />
                    <span className="py-3 font-inter font-medium text-[18px] w-full text-current">Wishlist</span>
                  </Link>

                  <Link href="/CartPage" className="hover:bg-[#6C7072] hover:text-[#1C573E] hover:rounded-full hover:w-full flex items-center justify-center gap-3 p-[5px] text-[#0F0F0F]">
                    <BsCart3 className="w-[24px] h-[24px] text-current" />
                    <span className="py-3 font-inter font-medium text-[18px] w-full text-current">Cart</span>
                  </Link>

                  <Link href="/Profile" className="hover:bg-[#6C7072] hover:text-[#1C573E] hover:rounded-full hover:w-full flex items-center justify-center gap-3 p-[5px] text-[#0F0F0F]">
                    <FaRegUser className="w-[24px] h-[24px] text-current" />
                    <span className="py-3 font-inter font-medium text-[18px] w-full text-current">Profile</span>
                  </Link>
                </div>
              </div>
            </div>
            <Link href="/home">
              <Image
                src="/logo.png"
                alt="Logo"
                width={96}
                height={96}
                className="w-24 h-8 md:w-28 md:h-9 lg:w-32 lg:h-10 object-contain"
              />
            </Link>
          </div>

          {/* Search Box */}
          <div className="relative flex-grow ml-[6rem] mr-[20rem]">
            <input
              type="text"
              value={searchTerms}
              onChange={handleSearch}
              placeholder="Search for Grocery, stores, vegetables or meat"
              className="w-full h-12 px-4 rounded-3xl focus:outline-none"
            />
            {searchTerms && (
              <div className="absolute z-10 bg-white border rounded-md mt-2 w-1/2 max-h-60 overflow-y-auto shadow-md">
                {searchResults.length > 0 ? (
                  searchResults.map((item, index) => (
                    <Link
                      key={index}
                      href={`/productdetails/${item._id}`}
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-black"
                      onClick={() => setSearchTerms("")}
                    >
                      <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.price} | {item.quantity}</p>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="px-4 py-2 text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* User Section */}
          <div className="relative flex items-center gap-[1.5rem]">
            <button onClick={toggleUserMenu} className="flex items-center focus:outline-none gap-2">
<div
      onClick={() => router.push('/CartPage')}
      className="cursor-pointer bg-white rounded-full p-3 shadow-md hover:scale-105 transition-transform duration-200"
    >
      <IoCartOutline className="text-[#0E554F] w-8 h-8" />
    </div>              <Image
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
                  className="block w-full text-left px-4 py-2 text-white transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ✅ أيقونة الدعم الثابتة في الزاوية اليمنى */}
      <Link
        href="/Chatbot"
        className="fixed bottom-6 right-6 z-50 bg-green-800 text-white p-4 rounded-full shadow-lg hover:scale-105 transition-transform"
      >
        <FaHeadset size={30} />
      </Link>
    </>
  );
}
