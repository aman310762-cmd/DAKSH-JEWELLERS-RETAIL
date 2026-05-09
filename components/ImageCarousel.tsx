'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';

interface ImageData {
  publicId: string;
  secureUrl: string;
}

interface ImageCarouselProps {
  images: ImageData[];
  productName: string;
}

export default function ImageCarousel({ images, productName }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      if (diff > 0 && activeIndex < images.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (diff < 0 && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    }
  }, [activeIndex, images.length]);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square bg-surface-raised rounded flex items-center justify-center">
        <span className="text-text-muted font-body text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div
        className="relative aspect-square overflow-hidden rounded bg-[#0a0a0a]"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[activeIndex]?.secureUrl || '/images/hero-necklace.jpg'}
          alt={`${productName} - Image ${activeIndex + 1}`}
          fill
          priority={activeIndex === 0}
          className="object-cover transition-all duration-500"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.3)] to-transparent pointer-events-none" />

        {/* Image counter (mobile) */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 md:hidden">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'bg-gold w-4' : 'bg-text-muted/40'
                }`}
              />
            ))}
          </div>
        )}

        {/* Swipe hint on mobile */}
        {images.length > 1 && activeIndex === 0 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 md:hidden">
            <span className="font-body text-[10px] text-text-muted/60 tracking-wider uppercase animate-pulse">
              ← Swipe →
            </span>
          </div>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="hidden md:flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`relative w-20 h-20 rounded overflow-hidden border-2 transition-all duration-300 ${
                i === activeIndex
                  ? 'border-gold shadow-[0_0_10px_rgba(201,168,76,0.3)]'
                  : 'border-border-gold hover:border-gold/40'
              }`}
            >
              <Image
                src={img.secureUrl}
                alt={`${productName} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
