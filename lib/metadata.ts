import type { Metadata } from 'next';

const BASE_URL = 'https://daksh-jewellers.vercel.app';

export const siteMetadata: Metadata = {
  title: 'Daksh Jewellers — Where Tradition Meets Luxury | Bhiwadi',
  description:
    'Premium gold jewellery in Bhiwadi, Rajasthan. BIS hallmarked 18K, 22K & 24K gold chains, rings, earrings, bangles, necklaces & bridal sets. Cash on delivery available.',
  keywords: [
    'gold jewellery Bhiwadi',
    'daksh jewellers',
    'gold chains Bhiwadi',
    'BIS hallmarked jewellery Rajasthan',
    'gold necklace Bhiwadi',
    'bridal jewellery Rajasthan',
    '22K gold jewellery',
  ],
  openGraph: {
    title: 'Daksh Jewellers — Where Tradition Meets Luxury',
    description:
      'Premium BIS hallmarked gold jewellery in Bhiwadi, Rajasthan. Gold chains, rings, earrings, bangles, necklaces & bridal sets. Cash on delivery.',
    url: BASE_URL,
    siteName: 'Daksh Jewellers',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Generate product-specific metadata for product detail pages
 */
export function generateProductMetadata(product: {
  name: string;
  description: string;
  category: string;
  images?: { secureUrl: string }[];
}): Metadata {
  return {
    title: `${product.name} — Daksh Jewellers | Bhiwadi`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.name} — Daksh Jewellers`,
      description: product.description.slice(0, 160),
      url: BASE_URL,
      siteName: 'Daksh Jewellers',
      locale: 'en_IN',
      type: 'website',
      images: product.images?.[0]?.secureUrl
        ? [{ url: product.images[0].secureUrl, width: 1200, height: 1200, alt: product.name }]
        : [],
    },
  };
}

/**
 * Generate JSON-LD structured data for a product
 */
export function generateProductJsonLd(product: {
  name: string;
  description: string;
  availability: string;
  images?: { secureUrl: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'Daksh Jewellers' },
    image: product.images?.[0]?.secureUrl || '',
    offers: {
      '@type': 'Offer',
      availability:
        product.availability === 'In Stock'
          ? 'https://schema.org/InStock'
          : 'https://schema.org/PreOrder',
      priceCurrency: 'INR',
      seller: {
        '@type': 'Organization',
        name: 'Daksh Jewellers',
      },
    },
  };
}
