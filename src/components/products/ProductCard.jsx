'use client';

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useRouter } from 'next/navigation';
import { ProductContext } from '@/app/utils/ProductContext';

const ProductCard = () => {
  const { filteredProducts, deleteProduct, products } = useContext(ProductContext);
  const [saved, setSaved] = useState(false); // لتعريف setSaved
  const router = useRouter();

  // حفظ المنتجات في localStorage عند التغيير
  useEffect(() => {
    if (typeof window !== 'undefined' && products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
      setSaved(true);
    }
  }, [products]);

  // تحميل المنتجات من localStorage عند تحميل الصفحة
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('products');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            console.log('✅ Loaded products from localStorage:', parsed);
            // هنا يمكن إرسال البيانات إلى السياق إذا أردت
          }
        } catch (error) {
          console.error('❌ Failed to parse localStorage products:', error);
        }
      }
    }
  }, []);

  const handleEdit = (id) => {
    if (id) {
      router.push(`/edit-product/${id}`);
    } else {
      alert('Invalid product ID');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
      const updated = products.filter((p) => p.id !== id);
      localStorage.setItem('products', JSON.stringify(updated));
    }
  };

  return (
    <div className="flex container lg:mt-12 mt-6 lg:mb-12 mb-6 flex-wrap items-center justify-center gap-4">
      {filteredProducts.length === 0 ? (
        <div className="w-full text-center py-8">
          {filteredProducts === products ? 'Loading products...' : 'No products match your search'}
        </div>
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-4 w-full max-w-xs mx-auto"
          >
            <div className="flex justify-between items-start mb-4">
              <input type="checkbox" className="mt-1" />
              <span
                className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                  product.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.status === 'active' ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex justify-center">
              <Image
                src={product.image}
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
                <span className="text-Main font-bold">{product.price}</span>
                <span className="text-gray-500 text-sm">{product.stock} units</span>
              </div>
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                onClick={() => handleEdit(product.id)}
                className="flex-1 py-2 border border-gray-300 rounded-lg flex items-center justify-center gap-1 text-sm hover:bg-gray-50"
              >
                <FiEdit className="text-[16px]" /> Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
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
