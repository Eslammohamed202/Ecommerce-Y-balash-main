"use client";

import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SimilarDetailsProduct from "../SimilarDetailsProduct/SimilarDetailsProduct";
import { FallingLines } from "react-loader-spinner";
import { cartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import NavbarCategory from "../NavbarCategory/NavbarCategory";

export default function ProductDetails() {
  const [allProductDetails, setAllProductDetails] = useState(null);
  const params = useParams();
  const { addProduct } = useContext(cartContext);
  const [online, setOnline] = useState(null);
  const router = useRouter();

  async function handleAddProduct(id) {
    const resFlag = await addProduct(id, 1);
    console.log("resFlag", resFlag);

    if (resFlag) {
      toast.success("Item added to cart");
    } else {
      toast.error("Token is not valid");
    }
  }

  function productDetailsApi(id) {
    console.log("Product ID:", id);
    axios
      .post(`https://y-balash.vercel.app/api/images/item-details, { id }`)
      .then((data) => {
        setAllProductDetails(data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    if (params?.id) {
      productDetailsApi(params.id);
    }
  }, [params?.id]);

  if (!allProductDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  function onlinePayment(e) {
    e.preventDefault();
    axios
      .post(
        "https://y-balash.vercel.app/api/purchases/payment",
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setOnline(res.data);
        window.open(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <NavbarCategory />

      <div
        key={allProductDetails._id}
        className="m-4 md:m-10 flex flex-col md:flex-row items-center justify-between"
      >
        <div className="w-full md:w-1/3 bg-[#F3F5F4] rounded-lg shadow-md overflow-hidden">
          <Image
            src={allProductDetails.imageUrl}
            alt={allProductDetails.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>

        <div className="w-full md:w-[60%] mt-4 md:mt-0 md:ml-6 p-4">
          <h4 className="text-xl md:text-2xl font-semibold text-gray-800">
            {allProductDetails.name}
          </h4>
          <span className="block leading-relaxed text-gray-700">
            {allProductDetails.quantity}
          </span>
          <div className="flex items-center mt-2">
            <i className="fa-solid fa-star text-[#FFCD29] mr-2"></i>
            <p className="text-[#083B35] font-inter text-sm md:text-base">
              4.5 Rating
            </p>
            <span className="font-inter text-[#7B7B7B] text-sm md:text-base">
              (15 reviews)
            </span>
          </div>
          <span className="block mt-3 text-lg md:text-xl font-bold text-gray-900">
            {allProductDetails.price}
          </span>
          <hr className="my-4" />

          <div className="flex items-center justify-start mt-5">
            <button
              onClick={() => handleAddProduct(allProductDetails._id)}
              className="bg-[#EFF3E9] text-[#0B633C] px-6 py-3 rounded-full hover:bg-[#D1E9C5] focus:outline-none focus:ring-2 focus:ring-[#0B633C] focus:ring-opacity-50"
            >
              <i className="fa-solid fa-cart-shopping mr-2"></i>
              Add to cart
            </button>

            <button
              onClick={onlinePayment}
              className="bg-[#BBF572] text-[#0B633C] px-8 py-3 rounded-full ml-4 hover:bg-[#A3E057] focus:outline-none focus:ring-2 focus:ring-[#0B633C] focus:ring-opacity-50"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* <SimilarDetailsProduct /> */}
    </>
  );
}