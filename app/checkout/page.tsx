'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CheckoutForm from '@/components/CheckoutForm';
import OrderSummary from '@/components/OrderSummary';
import { useCartStore } from '@/store/cartStore';

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Guard: redirect to shop if cart is empty
  useEffect(() => {
    if (mounted && items.length === 0) {
      router.push('/shop');
    }
  }, [mounted, items.length, router]);

  if (!mounted || items.length === 0) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background pt-24 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </main>
      </>
    );
  }

  const handleSuccess = (orderId: string) => {
    router.push(`/order-success/${orderId}`);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-heading text-3xl text-text-primary font-semibold mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <CheckoutForm onSuccess={handleSuccess} />
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <OrderSummary showCheckoutButton={false} />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
