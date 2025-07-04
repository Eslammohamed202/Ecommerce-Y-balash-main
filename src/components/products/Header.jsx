// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { MdArrowForwardIos } from 'react-icons/md';
// import { FiSearch } from 'react-icons/fi';
// import { FaRegQuestionCircle } from 'react-icons/fa';
// import { IoMdMenu } from 'react-icons/io';
// import Link from 'next/link';
// import axios from 'axios';

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [restaurantId, setRestaurantId] = useState('');
//   const [allProducts, setAllProducts] = useState([]);
//   const resultsRef = useRef();

//   // ✅ استخراج restaurantId من التوكن
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       const extractedId = payload?.id || '';
//       setRestaurantId(extractedId);
//       console.log('🎯 restaurantId:', extractedId);
//     } catch (err) {
//       console.error('Invalid token:', err);
//     }
//   }, []);

//   // ✅ جلب المنتجات الخاصة بالمطعم فقط
//   useEffect(() => {
//     if (!restaurantId) return;

//     axios
//       .get('https://y-balash.vercel.app/api/images/all')
//       .then((res) => {
//         const filtered = res.data.filter((item) => item.restaurant === restaurantId);
//         setAllProducts(filtered);
//       })
//       .catch((err) => {
//         console.error('Error fetching all products:', err);
//       });
//   }, [restaurantId]);

//   // ✅ تنفيذ البحث عند كتابة أي نص
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       const token = localStorage.getItem('token');
//       if (!token || !restaurantId) return;

//       if (searchQuery.trim() !== '') {
//         axios
//           .get(`https://y-balash.vercel.app/api/images/search?name=${searchQuery}&restaurantId=${restaurantId}`)
//           .then((res) => {
//             setSearchResults(res.data || []);
//           })
//           .catch((err) => {
//             console.error('Search error:', err);
//             setSearchResults([]);
//           });
//       } else {
//         setSearchResults([]);
//       }
//     }, 400);

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery, restaurantId]);

//   // ✅ إخفاء قائمة النتائج عند الضغط خارجها
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (resultsRef.current && !resultsRef.current.contains(e.target)) {
//         setSearchQuery('');
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   // ✅ التعامل مع الكتابة في حقل البحث
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   // ✅ حذف المنتج من API
//   const handleDelete = async (productId) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Unauthorized');
//       return;
//     }

//     const confirmDelete = window.confirm('Are you sure you want to delete this product?');
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`https://y-balash.vercel.app/api/images/delete/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert(data.message || 'Product deleted');
//         setSearchResults((prev) => prev.filter((item) => item._id !== productId));
//         setAllProducts((prev) => prev.filter((item) => item._id !== productId));
//       } else {
//         alert(data.message || 'Failed to delete');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert('Error deleting product');
//     }
//   };

//   // ✅ المنتجات المعروضة = نتائج البحث أو كل المنتجات
//   const productsToShow = searchQuery.trim() ? searchResults : allProducts;

//   return (
//     <div className="bg-white pt-6 pb-6">
//       <div className="flex justify-between items-center container mx-auto px-4">
//         <div>
//           <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-4 mb-2">Products</h2>
//           <div className="flex items-center">
//             <Link className="text-gray-700 text-xs" href="/">Dashboard</Link>
//             <MdArrowForwardIos className="text-gray-700 text-xs mx-2" />
//             <Link className="text-gray-700 text-xs" href="/products">Products</Link>
//           </div>
//         </div>
//         <div>
//           <Link href="/add-product">
//             <button className="py-2 px-4 bg-Main text-white rounded-xl text-sm hover:bg-Main/90 transition">
//               Add New Product
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 mt-6">
//         <div className="flex flex-col lg:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm">
//           <div className="relative w-full lg:w-auto">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={handleSearch}
//               className="p-3 pl-10 w-full lg:w-[500px] border border-gray-300 rounded-lg"
//             />
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>

//           <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
//             <select className="p-3 border rounded-lg w-full lg:w-[150px]">
//               <option>All Status</option>
//             </select>
//             <select className="p-3 border rounded-lg w-full lg:w-[150px]">
//               <option>All Categories</option>
//             </select>
//             <select className="p-3 border rounded-lg w-full lg:w-[150px]">
//               <option>Price Range</option>
//             </select>
//             <div className="flex gap-2 items-center justify-center">
//               <button className="p-3 border rounded-lg hover:bg-gray-100">
//                 <FaRegQuestionCircle className="text-gray-500" />
//               </button>
//               <button className="p-3 border rounded-lg hover:bg-gray-100">
//                 <IoMdMenu className="text-gray-500" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {productsToShow.length > 0 && (
//           <div ref={resultsRef} className="mt-4 bg-white p-4 rounded shadow">
//             <p className="font-semibold mb-2 text-gray-800">
//               {searchQuery.trim() ? 'Search Results:' : 'All Products:'}
//             </p>
//             <ul className="space-y-4">
//               {productsToShow.map((product) => (
//                 <li key={product._id} className="flex items-center justify-between gap-4 border-b pb-2">
//                   <div className="flex gap-4 items-center">
//                     <img
//                       src={product.imageUrl}
//                       alt={product.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-medium text-gray-800">{product.name}</p>
//                       <p className="text-xs text-gray-500">SKU: {product.sku || 'N/A'}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;




// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import { MdArrowForwardIos } from 'react-icons/md';
// import { FiSearch } from 'react-icons/fi';
// import { FaRegQuestionCircle } from 'react-icons/fa';
// import { IoMdMenu } from 'react-icons/io';
// import Link from 'next/link';
// import axios from 'axios';

// const Header = () => {
//   const [searchQuery, setSearchQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [allProducts, setAllProducts] = useState([]);
//   const resultsRef = useRef();

//   // ✅ تحميل كل المنتجات بدون فلترة
//   useEffect(() => {
//     axios
//       .get('https://y-balash.vercel.app/api/images/all')
//       .then((res) => {
//         setAllProducts(res.data || []);
//         console.log('📦 All products:', res.data);
//       })
//       .catch((err) => {
//         console.error('Error fetching all products:', err);
//       });
//   }, []);

//   // ✅ تنفيذ البحث عند كتابة أي نص
//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (searchQuery.trim() !== '') {
//         axios
//           .get(`https://y-balash.vercel.app/api/images/search?name=${searchQuery}`)
//           .then((res) => {
//             setSearchResults(res.data || []);
//           })
//           .catch((err) => {
//             console.error('Search error:', err);
//             setSearchResults([]);
//           });
//       } else {
//         setSearchResults([]);
//       }
//     }, 400);

//     return () => clearTimeout(delayDebounce);
//   }, [searchQuery]);

//   // ✅ إخفاء قائمة النتائج عند الضغط خارجها
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (resultsRef.current && !resultsRef.current.contains(e.target)) {
//         setSearchQuery('');
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const handleDelete = async (productId) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Unauthorized');
//       return;
//     }

//     const confirmDelete = window.confirm('Are you sure you want to delete this product?');
//     if (!confirmDelete) return;

//     try {
//       const res = await fetch(`https://y-balash.vercel.app/api/images/delete/${productId}`, {
//         method: 'DELETE',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert(data.message || 'Product deleted');
//         setSearchResults((prev) => prev.filter((item) => item._id !== productId));
//         setAllProducts((prev) => prev.filter((item) => item._id !== productId));
//       } else {
//         alert(data.message || 'Failed to delete');
//       }
//     } catch (err) {
//       console.error('Delete error:', err);
//       alert('Error deleting product');
//     }
//   };

//   const productsToShow = searchQuery && searchQuery.trim() !== '' ? searchResults : allProducts;

//   console.log("👀 Products to show:", productsToShow);
//   console.log("🔍", { searchQuery, searchResults, allProducts, productsToShow });


//   return (
//     <div className="bg-white pt-6 pb-6">
//       <div className="flex justify-between items-center container mx-auto px-4">
//         <div>
//           <h2 className="text-2xl font-bold text-Main mb-2">Products</h2>
//           <div className="flex items-center">
//             <Link className="text-gray-700 text-xs" href="/">Dashboard</Link>
//             <MdArrowForwardIos className="text-gray-700 text-xs mx-2" />
//             <Link className="text-gray-700 text-xs" href="/products">Products</Link>
//           </div>
//         </div>
//         <div>
//           <Link href="/add-product">
//             <button className="py-2 px-4 bg-Main text-white rounded-xl text-sm hover:bg-Main/90 transition">
//               Add New Product
//             </button>
//           </Link>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 mt-6">
//         <div className="flex flex-col lg:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm">
//           <div className="relative w-full lg:w-auto">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={handleSearch}
//               className="p-3 pl-10 w-full lg:w-[500px] border border-gray-300 rounded-lg"
//             />
//             <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//           </div>

//           <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:w-auto">
//             <select className="p-3 border rounded-lg w-full lg:w-[150px]">
//               <option>All Status</option>
//             </select>
//             <select className="p-3 border rounded-lg w-full lg:w-[150px]">
//               <option>All Categories</option>
//             </select>
//             <select className="p-3 border rounded-lg w-full lg:w-[150px]">
//               <option>Price Range</option>
//             </select>
//             <div className="flex gap-2 items-center justify-center">
//               <button className="p-3 border rounded-lg hover:bg-gray-100">
//                 <FaRegQuestionCircle className="text-gray-500" />
//               </button>
//               <button className="p-3 border rounded-lg hover:bg-gray-100">
//                 <IoMdMenu className="text-gray-500" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {productsToShow.length > 0 && (
//           <div ref={resultsRef} className="mt-4 bg-white p-4 rounded shadow">
//             <p className="font-semibold mb-2 text-gray-800">
//               {searchQuery.trim() ? 'Search Results:' : 'All Products:'}
//             </p>
//             <ul className="space-y-4">
//               {productsToShow.map((product) => (
//                 <li key={product._id} className="flex items-center justify-between gap-4 border-b pb-2">
//                   <div className="flex gap-4 items-center">
//                     <img
//                       src={product.imageUrl}
//                       alt={product.name}
//                       className="w-12 h-12 object-cover rounded"
//                     />
//                     <div>
//                       <p className="font-medium text-gray-800">{product.name}</p>
//                       <p className="text-xs text-gray-500">SKU: {product.sku || 'N/A'}</p>
//                     </div>
//                   </div>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                   >
//                     Delete
//                   </button>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Header;



'use client';

import React, { useState, useEffect, useRef } from 'react';
import { MdArrowForwardIos } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { FaRegQuestionCircle } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import Link from 'next/link';
import axios from 'axios';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({});
  const resultsRef = useRef();

  useEffect(() => {
    axios
      .get('https://y-balash.vercel.app/api/images/all')
      .then((res) => {
        setAllProducts(res.data || []);
        console.log('📦 All products:', res.data);
      })
      .catch((err) => {
        console.error('Error fetching all products:', err);
      });
  }, []);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        axios
          .get(`https://y-balash.vercel.app/api/images/search?name=${searchQuery}`)
          .then((res) => {
            setSearchResults(res.data || []);
          })
          .catch((err) => {
            console.error('Search error:', err);
            setSearchResults([]);
          });
      } else {
        setSearchResults([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://y-balash.vercel.app/api/images/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Product deleted');
        setSearchResults((prev) => prev.filter((item) => item._id !== productId));
        setAllProducts((prev) => prev.filter((item) => item._id !== productId));
      } else {
        alert(data.message || 'Failed to delete');
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting product');
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setUpdatedProduct({
      name: product.name,
      quantity: product.quantity,
      price: product.price,
      category: product.categoryId,
      imageUrl: product.imageUrl,
      productionDate: product.productionDate,
      expiryDate: product.expiryDate,
      description: product.description || '',
    });
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdateSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Unauthorized');
      return;
    }

    try {
      const res = await fetch(`https://y-balash.vercel.app/api/images/update/${editingProduct._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedProduct.name,
          quantity: updatedProduct.quantity,
          price: updatedProduct.price,
          categoryId: updatedProduct.category,
          image: updatedProduct.imageUrl,
          productionDate: updatedProduct.productionDate,
          expiryDate: updatedProduct.expiryDate,
          description: updatedProduct.description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message || 'Product updated successfully');
        // Update the product in the state
        setAllProducts(prev => prev.map(p => 
          p._id === editingProduct._id ? { ...p, ...updatedProduct } : p
        ));
        setSearchResults(prev => prev.map(p => 
          p._id === editingProduct._id ? { ...p, ...updatedProduct } : p
        ));
        setEditingProduct(null);
      } else {
        alert(data.message || 'Failed to update product');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating product');
    }
  };

  const productsToShow = searchQuery.trim() ? searchResults : allProducts;

  return (
    <div className="bg-white pt-6 pb-6">
      <div className="flex justify-between items-center container mx-auto px-4">
        <div>
          <h2 className="text-2xl font-bold text-Main mb-2">Products</h2>
          <div className="flex items-center">
            <Link className="text-gray-700 text-xs" href="/">Dashboard</Link>
            <MdArrowForwardIos className="text-gray-700 text-xs mx-2" />
            <Link className="text-gray-700 text-xs" href="/products">Products</Link>
          </div>
        </div>
        <div>
          <Link href="/add-product">
            <button className="py-2 px-4 bg-Main text-white rounded-xl text-sm hover:bg-Main/90 transition">
              Add New Product
            </button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-6">
        <div className="flex flex-col lg:flex-row items-center gap-4 bg-gray-50 p-4 rounded-xl shadow-sm">
          <div className="relative w-full lg:w-auto">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="p-3 pl-10 w-full lg:w-[500px] border border-gray-300 rounded-lg"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {productsToShow.length > 0 && (
          <div ref={resultsRef} className="mt-4 bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2 text-gray-800">
              {searchQuery.trim() ? 'Search Results:' : 'All Products:'}
            </p>
            <ul className="space-y-4">
              {productsToShow.map((product) => (
                <li key={product._id} className="flex items-center justify-between gap-4 border-b pb-2">
                  <div className="flex gap-4 items-center">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-xs text-gray-500">SKU: {product.sku || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="text-sm bg-Main text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={updatedProduct.name}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={updatedProduct.quantity}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={updatedProduct.price}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category ID</label>
                <input
                  type="text"
                  name="category"
                  value={updatedProduct.category}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="text"
                  name="imageUrl"
                  value={updatedProduct.imageUrl}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Production Date</label>
                <input
                  type="date"
                  name="productionDate"
                  value={updatedProduct.productionDate}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  value={updatedProduct.expiryDate}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={updatedProduct.description}
                  onChange={handleUpdateChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  rows="3"
                />
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-Main text-white rounded hover:bg-Main/90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
