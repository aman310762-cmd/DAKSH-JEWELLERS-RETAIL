'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const raysRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const dakshRef = useRef<HTMLHeadingElement>(null);
  const jewellersRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  /* ── Cinematic Load Sequence ─────────────────────── */
  useEffect(() => {
    if (!imageLoaded) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 0.0s — initial state (set in JSX)
      // 0.3s — gold light point appears
      tl.to(lightRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
      }, 0.3);

      // 0.8s — light expands into rays
      tl.to(raysRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: 'power2.out',
      }, 0.8);

      // 1.2s — hero image zooms in
      tl.to(imageRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2.5,
        ease: 'power2.out',
      }, 1.2);

      // 2.0s — "DAKSH" shimmer fade
      tl.to(dakshRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
      }, 2.0);

      // 2.5s — "JEWELLERS" letter by letter
      if (jewellersRef.current) {
        const letters = jewellersRef.current.querySelectorAll('.letter');
        tl.to(letters, {
          opacity: 1,
          y: 0,
          stagger: 0.05,
          duration: 0.4,
        }, 2.5);
      }

      // 3.0s — tagline fade
      tl.to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, 3.0);

      // 3.5s — CTA button appears
      tl.to(ctaRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      }, 3.5);
    }, heroRef);

    return () => ctx.revert();
  }, [imageLoaded]);

  /* ── Parallax on Scroll ──────────────────────────── */
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const heroHeight = heroRef.current.offsetHeight;
      const ratio = Math.min(scrollY / heroHeight, 1);

      if (imageRef.current) {
        imageRef.current.style.transform = `scale(1) translateY(${scrollY * 0.3}px)`;
      }
      if (raysRef.current) {
        raysRef.current.style.opacity = String(1 - ratio);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const jewellersLetters = 'JEWELLERS'.split('');

  return (
    <section
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-[#080808]"
      id="hero"
    >
      {/* ── Gold Light Point ───────────────────────── */}
      <div
        ref={lightRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full z-10 pointer-events-none"
        style={{
          opacity: 0,
          scale: 0.3,
          background: 'radial-gradient(circle, rgba(201,168,76,0.4) 0%, rgba(201,168,76,0.1) 40%, transparent 70%)',
        }}
      />

      {/* ── Light Rays ─────────────────────────────── */}
      <div
        ref={raysRef}
        className="hero-rays z-10"
        style={{ opacity: 0, scale: 0.5 }}
      />

      {/* ── Hero Image ─────────────────────────────── */}
      <div
        ref={imageRef}
        className="absolute inset-0 z-0"
        style={{ opacity: 0, scale: 1.15 }}
      >
        <Image
          src="/images/hero-necklace.jpg"
          alt="Exquisite gold necklace from Daksh Jewellers"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          onLoad={() => setImageLoaded(true)}
        />
      </div>

      {/* ── Vignette Overlay ───────────────────────── */}
      <div className="absolute inset-0 vignette z-[5]" />

      {/* ── Dark Gradient Overlay (stronger for text readability) ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[rgba(8,8,8,0.55)] to-[rgba(8,8,8,0.3)] z-[6]" />

      {/* ── Center darken for text contrast ─── */}
      <div className="absolute inset-0 z-[7]" style={{ background: 'radial-gradient(ellipse at center 55%, rgba(8,8,8,0.6) 0%, transparent 70%)' }} />

      {/* ── Text Content ───────────────────────────── */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        {/* DAKSH */}
        <h1
          ref={dakshRef}
          className="text-shimmer font-heading text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-[0.2em] mb-2"
          style={{ opacity: 0, transform: 'translateY(30px)', textShadow: '0 2px 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5)' }}
        >
          DAKSH
        </h1>

        {/* JEWELLERS — letter by letter */}
        <div ref={jewellersRef} className="flex gap-[2px] sm:gap-1 mb-6">
          {jewellersLetters.map((letter, i) => (
            <span
              key={i}
              className="letter font-heading text-xl sm:text-2xl md:text-3xl tracking-[0.5em] text-gold font-light drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]"
              style={{ opacity: 0, transform: 'translateY(15px)' }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-body text-white/80 text-sm sm:text-base md:text-lg tracking-widest mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          style={{ opacity: 0, transform: 'translateY(15px)' }}
        >
          Where Tradition Meets Luxury
        </p>

        {/* CTA Button */}
        <div
          ref={ctaRef}
          style={{ opacity: 0, transform: 'translateY(15px)' }}
        >
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-gold text-gold font-body text-sm tracking-wider uppercase hover:bg-gold hover:text-background transition-all duration-500 gold-pulse rounded"
          >
            Explore Collection
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* ── Scroll Indicator ───────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 opacity-60">
        <span className="font-body text-[10px] tracking-[0.3em] text-text-muted uppercase">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
}
