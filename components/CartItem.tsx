'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCartStore, CartItem as CartItemType } from '@/store/cartStore';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQty, removeItem } = useCartStore();

  return (
    <motion.div
      layout
      initial={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-4 p-4 bg-surface border border-border-gold rounded group"
    >
      {/* Image */}
      <div className="relative w-20 h-20 rounded overflow-hidden bg-[#0a0a0a] shrink-0">
        <Image
          src={item.image || '/images/hero-necklace.jpg'}
          alt={item.name}
          fill
          className="object-cover"
          sizes="80px"
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-heading text-base text-text-primary truncate mb-1">
          {item.name}
        </h3>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center px-2 py-0.5 bg-[rgba(201,168,76,0.1)] border border-border-gold text-gold text-xs font-body rounded">
            {item.weight}g
          </span>
          <span className="inline-flex items-center px-2 py-0.5 bg-[rgba(201,168,76,0.1)] border border-border-gold text-gold text-xs font-body rounded">
            {item.purity}
          </span>
        </div>
        <p className="font-body text-xs text-text-muted">Price on Inquiry</p>
      </div>

      {/* Quantity + Remove */}
      <div className="flex flex-col items-end justify-between shrink-0">
        {/* Qty Controls */}
        <div className="flex items-center border border-border-gold rounded">
          <button
            onClick={() => updateQty(item.productId, item.qty - 1)}
            className="w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center text-text-muted hover:text-gold hover:bg-gold/5 transition-all font-body text-lg"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-11 h-11 sm:w-8 sm:h-8 flex items-center justify-center font-body text-sm text-text-primary border-x border-border-gold">
            {item.qty}
          </span>
          <button
            onClick={() => updateQty(item.productId, item.qty + 1)}
            className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-gold hover:bg-gold/5 transition-all font-body text-lg"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        {/* Remove */}
        <button
          onClick={() => removeItem(item.productId)}
          className="text-text-muted/50 hover:text-red-400 transition-colors p-1"
          aria-label="Remove item"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}
