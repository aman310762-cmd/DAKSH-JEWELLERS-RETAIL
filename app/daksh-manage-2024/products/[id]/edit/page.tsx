'use client';

import { useEffect, useState, use } from 'react';
import ProductForm from '@/components/admin/ProductForm';

interface ProductFormData {
  name: string;
  category: string;
  weight: string;
  purity: string;
  makingCharges: string;
  description: string;
  availability: string;
  featured: boolean;
  images: { publicId: string; secureUrl: string }[];
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [initialData, setInitialData] = useState<ProductFormData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const token = localStorage.getItem('adminToken') || '';
        const res = await fetch(`${apiUrl}/api/admin/products`, {
          credentials: 'include',
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.ok) {
          const data = await res.json();
          const product = data.products?.find((p: { _id: string }) => p._id === id);
          if (product) {
            setInitialData({
              name: product.name,
              category: product.category,
              weight: String(product.weight),
              purity: product.purity,
              makingCharges: product.makingCharges || '',
              description: product.description,
              availability: product.availability,
              featured: product.featured,
              images: product.images || [],
            });
          }
        }
      } catch { /* silent */ }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
      {initialData ? (
        <ProductForm initialData={initialData} productId={id} />
      ) : (
        <p className="text-gray-500">Product not found.</p>
      )}
    </div>
  );
}
