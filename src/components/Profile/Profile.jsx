'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import NavbarHome from "../NavbarHome/NavbarHome";

const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDU0YjFlZmQ3OTIwODE3ZDllYmI5YyIsImlhdCI6MTc0ODg2MDE5NiwiZXhwIjoxNzUxNDUyMTk2fQ.0fkUoakCkGAv4Shtp7Pz2BYkZ87RHB7wb02xOENSLnA";

export default function Profile() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthday: "",
    gender: "",
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get("https://y-balash.vercel.app/api/user/profile", {
        headers: { Authorization: `Bearer ${TOKEN}` },
      })
      .then((res) => {
        setUser((prev) => ({ ...prev, ...res.data }));
        setImagePreview(res.data.profileImage);
      });
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      // هنا ترسل فقط البيانات التي تريد تحديثها
      const { firstName, lastName, birthday, gender } = user;
      const res = await axios.put(
        "https://y-balash.vercel.app/api/user/update-profile",
        { firstName, lastName, birthday, gender },
        { headers: { Authorization: `Bearer ${TOKEN}` } }
      );
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
    setLoading(false);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const res = await axios.post(
        "https://y-balash.vercel.app/api/user/update-profile-image",
        formData,
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Uploaded image:", res.data);
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      axios
        .delete("https://y-balash.vercel.app/api/user/delete-account", {
          headers: { Authorization: `Bearer ${TOKEN}` },
        })
        .then(() => {
          alert("Account deleted successfully.");
          // يمكنك توجيه المستخدم أو تسجيل الخروج هنا
        })
        .catch((err) => {
          console.error(err);
          alert("An error occurred while deleting the account.");
        });
    }
  };

  return <>
  
  <NavbarHome />

  <div className="max-w-2xl mx-auto p-8 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold text-green-700 mb-4">Account Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <input
            type="text"
            placeholder="First name"
            value={user.firstName || ""}
            onChange={(e) => setUser({ ...user, firstName: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Last name"
            value={user.lastName || ""}
            onChange={(e) => setUser({ ...user, lastName: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="email"
            disabled
            value={user.email}
            className="w-full bg-gray-100 px-3 py-2 rounded"
          />
          <input
            type="text"
            disabled
            value={user.phone}
            className="w-full bg-gray-100 px-3 py-2 rounded"
          />
          <input
            type="date"
            value={user.birthday || ""}
            onChange={(e) => setUser({ ...user, birthday: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <select
            value={user.gender || ""}
            onChange={(e) => setUser({ ...user, gender: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          {/* زر الحفظ */}
          <button
            onClick={handleSave}
            disabled={loading}
            className="mt-4 w-full bg-[#1C573E] text-white py-2 rounded-full hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="flex flex-col items-center gap-4">
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt="Profile"
              width={150}
              height={150}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-[150px] h-[150px] bg-gray-200 rounded-full" />
          )}

          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm">
            Choose Image
            <input
              type="file"
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
      </div>

      {/* قسم حذف الحساب */}
      <div className="mt-12 bg-[#f9f6ef] p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-1">
          Delete Personal Account
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Don’t need Yabalash any longer? We understand, and appreciate you using our service!
        </p>
        <button
          onClick={handleDeleteAccount}
          className="text-red-600 hover:underline font-medium text-sm"
        >
          Delete Account
        </button>
      </div>
    </div>
  
  </>
}
