'use client';

import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FilterSidebar from '@/components/FilterSidebar';
import FilterDrawer from '@/components/FilterDrawer';
import ProductGrid from '@/components/ProductGrid';
import Pagination from '@/components/Pagination';

interface Product {
  _id: string;
  name: string;
  weight: number;
  purity: string;
  images: { publicId: string; secureUrl: string }[];
  availability?: string;
  category?: string;
}

/* ── Demo products for offline/dev mode ──────────── */
const demoProducts: Product[] = [
  // Gold Necklaces
  { _id: 'd1', name: 'Royal Kundan Necklace Set', weight: 45.5, purity: '22K', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'In Stock', category: 'Gold Necklaces' },
  { _id: 'd13', name: 'Mango Haar Necklace', weight: 52.0, purity: '22K', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'Made to Order', category: 'Gold Necklaces' },
  { _id: 'd14', name: 'Temple Laxmi Necklace Set', weight: 38.0, purity: '22K', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'In Stock', category: 'Gold Necklaces' },

  // Gold Chains
  { _id: 'd2', name: 'Classic Rope Gold Chain', weight: 12.3, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-chain.jpg' }], availability: 'In Stock', category: 'Gold Chains' },
  { _id: 'd9', name: 'Italian Bismark Chain', weight: 18.5, purity: '24K', images: [{ publicId: '', secureUrl: '/images/gold-chain.jpg' }], availability: 'In Stock', category: 'Gold Chains' },
  { _id: 'd15', name: 'Box Link Daily Wear Chain', weight: 8.0, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-chain.jpg' }], availability: 'In Stock', category: 'Gold Chains' },

  // Gold Earrings
  { _id: 'd3', name: 'Bridal Temple Jhumka', weight: 8.7, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-earrings.jpg' }], availability: 'Made to Order', category: 'Gold Earrings' },
  { _id: 'd10', name: 'Antique Gold Jhumka', weight: 10.2, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-earrings.jpg' }], availability: 'In Stock', category: 'Gold Earrings' },
  { _id: 'd16', name: 'Chandbali Pearl Earrings', weight: 12.5, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-earrings.jpg' }], availability: 'In Stock', category: 'Gold Earrings' },

  // Gold Bangles
  { _id: 'd4', name: 'Traditional Meenakari Bangle Set', weight: 32.0, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-bangles.jpg' }], availability: 'In Stock', category: 'Gold Bangles' },
  { _id: 'd17', name: 'Daily Wear Plain Bangle Pair', weight: 16.0, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-bangles.jpg' }], availability: 'In Stock', category: 'Gold Bangles' },
  { _id: 'd18', name: 'Rajasthani Kada Bangle', weight: 28.0, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-bangles.jpg' }], availability: 'Made to Order', category: 'Gold Bangles' },

  // Gold Rings
  { _id: 'd5', name: 'Temple Design Gold Ring', weight: 6.2, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-ring.jpg' }], availability: 'In Stock', category: 'Gold Rings' },
  { _id: 'd11', name: 'Solitaire Gold Ring', weight: 5.0, purity: '18K', images: [{ publicId: '', secureUrl: '/images/gold-ring.jpg' }], availability: 'In Stock', category: 'Gold Rings' },
  { _id: 'd19', name: 'Men\'s Classic Band Ring', weight: 8.5, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-ring.jpg' }], availability: 'In Stock', category: 'Gold Rings' },

  // Pendants
  { _id: 'd6', name: 'Floral Diamond Pendant', weight: 4.5, purity: '18K', images: [{ publicId: '', secureUrl: '/images/gold-pendant.jpg' }], availability: 'In Stock', category: 'Pendants' },
  { _id: 'd12', name: 'Peacock Pendant with Chain', weight: 7.5, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-pendant.jpg' }], availability: 'Made to Order', category: 'Pendants' },
  { _id: 'd20', name: 'Om Pendant Gold', weight: 3.2, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-pendant.jpg' }], availability: 'In Stock', category: 'Pendants' },

  // Bridal Jewellery
  { _id: 'd7', name: 'Heavy Bridal Necklace Set', weight: 48.0, purity: '22K', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'Made to Order', category: 'Bridal Jewellery' },
  { _id: 'd21', name: 'Complete Bridal Set — 5 Pieces', weight: 120.0, purity: '22K', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'Made to Order', category: 'Bridal Jewellery' },
  { _id: 'd22', name: 'Bridal Choker Necklace', weight: 35.0, purity: '22K', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'Made to Order', category: 'Bridal Jewellery' },

  // Kids Jewellery
  { _id: 'd8', name: 'Kids Gold Bangle Pair', weight: 3.8, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-bangles.jpg' }], availability: 'In Stock', category: 'Kids Jewellery' },
  { _id: 'd23', name: 'Baby Gold Chain with Bell', weight: 2.5, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-chain.jpg' }], availability: 'In Stock', category: 'Kids Jewellery' },
  { _id: 'd24', name: 'Kids Tiny Stud Earrings', weight: 1.5, purity: '22K', images: [{ publicId: '', secureUrl: '/images/gold-earrings.jpg' }], availability: 'In Stock', category: 'Kids Jewellery' },
];

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Weight: Low–High', value: 'weight_asc' },
  { label: 'Weight: High–Low', value: 'weight_desc' },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedPurities, setSelectedPurities] = useState<string[]>([]);
  const [weightRange, setWeightRange] = useState<[number, number]>([0, 130]);
  const [availability, setAvailability] = useState('all');
  const [sort, setSort] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const PRODUCTS_PER_PAGE = 12;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const params = new URLSearchParams();
      if (selectedCategories.length > 0) params.set('category', selectedCategories.join(','));
      if (selectedPurities.length > 0) params.set('purity', selectedPurities.join(','));
      params.set('page', String(currentPage));
      params.set('sort', sort);

      const res = await fetch(`${apiUrl}/api/products?${params.toString()}`, { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
          setTotalPages(data.totalPages || 1);
        } else {
          applyLocalFilters();
        }
      } else {
        applyLocalFilters();
      }
    } catch {
      applyLocalFilters();
    } finally {
      setLoading(false);
    }
  }, [selectedCategories, selectedPurities, sort, currentPage]);

  /* Local filtering for demo mode */
  const applyLocalFilters = useCallback(() => {
    let filtered = [...demoProducts];

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => p.category && selectedCategories.includes(p.category));
    }
    if (selectedPurities.length > 0) {
      filtered = filtered.filter((p) => selectedPurities.includes(p.purity));
    }
    if (weightRange[0] > 0 || weightRange[1] < 130) {
      filtered = filtered.filter((p) => p.weight >= weightRange[0] && p.weight <= weightRange[1]);
    }
    if (availability !== 'all') {
      filtered = filtered.filter((p) => p.availability === availability);
    }

    // Sort
    if (sort === 'weight_asc') filtered.sort((a, b) => a.weight - b.weight);
    else if (sort === 'weight_desc') filtered.sort((a, b) => b.weight - a.weight);

    setTotalPages(Math.ceil(filtered.length / PRODUCTS_PER_PAGE));
    const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
    setProducts(filtered.slice(start, start + PRODUCTS_PER_PAGE));
  }, [selectedCategories, selectedPurities, weightRange, availability, sort, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  /* When filters change locally, also apply */
  useEffect(() => {
    applyLocalFilters();
  }, [applyLocalFilters]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
    setCurrentPage(1);
  };

  const togglePurity = (p: string) => {
    setSelectedPurities((prev) =>
      prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
    );
    setCurrentPage(1);
  };

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedPurities([]);
    setWeightRange([0, 50]);
    setAvailability('all');
    setCurrentPage(1);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-heading text-3xl sm:text-4xl text-text-primary font-semibold mb-2">
              Our Collection
            </h1>
            <p className="font-body text-sm text-text-muted">
              Explore our handcrafted gold jewellery — each piece certified BIS hallmarked.
            </p>
          </div>

          {/* Mobile Filter + Sort Bar */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-border-gold rounded font-body text-sm text-text-muted hover:text-gold hover:border-gold/40 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path d="M3 4h18M3 12h18M3 20h18" />
              </svg>
              Filter
            </button>
            <select
              value={sort}
              onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}
              className="bg-surface border border-border-gold rounded px-3 py-2.5 font-body text-sm text-text-muted focus:border-gold focus:outline-none appearance-none cursor-pointer"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-8">
            {/* Desktop Sidebar */}
            <FilterSidebar
              selectedCategories={selectedCategories}
              selectedPurities={selectedPurities}
              weightRange={weightRange}
              availability={availability}
              onCategoryChange={toggleCategory}
              onPurityChange={togglePurity}
              onWeightChange={(range) => { setWeightRange(range); setCurrentPage(1); }}
              onAvailabilityChange={(a) => { setAvailability(a); setCurrentPage(1); }}
              onClearAll={clearAll}
            />

            {/* Main Content */}
            <div className="flex-1">
              {/* Desktop Sort */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="font-body text-sm text-text-muted">
                  {products.length} {products.length === 1 ? 'product' : 'products'} found
                </p>
                <select
                  value={sort}
                  onChange={(e) => { setSort(e.target.value); setCurrentPage(1); }}
                  className="bg-surface border border-border-gold rounded px-3 py-2 font-body text-sm text-text-muted focus:border-gold focus:outline-none appearance-none cursor-pointer"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Product Grid */}
              <ProductGrid products={products} loading={loading} />

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                basePath="/shop"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      {/* Mobile Filter Drawer */}
      <FilterDrawer
        isOpen={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
        selectedCategories={selectedCategories}
        selectedPurities={selectedPurities}
        weightRange={weightRange}
        availability={availability}
        onCategoryChange={toggleCategory}
        onPurityChange={togglePurity}
        onWeightChange={(range) => { setWeightRange(range); setCurrentPage(1); }}
        onAvailabilityChange={(a) => { setAvailability(a); setCurrentPage(1); }}
        onClearAll={clearAll}
      />
    </>
  );
}

export default function ShopPage() {
  return (
    <Suspense>
      <ShopContent />
    </Suspense>
  );
}
