'use client';

interface ProductBadgeProps {
  variant: 'weight' | 'purity' | 'availability' | 'category';
  value: string;
}

export default function ProductBadge({ variant, value }: ProductBadgeProps) {
  const baseClasses = 'inline-flex items-center px-2.5 py-1 text-xs font-body rounded tracking-wide';

  const variantClasses: Record<string, string> = {
    weight: 'bg-[rgba(201,168,76,0.1)] border border-border-gold text-gold',
    purity: 'bg-[rgba(201,168,76,0.1)] border border-border-gold text-gold',
    category: 'bg-[rgba(201,168,76,0.05)] border border-border-gold text-text-muted',
    availability: value === 'In Stock'
      ? 'bg-[rgba(34,197,94,0.1)] border border-green-800/50 text-green-400'
      : 'bg-[rgba(245,158,11,0.1)] border border-amber-800/50 text-amber-400',
  };

  const displayValue: Record<string, string> = {
    weight: `${value}g`,
    purity: value,
    availability: value === 'In Stock' ? '✓ In Stock' : '⏱ Made to Order',
    category: value,
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {displayValue[variant]}
    </span>
  );
}
