'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ProductCard from './ProductCard';

interface Product {
  _id: string;
  name: string;
  weight: number;
  purity: string;
  images: { publicId: string; secureUrl: string }[];
  availability?: string;
  category?: string;
}

/* Demo related products for when API is unavailable */
const demoRelated: Product[] = [
  {
    _id: 'rel-1',
    name: 'Royal Kundan Necklace Set',
    weight: 45.5,
    purity: '22K',
    images: [{ publicId: 'demo', secureUrl: '/images/hero-necklace.jpg' }],
    availability: 'In Stock',
    category: 'Gold Necklaces',
  },
  {
    _id: 'rel-2',
    name: 'Classic Rope Gold Chain',
    weight: 12.3,
    purity: '22K',
    images: [{ publicId: 'demo', secureUrl: '/images/gold-chain.jpg' }],
    availability: 'In Stock',
    category: 'Gold Chains',
  },
  {
    _id: 'rel-3',
    name: 'Bridal Temple Jhumka',
    weight: 8.7,
    purity: '22K',
    images: [{ publicId: 'demo', secureUrl: '/images/gold-earrings.jpg' }],
    availability: 'Made to Order',
    category: 'Gold Earrings',
  },
  {
    _id: 'rel-4',
    name: 'Traditional Meenakari Bangle Set',
    weight: 32.0,
    purity: '22K',
    images: [{ publicId: 'demo', secureUrl: '/images/gold-bangles.jpg' }],
    availability: 'In Stock',
    category: 'Gold Bangles',
  },
];

interface RelatedProductsProps {
  category: string;
  excludeId: string;
}

export default function RelatedProducts({ category, excludeId }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(
          `${apiUrl}/api/products?category=${encodeURIComponent(category)}&limit=4`,
          { cache: 'no-store' }
        );
        if (res.ok) {
          const data = await res.json();
          const filtered = (data.products || [])
            .filter((p: Product) => p._id !== excludeId)
            .slice(0, 4);
          setProducts(filtered.length > 0 ? filtered : demoRelated.filter((p) => p._id !== excludeId).slice(0, 4));
        } else {
          setProducts(demoRelated.filter((p) => p._id !== excludeId).slice(0, 4));
        }
      } catch {
        setProducts(demoRelated.filter((p) => p._id !== excludeId).slice(0, 4));
      } finally {
        setLoading(false);
      }
    };

    fetchRelated();
  }, [category, excludeId]);

  if (loading) {
    return (
      <section className="py-16">
        <h2 className="font-heading text-2xl text-text-primary mb-8">You May Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface border border-border-gold rounded overflow-hidden animate-pulse">
              <div className="aspect-square bg-surface-raised" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-surface-raised rounded w-3/4" />
                <div className="h-10 bg-surface-raised rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-8">You May Also Like</h2>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {products.map((product) => (
          <motion.div
            key={product._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
