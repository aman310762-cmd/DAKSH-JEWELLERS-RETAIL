'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const categories = [
  'Gold Chains', 'Gold Rings', 'Gold Earrings', 'Gold Bangles',
  'Gold Necklaces', 'Bridal Jewellery', 'Pendants', 'Kids Jewellery',
];
const purities = ['18K', '22K', '24K'];

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
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

export default function FilterDrawer({
  isOpen, onClose,
  selectedCategories, selectedPurities, weightRange, availability,
  onCategoryChange, onPurityChange, onWeightChange, onAvailabilityChange, onClearAll,
}: FilterDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const hasFilters = selectedCategories.length > 0 || selectedPurities.length > 0 || weightRange[0] > 0 || weightRange[1] < 50 || availability !== 'all';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[rgba(0,0,0,0.6)]"
            onClick={onClose}
          />
          {/* Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* Handle */}
            <div className="sticky top-0 bg-surface pt-3 pb-4 px-5 border-b border-border-gold z-10">
              <div className="w-10 h-1 bg-text-muted/30 rounded-full mx-auto mb-4" />
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-lg text-text-primary">Filters</h3>
                <div className="flex items-center gap-4">
                  {hasFilters && (
                    <button onClick={onClearAll} className="font-body text-xs text-gold">Clear All</button>
                  )}
                  <button onClick={onClose} className="text-text-muted hover:text-text-primary transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-5 py-5 space-y-6 pb-24">
              {/* Category */}
              <div className="space-y-3">
                <h4 className="font-body text-sm font-medium text-text-primary">Category</h4>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => onCategoryChange(cat)}
                      className={`px-3 py-2 rounded text-sm font-body transition-all text-left ${
                        selectedCategories.includes(cat)
                          ? 'bg-gold/20 border border-gold text-gold'
                          : 'bg-surface-raised border border-border-gold text-text-muted'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-border-gold" />

              {/* Purity */}
              <div className="space-y-3">
                <h4 className="font-body text-sm font-medium text-text-primary">Purity</h4>
                <div className="flex gap-3">
                  {purities.map((p) => (
                    <button
                      key={p}
                      onClick={() => onPurityChange(p)}
                      className={`px-5 py-2 rounded text-sm font-body transition-all ${
                        selectedPurities.includes(p)
                          ? 'bg-gold/20 border border-gold text-gold'
                          : 'bg-surface-raised border border-border-gold text-text-muted'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[1px] bg-border-gold" />

              {/* Weight */}
              <div className="space-y-3">
                <h4 className="font-body text-sm font-medium text-text-primary">
                  Weight: {weightRange[0]}g – {weightRange[1]}g
                </h4>
                <input type="range" min={0} max={50} step={1} value={weightRange[0]}
                  onChange={(e) => onWeightChange([Number(e.target.value), weightRange[1]])}
                  className="w-full accent-gold h-1 bg-surface-raised rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
                />
                <input type="range" min={0} max={50} step={1} value={weightRange[1]}
                  onChange={(e) => onWeightChange([weightRange[0], Number(e.target.value)])}
                  className="w-full accent-gold h-1 bg-surface-raised rounded appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold"
                />
              </div>

              <div className="h-[1px] bg-border-gold" />

              {/* Availability */}
              <div className="space-y-3">
                <h4 className="font-body text-sm font-medium text-text-primary">Availability</h4>
                <div className="flex gap-3">
                  {[{ label: 'All', value: 'all' }, { label: 'In Stock', value: 'In Stock' }, { label: 'Made to Order', value: 'Made to Order' }].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => onAvailabilityChange(opt.value)}
                      className={`px-4 py-2 rounded text-sm font-body transition-all ${
                        availability === opt.value
                          ? 'bg-gold/20 border border-gold text-gold'
                          : 'bg-surface-raised border border-border-gold text-text-muted'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply button */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface border-t border-border-gold z-50">
              <button
                onClick={onClose}
                className="w-full py-3 bg-gold text-background font-body text-sm font-semibold rounded hover:brightness-110 transition-all"
              >
                Apply Filters
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
