// src/app/register/page.jsx
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    setIsLoading(true);

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Sending POST request to /api/auth/signup with data:", { email, phone, password });
      const res = await axios.post("/api/auth/signup", {
        email,
        phone,
        password,
        confirmPassword,
      });

      console.log("API response:", res);

      if (res.status === 200 && res.data.success) {
        setSuccess("Registration successful! Redirecting to login...");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          console.log("Attempting to redirect to /login...");
          router.push("/login");
        }, 2000);
      } else {
        setError(res.data.message || "Failed to register");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
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
        <h2 className="text-2xl font-bold mb-6 text-Main">Register as a Client</h2>
        {success && (
          <div>
            <p className="text-green-500 mb-4">{success}</p>
            <button
              onClick={() => {
                console.log("Manual redirect to /login clicked");
                router.push("/login");
              }}
              className="w-full py-2 bg-Main text-white rounded-lg"
            >
              Go to Login
            </button>
          </div>
        )}
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {!success && (
          <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-left text-sm font-medium text-[#374151] ml-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border-[1px] border-[#E5E7EB] rounded-lg focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-left text-sm font-medium text-[#374151] ml-1">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Enter your phone"
                className="w-full px-3 py-2 border-[1px] border-[#E5E7EB] rounded-lg focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                disabled={isLoading}
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
                className="w-full px-3 py-2 border-[1px] border-[#E5E7EB] rounded-lg focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-left text-sm font-medium text-[#374151] ml-1 mb-1"
              >
                Confirm Password
              </label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full px-3 py-2 border-[1px] border-[#E5E7EB] rounded-lg focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={isLoading}
              />
              <div
                className="absolute right-3 top-9 cursor-pointer text-gray-500"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-Main text-white rounded-lg disabled:bg-gray-400"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;