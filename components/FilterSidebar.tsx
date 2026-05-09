'use client';

const categories = [
  'Gold Chains',
  'Gold Rings',
  'Gold Earrings',
  'Gold Bangles',
  'Gold Necklaces',
  'Bridal Jewellery',
  'Pendants',
  'Kids Jewellery',
];

const purities = ['18K', '22K', '24K'];

interface FilterSidebarProps {
  selectedCategories: string[];
  selectedPurities: string[];
  weightRange: [number, number];
  availability: string;
  onCategoryChange: (cat: string) => void;
  onPurityChange: (p: string) => void;
  onWeightChange: (range: [number, number]) => void;
  onAvailabilityChange: (a: string) => void;
  onClearAll: () => void;
}

export default function FilterSidebar({
  selectedCategories,
  selectedPurities,
  weightRange,
  availability,
  onCategoryChange,
  onPurityChange,
  onWeightChange,
  onAvailabilityChange,
  onClearAll,
}: FilterSidebarProps) {
  const hasFilters =
    selectedCategories.length > 0 ||
    selectedPurities.length > 0 ||
    weightRange[0] > 0 ||
    weightRange[1] < 130 ||
    availability !== 'all';

  return (
    <aside className="w-[260px] shrink-0 hidden lg:block">
      <div className="sticky top-24 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-lg text-text-primary">Filters</h3>
          {hasFilters && (
            <button
              onClick={onClearAll}
              className="font-body text-xs text-gold hover:text-gold-light transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Category */}
        <div className="space-y-3">
          <h4 className="font-body text-sm font-medium text-text-primary tracking-wide">Category</h4>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-sm border transition-all duration-200 flex items-center justify-center ${
                  selectedCategories.includes(cat)
                    ? 'bg-gold border-gold'
                    : 'border-border-gold-strong group-hover:border-gold/50'
                }`}>
                  {selectedCategories.includes(cat) && (
                    <svg className="w-3 h-3 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-body text-sm text-text-muted group-hover:text-text-primary transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-border-gold" />

        {/* Purity */}
        <div className="space-y-3">
          <h4 className="font-body text-sm font-medium text-text-primary tracking-wide">Purity</h4>
          <div className="space-y-2">
            {purities.map((p) => (
              <label key={p} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-sm border transition-all duration-200 flex items-center justify-center ${
                  selectedPurities.includes(p)
                    ? 'bg-gold border-gold'
                    : 'border-border-gold-strong group-hover:border-gold/50'
                }`}>
                  {selectedPurities.includes(p) && (
                    <svg className="w-3 h-3 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="font-body text-sm text-text-muted group-hover:text-text-primary transition-colors">
                  {p}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-border-gold" />

        {/* Weight Range */}
        <div className="space-y-3">
          <h4 className="font-body text-sm font-medium text-text-primary tracking-wide">
            Weight: {weightRange[0]}g – {weightRange[1]}g
          </h4>
          <div className="space-y-3 px-1">
            <div className="flex items-center gap-3">
              <span className="font-body text-xs text-text-muted w-6">Min</span>
              <input
                type="range"
                min={0}
                max={130}
                step={1}
                value={weightRange[0]}
                onChange={(e) => onWeightChange([Number(e.target.value), weightRange[1]])}
                className="flex-1 accent-gold h-1 bg-surface-raised rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="font-body text-xs text-text-muted w-6">Max</span>
              <input
                type="range"
                min={0}
                max={130}
                step={1}
                value={weightRange[1]}
                onChange={(e) => onWeightChange([weightRange[0], Number(e.target.value)])}
                className="flex-1 accent-gold h-1 bg-surface-raised rounded appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-border-gold" />

        {/* Availability */}
        <div className="space-y-3">
          <h4 className="font-body text-sm font-medium text-text-primary tracking-wide">Availability</h4>
          <div className="space-y-2">
            {[
              { label: 'All', value: 'all' },
              { label: 'In Stock', value: 'In Stock' },
              { label: 'Made to Order', value: 'Made to Order' },
            ].map((opt) => (
              <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded-full border transition-all duration-200 flex items-center justify-center ${
                  availability === opt.value
                    ? 'border-gold'
                    : 'border-border-gold-strong group-hover:border-gold/50'
                }`}>
                  {availability === opt.value && (
                    <div className="w-2 h-2 rounded-full bg-gold" />
                  )}
                </div>
                <span className="font-body text-sm text-text-muted group-hover:text-text-primary transition-colors">
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
