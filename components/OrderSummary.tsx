'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';

interface OrderSummaryProps {
  showCheckoutButton?: boolean;
}

export default function OrderSummary({ showCheckoutButton = true }: OrderSummaryProps) {
  const items = useCartStore((s) => s.items);
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <div className="bg-surface border border-border-gold rounded p-6 space-y-5">
      <h3 className="font-heading text-lg text-text-primary">Order Summary</h3>

      {/* Item List */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {items.map((item) => (
          <div key={item.productId} className="flex items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <p className="font-body text-sm text-text-primary truncate">{item.name}</p>
              <p className="font-body text-xs text-text-muted">{item.weight}g · {item.purity}</p>
            </div>
            <span className="font-body text-sm text-text-muted shrink-0">×{item.qty}</span>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-border-gold" />

      {/* Summary */}
      <div className="space-y-2">
        <div className="flex justify-between font-body text-sm">
          <span className="text-text-muted">Total Items</span>
          <span className="text-text-primary font-medium">{totalItems}</span>
        </div>
        <div className="flex justify-between font-body text-sm">
          <span className="text-text-muted">Payment</span>
          <span className="text-text-primary font-medium">Cash on Delivery</span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-border-gold" />

      {/* Price notice */}
      <div className="bg-[rgba(201,168,76,0.05)] border border-border-gold rounded p-3">
        <p className="font-body text-xs text-gold leading-relaxed">
          Price on Inquiry — Final price will be confirmed via WhatsApp after you place the order.
        </p>
      </div>

      {/* Buttons */}
      {showCheckoutButton && (
        <div className="space-y-3">
          <Link
            href="/checkout"
            className="block text-center py-3.5 bg-gold text-background font-body text-sm font-semibold tracking-wide rounded hover:brightness-110 transition-all"
          >
            Proceed to Checkout →
          </Link>
          <Link
            href="/shop"
            className="block text-center py-3 border border-border-gold text-text-muted font-body text-sm rounded hover:text-gold hover:border-gold/40 transition-all"
          >
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
}
