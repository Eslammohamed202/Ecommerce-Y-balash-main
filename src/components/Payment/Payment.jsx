"use client";

import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";

const TOKEN =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDU0YjFlZmQ3OTIwODE3ZDllYmI5YyIsImlhdCI6MTc0ODg2MDE5NiwiZXhwIjoxNzUxNDUyMTk2fQ.0fkUoakCkGAv4Shtp7Pz2BYkZ87RHB7wb02xOENSLnA";

// ✅ نثبت التوكن على جميع الطلبات
axios.defaults.headers.common["Authorization"] = TOKEN;

export default function Payment() {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState("Egypt");
  const router = useRouter();

  const countries = [
    "Egypt",
    "Saudi Arabia",
    "UAE",
    "Qatar",
    "Morocco",
    "Algeria",
  ];

  useEffect(() => {
    const getCartData = async () => {
      try {
        const { data } = await axios.get(
          "https://y-balash.vercel.app/api/cart"
        );

        const items = data.items || [];
        const total = items.reduce((sum, el) => {
          const price = parseFloat(el?.itemId?.price || "0");
          return sum + price * el.quantity;
        }, 0);

        const roundedTotal = Math.round(total * 100) / 100;
        setTotalPrice(roundedTotal);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    getCartData();
  }, []);

  const handlePayment = async () => {
    const correctCard = "4242424242424242";
    const correctCvv = "123";

    if (cardNumber === correctCard && cvv === correctCvv) {
      try {
        const amount = Number(totalPrice); // مش بنضرب في 100 عشان الـ backend بيرجع مبلغ زى ما هو

        if (isNaN(amount)) {
          throw new Error("Invalid amount");
        }

        console.log("Sending payment with amount:", amount);

        const { data } = await axios.post(
          "https://y-balash.vercel.app/api/purchases/payment",
          { amount },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("Payment response:", data);

        if (data.clientSecret) {
          Swal.fire("Success", "Payment completed successfully", "success");

          try {
            const cartRes = await axios.get(
              "https://y-balash.vercel.app/api/cart"
            );

            const items = cartRes.data.items || [];

            await Promise.all(
              items.map((item) =>
                axios.delete(
                  `https://y-balash.vercel.app/api/cart/remove/${item.itemId._id}`
                )
              )
            );

            console.log("Cart cleared after payment.");
          } catch (clearError) {
            console.error("Error clearing cart:", clearError);
          }

          setTimeout(() => {
            router.push("/client-home");
          }, 3000);
        } else {
          Swal.fire("Error", "Something went wrong with the payment", "error");
        }
      } catch (error) {
        console.error("Payment error:", error);
        Swal.fire(
          "Error",
          error.response?.data?.message || "Payment API error",
          "error"
        );
      }
    } else if (cvv !== correctCvv) {
      Swal.fire("Error", "Invalid CVV", "error");
    } else {
      Swal.fire("Error", "Invalid Card Number", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4">
        <input
          type="text"
          placeholder="Email Address"
          className="w-full border p-2 rounded-full"
        />

        <div>
          <p className="mb-1 font-medium">Card Number</p>
          <input
            type="text"
            maxLength="16"
            placeholder="1234 5678 9101 1121"
            className="w-full border p-2 rounded"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="w-1/2">
            <p className="mb-1 font-medium">Expiration Date</p>
            <input type="date" className="w-full border p-2 rounded" />
          </div>
          <div className="w-1/2">
            <p className="mb-1 font-medium">CVV</p>
            <input
              type="number"
              placeholder="123"
              className="w-full border p-2 rounded"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="save" />
          <label htmlFor="save">Save card details</label>
        </div>

        <button
          onClick={handlePayment}
          className="w-full bg-[#369585] text-white py-2 rounded-full text-center font-semibold"
        >
          Pay Now (EGP {totalPrice})
        </button>
      </div>
    </div>
  );
}