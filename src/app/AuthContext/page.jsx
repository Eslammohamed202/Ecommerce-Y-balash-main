// src/app/client-home/page.jsx
"use client";
import AuthContextProvider from "@/components/Context/AuthContext/AuthContext";

export default function ClientHome() {

  return (
    <div>
      
      <AuthContextProvider />
     
    </div>
  );
}