"use client";
import React, { useState, useEffect } from 'react';
import { IoCartSharp } from "react-icons/io5";
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineWarning } from 'react-icons/ai';
import NotificationsHeader from '@/components/Notifications/NotificationsHeader';
import Navbar from '@/components/Navbar/Navbar';

// 🕒 Helper: Format timestamp into "Today", "Yesterday", or Date
const getDateGroup = (timestamp) => {
  const date = new Date(timestamp);
  if (isNaN(date)) return "Unknown";
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';
  return date.toLocaleDateString();
};

// 🔔 Helper: Get icon based on notification type
const getNotificationIcon = (type) => {
  switch (type?.toLowerCase()) {
    case 'order':
      return <IoCartSharp className="text-[#2563EB]" />;
    case 'success':
      return <FiCheckCircle className="text-[#059669]" />;
    case 'warning':
      return <AiOutlineWarning className="text-[#D97706]" />;
    default:
      return <IoCartSharp className="text-[#2563EB]" />;
  }
};

const Page = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🚀 Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch('https://y-balash.vercel.app/api/seller/notifications', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0OTM4NDA3MiwiZXhwIjoxNzUxOTc2MDcyfQ.i3gwhJWDJakeuWXspcVd9POGwU8xnhUmh41_C5oRYyk',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        let notificationsArray = Array.isArray(data) ? data : data.notifications || [];

        notificationsArray = notificationsArray.map(notification => ({
          id: notification._id || notification.id || 'unknown-' + Math.random().toString(36).substr(2, 9),
          title: notification.title || notification.type || 'Notification',
          message: notification.message || notification.description || 'No details available',
          timestamp: notification.timestamp || notification.createdAt || new Date().toISOString(),
          type: notification.type || 'order',
          link: notification.link || (notification.orderId ? `/orders/${notification.orderId}` : '#'),
        }));

        setNotifications(notificationsArray);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  // 📅 Group notifications
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const group = getDateGroup(notification.timestamp);
    acc[group] = acc[group] || [];
    acc[group].push(notification);
    return acc;
  }, {});

  // 🧾 UI: Loading
  if (loading) {
    return (
      <div>
        <Navbar />
        <NotificationsHeader />
        <div className="container mx-auto p-4 text-center">Loading...</div>
      </div>
    );
  }

  // ❌ UI: Error
  if (error) {
    return (
      <div>
        <Navbar />
        <NotificationsHeader />
        <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

  // ✅ UI: Render
  return (
    <div>
      <Navbar />
      <NotificationsHeader />
      <div className="container mx-auto p-4">
        <div className="space-y-4">
          {Object.keys(groupedNotifications).length > 0 ? (
            Object.keys(groupedNotifications).map((group) => (
              <div key={group}>
                <h1 className="text-[#4B5563] text-[18px]">{group}</h1>
                {groupedNotifications[group].map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 rounded-lg shadow bg-white flex justify-between items-start mt-4"
                  >
                    <div className="flex items-start">
                      <div className="mr-2 mt-1 p-2 bg-[#DBEAFE] rounded-full">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div>
                        <p className="text-[18px] font-semibold text-[#111827]">{notification.title}</p>
                        <p className="text-xs text-[#4B5563] mb-2">{notification.message}</p>
                        <a href={notification.link} className="text-[#2563EB] text-sm">
                          View Order Details →
                        </a>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No notifications found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
