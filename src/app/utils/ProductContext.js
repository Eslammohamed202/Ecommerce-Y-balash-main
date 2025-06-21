'use client';

import { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  // جلب المنتجات من API
  const fetchProducts = async () => {
  try {
    const res = await axios.get('https://y-balash.vercel.app/api/seller/products-stats');
    const fetched = res.data.products || [];
    setProducts(fetched);
    setFilteredProducts(fetched);
    localStorage.setItem('products', JSON.stringify(fetched));
    localStorage.setItem('totalProducts', fetched.length);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};



  // تحميل البيانات من localStorage أولاً
  useEffect(() => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('products');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setProducts(parsed);
          setFilteredProducts(parsed);
        } else {
          fetchProducts(); // fallback إذا البيانات فاسدة
        }
      } catch (error) {
        console.error("Error parsing localStorage products:", error);
        fetchProducts(); // fallback في حالة خطأ في JSON
      }
    } else {
      fetchProducts(); // لو مفيش بيانات محفوظة
    }
  }
}, []);


  // تحديث localStorage كل ما المنتجات تتغير
  useEffect(() => {
    if (typeof window !== 'undefined' && products.length > 0) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (newProduct) => {
    const updated = [newProduct, ...products];
    setProducts(updated);
    setFilteredProducts([newProduct, ...filteredProducts]);
    localStorage.setItem('products', JSON.stringify(updated));
    localStorage.setItem('totalProducts', updated.length);
  };

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    setFilteredProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
    localStorage.setItem('totalProducts', updated.length);
  };

  const applyFilters = (productsToFilter, query = '') => {
    let result = [...productsToFilter];
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (product) =>
          product.name?.toLowerCase().includes(q) ||
          product.sku?.toLowerCase().includes(q) ||
          product.category?.toLowerCase().includes(q) ||
          (product.tags && product.tags.some((tag) => tag.toLowerCase().includes(q)))
      );
    }
    setFilteredProducts(result);
  };

  useEffect(() => {
    applyFilters(products, searchQuery);
  }, [searchQuery, products]);

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        addProduct,
        deleteProduct,
        setSearchQuery,
        searchQuery,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
