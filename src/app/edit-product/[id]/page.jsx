// 'use client';

// import React, { useEffect, useState, useContext } from 'react';
// import Image from 'next/image';
// import { useParams, useRouter } from 'next/navigation';
// import EditHeader from '../EditHeader';
// import { RiUploadCloud2Line } from 'react-icons/ri';
// import Navbar from '@/components/Navbar/Navbar';
// import { ProductContext } from '@/app/utils/ProductContext';

// const EditProductPage = () => {
//   const { products, updateProduct } = useContext(ProductContext);
//   const params = useParams();
//   const router = useRouter();
//   const id = params.id;
//   const [product, setProduct] = useState(null);
//   const [previewImages, setPreviewImages] = useState([]);

//   useEffect(() => {
//     if (id) {
//       const foundProduct = products.find((p) => p.id === parseInt(id));
//       if (foundProduct) {
//         setProduct({
//           ...foundProduct,
//           price: Number(foundProduct.price),
//           stock: Number(foundProduct.stock),
//           discount: Number(foundProduct.discount || 0),
//           tags: foundProduct.tags || [],
//           images: [],
//         });
//         setPreviewImages([]);
//       } else {
//         router.push('/products');
//       }
//     }
//   }, [id, products, router]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       [name]:
//         name === 'price'
//           ? parseFloat(value) || 0
//           : name === 'stock' || name === 'discount'
//           ? parseInt(value) || 0
//           : name === 'tags'
//           ? value.split(',').map((tag) => tag.trim()).filter((tag) => tag)
//           : value,
//     }));
//   };

//   const handleImageUpload = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const files = Array.from(e.target.files).filter((file) => {
//         if (file.size > 5 * 1024 * 1024) {
//           alert('File size exceeds 5MB');
//           return false;
//         }
//         if (!file.type.match('image.*')) {
//           alert('Only image files are allowed');
//           return false;
//         }
//         return true;
//       });

//       // إنشاء معاينات للصور
//       const newPreviewImages = files.map(file => URL.createObjectURL(file));
      
//       setProduct((prevProduct) => ({
//         ...prevProduct,
//         images: files,
//       }));
//       setPreviewImages(newPreviewImages);
//     }
//   };

//   const handleRemoveImage = () => {
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       images: [],
//     }));
//     setPreviewImages([]);
//   };

//   const handleSave = async () => {
//     if (!product.name || product.price <= 0 || !product.category) {
//       alert('Please fill in all required fields.');
//       return;
//     }

//     try {
//       let imageUrl = product.image;
      
//       // إذا كانت هناك صورة جديدة، قم بتحويلها إلى base64
//       if (product.images.length > 0) {
//         const file = product.images[0];
//         imageUrl = await convertToBase64(file);
//       }

//       updateProduct({
//         ...product,
//         image: imageUrl,
//         tags: product.tags || [],
//       });
      
//       router.push('/products');
//     } catch (error) {
//       console.error('Error saving product:', error);
//       alert('Failed to save product. Please try again.');
//     }
//   };

//   const convertToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result);
//       reader.onerror = error => reject(error);
//     });
//   };

//   const handleReset = () => {
//     const originalProduct = products.find((p) => p.id === parseInt(id));
//     if (originalProduct) {
//       setProduct({
//         ...originalProduct,
//         price: Number(originalProduct.price),
//         stock: Number(originalProduct.stock),
//         discount: Number(originalProduct.discount || 0),
//         tags: originalProduct.tags || [],
//         images: [],
//       });
//       setPreviewImages([]);
//     }
//   };

//   if (!product) {
//     return <div className="flex justify-center items-center h-screen">Loading...</div>;
//   }

//   return (
//     <div className="">
//       <Navbar />
//       <EditHeader />
//       <div className="gap-6 container mt-12 mb-12">
//         <div className="flex justify-between lg:flex-row flex-col items-center">
//           {/* قسم الصور */}
//           <div className="bg-white p-6 rounded-lg shadow lg:w-[74%] w-full">
//             <h2 className="text-lg font-semibold text-[#1C573E] mb-4">PRODUCT IMAGES</h2>
//             <div className="flex gap-8 items-center flex-wrap">
//               {/* عرض الصورة الأصلية إذا لم يتم تحميل صور جديدة */}
//               {previewImages.length === 0 && (
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   width={150}
//                   height={150}
//                   className="mb-4 rounded-md object-cover"
//                 />
//               )}
              
//               {/* عرض الصور الجديدة */}
//               {previewImages.map((preview, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={preview}
//                     alt={`Preview ${index}`}
//                     className="w-[150px] h-[150px] object-cover rounded-md"
//                   />
//                   <button
//                     onClick={handleRemoveImage}
//                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                   >
//                     ×
//                   </button>
//                 </div>
//               ))}
              
//               {/* زر تحميل الصور */}
//               <div className="border-2 border-dashed border-gray-300 flex items-center justify-center size-[150px] flex-col text-gray-500 rounded-md">
//                 <RiUploadCloud2Line className="size-8" />
//                 <label className="cursor-pointer text-center">
//                   {previewImages.length > 0 ? 'Change Image' : 'Add Image'}
//                   <input
//                     type="file"
//                     accept="image/jpeg,image/png,image/webp"
//                     onChange={handleImageUpload}
//                     className="hidden"
//                   />
//                 </label>
//                 <p className="text-xs mt-1">Max 5MB</p>
//               </div>
//             </div>
//           </div>

//           {/* قسم الحالة وزر الحفظ */}
//           <div className="flex flex-row lg:flex-col lg:w-[24%] w-[100%] gap-4 mt-5 mb-5 lg:mt-0 lg:mb-0">
//             <div className="bg-white p-6 rounded-lg shadow">
//               <h2 className="text-lg font-semibold text-[#1C573E] mb-4">PRODUCT STATUS</h2>
//               <div className="flex items-center justify-between mb-4">
//                 <span>Active</span>
//                 <label className="relative inline-flex items-center cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={product.status === 'active'}
//                     onChange={(e) =>
//                       setProduct({ ...product, status: e.target.checked ? 'active' : 'inactive' })
//                     }
//                     className="sr-only peer"
//                   />
//                   <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#1C573E] peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
//                 </label>
//               </div>
//             </div>
//             <div className="bg-white p-6 rounded-lg shadow">
//               <button
//                 onClick={handleSave}
//                 className="w-full bg-[#1C573E] text-white py-2 rounded-md mb-2 hover:bg-[#164a33] transition-colors"
//               >
//                 SAVE CHANGES
//               </button>
//               <button
//                 onClick={handleReset}
//                 className="w-full bg-white text-gray-600 border border-gray-100 py-2 rounded-md hover:bg-gray-50 transition-colors"
//               >
//                 RESET CHANGES
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* قسم المعلومات الأساسية والحالة */}
//         <div className="md:col-span-2 flex flex-col gap-6 lg:w-[74%]">
//           {/* قسم المعلومات الأساسية */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-lg font-semibold text-[#1C573E] mb-4">BASIC INFORMATION</h2>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={product.name}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#1C573E] focus:border-[#1C573E]"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   name="description"
//                   value={product.description}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2 h-32 focus:ring-[#1C573E] focus:border-[#1C573E]"
//                 />
//               </div>
//               <div className="flex gap-4">
//                 <div className="w-1/2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
//                   <select
//                     name="category"
//                     value={product.category}
//                     onChange={handleInputChange}
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#1C573E] focus:border-[#1C573E]"
//                     required
//                   >
//                     <option value="">Select a category</option>
//                     <option value="Dessert">Dessert</option>
//                     <option value="Bakery">Bakery</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>
//                 <div className="w-1/2">
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
//                   <input
//                     type="text"
//                     name="tags"
//                     value={product.tags ? product.tags.join(', ') : ''}
//                     onChange={handleInputChange}
//                     placeholder="Add tags separated by commas"
//                     className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#1C573E] focus:border-[#1C573E]"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* قسم السعر والمخزون */}
//           <div className="bg-white p-6 rounded-lg shadow">
//             <h2 className="text-lg font-semibold text-[#1C573E] mb-4">PRICING & INVENTORY</h2>
//             <div className="flex gap-4">
//               <div className="w-1/3">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
//                 <div className="relative mt-1 rounded-md shadow-sm">
//                   <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
//                   <input
//                     type="number"
//                     name="price"
//                     value={product.price}
//                     onChange={handleInputChange}
//                     className="block w-full pl-7 border border-gray-300 rounded-md p-2 focus:ring-[#1C573E] focus:border-[#1C573E]"
//                     min="0"
//                     step="0.01"
//                     required
//                   />
//                 </div>
//               </div>
//               <div className="w-1/3">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Discount (%)</label>
//                 <input
//                   type="number"
//                   name="discount"
//                   value={product.discount}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#1C573E] focus:border-[#1C573E]"
//                   min="0"
//                   max="100"
//                 />
//               </div>
//               <div className="w-1/3">
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
//                 <input
//                   type="number"
//                   name="stock"
//                   value={product.stock}
//                   onChange={handleInputChange}
//                   className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:ring-[#1C573E] focus:border-[#1C573E]"
//                   min="0"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProductPage;


'use client';

import React, { useEffect, useState, useContext } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import EditHeader from '../EditHeader';
import { RiUploadCloud2Line } from 'react-icons/ri';
import Navbar from '@/components/Navbar/Navbar';
import { ProductContext } from '@/app/utils/ProductContext';

const EditProductPage = () => {
  const { products, updateProduct } = useContext(ProductContext);
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  const [product, setProduct] = useState(null);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find((p) => p.id === parseInt(id));
      if (foundProduct) {
        setProduct({
          ...foundProduct,
          price: Number(foundProduct.price),
          stock: Number(foundProduct.stock),
          discount: Number(foundProduct.discount || 0),
          tags: foundProduct.tags || [],
          images: [],
        });
        setPreviewImages([]);
      } else {
        router.push('/products');
      }
    }
  }, [id, products, router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]:
        name === 'price'
          ? parseFloat(value) || 0
          : name === 'stock' || name === 'discount'
          ? parseInt(value) || 0
          : name === 'tags'
          ? value.split(',').map((tag) => tag.trim()).filter((tag) => tag)
          : value,
    }));
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter((file) => {
        if (file.size > 5 * 1024 * 1024) {
          alert('File size exceeds 5MB');
          return false;
        }
        if (!file.type.match('image.*')) {
          alert('Only image files are allowed');
          return false;
        }
        return true;
      });

      const newPreviewImages = files.map(file => URL.createObjectURL(file));

      setProduct((prevProduct) => ({
        ...prevProduct,
        images: files,
      }));
      setPreviewImages(newPreviewImages);
    }
  };

  const handleRemoveImage = () => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      images: [],
    }));
    setPreviewImages([]);
  };

  const handleSave = async () => {
    if (!product.name || product.price <= 0 || !product.category) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      let imageUrl = product.image;
      if (product.images.length > 0) {
        const file = product.images[0];
        imageUrl = await convertToBase64(file);
      }

      updateProduct({
        ...product,
        image: imageUrl,
        tags: product.tags || [],
      });

      router.push('/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  };

  const handleReset = () => {
    const originalProduct = products.find((p) => p.id === parseInt(id));
    if (originalProduct) {
      setProduct({
        ...originalProduct,
        price: Number(originalProduct.price),
        stock: Number(originalProduct.stock),
        discount: Number(originalProduct.discount || 0),
        tags: originalProduct.tags || [],
        images: [],
      });
      setPreviewImages([]);
    }
  };

  if (!product) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="">
      <Navbar />
      <EditHeader />
      {/* بقية الكود كما هو */}
    </div>
  );
};

export default EditProductPage;