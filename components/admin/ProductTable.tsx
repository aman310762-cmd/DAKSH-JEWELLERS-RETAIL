'use client';

import { useState } from 'react';
import Image from 'next/image';

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

interface ProductTableProps {
  products: Product[];
  onDelete: (id: string) => void;
  onToggleFeatured: (id: string) => void;
}

export default function ProductTable({ products, onDelete, onToggleFeatured }: ProductTableProps) {
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <svg className="w-16 h-16 text-gray-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
        <p className="text-gray-500 font-medium mb-2">No products yet</p>
        <p className="text-gray-400 text-sm">Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Image</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Name</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Category</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Weight</th>
              <th className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Purity</th>
              <th className="text-center text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Featured</th>
              <th className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-4 py-3">
                  <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                    <Image
                      src={p.images?.[0]?.secureUrl || '/images/hero-necklace.jpg'}
                      alt={p.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900 max-w-[200px] truncate">{p.name}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.category}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.weight}g</td>
                <td className="px-4 py-3 text-sm text-gray-500">{p.purity}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => onToggleFeatured(p._id)}
                    className={`w-10 h-5 rounded-full transition-colors relative ${
                      p.featured ? 'bg-[#C9A84C]' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                      p.featured ? 'left-[22px]' : 'left-0.5'
                    }`} />
                  </button>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <a
                      href={`/daksh-manage-2024/products/${p._id}/edit`}
                      className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors"
                    >
                      Edit
                    </a>
                    {deleteConfirm === p._id ? (
                      <div className="flex gap-1">
                        <button onClick={() => { onDelete(p._id); setDeleteConfirm(null); }} className="px-3 py-1.5 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition-colors">Confirm</button>
                        <button onClick={() => setDeleteConfirm(null)} className="px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded hover:bg-gray-200 transition-colors">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteConfirm(p._id)} className="px-3 py-1.5 text-xs bg-red-50 text-red-500 rounded hover:bg-red-100 transition-colors">Delete</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
