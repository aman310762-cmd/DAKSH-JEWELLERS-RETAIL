'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '@/store/cartStore';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/#categories' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

/* ── SVG Logo ─────────────────────────────────────── */
function DakshLogo({ className = '' }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      {/* Diamond Icon */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M20 2L36 14L20 38L4 14L20 2Z"
          stroke="#C9A84C"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M20 2L12 14L20 38L28 14L20 2Z"
          stroke="#C9A84C"
          strokeWidth="1"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M4 14H36"
          stroke="#C9A84C"
          strokeWidth="1"
          opacity="0.4"
        />
        <path
          d="M20 2L20 38"
          stroke="#C9A84C"
          strokeWidth="0.5"
          opacity="0.3"
        />
      </svg>
      {/* Brand Text */}
      <div className="flex flex-col">
        <span
          className="font-heading text-lg font-semibold tracking-[0.3em] text-text-primary leading-none"
        >
          DAKSH
        </span>
        <span
          className="font-heading text-[10px] tracking-[0.5em] text-gold leading-none mt-1"
        >
          JEWELLERS
        </span>
      </div>
    </Link>
  );
}

/* ── Cart Icon ────────────────────────────────────── */
function CartIcon({ count = 0 }: { count: number }) {
  return (
    <Link
      href="/cart"
      className="relative p-2 text-text-primary hover:text-gold transition-colors duration-300"
      aria-label="Shopping Cart"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold text-background text-[11px] font-body font-bold rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}

/* ── WhatsApp Icon Button ─────────────────────────── */
function WhatsAppNavButton() {
  return (
    <a
      href="https://wa.me/919896424648"
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 text-whatsapp hover:scale-110 transition-transform duration-300"
      aria-label="WhatsApp"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </a>
  );
}

/* ── Hamburger Toggle ─────────────────────────────── */
function HamburgerButton({ isOpen, toggle }: { isOpen: boolean; toggle: () => void }) {
  return (
    <button
      onClick={toggle}
      className="lg:hidden p-2 text-text-primary hover:text-gold transition-colors z-50"
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <div className="w-6 h-5 relative flex flex-col justify-between">
        <span
          className={`block h-[1.5px] w-6 bg-current transform transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-[9px]' : ''
          }`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-current transition-opacity duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`block h-[1.5px] w-6 bg-current transform transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-[9px]' : ''
          }`}
        />
      </div>
    </button>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   NAVBAR — MAIN COMPONENT
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const cartCount = useCartStore((s) => s.items.reduce((t, i) => t + i.qty, 0));

  useEffect(() => setMounted(true), []);

  /* Scroll listener */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[rgba(8,8,8,0.95)] backdrop-blur-[12px] shadow-[0_1px_0_rgba(201,168,76,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <DakshLogo />

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative font-body text-sm tracking-wide text-text-muted hover:text-text-primary transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-1">
              <WhatsAppNavButton />
              <CartIcon count={mounted ? cartCount : 0} />
              <HamburgerButton isOpen={mobileOpen} toggle={() => setMobileOpen(!mobileOpen)} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── Mobile Full-Screen Overlay ──────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[rgba(8,8,8,0.98)] backdrop-blur-md lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-heading text-3xl tracking-wider text-text-primary hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                className="mt-8"
              >
                <a
                  href="https://wa.me/919896424648"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-whatsapp text-white rounded font-body text-sm font-medium hover:brightness-110 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Chat with Us
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
