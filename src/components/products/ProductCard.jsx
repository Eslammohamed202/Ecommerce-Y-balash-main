// 'use client';

// import Image from 'next/image';
// import React, { useContext, useEffect, useState } from 'react';
// import { FiEdit } from 'react-icons/fi';
// import { RiDeleteBin6Line } from 'react-icons/ri';
// import { useRouter } from 'next/navigation';
// import { ProductContext } from '@/app/utils/ProductContext';

// const ProductCard = () => {
//   const { filteredProducts, deleteProduct, products } = useContext(ProductContext);
//   const [saved, setSaved] = useState(false); // لتعريف setSaved
//   const router = useRouter();

//   // حفظ المنتجات في localStorage عند التغيير
//   useEffect(() => {
//     if (typeof window !== 'undefined' && products.length > 0) {
//       localStorage.setItem('products', JSON.stringify(products));
//       setSaved(true);
//     }
//   }, [products]);

//   // تحميل المنتجات من localStorage عند تحميل الصفحة
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const stored = localStorage.getItem('products');
//       if (stored) {
//         try {
//           const parsed = JSON.parse(stored);
//           if (Array.isArray(parsed)) {
//             console.log('✅ Loaded products from localStorage:', parsed);
//             // هنا يمكن إرسال البيانات إلى السياق إذا أردت
//           }
//         } catch (error) {
//           console.error('❌ Failed to parse localStorage products:', error);
//         }
//       }
//     }
//   }, []);

//   const handleEdit = (id) => {
//     if (id) {
//       router.push(`/edit-product/${id}`);
//     } else {
//       alert('Invalid product ID');
//     }
//   };

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       deleteProduct(id);
//       const updated = products.filter((p) => p.id !== id);
//       localStorage.setItem('products', JSON.stringify(updated));
//     }
//   };

//   return (
//     <div className="flex container lg:mt-12 mt-6 lg:mb-12 mb-6 flex-wrap items-center justify-center gap-4">
//       {filteredProducts.length === 0 ? (
//         <div className="w-full text-center py-8">
//           {filteredProducts === products ? 'Loading products...' : 'No products match your search'}
//         </div>
//       ) : (
//         filteredProducts.map((product) => (
//           <div
//             key={product.id}
//             className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs mx-auto"
//           >
//             <div className="flex justify-between items-start mb-4">
//               <input type="checkbox" className="mt-1" />
//               <span
//                 className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
//                   product.status === 'active'
//                     ? 'bg-green-100 text-green-800'
//                     : 'bg-red-100 text-red-800'
//                 }`}
//               >
//                 {product.status === 'active' ? 'In Stock' : 'Out of Stock'}
//               </span>
//             </div>

//             <div className="flex justify-center">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={200}
//                 height={150}
//                 className="object-contain max-h-36"
//               />
//             </div>

//             <div className="mt-4 space-y-1 text-start">
//               <h3 className="text-Main font-semibold text-lg">{product.name}</h3>
//               <p className="text-gray-500 text-sm">{product.description}</p>
//               <div className="flex justify-between items-center mt-2 px-2">
//                 <span className="text-Main font-bold">{product.price}</span>
//                 <span className="text-gray-500 text-sm">{product.stock} units</span>
//               </div>
//             </div>

//             <div className="flex justify-between gap-2 mt-4">
//               <button
//                 onClick={() => handleEdit(product.id)}
//                 className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-1 text-sm hover:bg-gray-50"
//               >
//                 <FiEdit className="text-[16px]" /> Edit
//               </button>
//               <button
//                 onClick={() => handleDelete(product.id)}
//                 className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-1 text-sm hover:bg-gray-50"
//               >
//                 <RiDeleteBin6Line className="text-[16px]" /> Delete
//               </button>
//             </div>
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default ProductCard;



'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [restaurantId, setRestaurantId] = useState('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // ✅ Get restaurantId from token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const id = payload?.id;
      setRestaurantId(id);
    } catch (err) {
      console.error('Error decoding token:', err);
    }
  }, []);

  // ✅ Fetch products from API
  useEffect(() => {
    if (!restaurantId) return;

    axios
      .get('https://y-balash.vercel.app/api/images/all')
      .then((res) => {
        const filtered = res.data.filter(
          (item) => item.restaurant === restaurantId
        );
        setProducts(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch products:', err);
        setLoading(false);
      });
  }, [restaurantId]);

  const handleEdit = (id) => {
    router.push(`/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized');
      return;
    }

    const confirm = window.confirm('Are you sure you want to delete this product?');
    if (!confirm) return;

    try {
      const res = await fetch(`https://y-balash.vercel.app/api/images/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Product deleted');
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting product');
    }
  };

  return (
    <div className="flex container lg:mt-12 mt-6 lg:mb-12 mb-6 flex-wrap items-center justify-center gap-4">
      {loading ? (
        <div className="w-full text-center py-8">Loading products...</div>
      ) : products.length === 0 ? (
        <div className="w-full text-center py-8">No products found</div>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs mx-auto"
          >
            <div className="flex justify-between items-start mb-4">
              <input type="checkbox" className="mt-1" />
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                parseInt(product.quantity) > 0
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {parseInt(product.quantity) > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex justify-center">
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={200}
                height={150}
                className="object-contain max-h-36"
              />
            </div>

            <div className="mt-4 space-y-1 text-start">
              <h3 className="text-Main font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <div className="flex justify-between items-center mt-2 px-2">
                <span className="text-Main font-bold">{product.price} EGP</span>
                <span className="text-gray-500 text-sm">{product.quantity} units</span>
              </div>
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={() => handleEdit(product._id)}
                className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-1 text-sm hover:bg-gray-50"
              >
                <FiEdit className="text-[16px]" /> Edit
              </button>
              <button
                onClick={() => handleDelete(product._id)}
                className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-1 text-sm hover:bg-gray-50"
              >
                <RiDeleteBin6Line className="text-[16px]" /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductCard;
