"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// import { TileLayer, Marker } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";
import NavbarHome from "@/components/NavbarHome/NavbarHome";
// import { Link } from "lucide-react";
import Link from 'next/link';



// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: new URL("leaflet/dist/images/marker-icon-2x.png", import.meta.url).href,
//   iconUrl: new URL("leaflet/dist/images/marker-icon.png", import.meta.url).href,
//   shadowUrl: new URL("leaflet/dist/images/marker-shadow.png", import.meta.url).href,
// });

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

  const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDU0YjFlZmQ3OTIwODE3ZDllYmI5YyIsImlhdCI6MTc0ODg2MDE5NiwiZXhwIjoxNzUxNDUyMTk2fQ.0fkUoakCkGAv4Shtp7Pz2BYkZ87RHB7wb02xOENSLnA';

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const lat = position.coords.latitude;
//           const lng = position.coords.longitude;
//           setCoordinates({ lat, lng });

//           try {
//             const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`);
//             setAddress(res.data.display_name);
//           } catch (err) {
//             setAddress("Unknown location");
//           }
//         },
//         (error) => {
//           console.error("Geolocation error:", error);
//         }
//       );
//     }
//   }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "https://y-balash.vercel.app/api/delivery/add-address",
        formData,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
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
              // Authorization: localStorage.getItem("token"),
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

        <div className=" rounded-lg shadow-lg flex flex-col lg:flex-row gap-8 p-6 w-[60%] lg:w-[50%]">
          <form onSubmit={handleSubmit} className="flex-1 grid gap-4">
            <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E] " />
            <input type="tel" name="mobileNumber" placeholder="Mobile Number" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="streetName" placeholder="Street Name" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="buildingNameNo" placeholder="Building Name/No" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="cityArea" placeholder="City Area" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="governorate" placeholder="Governorate" onChange={handleChange} required className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            <input type="text" name="nearestLandmark" placeholder="Nearest Landmark" onChange={handleChange} className="p-3 border rounded-md bg-[#FFFFFF] text-[#1C573E]" />
            
            
            <Link href='/Payment' type="submit" className=" block w-full py-3 rounded-full text-white hover:bg-[#14432D] bg-[#1C573E] transition text-center">Place Order</Link>
            
            {message && <p className="text-green-700 font-semibold text-center">{message}</p>}
          </form>

          {/* {coordinates && (
            <div className="h-[300px] w-full lg:w-[300px]">
              <MapContainer center={[coordinates.lat, coordinates.lng]} zoom={15} scrollWheelZoom={false} className="h-full w-full rounded-md">
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[coordinates.lat, coordinates.lng]} />
              </MapContainer>
            </div>
          )} */}
        </div>
      </div>
      
    </>
  );
}