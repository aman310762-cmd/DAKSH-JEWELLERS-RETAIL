'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';
import ScrollRotate from '@/components/ScrollRotate';
import RelatedProducts from '@/components/RelatedProducts';
import ProductBadge from '@/components/ProductBadge';
import { useCartStore } from '@/store/cartStore';

interface Product {
  _id: string;
  name: string;
  weight: number;
  purity: string;
  category: string;
  description: string;
  makingCharges?: string;
  images: { publicId: string; secureUrl: string }[];
  availability: string;
}

/* Demo products for offline/dev mode */
const demoProductMap: Record<string, Product> = {
  'd1': { _id: 'd1', name: 'Royal Kundan Necklace Set', weight: 45.5, purity: '22K', category: 'Gold Necklaces', description: 'A stunning kundan necklace set featuring intricate polki diamond work, pearl drops, and meenakari enamel detailing on the reverse. This royal piece is handcrafted by master artisans using traditional techniques passed down through generations. Perfect for weddings, engagements, and special celebrations. Comes with matching earrings.', makingCharges: 'Kundan setting + meenakari + pearl stringing included', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'In Stock' },
  'd2': { _id: 'd2', name: 'Classic Rope Gold Chain', weight: 12.3, purity: '22K', category: 'Gold Chains', description: 'A timeless 22K gold rope chain with an elegant twisted design. This versatile piece works beautifully on its own or paired with a pendant. Features a secure S-hook clasp with BIS hallmark certification. The perfect everyday luxury accessory for men and women.', makingCharges: 'Machine-made rope pattern + S-hook clasp + polish', images: [{ publicId: '', secureUrl: '/images/gold-chain.jpg' }], availability: 'In Stock' },
  'd3': { _id: 'd3', name: 'Bridal Temple Jhumka', weight: 8.7, purity: '22K', category: 'Gold Earrings', description: 'Exquisite temple-style jhumka earrings with traditional filigree craftsmanship and delicate pearl embellishments. These bell-shaped beauties feature peacock motifs and intricate gold wire work. A statement piece for brides and festive occasions. Lightweight despite their grand appearance.', makingCharges: 'Filigree work + pearl setting + antique finish', images: [{ publicId: '', secureUrl: '/images/gold-earrings.jpg' }], availability: 'Made to Order' },
  'd4': { _id: 'd4', name: 'Traditional Meenakari Bangle Set', weight: 32.0, purity: '22K', category: 'Gold Bangles', description: 'A set of four beautifully crafted gold bangles featuring traditional meenakari enamel work in vibrant colours. Each bangle showcases hand-painted floral and paisley motifs with kundan stone accents. These heritage bangles represent the finest of Rajasthani jewellery craftsmanship.', makingCharges: 'Meenakari enamel + kundan setting + hand carving', images: [{ publicId: '', secureUrl: '/images/gold-bangles.jpg' }], availability: 'In Stock' },
  'd5': { _id: 'd5', name: 'Temple Design Gold Ring', weight: 6.2, purity: '22K', category: 'Gold Rings', description: 'A magnificent temple-design gold ring featuring a seated deity motif with peacock flanking, crowned with a natural ruby stone. This devotional masterpiece is crafted using traditional lost-wax casting technique. Perfect for daily wear or auspicious occasions.', makingCharges: 'Lost-wax casting + ruby setting + oxidised finish', images: [{ publicId: '', secureUrl: '/images/gold-ring.jpg' }], availability: 'In Stock' },
  'd6': { _id: 'd6', name: 'Floral Diamond Pendant', weight: 4.5, purity: '18K', category: 'Pendants', description: 'A delicate floral pendant crafted in 18K gold with brilliant-cut diamond accents. The open filigree design allows light to dance through the intricate vine and flower motifs. Comes with a matching fine gold chain. Perfect for everyday elegance or gifting.', makingCharges: 'Diamond setting + rhodium polish + filigree work', images: [{ publicId: '', secureUrl: '/images/gold-pendant.jpg' }], availability: 'In Stock' },
  'd7': { _id: 'd7', name: 'Heavy Bridal Necklace Set', weight: 48.0, purity: '22K', category: 'Bridal Jewellery', description: 'A grand bridal necklace set designed for the modern Indian bride. Features elaborate gold work with ruby and emerald stone settings. This heirloom piece pairs beautifully with traditional red and green bridal lehengas. Comes with matching maang tikka and earrings.', makingCharges: 'Stone setting + antique finish + assembly', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'Made to Order' },
  'd8': { _id: 'd8', name: 'Kids Gold Bangle Pair', weight: 3.8, purity: '22K', category: 'Kids Jewellery', description: 'A delicate pair of gold bangles designed specially for children. Smooth rounded edges for safety with delicate star patterns. BIS hallmarked 22K gold ensures purity. Perfect for naming ceremonies, birthdays, and festive occasions.', makingCharges: 'Machine-made + safety edges + polish', images: [{ publicId: '', secureUrl: '/images/gold-bangles.jpg' }], availability: 'In Stock' },
  'd9': { _id: 'd9', name: 'Italian Bismark Chain', weight: 18.5, purity: '24K', category: 'Gold Chains', description: 'A premium 24K pure gold Italian Bismark chain with interlocking flat links. This heavyweight chain features a lobster clasp closure and mirror-finish polish. Ideal for men who appreciate bold, classic jewellery. BIS hallmarked with certificate of authenticity.', makingCharges: 'Italian machine weave + lobster clasp + mirror polish', images: [{ publicId: '', secureUrl: '/images/gold-chain.jpg' }], availability: 'In Stock' },
  'd10': { _id: 'd10', name: 'Antique Gold Jhumka', weight: 10.2, purity: '22K', category: 'Gold Earrings', description: 'Stunning antique-finish gold jhumkas with intricate granulation work and ruby stone accents. The oxidized vintage look gives these earrings a regal, heritage appeal. Comfortable hook closure with stopper. Perfect for festive and wedding occasions.', makingCharges: 'Antique oxidization + granulation + ruby setting', images: [{ publicId: '', secureUrl: '/images/gold-earrings.jpg' }], availability: 'In Stock' },
  'd11': { _id: 'd11', name: 'Solitaire Gold Ring', weight: 5.0, purity: '18K', category: 'Gold Rings', description: 'An elegant 18K white gold ring with a single brilliant-cut diamond solitaire in a six-prong setting. The band features a subtle twist design with micro-pave diamond accents. Ideal for engagements, anniversaries, or as a premium gift.', makingCharges: 'Diamond solitaire setting + rhodium plating + micro-pave', images: [{ publicId: '', secureUrl: '/images/gold-ring.jpg' }], availability: 'In Stock' },
  'd12': { _id: 'd12', name: 'Peacock Pendant with Chain', weight: 7.5, purity: '22K', category: 'Pendants', description: 'A beautifully crafted peacock-motif pendant in 22K gold with meenakari enamel work in blue and green hues. Features a dangling pearl drop and comes with a matching 18-inch box chain. The peacock design symbolises grace, beauty, and prosperity.', makingCharges: 'Meenakari enamel + pearl setting + chain included', images: [{ publicId: '', secureUrl: '/images/gold-pendant.jpg' }], availability: 'Made to Order' },
  'd13': { _id: 'd13', name: 'Mango Haar Necklace', weight: 52.0, purity: '22K', category: 'Gold Necklaces', description: 'A traditional South Indian mango haar (mango-motif long necklace) crafted in 22K gold. Features paisley-shaped links with kundan stone inlays connected by delicate gold chains. This statement piece is a staple in every Indian bride\'s trousseau.', makingCharges: 'Kundan setting + mango motif casting + assembly', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'Made to Order' },
  'd14': { _id: 'd14', name: 'Temple Laxmi Necklace Set', weight: 38.0, purity: '22K', category: 'Gold Necklaces', description: 'A devotional temple jewellery necklace featuring Goddess Laxmi motifs with intricate coin-style pendants. Handcrafted in 22K gold with a matte antique finish. Comes with matching temple earrings. Perfect for pujas, festivals, and traditional ceremonies.', makingCharges: 'Temple casting + antique matte finish + matching earrings', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'In Stock' },
  'd15': { _id: 'd15', name: 'Box Link Daily Wear Chain', weight: 8.0, purity: '22K', category: 'Gold Chains', description: 'A sleek and minimal box-link gold chain perfect for everyday wear. The uniform square links create an elegant, modern look. Lightweight at just 8 grams but durable with a secure spring-ring clasp. Available in 18-inch and 22-inch lengths.', makingCharges: 'Machine-made box link + spring-ring clasp', images: [{ publicId: '', secureUrl: '/images/gold-chain.jpg' }], availability: 'In Stock' },
  'd16': { _id: 'd16', name: 'Chandbali Pearl Earrings', weight: 12.5, purity: '22K', category: 'Gold Earrings', description: 'Elegant crescent moon (chandbali) earrings with cascading pearl drops and kundan stone border. Inspired by Mughal jewellery traditions, these statement earrings add a regal touch to any outfit. Comfortable omega back closure distributes weight evenly.', makingCharges: 'Chandbali frame + kundan border + pearl stringing', images: [{ publicId: '', secureUrl: '/images/gold-earrings.jpg' }], availability: 'In Stock' },
  'd17': { _id: 'd17', name: 'Daily Wear Plain Bangle Pair', weight: 16.0, purity: '22K', category: 'Gold Bangles', description: 'A classic pair of plain round gold bangles with a smooth, high-polish finish. These timeless bangles are the foundation of any gold jewellery collection. Comfortable for all-day wear with no sharp edges. Available in all standard sizes.', makingCharges: 'Machine rolled + high polish finish', images: [{ publicId: '', secureUrl: '/images/gold-bangles.jpg' }], availability: 'In Stock' },
  'd18': { _id: 'd18', name: 'Rajasthani Kada Bangle', weight: 28.0, purity: '22K', category: 'Gold Bangles', description: 'A bold Rajasthani-style kada (open bangle) with intricate hand-carved floral patterns and screw-type closure. This substantial piece features traditional Rajputi craftsmanship with a contemporary twist. The open design makes it easy to wear and remove.', makingCharges: 'Hand carving + screw mechanism + antique polish', images: [{ publicId: '', secureUrl: '/images/gold-bangles.jpg' }], availability: 'Made to Order' },
  'd19': { _id: 'd19', name: 'Men\'s Classic Band Ring', weight: 8.5, purity: '22K', category: 'Gold Rings', description: 'A solid 22K gold band ring with a brushed matte finish and polished bevelled edges. This no-nonsense design is perfect for men who prefer understated elegance. Comfortable flat-fit interior for all-day wear. Engraving available on request.', makingCharges: 'Brushed matte + bevelled edge + comfort fit', images: [{ publicId: '', secureUrl: '/images/gold-ring.jpg' }], availability: 'In Stock' },
  'd20': { _id: 'd20', name: 'Om Pendant Gold', weight: 3.2, purity: '22K', category: 'Pendants', description: 'A sacred Om symbol pendant crafted in 22K gold with fine detailing and a diamond-cut finish that catches light beautifully. Lightweight and perfect for daily wear. Comes with an 18-inch curb chain. A meaningful gift for any occasion.', makingCharges: 'Diamond cut finish + chain included', images: [{ publicId: '', secureUrl: '/images/gold-pendant.jpg' }], availability: 'In Stock' },
  'd21': { _id: 'd21', name: 'Complete Bridal Set — 5 Pieces', weight: 120.0, purity: '22K', category: 'Bridal Jewellery', description: 'The ultimate bridal jewellery package: necklace, long haar, maang tikka, jhumka earrings, and a pair of bangles — all in matching 22K gold with kundan and pearl work. This complete set ensures a cohesive, regal bridal look. Each piece can also be worn separately.', makingCharges: 'Full set assembly + kundan + pearl + matching finish', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'Made to Order' },
  'd22': { _id: 'd22', name: 'Bridal Choker Necklace', weight: 35.0, purity: '22K', category: 'Bridal Jewellery', description: 'A stunning close-fitting choker necklace with elaborate gold filigree work, ruby stones, and pearl drops. Sits elegantly on the collarbone and pairs perfectly with strapless or V-neck blouses. The adjustable chain at the back ensures a comfortable fit.', makingCharges: 'Filigree + ruby setting + pearl + adjustable chain', images: [{ publicId: '', secureUrl: '/images/hero-necklace.jpg' }], availability: 'Made to Order' },
  'd23': { _id: 'd23', name: 'Baby Gold Chain with Bell', weight: 2.5, purity: '22K', category: 'Kids Jewellery', description: 'An adorable baby gold chain with a tiny jingling bell pendant. The chain features smooth, rounded links safe for baby\'s delicate skin. BIS hallmarked 22K gold. A traditional gift for newborns and naming ceremonies in Indian culture.', makingCharges: 'Baby-safe links + bell pendant + safety clasp', images: [{ publicId: '', secureUrl: '/images/gold-chain.jpg' }], availability: 'In Stock' },
  'd24': { _id: 'd24', name: 'Kids Tiny Stud Earrings', weight: 1.5, purity: '22K', category: 'Kids Jewellery', description: 'Petite flower-shaped stud earrings designed for children. Hypoallergenic push-back closure ensures they stay secure and comfortable. Made from 22K gold with a high-polish finish. The perfect first pair of earrings for little ones.', makingCharges: 'Hypoallergenic studs + push-back closure', images: [{ publicId: '', secureUrl: '/images/gold-earrings.jpg' }], availability: 'In Stock' },
};

function getDemo(id: string): Product | null {
  return demoProductMap[id] || demoProductMap['d1'];
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [copied, setCopied] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const addItem = useCartStore((s) => s.addItem);

  useEffect(() => {
    setIsMobile(window.matchMedia('(max-width: 768px)').matches);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${apiUrl}/api/products/${id}`, { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product || data);
        } else {
          setProduct(getDemo(id));
        }
      } catch {
        setProduct(getDemo(id));
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-24 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-background pt-24 flex flex-col items-center justify-center text-center px-4">
          <h1 className="font-heading text-3xl text-text-primary mb-4">Product Not Found</h1>
          <p className="font-body text-text-muted mb-8">This product may have been removed or the link is incorrect.</p>
          <Link href="/shop" className="px-6 py-3 border border-gold text-gold rounded font-body text-sm hover:bg-gold hover:text-background transition-all">
            Browse Collection
          </Link>
        </div>
        <Footer />
      </>
    );
  }

  const whatsappUrl = `https://wa.me/919896424648?text=${encodeURIComponent(
    `Hi Daksh Jewellers, I am interested in ${product.name}. Please share the price.`
  )}`;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 font-body text-sm text-text-muted mb-8 flex-wrap">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span className="text-border-gold-strong">›</span>
            <Link href="/shop" className="hover:text-gold transition-colors">Shop</Link>
            <span className="text-border-gold-strong">›</span>
            <Link href={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-gold transition-colors">
              {product.category}
            </Link>
            <span className="text-border-gold-strong">›</span>
            <span className="text-text-primary">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* LEFT — Image Experience */}
            <div>
              {isMobile ? (
                <ImageCarousel images={product.images} productName={product.name} />
              ) : (
                <>
                  <ScrollRotate
                    imageSrc={product.images[selectedImageIndex]?.secureUrl || product.images[0]?.secureUrl || '/images/hero-necklace.jpg'}
                    alt={product.name}
                  />
                  {/* Thumbnails for desktop — click to change main image */}
                  {product.images.length > 1 && (
                    <div className="flex gap-2 mt-3">
                      {product.images.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImageIndex(i)}
                          className={`relative w-20 h-20 rounded overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                            selectedImageIndex === i
                              ? 'border-gold shadow-[0_0_10px_rgba(201,168,76,0.4)] scale-105'
                              : 'border-border-gold hover:border-gold/60 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img src={img.secureUrl} alt={`${product.name} ${i + 1}`} className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* RIGHT — Product Info */}
            <div className="space-y-5">
              <h1 className="font-heading text-3xl sm:text-4xl text-text-primary font-semibold leading-tight">
                {product.name}
              </h1>

              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <ProductBadge variant="purity" value={`${product.purity} BIS Hallmarked`} />
                <ProductBadge variant="availability" value={product.availability} />
              </div>

              {/* Made to Order note */}
              {product.availability === 'Made to Order' && (
                <p className="font-body text-sm text-amber-400/80 bg-[rgba(245,158,11,0.08)] border border-amber-800/30 rounded px-3 py-2">
                  ⏱ Made to Order: Ready in 7–10 business days
                </p>
              )}

              {/* Weight */}
              <div className="font-body text-sm text-text-muted">
                <span className="text-text-primary font-medium">Weight:</span> {product.weight} grams
              </div>

              {/* Making Charges */}
              {product.makingCharges && (
                <div className="font-body text-sm text-text-muted">
                  <span className="text-text-primary font-medium">Making Charges:</span> {product.makingCharges}
                </div>
              )}

              {/* Description */}
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {product.description}
              </p>

              {/* Divider */}
              <div className="h-[1px] bg-gradient-to-r from-gold/50 via-gold/20 to-transparent" />

              {/* Price Section */}
              <div>
                <p className="font-heading text-2xl text-gold font-semibold mb-1">Price on Inquiry</p>
                <p className="font-body text-xs text-text-muted">
                  Gold prices change daily. Contact us for today&apos;s price.
                </p>
              </div>

              {/* COD Badge */}
              <div className="flex items-center gap-2 font-body text-sm text-green-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Cash on Delivery Available in Bhiwadi
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={() => {
                    addItem({
                      productId: product._id,
                      name: product.name,
                      image: product.images[0]?.secureUrl || '/images/hero-necklace.jpg',
                      weight: product.weight,
                      purity: product.purity,
                      category: product.category,
                    });
                    setAddedToCart(true);
                    setTimeout(() => setAddedToCart(false), 2000);
                  }}
                  className="w-full py-3.5 bg-gold text-background font-body text-sm font-semibold tracking-wide rounded hover:brightness-110 transition-all"
                >
                  {addedToCart ? '✓ Added to Cart!' : 'Add to Cart'}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3.5 bg-whatsapp text-white font-body text-sm font-medium rounded hover:brightness-110 transition-all"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Inquire on WhatsApp
                </a>
                <button
                  onClick={handleShare}
                  className="w-full flex items-center justify-center gap-2 py-3 border border-border-gold text-text-muted font-body text-sm rounded hover:text-gold hover:border-gold/40 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" />
                  </svg>
                  {copied ? '✓ Link Copied!' : 'Share'}
                </button>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <RelatedProducts category={product.category} excludeId={product._id} />
        </div>
      </main>

      {/* Sticky WhatsApp bar — mobile only */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-[rgba(8,8,8,0.95)] backdrop-blur-sm border-t border-border-gold">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 bg-whatsapp text-white font-body text-sm font-medium rounded hover:brightness-110 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          Inquire on WhatsApp — {product.name}
        </a>
      </div>

      <Footer />
    </>
  );
}
