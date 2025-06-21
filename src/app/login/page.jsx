// src/app/login/page.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("seller");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      userType: activeTab,
    });

    console.log("SignIn result:", result);

    if (result?.error) {
      setError(result.error);
    } else {
      if (activeTab === "seller") {
        router.push("/");
      } else {
        router.push("/client-home");
      }
    }
  };

  return (
    <div className="flex items-center justify-center p-6 mt-6">
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
        <div className="flex w-full justify-center items-center gap-2 mb-2">
          <button
            className={`w-[130px] py-1 rounded-lg ${activeTab === "seller" ? "bg-Main text-white" : "bg-white text-Main border-[1px]"
              }`}
            onClick={() => setActiveTab("seller")}
          >
            Seller
          </button>
          <button
            className={`w-[130px] py-1 rounded-lg ${activeTab === "client" ? "bg-Main text-white" : "bg-white text-Main border-[1px]"
              }`}
            onClick={() => setActiveTab("client")}
          >
            Client
          </button>
        </div>
        <h2 className="text-2xl font-bold mb-6 text-Main">Login to Your Account</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-left text-sm font-medium text-[#374151] ml-1">
              Email / Username
            </label>
            <input
              type="text"
              id="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border-[1px] border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <label
              htmlFor="password"
              className="block text-left text-sm font-medium text-[#374151] ml-1 mb-1"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border-[1px] border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
          <div className="text-right">
            <a href="#" className="text-sm text-Main">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="w-full py-2 bg-Main text-white rounded-lg">
            Login
          </button>
        </form>
        <div className="my-6 text-gray-600 relative">
          <span>Or continue with</span>
          <div className="w-[125px] h-[1px] bg-gray-400 absolute top-[14px]"></div>
          <div className="w-[125px] h-[1px] bg-gray-400 absolute top-[14px] right-[0px]"></div>
        </div>
        <div className="flex justify-center">
          <button
            className="w-full flex items-center justify-center gap-2 py-2 border-[1px] border-[#E5E7EB] rounded-lg hover:bg-gray-50 lg:max-w-[180px]"
            onClick={() => signIn("google")}
          >
            <FcGoogle className="size-6" />
            Google
          </button>
        </div>
        <p className="mt-4 mb-4 text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link
            href={activeTab === "seller" ? "/request-access" : "/register"}
            className="text-Main font-semibold underline"
          >
            {activeTab === "seller" ? "Request Access" : "Register"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;