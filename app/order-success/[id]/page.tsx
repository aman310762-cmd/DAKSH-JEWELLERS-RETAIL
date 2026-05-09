'use client';

import { useEffect, useState, use } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import OrderSuccessComponent from '@/components/OrderSuccess';

interface OrderData {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: { name: string; weight: number; purity: string; qty: number }[];
}

export default function OrderSuccessPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${apiUrl}/api/orders/${id}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setOrder(data.order || data);
        } else {
          // Fallback: show basic order info from URL
          setOrder({
            orderId: id,
            customerName: 'Customer',
            phone: '',
            address: '',
            city: 'Bhiwadi',
            pincode: '',
            items: [],
          });
        }
      } catch {
        setOrder({
          orderId: id,
          customerName: 'Customer',
          phone: '',
          address: '',
          city: 'Bhiwadi',
          pincode: '',
          items: [],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : order ? (
            <OrderSuccessComponent order={order} />
          ) : (
            <div className="text-center py-20">
              <h1 className="font-heading text-2xl text-text-primary mb-4">Order not found</h1>
              <p className="font-body text-text-muted">Please check your order ID or contact us on WhatsApp.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
