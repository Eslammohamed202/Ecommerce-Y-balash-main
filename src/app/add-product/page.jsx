// 'use client';

// import AddHeader from '@/components/Add Prod/AddHeader';
// import Navbar from '@/components/Navbar/Navbar';
// import React, { useState, useContext, useEffect } from 'react';
// import { RiUploadCloud2Line } from 'react-icons/ri';
// import { useRouter } from 'next/navigation';
// import { ProductContext } from '../utils/ProductContext';

// const AddProductPage = () => {
//   const router = useRouter();
//   const { addProduct } = useContext(ProductContext);

//   const [token, setToken] = useState('');
//   const [restaurantId, setRestaurantId] = useState('');
//   const [restaurants, setRestaurants] = useState([]);

//   const [product, setProduct] = useState({
//     name: '',
//     quantity: '',
//     price: '',
//     categoryId: '',
//     image: null,
//     expiryDate: '',
//     description: '',
//     restaurantId: '',
//     productionDate: '',
//     sku: '',
//   });

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     setToken(storedToken || '');

//     if (storedToken) {
//       const payload = JSON.parse(atob(storedToken.split('.')[1]));
//       if (payload && payload.id) {
//         setProduct((prev) => ({
//           ...prev,
//           restaurantId: payload.id,
//         }));
//         setRestaurantId(payload.id);
//       }
//     }
//   }, []);

//   // جلب المطاعم
//   useEffect(() => {
//     fetch('https://y-balash.vercel.app/api/restaurants/all')
//       .then((res) => res.json())
//       .then((data) => setRestaurants(data || []))
//       .catch((err) => {
//         console.error('Failed to fetch restaurants:', err);
//         setRestaurants([]);
//       });
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size > 5 * 1024 * 1024) {
//       alert('File size exceeds 5MB');
//       return;
//     }
//     setProduct((prev) => ({ ...prev, image: file }));
//   };

//   const handleRemoveImage = () => {
//     setProduct((prev) => ({ ...prev, image: null }));
//   };

//   const handleSave = async () => {
//     const {
//       name,
//       quantity,
//       price,
//       categoryId,
//       image,
//       expiryDate,
//       description,
//       restaurantId,
//       productionDate,
//       sku,
//     } = product;

    

//     if (!name || !quantity || !price || !categoryId || !image || !restaurantId || !productionDate || !expiryDate || !sku) {
//       alert('Please fill all required fields including SKU.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('quantity', quantity);
//     formData.append('price', price);
//     formData.append('categoryId', categoryId);
//     formData.append('image', image);
//     formData.append('expiryDate', expiryDate);
//     formData.append('productionDate', productionDate);
//     formData.append('description', description);
//     formData.append('restaurantId', restaurantId);
//     formData.append('sku', sku);

//     try {
//       // const res = await fetch('https://y-balash.vercel.app/api/images/add', {
//       const res = await fetch('https://y-balash.onrender.com/api/images/add', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || 'Something went wrong');
//         return;
//       }

//       let currentCount = localStorage.getItem('totalProducts');
//       currentCount = currentCount ? parseInt(currentCount) + 1 : 1;
//       localStorage.setItem('totalProducts', currentCount);

//       const addedProduct = {
//         id: data.product?.id || Date.now().toString(),
//         name,
//         quantity,
//         price,
//         image: data.product?.image || URL.createObjectURL(image),
//         stock: quantity,
//         category: categoryId,
//         description,
//         tags: [],
//         status: 'active',
//       };

//       addProduct(addedProduct);

//       alert('Product added successfully');
//       router.push('/products');
//     } catch (err) {
//       console.error(err);
//       alert('Error while adding product');
//     }
//   };

//   const handleCancel = () => {
//     router.back();
//   };

//   return (
//     <div>
//       <Navbar />
//       <AddHeader />
//       <div className="container py-6 flex flex-col gap-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold text-[#1C573E] mb-4">Product Image</h2>
//           <div className="border-2 border-dashed border-gray-300 h-44 flex flex-col items-center justify-center">
//             <RiUploadCloud2Line className="text-4xl text-gray-400" />
//             <p className="text-gray-500">Drag & drop image or browse</p>
//             <label className="cursor-pointer text-green-700">
//               Browse Files
//               <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//             </label>
//             <p className="text-xs text-gray-400 mt-1">Max 5MB per image</p>
//           </div>
//           {product.image && (
//             <div className="mt-4 flex flex-wrap gap-4">
//               <div className="relative">
//                 <img src={URL.createObjectURL(product.image)} alt="preview" className="w-24 h-24 object-cover rounded" />
//                 <button
//                   onClick={handleRemoveImage}
//                   className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                 >
//                   &times;
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Name</label>
//             <input name="name" value={product.name} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Quantity</label>
//             <input name="quantity" type="number" value={product.quantity} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Price</label>
//             <input name="price" type="number" value={product.price} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">SKU</label>
//             <input name="sku" value={product.sku} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Enter a unique SKU" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Category</label>
//             <select
//               name="categoryId"
//               value={product.categoryId}
//               onChange={handleInputChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select Category</option>
//               <option value="6790c4ef7b560c31cdb96905">Dairy</option>
//               <option value="6790c50f7b560c31cdb96907">Bakery</option>
//               <option value="6790c5287b560c31cdb96909">Dessert</option>
//               <option value="6790c799a732af882708e444">Beverages</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Restaurant</label>
//             <select
//               name="restaurantId"
//               value={product.restaurantId}
//               onChange={handleInputChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select Restaurant</option>
//               {restaurants.map((res) => (
//                 <option key={res._id} value={res._id}>
//                   {res.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700">Production Date</label>
//             <input name="productionDate" type="date" value={product.productionDate} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
//             <input name="expiryDate" type="date" value={product.expiryDate} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea name="description" value={product.description} onChange={handleInputChange} className="w-full border p-2 rounded h-24" />
//           </div>
//         </div>

//         <div className="flex justify-end gap-4">
//           <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
//           <button onClick={handleSave} className="px-4 py-2 bg-green-700 text-white rounded">Save Product</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductPage;


'use client';

import AddHeader from '@/components/Add Prod/AddHeader';
import Navbar from '@/components/Navbar/Navbar';
import React, { useState, useContext, useEffect } from 'react';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { ProductContext } from '../utils/ProductContext';

const AddProductPage = () => {
  const router = useRouter();
  const { addProduct } = useContext(ProductContext);

  const [token, setToken] = useState('');
  const [restaurantId, setRestaurantId] = useState('');
  const [restaurants, setRestaurants] = useState([]);
  const [categories, setCategories] = useState([]);

  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: '',
    categoryId: '',
    image: null,
    expiryDate: '',
    description: '',
    restaurantId: '',
    productionDate: '',
    sku: '',
  });

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    setToken(storedToken || '');

    if (storedToken) {
      const payload = JSON.parse(atob(storedToken.split('.')[1]));
      if (payload && payload.id) {
        setProduct((prev) => ({
          ...prev,
          restaurantId: payload.id,
        }));
        setRestaurantId(payload.id);
      }
    }
  }, []);

  // ✅ جلب المطاعم
  useEffect(() => {
    fetch('https://y-balash.vercel.app/api/restaurants/all')
      .then((res) => res.json())
      .then((data) => setRestaurants(data || []))
      .catch((err) => {
        console.error('Failed to fetch restaurants:', err);
        setRestaurants([]);
      });
  }, []);

  // ✅ جلب التصنيفات ديناميكيًا
  useEffect(() => {
    fetch('https://y-balash.vercel.app/api/categories/all')
      .then((res) => res.json())
      .then((data) => setCategories(data || []))
      .catch((err) => {
        console.error('Failed to fetch categories:', err);
        setCategories([]);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5MB');
      return;
    }
    setProduct((prev) => ({ ...prev, image: file }));
  };

  const handleRemoveImage = () => {
    setProduct((prev) => ({ ...prev, image: null }));
  };

  const handleSave = async () => {
    const {
      name,
      quantity,
      price,
      categoryId,
      image,
      expiryDate,
      description,
      restaurantId,
      productionDate,
      sku,
    } = product;

    if (!name || !quantity || !price || !categoryId || !image || !restaurantId || !productionDate || !expiryDate || !sku) {
      alert('Please fill all required fields including SKU.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('quantity', quantity);
    formData.append('price', price);
    formData.append('categoryId', categoryId);
    formData.append('image', image);
    formData.append('expiryDate', expiryDate);
    formData.append('productionDate', productionDate);
    formData.append('description', description);
    formData.append('restaurantId', restaurantId);
    formData.append('sku', sku);

    try {
      const res = await fetch('https://y-balash.onrender.com/api/images/add', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || 'Something went wrong');
        return;
      }

      let currentCount = localStorage.getItem('totalProducts');
      currentCount = currentCount ? parseInt(currentCount) + 1 : 1;
      localStorage.setItem('totalProducts', currentCount);

      const addedProduct = {
        id: data.product?.id || Date.now().toString(),
        name,
        quantity,
        price,
        image: data.product?.image || URL.createObjectURL(image),
        stock: quantity,
        category: categoryId,
        description,
        tags: [],
        status: 'active',
      };

      addProduct(addedProduct);

      alert('Product added successfully');
      router.push('/products');
    } catch (err) {
      console.error(err);
      alert('Error while adding product');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div>
      <Navbar />
      <AddHeader />
      <div className="container py-6 flex flex-col gap-6">
        {/* صورة المنتج */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold text-[#1C573E] mb-4">Product Image</h2>
          <div className="border-2 border-dashed border-gray-300 h-44 flex flex-col items-center justify-center">
            <RiUploadCloud2Line className="text-4xl text-gray-400" />
            <p className="text-gray-500">Drag & drop image or browse</p>
            <label className="cursor-pointer text-green-700">
              Browse Files
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
            </label>
            <p className="text-xs text-gray-400 mt-1">Max 5MB per image</p>
          </div>
          {product.image && (
            <div className="mt-4 flex flex-wrap gap-4">
              <div className="relative">
                <img src={URL.createObjectURL(product.image)} alt="preview" className="w-24 h-24 object-cover rounded" />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>

        {/* باقي البيانات */}
        <div className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Name</label>
            <input name="name" value={product.name} onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input name="quantity" type="number" value={product.quantity} onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input name="price" type="number" value={product.price} onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">SKU</label>
            <input name="sku" value={product.sku} onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="categoryId" value={product.categoryId} onChange={handleInputChange} className="w-full border p-2 rounded">
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant</label>
            <select name="restaurantId" value={product.restaurantId} onChange={handleInputChange} className="w-full border p-2 rounded">
              <option value="">Select Restaurant</option>
              {restaurants.map((res) => (
                <option key={res._id} value={res._id}>{res.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Production Date</label>
            <input name="productionDate" type="date" value={product.productionDate} onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
            <input name="expiryDate" type="date" value={product.expiryDate} onChange={handleInputChange} className="w-full border p-2 rounded" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea name="description" value={product.description} onChange={handleInputChange} className="w-full border p-2 rounded h-24" />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
          <button onClick={handleSave} className="px-4 py-2 bg-green-700 text-white rounded">Save Product</button>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;



// 'use client';

// import AddHeader from '@/components/Add Prod/AddHeader';
// import Navbar from '@/components/Navbar/Navbar';
// import React, { useState, useContext, useEffect } from 'react';
// import { RiUploadCloud2Line } from 'react-icons/ri';
// import { useRouter } from 'next/navigation';
// import { ProductContext } from '../utils/ProductContext';
// import { useQueryClient } from '@tanstack/react-query';

// const AddProductPage = () => {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const { addProduct } = useContext(ProductContext);

//   const [token, setToken] = useState('');
//   const [restaurantId, setRestaurantId] = useState('');

//   const [product, setProduct] = useState({
//     name: '',
//     quantity: '',
//     price: '',
//     categoryId: '',
//     image: null,
//     expiryDate: '',
//     description: '',
//     restaurantId: '',
//     productionDate: '',
//     sku: '',
//   });

//   useEffect(() => {
//     const storedToken = localStorage.getItem('token');
//     setToken(storedToken || '');

//     if (storedToken) {
//       const payload = JSON.parse(atob(storedToken.split('.')[1]));
//       if (payload && payload.id) {
//         setProduct((prev) => ({
//           ...prev,
//           restaurantId: payload.id,
//         }));
//         setRestaurantId(payload.id);
//       }
//     }
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size > 5 * 1024 * 1024) {
//       alert('File size exceeds 5MB');
//       return;
//     }
//     setProduct((prev) => ({ ...prev, image: file }));
//   };

//   const handleRemoveImage = () => {
//     setProduct((prev) => ({ ...prev, image: null }));
//   };

//   const handleSave = async () => {
//     const {
//       name,
//       quantity,
//       price,
//       categoryId,
//       image,
//       expiryDate,
//       description,
//       restaurantId,
//       productionDate,
//       sku,
//     } = product;

//     if (!name || !quantity || !price || !categoryId || !image || !restaurantId || !productionDate || !expiryDate || !sku) {
//       alert('Please fill all required fields including SKU.');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('name', name);
//     formData.append('quantity', quantity);
//     formData.append('price', price);
//     formData.append('categoryId', categoryId);
//     formData.append('image', image);
//     formData.append('expiryDate', expiryDate);
//     formData.append('productionDate', productionDate);
//     formData.append('description', description);
//     formData.append('restaurantId', restaurantId);
//     formData.append('sku', sku);

//     try {
//       const res = await fetch('https://y-balash.vercel.app/api/images/add', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         alert(data.message || 'Something went wrong');
//         return;
//       }

//       const addedProduct = {
//         id: data.product?.id || Date.now().toString(),
//         name,
//         quantity,
//         price,
//         image: data.product?.image || URL.createObjectURL(image),
//         stock: quantity,
//         category: categoryId,
//         description,
//         tags: [],
//         status: 'active',
//       };

//       addProduct(addedProduct);

//       // ✅ Trigger re-fetch of dashboard APIs
//       queryClient.invalidateQueries({ queryKey: ['productsStats'] });
//       queryClient.invalidateQueries({ queryKey: ['lowStockCount'] });
//       queryClient.invalidateQueries({ queryKey: ['monthlyEarnings'] });
//       queryClient.invalidateQueries({ queryKey: ['ordersStats'] });

//       alert('Product added successfully');
//       router.push('/products');
//     } catch (err) {
//       console.error(err);
//       alert('Error while adding product');
//     }
//   };

//   const handleCancel = () => {
//     router.back();
//   };

//   return (
//     <div>
//       <Navbar />
//       <AddHeader />
//       <div className="container py-6 flex flex-col gap-6">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold text-[#1C573E] mb-4">Product Image</h2>
//           <div className="border-2 border-dashed border-gray-300 h-44 flex flex-col items-center justify-center">
//             <RiUploadCloud2Line className="text-4xl text-gray-400" />
//             <p className="text-gray-500">Drag & drop image or browse</p>
//             <label className="cursor-pointer text-green-700">
//               Browse Files
//               <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
//             </label>
//             <p className="text-xs text-gray-400 mt-1">Max 5MB per image</p>
//           </div>
//           {product.image && (
//             <div className="mt-4 flex flex-wrap gap-4">
//               <div className="relative">
//                 <img src={URL.createObjectURL(product.image)} alt="preview" className="w-24 h-24 object-cover rounded" />
//                 <button
//                   onClick={handleRemoveImage}
//                   className="absolute top-0 right-0 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                 >
//                   &times;
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Product Name</label>
//             <input name="name" value={product.name} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Quantity</label>
//             <input name="quantity" type="text" value={product.quantity} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Price</label>
//             <input name="price" type="number" value={product.price} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">SKU</label>
//             <input name="sku" value={product.sku} onChange={handleInputChange} className="w-full border p-2 rounded" placeholder="Enter a unique SKU" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Category</label>
//             <select
//               name="categoryId"
//               value={product.categoryId}
//               onChange={handleInputChange}
//               className="w-full border p-2 rounded"
//             >
//               <option value="">Select Category</option>
//               <option value="6790c4ef7b560c31cdb96905">Dairy</option>
//               <option value="6790c50f7b560c31cdb96907">Bakery</option>
//               <option value="6790c5287b560c31cdb96909">Dessert</option>
//               <option value="6790c799a732af882708e444">Beverages</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Restaurant ID</label>
//             <input name="restaurantId" value={product.restaurantId} readOnly className="w-full border p-2 rounded bg-gray-100" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Production Date</label>
//             <input name="productionDate" type="date" value={product.productionDate} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
//             <input name="expiryDate" type="date" value={product.expiryDate} onChange={handleInputChange} className="w-full border p-2 rounded" />
//           </div>
//           <div className="md:col-span-2">
//             <label className="block text-sm font-medium text-gray-700">Description</label>
//             <textarea name="description" value={product.description} onChange={handleInputChange} className="w-full border p-2 rounded h-24" />
//           </div>
//         </div>

//         <div className="flex justify-end gap-4">
//           <button onClick={handleCancel} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
//           <button onClick={handleSave} className="px-4 py-2 bg-green-700 text-white rounded">Save Product</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductPage;



