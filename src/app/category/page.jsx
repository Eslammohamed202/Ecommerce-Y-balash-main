'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CategoryProductPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
  if (typeof categoryName !== 'string') return;

  const fetchCategoryProducts = async () => {
    try {
      const cleanCategory = categoryName.replace('Product', '');
      const res = await fetch(`https://y-balash.vercel.app/api/products/category/${cleanCategory}`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err);
    }
  };

  fetchCategoryProducts();
}, [categoryName]);


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
  {typeof categoryName === 'string'
    ? `${categoryName.replace('Product', '')} Products`
    : 'Products'}
</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product._id} className="border rounded-xl p-4 bg-white shadow">
              <img src={product.imageUrl} alt={product.name} className="w-full h-32 object-cover rounded" />
              <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
              <p className="text-gray-600">{product.price} EGP</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
