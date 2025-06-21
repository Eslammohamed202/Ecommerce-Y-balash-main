'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import './globals.css';
import AuthContextProvider from '@/components/Context/AuthContext/AuthContext';
import CartContextProvider from '@/components/Context/AuthContext/CartContext';
import { Toaster } from 'react-hot-toast'; // ← استدعاء Toaster
import { ProductProvider } from './utils/ProductContext';


export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body className="bg-[#F7F2E8]">
        <AuthContextProvider>
          <CartContextProvider>
            <SessionProvider>
              <QueryClientProvider client={queryClient}>
                <ProductProvider>
                  <ProductProvider>
                    {children}
                  </ProductProvider>
                  <Toaster position="top-center" reverseOrder={false} /> {/* ← هنا الإضافة */}
                </ProductProvider>
              </QueryClientProvider>
            </SessionProvider>
          </CartContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}