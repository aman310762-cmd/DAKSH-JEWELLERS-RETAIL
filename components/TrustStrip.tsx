'use client';

export default function TrustStrip() {
  const items = [
    'BIS Hallmarked Gold',
    'Cash on Delivery',
    'Local Delivery — Bhiwadi',
    'Genuine Purity Guaranteed',
    'WhatsApp Orders Welcome',
  ];

  const marqueeText = items.join('  ✦  ') + '  ✦  ';

  return (
    <section className="relative w-full bg-surface border-t border-b border-border-gold overflow-hidden py-4">
      <div className="animate-marquee flex whitespace-nowrap">
        {[0, 1].map((_, idx) => (
          <span
            key={idx}
            className="font-body text-sm sm:text-base tracking-wider text-gold mx-0"
          >
            {marqueeText}
          </span>
        ))}
      </div>
    </section>
  );
}
