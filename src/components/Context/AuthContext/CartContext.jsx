// 'use client';

// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const cartContext = createContext();

// export default function CartContextProvider({ children }) {
//     const [allItems, setAllItems] = useState(null);
//     const [quantity, setQuantity] = useState(0);
//     const [totalPrice, setTotalPrice] = useState(0);

//     async function addProduct(productId, numOfCart) {
//         return axios.post('https://y-balash.vercel.app/api/cart/add', {
//             "itemId": productId,
//             "quantity": numOfCart,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             },
//         })
//         .then((response) => {
//             getUserCart();
//             return true;
//         })
//         .catch((error) => {
//             console.log(error);
//             return false;
//         });
//     }

//     async function updateCart(id, newCount) {
//         return axios.put('https://y-balash.vercel.app/api/cart/update', {
//             "itemId": id,
//             "quantity": newCount,
//         }, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`
//             },
//         })
//         .then((response) => {
//             getUserCart();
//             return true;
//         })
//         .catch((error) => {
//             console.log(error);
//             return false;
//         });
//     }

//     function getUserCart() {
//         axios.get('https://y-balash.vercel.app/api/cart', {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             }
//         })
//         .then((response) => {
//             setQuantity(response.data.items.quantity);
//             setAllItems(response.data.items);
//             return true;
//         })
//         .catch((error) => {
//             console.log(error);
//             return false;
//         });
//     }

//     async function deleteProduct(id) {
//         return axios.delete(`https://y-balash.vercel.app/api/cart/remove/${id}`, {
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('token')}`,
//             }
//         })
//         .then((response) => {
//             setQuantity(response?.data?.items?.quantity);
//             setAllItems(response?.data?.items);
//             return true;
//         })
//         .catch((error) => {
//             console.log(error);
//             return false;
//         });
//     }

//     useEffect(() => {
//         getUserCart();
//     }, []);

//     return (
//         <cartContext.Provider value={{
//             addProduct,
//             allItems,
//             quantity,
//             updateCart,
//             setAllItems,
//             getUserCart,
//             deleteProduct,
//         }}>
//             {children}
//         </cartContext.Provider>
//     );
// }



'use client';

import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [allItems, setAllItems] = useState([]);
  const [quantity, setQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;


  async function addProduct(productId, numOfCart) {
    try {
      await axios.post('https://y-balash.vercel.app/api/cart/add', {
        itemId: productId,
        quantity: numOfCart,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await getUserCart();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function updateCart(id, newCount) {
    try {
      await axios.put('https://y-balash.vercel.app/api/cart/update', {
        itemId: id,
        quantity: newCount,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await getUserCart();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function getUserCart() {
    try {
      const response = await axios.get('https://y-balash.vercel.app/api/cart', {
        headers: { Authorization: `Bearer ${token}` }
      });

      const items = response.data.items || [];
      setAllItems(items);

      // حساب الكمية الكلية
      const totalQty = items.reduce((acc, item) => acc + item.quantity, 0);
      setQuantity(totalQty);

      // حساب السعر الكلي
      const totalPriceCalc = items.reduce((acc, item) => {
  const priceStr = item?.itemId?.price ?? '';
  const quantity = item?.quantity ?? 0;
  const priceNum = parseFloat(priceStr.toString().replace(/[^\d.]/g, "")) || 0;
  return acc + priceNum * quantity;
}, 0);

      setTotalPrice(totalPriceCalc);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`https://y-balash.vercel.app/api/cart/remove/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await getUserCart();
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    getUserCart();
  }, []);

  return (
    <cartContext.Provider value={{
      addProduct,
      allItems,
      quantity,
      totalPrice,
      updateCart,
      getUserCart,
      deleteProduct,
    }}>
      {children}
    </cartContext.Provider>
  );
}
