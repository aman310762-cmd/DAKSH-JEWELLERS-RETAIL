'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { checkoutSchema, CheckoutFormData } from '@/lib/validations/checkout';
import { useCartStore } from '@/store/cartStore';

interface CheckoutFormProps {
  onSuccess: (orderId: string) => void;
}

export default function CheckoutForm({ onSuccess }: CheckoutFormProps) {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      city: 'Bhiwadi',
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    setSubmitting(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const orderData = {
        customerName: data.fullName,
        phone: data.phone,
        address: data.address,
        city: data.city,
        pincode: data.pincode,
        landmark: data.landmark || '',
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          weight: item.weight,
          purity: item.purity,
          category: item.category,
          qty: item.qty,
        })),
        paymentMethod: 'COD',
        status: 'pending',
      };

      let orderId = `DJW-${Date.now()}`;

      try {
        const res = await fetch(`${apiUrl}/api/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        if (res.ok) {
          const result = await res.json();
          orderId = result.orderId || orderId;
        }
      } catch {
        // API unavailable — use local orderId
      }

      // Build WhatsApp notification for owner
      const itemList = items.map((i) => `${i.name} (${i.weight}g, ${i.purity}) x${i.qty}`).join(', ');
      const waText = encodeURIComponent(
        `🛍️ NEW ORDER — ${orderId}\nCustomer: ${data.fullName}\nPhone: ${data.phone}\nItems: ${itemList}\nAddress: ${data.address}, ${data.city} ${data.pincode}\nPayment: Cash on Delivery`
      );
      const waUrl = `https://wa.me/919896424648?text=${waText}`;

      // Open WhatsApp notification
      window.open(waUrl, '_blank');

      // Clear cart
      clearCart();

      // Redirect to success page
      onSuccess(orderId);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Full Name */}
      <div>
        <label className="block font-body text-sm text-text-primary mb-1.5">
          Full Name <span className="text-gold">*</span>
        </label>
        <input
          {...register('fullName')}
          placeholder="Enter your full name"
          className="w-full px-4 py-3 bg-surface-raised border border-border-gold rounded font-body text-sm text-text-primary placeholder:text-text-muted/50 focus:border-gold focus:outline-none transition-colors"
        />
        {errors.fullName && (
          <p className="mt-1 font-body text-xs text-amber-400">{errors.fullName.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label className="block font-body text-sm text-text-primary mb-1.5">
          Phone Number <span className="text-gold">*</span>
        </label>
        <input
          {...register('phone')}
          type="tel"
          inputMode="numeric"
          placeholder="10-digit mobile number"
          maxLength={10}
          className="w-full px-4 py-3 bg-surface-raised border border-border-gold rounded font-body text-sm text-text-primary placeholder:text-text-muted/50 focus:border-gold focus:outline-none transition-colors"
        />
        {errors.phone && (
          <p className="mt-1 font-body text-xs text-amber-400">{errors.phone.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="block font-body text-sm text-text-primary mb-1.5">
          Full Address <span className="text-gold">*</span>
        </label>
        <textarea
          {...register('address')}
          rows={3}
          placeholder="House/flat no., street, area, locality"
          className="w-full px-4 py-3 bg-surface-raised border border-border-gold rounded font-body text-sm text-text-primary placeholder:text-text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
        />
        {errors.address && (
          <p className="mt-1 font-body text-xs text-amber-400">{errors.address.message}</p>
        )}
      </div>

      {/* City + Pincode */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-body text-sm text-text-primary mb-1.5">
            City <span className="text-gold">*</span>
          </label>
          <input
            {...register('city')}
            placeholder="Bhiwadi"
            className="w-full px-4 py-3 bg-surface-raised border border-border-gold rounded font-body text-sm text-text-primary placeholder:text-text-muted/50 focus:border-gold focus:outline-none transition-colors"
          />
          {errors.city && (
            <p className="mt-1 font-body text-xs text-amber-400">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label className="block font-body text-sm text-text-primary mb-1.5">
            Pincode <span className="text-gold">*</span>
          </label>
          <input
            {...register('pincode')}
            type="text"
            inputMode="numeric"
            placeholder="6-digit pincode"
            maxLength={6}
            className="w-full px-4 py-3 bg-surface-raised border border-border-gold rounded font-body text-sm text-text-primary placeholder:text-text-muted/50 focus:border-gold focus:outline-none transition-colors"
          />
          {errors.pincode && (
            <p className="mt-1 font-body text-xs text-amber-400">{errors.pincode.message}</p>
          )}
        </div>
      </div>

      {/* Landmark */}
      <div>
        <label className="block font-body text-sm text-text-primary mb-1.5">
          Landmark / Special Instructions
        </label>
        <textarea
          {...register('landmark')}
          rows={2}
          placeholder="Near temple, opposite park, etc. (optional)"
          className="w-full px-4 py-3 bg-surface-raised border border-border-gold rounded font-body text-sm text-text-primary placeholder:text-text-muted/50 focus:border-gold focus:outline-none transition-colors resize-none"
        />
      </div>

      {/* Delivery Note */}
      <div className="bg-[rgba(201,168,76,0.05)] border border-border-gold rounded p-4">
        <p className="font-body text-xs text-text-muted leading-relaxed">
          📍 We currently deliver within Bhiwadi and nearby areas only. Our team will confirm delivery availability on WhatsApp.
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-500/10 border border-red-800/30 rounded p-3">
          <p className="font-body text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full py-4 bg-gold text-background font-body text-sm font-semibold tracking-wide rounded hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {submitting ? (
          <>
            <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
            Placing Order...
          </>
        ) : (
          'Place Order'
        )}
      </button>
    </form>
  );
}
