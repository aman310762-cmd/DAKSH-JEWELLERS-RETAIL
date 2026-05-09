'use client';

import { motion } from 'framer-motion';

const trustItems = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#C9A84C" strokeWidth="1.5">
        <circle cx="24" cy="24" r="20" />
        <path d="M16 24l6 6 12-12" />
        <text x="24" y="38" textAnchor="middle" fill="#C9A84C" fontSize="6" fontFamily="DM Sans">BIS</text>
      </svg>
    ),
    title: 'BIS Hallmarked',
    description: 'Every piece certified for purity. Your trust, guaranteed with every purchase.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#C9A84C" strokeWidth="1.5">
        <rect x="8" y="14" width="32" height="22" rx="3" />
        <path d="M8 20h32" />
        <circle cx="34" cy="28" r="3" />
        <path d="M14 28h8" />
      </svg>
    ),
    title: 'Cash on Delivery',
    description: 'Pay when you receive your jewellery. No advance payment needed.',
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none" stroke="#C9A84C" strokeWidth="1.5">
        <path d="M24 4C18 12 8 16 8 26a16 16 0 0032 0c0-10-10-14-16-22z" />
        <circle cx="24" cy="26" r="4" />
      </svg>
    ),
    title: 'Local Delivery',
    description: 'Serving Bhiwadi & surrounding areas. Jewellery delivered to your doorstep.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' as const },
  },
};

export default function TrustSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" id="about">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10"
      >
        {trustItems.map((item) => (
          <motion.div
            key={item.title}
            variants={itemVariants}
            className="group text-center p-8 rounded bg-surface border border-border-gold hover:border-gold/30 hover:shadow-[0_0_20px_rgba(201,168,76,0.08)] transition-all duration-500"
          >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[rgba(201,168,76,0.05)] border border-border-gold mb-6 group-hover:border-gold/40 transition-colors duration-500">
              {item.icon}
            </div>

            <h3 className="font-heading text-xl text-text-primary mb-3 group-hover:text-gold transition-colors duration-300">
              {item.title}
            </h3>
            <p className="font-body text-sm text-text-muted leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
