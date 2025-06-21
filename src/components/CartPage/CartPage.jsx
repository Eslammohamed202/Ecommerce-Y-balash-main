// 'use client';

// import { useEffect, useState } from 'react';
// import Image from 'next/image';
// import { toast, Toaster } from 'react-hot-toast';
// import Link from 'next/link';
// import { X } from 'lucide-react';
// import axios from 'axios';
// import NavbarHome from '../NavbarHome/NavbarHome';

// const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDU0YjFlZmQ3OTIwODE3ZDllYmI5YyIsImlhdCI6MTc0ODg2MDE5NiwiZXhwIjoxNzUxNDUyMTk2fQ.0fkUoakCkGAv4Shtp7Pz2BYkZ87RHB7wb02xOENSLnA";

// const axiosInstance = axios.create({
//   baseURL: 'https://y-balash.vercel.app/api',
//   headers: {
//     Authorization: TOKEN,
//   },
// });

// export default function CartPage() {
//   const [cartItems, setCartItems] = useState([]);

//   async function getCartData() {
//     try {
//       const { data } = await axiosInstance.get('/cart');
//       setCartItems(data.items || []);
//     } catch (error) {
//       console.error('Error fetching cart:', error);
//     }
//   }

//   useEffect(() => {
//     getCartData();
//   }, []);

//   const handleRemove = async (itemId) => {
//     try {
//       await axiosInstance.delete(`/cart/remove/${item._id}`);
//       toast.success('Item removed');
//       getCartData();
//     } catch (error) {
//       toast.error('Failed to remove item');
//     }
//   };

//   const handleQuantityChange = async (itemCartId, currentQty, action) => {
//     const newQty = action === 'increase' ? currentQty + 1 : currentQty - 1;
//     if (newQty < 1) return;

//     try {
//       await axiosInstance.put('/cart/update', {
//         itemId: itemCartId,
//         quantity: newQty,
//       });
//       toast.success('Quantity updated');
//       getCartData();
//     } catch (error) {
//       toast.error('Failed to update quantity');
//     }
//   };

//   const totalPrice = cartItems.reduce((acc, item) => {
//     const priceStr = item.itemId.price || "0";
//     const priceNum = parseFloat(priceStr.replace(/[^\d.]/g, "")) || 0;
//     return acc + priceNum * item.quantity;
//   }, 0);

//   return (
//     <>
//       <NavbarHome />
//       <Toaster position="top-center" />
//       <div className="p-8 bg-[#f9f3eb] min-h-screen">
//         <h2 className="text-2xl font-bold text-green-800 mb-6">My Shopping Cart</h2>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           <div className="col-span-2">
//             <div className="bg-white rounded-lg shadow p-4">
//               <div className="grid grid-cols-5 font-semibold text-gray-500 border-b pb-2 mb-4">
//                 <div>PRODUCT</div>
//                 <div>PRICE</div>
//                 <div>QUANTITY</div>
//                 <div>SUBTOTAL</div>
//                 <div></div>
//               </div>

//               {cartItems.map((item) => (
//                 <div
//                   key={item._id}
//                   className="grid grid-cols-5 items-center border-b py-4 text-sm"
//                 >
//                   <div className="flex items-center gap-2">
//                     <Image
//                       src={item.itemId.imageUrl}
//                       alt={item.itemId.name}
//                       width={50}
//                       height={50}
//                       className="rounded"
//                     />
//                     <span>{item.itemId.name}</span>
//                   </div>
//                   <div>{item.itemId.price}</div>
//                   <div className="flex items-center gap-2">
//                     <button
//                       onClick={() =>
//                         handleQuantityChange(item.itemId._id, item.quantity, 'decrease')
//                       }
//                       className="border px-2"
//                       disabled={item.quantity <= 1}
//                     >
//                       -
//                     </button>
//                     <span>{item.quantity}</span>
//                     <button
//                       onClick={() =>
//                         handleQuantityChange(item.itemId._id, item.quantity, 'increase')
//                       }
//                       className="border px-2"
//                     >
//                       +
//                     </button>
//                   </div>
//                   <div>{(parseFloat(item.itemId.price.replace(/[^\d.]/g, "")) * item.quantity).toFixed(2)} EGP</div>
//                   <div className="flex justify-end">
//                     <button
//                       onClick={() => handleRemove(item._id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <div className="w-6 h-6 rounded-full border border-red-500 flex items-center justify-center">
//                         <X size={14} />
//                       </div>
//                     </button>
//                   </div>
//                 </div>
//               ))}

//               <div className="flex justify-between mt-4">
//                 <Link href="/client-home" className="px-4 py-2 bg-gray-100 rounded-full inline-block text-black">
//                   Return to shop
//                 </Link>
//                 <button className="px-4 py-2 bg-gray-200 rounded-full">
//                   Update Cart
//                 </button>
//               </div>
//             </div>

//             <div className="bg-white rounded-lg shadow p-4 mt-6 flex items-center justify-between">
//               <div className="flex items-center gap-2">
//                 <span className="font-semibold text-green-800">Coupon Code</span>
//                 <input
//                   type="text"
//                   placeholder="Enter code"
//                   className="border rounded px-4 py-2"
//                 />
//               </div>
//               <button className="bg-green-800 text-white px-4 py-2 rounded-full">
//                 Apply Coupon
//               </button>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow p-6 h-fit">
//             <h3 className="text-green-800 font-bold text-lg mb-4">Cart Total</h3>
//             <div className="flex justify-between mb-2 text-sm">
//               <span>Subtotal:</span>
//               <span>{totalPrice.toFixed(2)} EGP</span>
//             </div>
//             <div className="flex justify-between mb-2 text-sm">
//               <span>Shipping:</span>
//               <span>Free</span>
//             </div>
//             <div className="flex justify-between font-bold mb-4">
//               <span>Total:</span>
//               <span>{totalPrice.toFixed(2)} EGP</span>
//             </div>
//             <Link href="/BillingInformation" className="block w-full bg-green-800 text-white py-2 text-center rounded-full">
//               Proceed to checkout
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }





'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast, Toaster } from 'react-hot-toast';
import Link from 'next/link';
import { X } from 'lucide-react';
import axios from 'axios';
import NavbarHome from '../NavbarHome/NavbarHome';

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDU0YjFlZmQ3OTIwODE3ZDllYmI5YyIsImlhdCI6MTc0ODg2MDE5NiwiZXhwIjoxNzUxNDUyMTk2fQ.0fkUoakCkGAv4Shtp7Pz2BYkZ87RHB7wb02xOENSLnA";

const axiosInstance = axios.create({
  baseURL: 'https://y-balash.vercel.app/api',
  headers: {
    Authorization: TOKEN,
  },
});

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);

  async function getCartData() {
    try {
      const { data } = await axiosInstance.get('/cart');
      setCartItems(data.items || []);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }

  useEffect(() => {
    getCartData();
  }, []);

  const handleRemove = async (itemId) => {
  try {
    await axiosInstance.delete(`/cart/remove/${itemId}`);
    toast.success("Item removed from cart");
    getCartData();
  } catch (error) {
    console.error("Error removing item:", error.response?.data || error.message);
    toast.error("Failed to remove item from cart");
  }
};

  const handleQuantityChange = async (itemId, currentQty, action) => {
    const newQty = action === 'increase' ? currentQty + 1 : currentQty - 1;
    if (newQty < 1) return;

    try {
      await axiosInstance.put('/cart/update', {
        itemId,
        quantity: newQty,
      });
      toast.success('Quantity updated');
      getCartData();
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceStr = item.itemId.price || "0";
    const priceNum = parseFloat((priceStr || '').toString().replace(/[^\d.]/g, '')) || 0;
    return acc + priceNum * item.quantity;
  }, 0);

  return (
    <>
      <NavbarHome />
      <Toaster position="top-center" />
      <div className="p-8 bg-[#f9f3eb] min-h-screen">
        <h2 className="text-2xl font-bold text-green-800 mb-6">My Shopping Cart</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="grid grid-cols-5 font-semibold text-gray-500 border-b pb-2 mb-4">
                <div>PRODUCT</div>
                <div>PRICE</div>
                <div>QUANTITY</div>
                <div>SUBTOTAL</div>
                <div></div>
              </div>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="grid grid-cols-5 items-center border-b py-4 text-sm"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={item.itemId.imageUrl}
                      alt={item.itemId.name}
                      width={50}
                      height={50}
                      className="rounded"
                    />
                    <span>{item.itemId.name}</span>
                  </div>
                  <div>{item.itemId.price}</div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleQuantityChange(item.itemId._id, item.quantity, 'decrease')
                      }
                      className="border px-2"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleQuantityChange(item.itemId._id, item.quantity, 'increase')
                      }
                      className="border px-2"
                    >
                      +
                    </button>
                  </div>
                  <div>
  {(
    parseFloat((item?.itemId?.price || '').toString().replace(/[^\d.]/g, "")) * (item?.quantity || 0)
  ).toFixed(2)} EGP
</div>

                  <div className="flex justify-end">
                    <button
                      onClick={() => handleRemove(item.itemId._id)}

                      className="text-red-500 hover:text-red-700"
                    >
                      <div className="w-6 h-6 rounded-full border border-red-500 flex items-center justify-center">
                        <X size={14} />
                      </div>
                    </button>
                  </div>
                </div>
              ))}

              <div className="flex justify-between mt-4">
                <Link href="/client-home" className="px-4 py-2 bg-gray-100 rounded-full inline-block text-black">
                  Return to shop
                </Link>
                <button className="px-4 py-2 bg-gray-200 rounded-full">
                  Update Cart
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-800">Coupon Code</span>
                <input
                  type="text"
                  placeholder="Enter code"
                  className="border rounded px-4 py-2"
                />
              </div>
              <button className="bg-green-800 text-white px-4 py-2 rounded-full">
                Apply Coupon
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h3 className="text-green-800 font-bold text-lg mb-4">Cart Total</h3>
            <div className="flex justify-between mb-2 text-sm">
              <span>Subtotal:</span>
              <span>{totalPrice.toFixed(2)} EGP</span>
            </div>
            <div className="flex justify-between mb-2 text-sm">
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between font-bold mb-4">
              <span>Total:</span>
              <span>{totalPrice.toFixed(2)} EGP</span>
            </div>
            <Link href="/BillingInformation" className="block w-full bg-green-800 text-white py-2 text-center rounded-full">
              Proceed to checkout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}


