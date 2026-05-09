'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductTable from '@/components/admin/ProductTable';

const categories = [
  'All', 'Gold Chains', 'Gold Rings', 'Gold Earrings', 'Gold Bangles',
  'Gold Necklaces', 'Bridal Jewellery', 'Pendants', 'Kids Jewellery',
];

interface Product {
  _id: string;
  name: string;
  category: string;
  weight: number;
  purity: string;
  stock: boolean;
  featured: boolean;
  images: { publicId: string; secureUrl: string }[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = localStorage.getItem('adminToken') || '';
      const params = new URLSearchParams();
      if (category !== 'All') params.set('category', category);
      if (search) params.set('search', search);

      const res = await fetch(`${apiUrl}/api/admin/products?${params}`, {
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products || []);
      }
    } catch { /* Demo */ }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [category, search]);

  const handleDelete = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = localStorage.getItem('adminToken') || '';
      await fetch(`${apiUrl}/api/admin/products/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch { /* silent */ }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const token = localStorage.getItem('adminToken') || '';
      const res = await fetch(`${apiUrl}/api/admin/products/${id}/featured`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts((prev) =>
          prev.map((p) => (p._id === id ? { ...p, featured: data.featured } : p))
        );
      }
    } catch { /* silent */ }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <Link href="/daksh-manage-2024/products/new" className="px-5 py-2.5 bg-[#C9A84C] text-white text-sm font-medium rounded-lg hover:brightness-110 transition-all text-center">
          + Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="flex-1 px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C9A84C] focus:outline-none"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:border-[#C9A84C] focus:outline-none bg-white"
        >
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <ProductTable products={products} onDelete={handleDelete} onToggleFeatured={handleToggleFeatured} />
      )}
    </div>
  );
}
