'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import OrderSummary from '@/components/OrderSummary';
import { useCartStore } from '@/store/cartStore';

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch with Zustand persist
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="h-8 w-40 bg-surface-raised rounded animate-pulse" />
          </div>
        </main>
      </>
    );
  }

  /* Empty Cart State */
  if (items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center justify-center text-center">
            {/* Empty jewellery box SVG */}
            <div className="mb-8">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="mx-auto opacity-30">
                <rect x="20" y="40" width="80" height="60" rx="4" stroke="#C9A84C" strokeWidth="1.5" />
                <path d="M20 55h80" stroke="#C9A84C" strokeWidth="1" opacity="0.5" />
                <path d="M40 40L50 25h20l10 15" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                <circle cx="60" cy="72" r="8" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
                <path d="M56 72l3 3 5-6" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
              </svg>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mb-3">
              Your collection awaits
            </h2>
            <p className="font-body text-sm text-text-muted mb-8 max-w-sm">
              Browse our exquisite handcrafted gold jewellery and add pieces to your cart.
            </p>
            <Link
              href="/shop"
              className="px-8 py-3.5 bg-gold text-background font-body text-sm font-semibold tracking-wide rounded hover:brightness-110 transition-all"
            >
              Browse Jewellery
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-heading text-3xl text-text-primary font-semibold mb-8">
            Your Cart
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence mode="popLayout">
                {items.map((item) => (
                  <CartItem key={item.productId} item={item} />
                ))}
              </AnimatePresence>
            </div>

            {/* Order Summary — Sidebar on desktop, below on mobile */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary showCheckoutButton={true} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
