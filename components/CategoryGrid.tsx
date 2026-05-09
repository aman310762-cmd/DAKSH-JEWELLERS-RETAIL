'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const categories = [
  { name: 'Gold Chains', gradient: 'from-[#2a1f0a] to-[#111]', icon: '⛓' },
  { name: 'Gold Rings', gradient: 'from-[#1a1508] to-[#111]', icon: '💍' },
  { name: 'Gold Earrings', gradient: 'from-[#1f1a0a] to-[#111]', icon: '✨' },
  { name: 'Gold Bangles', gradient: 'from-[#251c08] to-[#111]', icon: '⭕' },
  { name: 'Gold Necklaces', gradient: 'from-[#2a200a] to-[#111]', icon: '📿' },
  { name: 'Bridal Jewellery', gradient: 'from-[#2d1a0a] to-[#111]', icon: '👑' },
  { name: 'Pendants', gradient: 'from-[#1a1a0a] to-[#111]', icon: '🔶' },
  { name: 'Kids Jewellery', gradient: 'from-[#1a200a] to-[#111]', icon: '🌟' },
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
              {/* Gradient Background */}
              <div className={`aspect-[4/3] bg-gradient-to-br ${cat.gradient} flex items-center justify-center transition-transform duration-700 group-hover:scale-105`}>
                <span className="text-5xl sm:text-6xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 select-none">
                  {cat.icon}
                </span>
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-[rgba(8,8,8,0.1)] group-hover:bg-[rgba(8,8,8,0.3)] transition-colors duration-500" />

              {/* Category Name */}
              <div className="p-4 sm:p-5">
                <h3 className="font-heading text-base sm:text-lg text-text-primary group-hover:text-gold transition-colors duration-300">
                  {cat.name}
                </h3>
                <span className="font-body text-xs text-text-muted mt-1 flex items-center gap-1 group-hover:text-gold-light transition-colors duration-300">
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
