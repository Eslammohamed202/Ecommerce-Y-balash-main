// lib/api.js

// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0ODEyMzYxOCwiZXhwIjoxNzUwNzE1NjE4fQ.lZ1_nBuc-rxi3lPAx55iDr9kq-3Pj8m0BlJctjuMmlo';

// export const fetchOrdersStats = async () => {
//   const response = await fetch('https://y-balash.vercel.app/api/seller/orders/stats', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch orders stats');
//   }

//   const data = await response.json();
//   return data;
// };

// export const fetchMonthlyEarnings = async () => {
//   const response = await fetch('https://y-balash.vercel.app/api/seller/monthly-earnings', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch monthly earnings');
//   }

//   const data = await response.json();
//   return data;
// };

// export const fetchLowStockCount = async () => {
//   const response = await fetch('https://y-balash.vercel.app/api/seller/low-stock-count', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch low stock count');
//   }

//   const data = await response.json();
//   return data;
// };

// export const fetchProductsStats = async () => {
//   const response = await fetch('https://y-balash.vercel.app/api/seller/products-stats', {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error('Failed to fetch products stats');
//   }

//   const data = await response.json();
//   return data;
// };


// utils/api.js

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const fetchWithAuth = async (url) => {
  const token = getToken();

  if (!token) {
    throw new Error("Token not found in localStorage");
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch from ${url}`);
  }

  const data = await response.json();
  return data;
};

export const fetchOrdersStats = () =>
  fetchWithAuth("https://y-balash.vercel.app/api/seller/orders/stats");

export const fetchMonthlyEarnings = () =>
  fetchWithAuth("https://y-balash.vercel.app/api/seller/simplified-monthly-earnings");

export const fetchLowStockCount = () =>
  fetchWithAuth("https://y-balash.vercel.app/api/seller/low-stock-count");

export const fetchProductsStats = () =>
  fetchWithAuth("https://y-balash.vercel.app/api/seller/products-stats");
