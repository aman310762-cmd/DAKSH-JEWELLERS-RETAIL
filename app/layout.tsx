import type { Metadata } from 'next';
import { cormorantGaramond, dmSans, jetbrainsMono } from '@/lib/fonts';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import './globals.css';

export const metadata: Metadata = {
  title: 'Daksh Jewellers — Where Tradition Meets Luxury | Bhiwadi',
  description:
    'Premium gold jewellery in Bhiwadi, Rajasthan. BIS hallmarked 18K, 22K & 24K gold chains, rings, earrings, bangles, necklaces & bridal sets. Cash on delivery available.',
  keywords: [
    'gold jewellery Bhiwadi',
    'daksh jewellers',
    'gold chains Bhiwadi',
    'BIS hallmarked jewellery Rajasthan',
    'gold necklaces Bhiwadi',
    'bridal jewellery Rajasthan',
  ],
  openGraph: {
    title: 'Daksh Jewellers — Where Tradition Meets Luxury',
    description:
      'Premium BIS hallmarked gold jewellery in Bhiwadi, Rajasthan. Chains, rings, earrings, bangles, necklaces & bridal sets. Cash on delivery.',
    url: 'https://daksh-jewellers.vercel.app',
    siteName: 'Daksh Jewellers',
    locale: 'en_IN',
    type: 'website',
  },
  robots: { index: true, follow: true },
};

const businessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'JewelryStore',
  name: 'Daksh Jewellers',
  description: 'Premium BIS hallmarked gold jewellery store in Bhiwadi, Rajasthan.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ramavtar Market, Near Trehan Society',
    addressLocality: 'Bhiwadi, Thara',
    addressRegion: 'Rajasthan',
    postalCode: '301019',
    addressCountry: 'IN',
  },
  telephone: '+919896424648',
  openingHours: 'Mo-Su 11:00-20:00',
  url: 'https://daksh-jewellers.vercel.app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-background text-text-primary antialiased">
        {children}
        <FloatingWhatsApp />
      </body>
    </html>
  );
}
