// 'use client';

// import AddHeader from '@/components/Add Prod/AddHeader';
// import Navbar from '@/components/Navbar/Navbar';
// import React, { useState, useContext } from 'react';
// import { RiUploadCloud2Line } from 'react-icons/ri';
// import { useRouter } from 'next/navigation';

// const AddProductPage = () => {
//   const { addProduct } = useContext(ProductContext);
//   const router = useRouter();
//   const [product, setProduct] = useState({
//     name: '',
//     price: '',
//     stock: '',
//     sku: '',
//     category: '',
//     description: '',
//     images: [],
//     isFeatured: false,
//     enableReviews: false,
//     tags: [],
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]:
//         name === 'price' || name === 'stock' ? value :
//         name === 'tags' ? value.split(',').map((tag) => tag.trim()).filter((tag) => tag) :
//         value,
//     }));
//   };

//   const handleImageUpload = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const files = Array.from(e.target.files).filter((file) => {
//         if (file.size > 5 * 1024 * 1024) {
//           alert('File size exceeds 5MB');
//           return false;
//         }
//         return true;
//       });
//       console.log('Uploaded files:', files.map(f => ({ name: f.name, size: f.size }))); // Debug: Log file details
//       setProduct((prevProduct) => ({
//         ...prevProduct,
//         images: files,
//       }));
//     }
//   };

//   const handleRemoveImage = (index) => {
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       images: prevProduct.images.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSave = () => {
//     if (!product.name || !product.price || !product.category) {
//       alert('Please fill in all required fields.');
//       return;
//     }
//     console.log('Saving product:', { ...product, images: product.images.map(f => ({ name: f.name, size: f.size })) }); // Debug: Log product
//     addProduct({
//       ...product,
//       price: parseFloat(product.price) || 0,
//       stock: parseInt(product.stock) || 0,
//       tags: product.tags || [],
//     });
//     router.push('/products');
//   };

//   const handleCancel = () => {
//     window.history.back();
//   };

//   return (
//     <div>
//       <Navbar />
//       <AddHeader />
//       <div className="container lg:mb-12 mb-6 lg:mt-12 mt-6 flex flex-col lg:gap-0 gap-0 justify-center">
//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold text-[#1C573E] mb-4">PRODUCT IMAGES</h2>
//           <div
//             className="border-[2px] border-dashed border-[#D1D5DB] w-full h-44 flex flex-col items-center justify-center"
//             onDrop={(e) => {
//               e.preventDefault();
//               if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//                 const files = Array.from(e.dataTransfer.files).filter((file) => {
//                   if (file.size > 5 * 1024 * 1024) {
//                     alert('File size exceeds 5MB');
//                     return false;
//                   }
//                   return true;
//                 });
//                 console.log('Dropped files:', files.map(f => ({ name: f.name, size: f.size }))); // Debug: Log file details
//                 setProduct((prevProduct) => ({
//                   ...prevProduct,
//                   images: files,
//                 }));
//               }
//             }}
//             onDragOver={(e) => e.preventDefault()}
//           >
//             <RiUploadCloud2Line className="size-12 text-[#9CA3AF]" />
//             <p className="text-gray-500">Drag & drop images here, or</p>
//             <label className="text-Main cursor-pointer">
//               browse Files
//               <input
//                 type="file"
//                 multiple
//                 accept="image/jpeg,image/png"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </label>
//             <p className="text-xs text-gray-400 mt-1">Maximum file size 5MB (Formats: JPG, PNG)</p>
//           </div>
//           {product.images.length > 0 && (
//             <div className="mt-4 flex flex-wrap gap-4">
//               {product.images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={URL.createObjectURL(image)}
//                     alt={`Uploaded ${index}`}
//                     className="w-24 h-24 object-cover rounded-md"
//                   />
//                   <button
//                     onClick={() => handleRemoveImage(index)}
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-[#374151]">Product Name</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={product.name}
//                   onChange={handleInputChange}
//                   placeholder="Enter product name"
//                   className="mt-1 block w-full border border-gray-200 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#374151]">Price</label>
//                 <input
//                   type="number"
//                   name="price"
//                   value={product.price}
//                   onChange={handleInputChange}
//                   placeholder="EGP 0.00"
//                   className="mt-1 block w-full border border-gray-200 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#374151]">Category</label>
//                 <select
//                   name="category"
//                   value={product.category}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-200 rounded-md p-2"
//                 >
//                   <option value="">Select category</option>
//                   <option value="Dessert">Dessert</option>
//                   <option value="Bakery">Bakery</option>
//                   <option value="Other">Other</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#374151]">Product Description</label>
//                 <textarea
//                   name="description"
//                   value={product.description}
//                   onChange={handleInputChange}
//                   placeholder="Describe your product..."
//                   className="mt-1 block w-full border border-gray-200 rounded-md p-2 h-32"
//                 />
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-[#374151]">Quantity In Stock</label>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={product.stock}
//                   onChange={handleInputChange}
//                   placeholder="Enter quantity"
//                   className="mt-1 block w-full border border-gray-200 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#374151]">SKU</label>
//                 <input
//                   type="text"
//                   name="sku"
//                   value={product.sku}
//                   onChange={handleInputChange}
//                   placeholder="Enter SKU"
//                   className="mt-1 block w-full border border-gray-200 rounded-md p-2"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-[#374151]">Tags</label>
//                 <input
//                   type="text"
//                   name="tags"
//                   value={product.tags.join(', ')}
//                   onChange={handleInputChange}
//                   placeholder="Add tags separated by commas"
//                   className="mt-1 block w-full border border-gray-200 rounded-md p-2"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow">
//           <h2 className="text-lg font-semibold text-[#1C573E] mb-4">ADDITIONAL OPTIONS</h2>
//           <div className="flex gap-4 flex-col">
//             <div className="flex gap-2">
//               <label className="relative items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={product.isFeatured}
//                   onChange={(e) => setProduct({ ...product, isFeatured: e.target.checked })}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1C573E] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" />
//               </label>
//               <span className="text-[#374151]">Mark as Featured Product</span>
//             </div>
//             <div className="flex gap-2">
//               <label className="relative items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   checked={product.enableReviews}
//                   onChange={(e) => setProduct({ ...product, enableReviews: e.target.checked })}
//                   className="sr-only peer"
//                 />
//                 <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1C573E] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all" />
//               </label>
//               <span className="text-[#374151]">Enable Product Reviews</span>
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 bg-white p-6 rounded-lg">
//           <button
//             onClick={handleCancel}
//             className="px-4 py-2 bg-white text-gray-600 border border-gray-300 rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleSave}
//             className="px-4 py-2 bg-[#1C573E] text-white rounded-md"
//           >
//             Save Product
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddProductPage;



'use client';

import AddHeader from '@/components/Add Prod/AddHeader';
import Navbar from '@/components/Navbar/Navbar';
import React, { useState, useContext } from 'react';
import { RiUploadCloud2Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { ProductContext } from '../utils/ProductContext';

const AddProductPage = () => {
  const router = useRouter();
  const { addProduct } = useContext(ProductContext);

  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    price: '',
    categoryId: '',
    image: null,
    expiryDate: '',
    description: '',
    restaurantId: '67902b150d502e92f5ce1a9f',
    productionDate: '',
  });

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
      name, quantity, price, categoryId, image,
      expiryDate, description, restaurantId, productionDate
    } = product;

    if (!name || !quantity || !price || !categoryId || !image || !restaurantId || !productionDate || !expiryDate) {
      alert('Please fill all required fields.');
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

    try {
      const res = await fetch('https://y-balash.vercel.app/api/images/add', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRiMjhkZjM4ZmZiNjA3YWFkNDcwOCIsImlhdCI6MTc0ODEyMzYxOCwiZXhwIjoxNzUwNzE1NjE4fQ.lZ1_nBuc-rxi3lPAx55iDr9kq-3Pj8m0BlJctjuMmlo'
        }
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
                  ×
                </button>
              </div>
            </div>
          )}
        </div>

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
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          name="categoryId"
          value={product.categoryId}
          onChange={handleInputChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          <option value="6790c4ef7b560c31cdb96905">Dairy</option>
          <option value="6790c50f7b560c31cdb96907">Bakery</option>
          <option value="6790c5287b560c31cdb96909">Dessert</option>
          <option value="6790c799a732af882708e444">Beverages</option>
        </select>
      </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Restaurant ID</label>
            <input name="restaurantId" value={product.restaurantId} onChange={handleInputChange} className="w-full border p-2 rounded" />
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


