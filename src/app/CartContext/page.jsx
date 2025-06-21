// src/app/client-home/page.jsx
"use client";

import CartContextProvider from "@/components/Context/AuthContext/CartContext";

export default function ClientHome() {

  return (
    <div>
      
      <CartContextProvider />
     
    </div>
  );
}