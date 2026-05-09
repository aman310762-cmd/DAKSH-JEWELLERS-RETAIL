'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface OrderSuccessData {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  items: { name: string; weight: number; purity: string; qty: number }[];
}

interface OrderSuccessProps {
  order: OrderSuccessData;
}

/* Animated checkmark SVG */
function AnimatedCheck() {
  return (
    <div className="relative w-24 h-24 mx-auto mb-6">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full"
      >
        {/* Circle */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
        {/* Checkmark */}
        <motion.path
          d="M30 52 L44 66 L70 38"
          fill="none"
          stroke="#C9A84C"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
        />
      </motion.svg>
      {/* Glow */}
      <div className="absolute inset-0 rounded-full bg-gold/5 animate-pulse" />
    </div>
  );
}

export default function OrderSuccess({ order }: OrderSuccessProps) {
  const waUrl = `https://wa.me/919896424648?text=${encodeURIComponent(
    `Hi Daksh Jewellers, I just placed order ${order.orderId}. Please confirm.`
  )}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg mx-auto text-center"
    >
      {/* Animated Checkmark */}
      <AnimatedCheck />

      {/* Heading */}
      <h1 className="font-heading text-3xl sm:text-4xl text-text-primary font-semibold mb-3">
        Order Placed Successfully!
      </h1>

      {/* Order ID */}
      <p className="font-mono text-lg text-gold mb-8 tracking-wider">
        #{order.orderId}
      </p>

      {/* Summary Card */}
      <div className="bg-surface border border-border-gold rounded p-6 text-left space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="font-body text-xs text-text-muted">Customer</p>
            <p className="font-body text-sm text-text-primary">{order.customerName}</p>
          </div>
          <div>
            <p className="font-body text-xs text-text-muted">Phone</p>
            <p className="font-body text-sm text-text-primary">{order.phone}</p>
          </div>
        </div>
        <div>
          <p className="font-body text-xs text-text-muted">Delivery Address</p>
          <p className="font-body text-sm text-text-primary">
            {order.address}, {order.city} {order.pincode}
          </p>
        </div>

        {/* Items */}
        <div>
          <p className="font-body text-xs text-text-muted mb-2">Items Ordered</p>
          <div className="space-y-1.5">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between font-body text-sm">
                <span className="text-text-primary truncate flex-1 mr-2">{item.name}</span>
                <span className="text-text-muted shrink-0">
                  {item.weight}g · {item.purity} × {item.qty}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Confirmation Message */}
      <div className="bg-[rgba(201,168,76,0.05)] border border-border-gold rounded p-5 mb-8">
        <p className="font-body text-sm text-text-muted leading-relaxed">
          Our team will contact you on <span className="text-gold font-medium">+91 {order.phone}</span> within
          2 hours to confirm your order and arrange delivery.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 bg-whatsapp text-white font-body text-sm font-medium rounded hover:brightness-110 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Track via WhatsApp
        </a>
        <Link
          href="/shop"
          className="flex-1 flex items-center justify-center py-3.5 border border-gold text-gold font-body text-sm tracking-wide rounded hover:bg-gold hover:text-background transition-all"
        >
          Continue Shopping
        </Link>
      </div>
    </motion.div>
  );
}
