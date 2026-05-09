'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const categories = [
  { name: 'Gold Chains', image: '/images/gold-chain.jpg' },
  { name: 'Gold Rings', image: '/images/gold-ring.jpg' },
  { name: 'Gold Earrings', image: '/images/gold-earrings.jpg' },
  { name: 'Gold Bangles', image: '/images/gold-bangles.jpg' },
  { name: 'Gold Necklaces', image: '/images/hero-necklace.jpg' },
  { name: 'Bridal Jewellery', image: '/images/hero-necklace.jpg' },
  { name: 'Pendants', image: '/images/gold-pendant.jpg' },
  { name: 'Kids Jewellery', image: '/images/gold-bangles.jpg' },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function CategoryGrid() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="categories">
      {/* Section Header */}
      <div className="text-center mb-14">
        <p className="font-body text-sm tracking-[0.3em] text-gold uppercase mb-3">
          Browse By Category
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl text-text-primary font-semibold">
          Our Collections
        </h2>
        <div className="w-16 h-[1px] bg-gold mx-auto mt-5 opacity-50" />
      </div>

      {/* Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5"
      >
        {categories.map((cat) => (
          <motion.div key={cat.name} variants={cardVariants}>
            <Link
              href={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group block relative overflow-hidden rounded bg-surface border border-border-gold-strong hover:shadow-[0_0_25px_rgba(201,168,76,0.15)] transition-all duration-500"
            >
              {/* Real Product Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 280px"
                />
                {/* Dark overlay for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(8,8,8,0.8)] via-[rgba(8,8,8,0.2)] to-[rgba(8,8,8,0.1)] group-hover:from-[rgba(8,8,8,0.9)] transition-all duration-500" />
              </div>

              {/* Category Name */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
                <h3 className="font-heading text-base sm:text-lg text-white group-hover:text-gold transition-colors duration-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]">
                  {cat.name}
                </h3>
                <span className="font-body text-xs text-white/60 mt-1 flex items-center gap-1 group-hover:text-gold-light transition-colors duration-300">
                  Explore
                  <svg className="w-3 h-3 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
