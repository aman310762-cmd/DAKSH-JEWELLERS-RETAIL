'use client';

import Link from 'next/link';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Categories', href: '/#categories' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/#contact' },
];

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

export default function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-border-gold" id="contact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1 — Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20 2L36 14L20 38L4 14L20 2Z" stroke="#C9A84C" strokeWidth="1.5" fill="none" />
                <path d="M20 2L12 14L20 38L28 14L20 2Z" stroke="#C9A84C" strokeWidth="1" fill="none" opacity="0.6" />
                <path d="M4 14H36" stroke="#C9A84C" strokeWidth="1" opacity="0.4" />
              </svg>
              <div className="flex flex-col">
                <span className="font-heading text-base font-semibold tracking-[0.3em] text-text-primary leading-none">
                  DAKSH
                </span>
                <span className="font-heading text-[9px] tracking-[0.5em] text-gold leading-none mt-1">
                  JEWELLERS
                </span>
              </div>
            </div>
            <p className="font-body text-sm text-text-muted leading-relaxed mb-5">
              Where Tradition Meets Luxury
            </p>
            {/* Social placeholders */}
            <div className="flex items-center gap-3">
              {['facebook', 'instagram', 'youtube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full border border-border-gold flex items-center justify-center text-text-muted hover:text-gold hover:border-gold/40 transition-all duration-300"
                  aria-label={social}
                >
                  {social === 'facebook' && (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  )}
                  {social === 'instagram' && (
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" />
                      <circle cx="12" cy="12" r="5" />
                      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                  )}
                  {social === 'youtube' && (
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
                      <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="#080808" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="font-heading text-base text-text-primary tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-text-muted hover:text-gold transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Categories */}
          <div>
            <h4 className="font-heading text-base text-text-primary tracking-wider mb-5">
              Categories
            </h4>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link
                    href={`/shop?category=${encodeURIComponent(cat)}`}
                    className="font-body text-sm text-text-muted hover:text-gold transition-colors duration-300"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="font-heading text-base text-text-primary tracking-wider mb-5">
              Contact Us
            </h4>
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p className="font-body text-sm text-text-muted leading-relaxed">
                  Ramavtar Market, Near Trehan Society,<br />
                  Bhiwadi, Thara, Rajasthan 301019
                </p>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-gold mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
                <p className="font-body text-sm text-text-muted">
                  Mon – Sun, 11:00 AM – 8:00 PM
                </p>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-whatsapp mt-0.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <a
                  href="https://wa.me/919896424648"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-body text-sm text-whatsapp hover:brightness-110 transition-all"
                >
                  +91 9896424648
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-body text-xs text-text-muted">
            © 2024 Daksh Jewellers. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            <span className="w-1 h-1 rounded-full bg-gold opacity-40" />
            <p className="font-body text-xs text-text-muted">
              Crafted with love in Bhiwadi, Rajasthan
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
