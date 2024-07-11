"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products');
        setProducts(res.data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToInventory = async (productId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        return setError('Please login first');
      }

      await axios.post('/api/orders', { productId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setError('');
      alert('Product added to inventory');
    } catch (error) {
      setError('Failed to add product to inventory');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <button
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
          onClick={() => router.push('/add-product')}
        >
          Add to Inventory
        </button>
      </div>
      <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product: any) => (
          <div key={product._id} className="p-4 bg-gray-800 rounded-lg shadow-lg">
            <img src={product.image} alt={product.title} className="w-full h-48 mb-4 rounded-md" />
            <h2 className="text-xl font-bold text-white">{product.title}</h2>
            <p className="text-gray-400">{product.description}</p>
            <button
              className="px-4 py-2 mt-4 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500"
              onClick={() => handleAddToInventory(product._id)}
            >
              Add to Inventory
            </button>
          </div>
        ))}
      </div>
      {error && <p className="p-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Products;
