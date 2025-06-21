"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";

const RequestPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    try {
      const res = await axios.post("/api/request-seller", { email, phone, message });

      if (res.status === 200 && res.data.success) {
        setSuccess("Seller request submitted successfully!");
        setEmail("");
        setPhone("");
        setMessage("");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(res.data.message || "Failed to submit request");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center lg:p-20 p-8">
      <div className="bg-white px-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex justify-center">
          <Image
            src="/logo2.png"
            alt="yKaash Logo"
            width={150}
            height={20}
            priority
            style={{ width: "140px" }}
          />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-Main">Join Y-Balash as a seller</h2>
        {success && <p className="text-green-500 mb-4">{success}</p>}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-left text-sm font-medium text-[#374151] ml-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border-[1px] border-[#E5E7EB] rounded-lg focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="phone"
              className="block text-left text-sm font-medium text-[#374151] ml-1 mb-1"
            >
              Phone
            </label>
            <input
              id="phone"
              placeholder="Enter your Phone"
              className="w-full px-3 py-2 border-[1px] border-[#E5E7EB] rounded-lg focus:outline-none"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-left text-sm font-medium text-[#374151] ml-1 mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Tell us about your business"
              className="w-full px-3 py-2 min-h-[100px] border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1C573E] resize-y"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-2 bg-Main text-white rounded-lg">
            Request Access
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPage;
