'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';

const categories = [
  'Gold Chains', 'Gold Rings', 'Gold Earrings', 'Gold Bangles',
  'Gold Necklaces', 'Bridal Jewellery', 'Pendants', 'Kids Jewellery',
];

interface ProductFormData {
  name: string;
  category: string;
  weight: string;
  purity: string;
  makingCharges: string;
  description: string;
  availability: string;
  featured: boolean;
  images: { publicId: string; secureUrl: string; file?: File }[];
}

interface ProductFormProps {
  initialData?: ProductFormData;
  productId?: string;
}

export default function ProductForm({ initialData, productId }: ProductFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<ProductFormData>(
    initialData || {
      name: '',
      category: '',
      weight: '',
      purity: '22K',
      makingCharges: '',
      description: '',
      availability: 'In Stock',
      featured: false,
      images: [],
    }
  );

  const updateField = (field: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    // Validate
    if (!form.name || !form.category || !form.weight || !form.description) {
      setError('Please fill in all required fields.');
      setSaving(false);
      return;
    }

    if (form.images.length === 0) {
      setError('Please upload at least one product image.');
      setSaving(false);
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const endpoint = productId
        ? `${apiUrl}/api/admin/products/${productId}`
        : `${apiUrl}/api/admin/products`;
      const method = productId ? 'PUT' : 'POST';

      const payload = {
        name: form.name,
        category: form.category,
        weight: parseFloat(form.weight),
        purity: form.purity,
        makingCharges: form.makingCharges,
        description: form.description,
        availability: form.availability,
        featured: form.featured,
        images: form.images.map((img) => ({
          publicId: img.publicId || '',
          secureUrl: img.secureUrl,
        })),
      };

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/daksh-manage-2024/products');
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to save product');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Name *</label>
        <input
          value={form.name}
          onChange={(e) => updateField('name', e.target.value)}
          placeholder="e.g. Traditional Gold Necklace Set"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] focus:outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Category *</label>
        <select
          value={form.category}
          onChange={(e) => updateField('category', e.target.value)}
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 focus:border-[#C9A84C] focus:outline-none bg-white"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Weight + Purity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Weight (grams) *</label>
          <input
            type="number"
            step="0.1"
            value={form.weight}
            onChange={(e) => updateField('weight', e.target.value)}
            placeholder="e.g. 8.5"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C9A84C] focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Purity *</label>
          <div className="flex gap-3 mt-1">
            {['18K', '22K', '24K'].map((p) => (
              <label key={p} className={`flex-1 flex items-center justify-center py-3 rounded-lg border cursor-pointer transition-all text-sm font-medium ${
                form.purity === p
                  ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]'
                  : 'border-gray-200 text-gray-500 hover:border-gray-300'
              }`}>
                <input type="radio" name="purity" value={p} checked={form.purity === p} onChange={(e) => updateField('purity', e.target.value)} className="sr-only" />
                {p}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Making Charges */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Making Charges Description</label>
        <input
          value={form.makingCharges}
          onChange={(e) => updateField('makingCharges', e.target.value)}
          placeholder="e.g. Stone setting + rhodium polish included"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C9A84C] focus:outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Description *</label>
        <textarea
          value={form.description}
          onChange={(e) => updateField('description', e.target.value)}
          rows={4}
          placeholder="Describe this piece — design, occasion, style..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#C9A84C] focus:outline-none resize-none"
        />
      </div>

      {/* Availability */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Availability *</label>
        <div className="flex gap-3">
          {['In Stock', 'Made to Order'].map((a) => (
            <label key={a} className={`flex-1 flex items-center justify-center py-3 rounded-lg border cursor-pointer transition-all text-sm font-medium ${
              form.availability === a
                ? 'border-[#C9A84C] bg-[#C9A84C]/10 text-[#C9A84C]'
                : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}>
              <input type="radio" name="availability" value={a} checked={form.availability === a} onChange={(e) => updateField('availability', e.target.value)} className="sr-only" />
              {a}
            </label>
          ))}
        </div>
      </div>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={form.featured}
          onChange={(e) => updateField('featured', e.target.checked)}
          className="w-4 h-4 accent-[#C9A84C] rounded"
        />
        <span className="text-sm text-gray-700">Show this product on the homepage</span>
      </label>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Product Images *</label>
        <ImageUploader images={form.images} onChange={(imgs) => setForm((prev) => ({ ...prev, images: imgs }))} />
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={saving}
        className="w-full sm:w-auto px-8 py-3 bg-[#C9A84C] text-white text-sm font-semibold rounded-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {saving ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Saving...
          </>
        ) : (
          productId ? 'Update Product' : 'Save Product'
        )}
      </button>
    </form>
  );
}
