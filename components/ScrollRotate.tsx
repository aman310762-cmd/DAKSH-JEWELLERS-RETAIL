'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface ScrollRotateProps {
  imageSrc: string;
  alt: string;
}

export default function ScrollRotate({ imageSrc, alt }: ScrollRotateProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);

  useEffect(() => {
    // Check if mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowH = window.innerHeight;

      // Calculate scroll progress within the section
      const start = rect.top + window.scrollY - windowH;
      const end = rect.top + window.scrollY + rect.height;
      const scrollPos = window.scrollY;
      const progress = Math.max(0, Math.min(1, (scrollPos - start) / (end - start)));

      setRotation(progress * 360);

      // Hide hint after first scroll interaction
      if (progress > 0.05) {
        setHintVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Auto-hide hint after 3s
    const hintTimer = setTimeout(() => setHintVisible(false), 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(hintTimer);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative aspect-square overflow-hidden rounded bg-[#0a0a0a]">
      <div
        className="w-full h-full transition-transform duration-100"
        style={{ transform: `perspective(1000px) rotateY(${rotation}deg)` }}
      >
        <Image
          src={imageSrc}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.3)] to-transparent pointer-events-none" />

      {/* Scroll to rotate hint — desktop only */}
      {hintVisible && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-pulse pointer-events-none">
          <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path d="M4 12a8 8 0 0116 0M9 12l3-3m0 0l3 3m-3-3v9" />
          </svg>
          <span className="font-body text-[10px] text-gold/70 tracking-[0.2em] uppercase">
            Scroll to rotate
          </span>
        </div>
      )}
    </div>
  );
}
