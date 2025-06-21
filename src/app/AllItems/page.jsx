// src/app/client-home/page.jsx
"use client";
import AllItems from "@/components/AllItems/AllItems";
import AuthContextProvider from "@/components/Context/AuthContext/AuthContext";

export default function ClientHome() {

  return (
    <div>
      
      <AllItems />
     
    </div>
  );
}