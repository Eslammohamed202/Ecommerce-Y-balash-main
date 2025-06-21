// src/app/client-home/page.jsx
"use client";
import AllItems from "@/components/AllItems/AllItems";
import BannerHome from "@/components/BannerHomeClient/BannerHomeClient";
import DessertsProducts from "@/components/DessertsProducts/DessertsProducts";
import Footer from "@/components/Footer/Footer";
import GetCategories from "@/components/GetCategories/GetCategories";
import NavbarHome from "@/components/NavbarHome/NavbarHome";
import PromoBanners from "@/components/PromoBanners/PromoBanners";
import RestaurantsList from "@/components/RestaurantsList/RestaurantsList";

export default function ClientHome() {

  return (
    <div>
      
      <NavbarHome />
      <BannerHome />
      <GetCategories />
      <RestaurantsList />
      <PromoBanners />
      <Footer />
     
    </div>
  );
}