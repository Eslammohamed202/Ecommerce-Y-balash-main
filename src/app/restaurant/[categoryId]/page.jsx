'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function RestaurantProducts() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.post('https://y-balash.vercel.app/api/categories/items', {
          categoryId,
        });
        setProducts(res.data || []);
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  if (loading) {
    return <div className="text-center py-10">Loading products...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-Main">Restaurant Products</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product._id} className="bg-white p-4 rounded shadow text-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-40 object-contain bg-gray-100 rounded mb-3"
            />
            <h3 className="text-lg font-medium text-[#1C573E]">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.price} EGP</p>
          </div>
        ))}
      </div>
    </div>
  );
}
