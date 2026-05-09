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

/* Skeleton loader */
function SkeletonCard() {
  return (
    <div className="bg-surface border border-border-gold rounded overflow-hidden animate-pulse">
      <div className="aspect-square bg-surface-raised" />
      <div className="p-5 space-y-3">
        <div className="h-5 bg-surface-raised rounded w-3/4" />
        <div className="flex gap-2">
          <div className="h-5 w-12 bg-surface-raised rounded" />
          <div className="h-5 w-12 bg-surface-raised rounded" />
        </div>
        <div className="h-4 bg-surface-raised rounded w-1/2" />
        <div className="h-10 bg-surface-raised rounded" />
      </div>
    </div>
  );
}

/* Demo products used when API is not available */
const demoProducts: Product[] = [
  {
    _id: 'demo-1',
    name: 'Royal Kundan Necklace Set',
    weight: 45.5,
    purity: '22K',
    images: [{ publicId: 'demo', secureUrl: '/images/hero-necklace.jpg' }],
    availability: 'In Stock',
    category: 'Gold Necklaces',
  },
  {
    _id: 'demo-2',
    name: 'Classic Rope Gold Chain',
    weight: 12.3,
    purity: '22K',
    images: [{ publicId: 'demo', secureUrl: '/images/gold-chain.jpg' }],
    availability: 'In Stock',
    category: 'Gold Chains',
  },
  {
    _id: 'demo-3',
    name: 'Bridal Temple Jhumka',
    weight: 8.7,
    purity: '22K',
    images: [{ publicId: 'demo', secureUrl: '/images/gold-earrings.jpg' }],
    availability: 'Made to Order',
    category: 'Gold Earrings',
  },
  {
    _id: 'demo-4',
    name: 'Traditional Meenakari Bangle Set',
    weight: 32.0,
    purity: '22K',
    images: [{ publicId: 'demo', secureUrl: '/images/gold-bangles.jpg' }],
    availability: 'In Stock',
    category: 'Gold Bangles',
  },
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${apiUrl}/api/products?featured=true`, {
          cache: 'no-store',
        });
        if (res.ok) {
          const data = await res.json();
          if (data.products && data.products.length > 0) {
            setProducts(data.products.slice(0, 4));
          } else {
            setProducts(demoProducts);
          }
        } else {
          setProducts(demoProducts);
        }
      } catch {
        setProducts(demoProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-14">
        <p className="font-body text-sm tracking-[0.3em] text-gold uppercase mb-3">
          Handcrafted Excellence
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-text-primary font-semibold">
          Our Finest Pieces
        </h2>
        <div className="w-16 h-[1px] bg-gold mx-auto mt-5 opacity-50" />
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {products.map((product) => (
            <motion.div
              key={product._id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
