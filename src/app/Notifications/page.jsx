"use client";
import React, { useState, useEffect } from 'react';
import { IoCartSharp } from "react-icons/io5";
import { FiCheckCircle } from 'react-icons/fi';
import { AiOutlineWarning } from 'react-icons/ai';
import NotificationsHeader from '@/components/Notifications/NotificationsHeader';
import Navbar from '@/components/Navbar/Navbar';

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

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token not found in localStorage");

        const headers = {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        };

        const [notifRes, lowStockRes] = await Promise.all([
          fetch('https://y-balash.vercel.app/api/seller/notifications', { headers }),
          fetch('https://y-balash.vercel.app/api/seller/low-stock-items', { headers }),
        ]);

        if (!notifRes.ok) throw new Error(`Notif API Error: ${notifRes.status}`);
        if (!lowStockRes.ok) throw new Error(`Low-stock API Error: ${lowStockRes.status}`);

        const notifData = await notifRes.json();
        const lowStockData = await lowStockRes.json();

        let notificationsArray = Array.isArray(notifData) ? notifData : notifData.notifications || [];

        notificationsArray = notificationsArray.map(notification => ({
          id: notification._id || notification.id || 'notif-' + Math.random().toString(36).substr(2, 9),
          title: notification.title || notification.type || 'Notification',
          message: notification.message || notification.description || 'No details available',
          timestamp: notification.timestamp || notification.createdAt || new Date().toISOString(),
          type: notification.type || 'order',
          link: notification.link || (notification.orderId ? `/orders/${notification.orderId}` : '#'),
        }));

        const lowStockNotifications = (lowStockData.items || []).map(item => ({
          id: item._id || 'low-' + Math.random().toString(36).substr(2, 9),
          title: 'Low Stock Alert',
          message: `${item.name} stock is below threshold (${item.quantity} left).`,
          timestamp: new Date().toISOString(),
          type: 'warning',
          link: `/products/${item._id}`,
        }));

        const allNotifications = [...notificationsArray, ...lowStockNotifications];

        setNotifications(allNotifications);
        setLoading(false);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const groupedNotifications = notifications.reduce((acc, notification) => {
    const group = getDateGroup(notification.timestamp);
    acc[group] = acc[group] || [];
    acc[group].push(notification);
    return acc;
  }, {});

  if (loading) {
    return (
      <div>
        <Navbar />
        <NotificationsHeader />
        <div className="container mx-auto p-4 text-center">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Navbar />
        <NotificationsHeader />
        <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>
      </div>
    );
  }

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
                          View Details →
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
