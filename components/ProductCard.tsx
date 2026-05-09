'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  weight: number;
  purity: string;
  images: { publicId: string; secureUrl: string }[];
  availability?: string;
  category?: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── 3D Tilt Effect on Mouse Move ──────────────── */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    cardRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  const mainImage = product.images?.[0]?.secureUrl || '/images/hero-necklace.jpg';

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group bg-surface border border-border-gold rounded overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(201,168,76,0.12)] hover:border-gold/40 cursor-pointer"
      style={{ transition: 'transform 0.15s ease-out, box-shadow 0.5s ease, border-color 0.5s ease' }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#0a0a0a]">
        <Image
          src={mainImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.6)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5">
        <h3 className="font-heading text-lg text-text-primary mb-2 line-clamp-1 group-hover:text-gold transition-colors duration-300">
          {product.name}
        </h3>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2 py-0.5 bg-[rgba(201,168,76,0.1)] border border-border-gold text-gold text-xs font-body rounded">
            {product.weight}g
          </span>
          <span className="inline-flex items-center px-2 py-0.5 bg-[rgba(201,168,76,0.1)] border border-border-gold text-gold text-xs font-body rounded">
            {product.purity}
          </span>
          {product.availability && (
            <span className={`inline-flex items-center px-2 py-0.5 text-xs font-body rounded ${
              product.availability === 'In Stock'
                ? 'bg-[rgba(34,197,94,0.1)] border border-green-800 text-green-400'
                : 'bg-[rgba(245,158,11,0.1)] border border-amber-800 text-amber-400'
            }`}>
              {product.availability}
            </span>
          )}
        </div>

        {/* Price */}
        <p className="font-body text-xs text-text-muted mb-4">Price on Inquiry</p>

        {/* CTA */}
        <Link
          href={`/product/${product._id}`}
          className="block text-center py-2.5 border border-gold text-gold font-body text-sm tracking-wide rounded hover:bg-gold hover:text-background transition-all duration-300"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
