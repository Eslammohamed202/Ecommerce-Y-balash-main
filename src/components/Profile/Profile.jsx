'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import NavbarHome from "../NavbarHome/NavbarHome";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Profile() {
  const router = useRouter();
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
  const [isDeleting, setIsDeleting] = useState(false);

  // Get token from localStorage
  const getToken = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  };

  const token = getToken();
  const authHeader = token ? { Authorization: `Bearer ${token}` } : {};

  useEffect(() => {
    if (!token) {
      toast.error("Please login to view profile");
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("https://y-balash.vercel.app/api/user/profile", {
          headers: authHeader
        });
        setUser(prev => ({ ...prev, ...res.data }));
        setImagePreview(res.data.profileImage);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
        if (error.response?.status === 401) {
          router.push('/login');
        }
      }
    };

    fetchProfile();
  }, [token]);

  const handleSave = async () => {
    if (!token) {
      toast.error("Please login to update profile");
      router.push('/login');
      return;
    }

    setLoading(true);
    try {
      const { firstName, lastName, birthday, gender } = user;
      await axios.put(
        "https://y-balash.vercel.app/api/user/update-profile",
        { firstName, lastName, birthday, gender },
        { headers: authHeader }
      );
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = async (e) => {
    if (!token) {
      toast.error("Please login to update profile image");
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    // Validate image size and type
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    if (!file.type.match('image.*')) {
      toast.error("Please upload an image file");
      return;
    }

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload image
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      setLoading(true);
      const res = await axios.post(
        "https://y-balash.vercel.app/api/user/update-profile-image",
        formData,
        {
          headers: {
            ...authHeader,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Profile image updated!");
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error(err.response?.data?.message || "Failed to update image");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!token) return;

    if (!confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    try {
      await axios.delete("https://y-balash.vercel.app/api/user/delete-account", {
        headers: authHeader
      });
      toast.success("Account deleted successfully");
      // Clear local storage and redirect
      localStorage.removeItem('token');
      router.push('/');
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to delete account");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <NavbarHome />

      <div className="max-w-2xl mx-auto p-4 md:p-8 bg-white rounded-xl shadow">
        <h2 className="text-xl font-bold text-green-700 mb-4">Account Settings</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                placeholder="First name"
                value={user.firstName || ""}
                onChange={(e) => setUser({ ...user, firstName: e.target.value })}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                placeholder="Last name"
                value={user.lastName || ""}
                onChange={(e) => setUser({ ...user, lastName: e.target.value })}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                disabled
                value={user.email || ""}
                className="w-full bg-gray-100 px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="text"
                disabled
                value={user.phone || ""}
                className="w-full bg-gray-100 px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Birthday</label>
              <input
                type="date"
                value={user.birthday || ""}
                onChange={(e) => setUser({ ...user, birthday: e.target.value })}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
              <select
                value={user.gender || ""}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="mt-4 w-full bg-[#1C573E] text-white py-2 rounded-full hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile"
                  width={150}
                  height={150}
                  className="rounded-full object-cover aspect-square"
                />
              ) : (
                <div className="w-[150px] h-[150px] bg-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-500">No image</span>
                </div>
              )}
            </div>

            <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm transition-colors">
              {imagePreview ? "Change Image" : "Upload Image"}
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
                disabled={loading}
              />
            </label>
            
            <p className="text-xs text-gray-500 text-center">
              Recommended size: 150x150px<br />
              Max file size: 2MB
            </p>
          </div>
        </div>

        <div className="mt-12 bg-[#f9f6ef] p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-green-800 mb-1">
            Delete Account
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            This will permanently delete your account and all associated data.
          </p>
          <button
            onClick={handleDeleteAccount}
            disabled={isDeleting}
            className="text-red-600 hover:text-red-800 font-medium text-sm disabled:opacity-50"
          >
            {isDeleting ? "Deleting..." : "Delete My Account"}
          </button>
        </div>
      </div>
    </>
  );
}