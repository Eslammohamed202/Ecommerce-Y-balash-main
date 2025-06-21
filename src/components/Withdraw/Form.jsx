"use client";
import React, { useState } from "react";
import { FaUniversity, FaMobileAlt, FaPaypal, FaLongArrowAltRight } from "react-icons/fa";

const Form = () => {
  const [amount, setAmount] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("Bank Transfer");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const methodMapping = {
    "Bank Transfer": "bank",
    "Mobile Wallet": "mobile",
    "PayPal": "paypal",
  };

  const handleMethodChange = (method) => {
    setSelectedMethod(method);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }
    if (!accountNumber) {
      setError("Please enter an account number.");
      return;
    }
    if (!accountHolderName) {
      setError("Please enter the account holder's name.");
      return;
    }

    const data = {
      amount: Number(amount),
      method: methodMapping[selectedMethod],
      accountDetails: {
        accountNumber,
        accountHolderName,
      },
    };

    try {
      const response = await fetch("https://y-balash.vercel.app/api/seller/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk"
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccess("Withdrawal request submitted successfully!");
        setAmount("");
        setAccountNumber("");
        setAccountHolderName("");
        setSelectedMethod("Bank Transfer");
      } else {
        setError(result.message || "Failed to submit withdrawal request.");
      }
    } catch (err) {
      setError("An error occurred while submitting the request.");
      console.error(err);
    }
  };

  return (
    <div className="container p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-Main">AMOUNT TO WITHDRAW</label>
          <input
            type="text"
            placeholder="EGP 0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Main"
          />
        </div>

        {/* Withdrawal Method */}
        <div>
          <label className="block text-sm font-medium text-Main">SELECT WITHDRAW METHOD</label>
          <div className="mt-1 flex space-x-2">
            {["Bank Transfer", "Mobile Wallet", "PayPal"].map((method) => (
              <button
                key={method}
                type="button"
                onClick={() => handleMethodChange(method)}
                className={`flex-1 p-2 border rounded-md flex items-center justify-center space-x-2 ${
                  selectedMethod === method ? "border-Main" : "border-gray-300"
                }`}
              >
                {method === "Bank Transfer" && <FaUniversity className="text-gray-600" />}
                {method === "Mobile Wallet" && <FaMobileAlt className="text-gray-600" />}
                {method === "PayPal" && <FaPaypal className="text-gray-600" />}
                <span>{method}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Account Number */}
        <div>
          <label className="block text-sm font-medium text-Main">ACCOUNT NUMBER</label>
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Main"
          />
        </div>

        {/* Account Holder Name */}
        <div>
          <label className="block text-sm font-medium text-Main">ACCOUNT HOLDER NAME</label>
          <input
            type="text"
            value={accountHolderName}
            onChange={(e) => setAccountHolderName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-Main"
          />
        </div>

        {/* Messages */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-500 text-sm">{success}</p>}

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-Main text-white p-3 rounded-md flex items-center justify-center space-x-2 hover:bg-green-900"
        >
          <span>WITHDRAW NOW</span>
          <FaLongArrowAltRight className="size-6" />
        </button>
      </form>
    </div>
  );
};

export default Form;
