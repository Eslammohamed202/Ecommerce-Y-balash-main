"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import NavbarHome from "@/components/NavbarHome/NavbarHome";
import Link from 'next/link';

export default function BillingInformation() {
  const [formData, setFormData] = useState({
    country: "Egypt",
    fullName: "",
    mobileNumber: "",
    streetName: "",
    buildingNameNo: "",
    cityArea: "",
    governorate: "",
    nearestLandmark: ""
  });

  const [coordinates, setCoordinates] = useState(null);
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");

  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        setMessage("❌ No token found. Please login first.");
        return;
      }

      await axios.post(
        "https://y-balash.vercel.app/api/delivery/add-address",
        formData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json"
          }
        }
      );

      if (coordinates && address) {
        await axios.post(
          "https://y-balash.vercel.app/api/location/set-location",
          {
            latitude: coordinates.lat,
            longitude: coordinates.lng,
            address: address
          },
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json"
            }
          }
        );
      }

      setMessage("✅ Address and location sent successfully.");
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to send data.");
    }
  };

  return (
    <>
      <NavbarHome />
      <div className="min-h-screen flex flex-col items-center py-10">
        <h2 className="text-[24px] text-[#1C573E] font-medium font-poppins mb-4">Add New Address</h2>

        <div className="rounded-lg shadow-lg flex flex-col lg:flex-row gap-8 p-6 w-[60%] lg:w-[50%]">
          <form onSubmit={handleSubmit} className="flex-1 grid gap-4">
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="tel" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="streetName" placeholder="Street Name" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="buildingNameNo" placeholder="Building Name/No" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="cityArea" placeholder="City Area" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="governorate" placeholder="Governorate" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="nearestLandmark" placeholder="Nearest Landmark" onChange={handleChange} className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />

            

            <Link
              href="/Payment"
              className="block w-full py-3 rounded-full text-white text-center bg-[#1C573E] mt-2"
            >
              Go to Payment
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
