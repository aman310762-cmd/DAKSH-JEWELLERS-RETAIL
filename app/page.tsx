import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import TrustStrip from '@/components/TrustStrip';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import WhatsAppBanner from '@/components/WhatsAppBanner';
import TrustSection from '@/components/TrustSection';
import Footer from '@/components/Footer';

/* JSON-LD Structured Data for JewelryStore */
function JsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'JewelryStore',
    name: 'Daksh Jewellers',
    description:
      'Premium BIS hallmarked gold jewellery shop in Bhiwadi, Rajasthan.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Ramavtar Market, Near Trehan Society',
      addressLocality: 'Bhiwadi',
      addressRegion: 'Rajasthan',
      postalCode: '301019',
      addressCountry: 'IN',
    },
    telephone: '+919896424648',
    openingHours: 'Mo-Su 11:00-20:00',
    url: 'https://daksh-jewellers.vercel.app',
    priceRange: '₹₹₹',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd />
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <CategoryGrid />
        <FeaturedProducts />
        <WhatsAppBanner />
        <TrustSection />
      </main>
      <Footer />
    </>
  );
}
