const mongoose = require('mongoose');
require('dotenv').config();

const Product = require('../models/Product');

const demoProducts = [
  {
    name: 'Royal Kundan Necklace Set',
    category: 'Gold Necklaces',
    description: 'A stunning kundan necklace set featuring intricate polki diamond work, pearl drops, and meenakari enamel detailing on the reverse.',
    weight: 45.5,
    purity: '22K',
    makingCharges: 'Kundan setting + meenakari + pearl stringing included',
    images: [{ publicId: 'demo-1', secureUrl: '/images/hero-necklace.jpg' }],
    availability: 'In Stock',
    featured: true,
  },
  {
    name: 'Classic Rope Gold Chain',
    category: 'Gold Chains',
    description: 'A timeless 22K gold rope chain with an elegant twisted design. Features a secure S-hook clasp with BIS hallmark certification.',
    weight: 12.3,
    purity: '22K',
    makingCharges: 'Machine-made rope pattern + S-hook clasp + polish',
    images: [{ publicId: 'demo-2', secureUrl: '/images/gold-chain.jpg' }],
    availability: 'In Stock',
    featured: true,
  },
  {
    name: 'Bridal Temple Jhumka',
    category: 'Gold Earrings',
    description: 'Exquisite temple-style jhumka earrings with traditional filigree craftsmanship and delicate pearl embellishments.',
    weight: 8.7,
    purity: '22K',
    makingCharges: 'Filigree work + pearl setting + antique finish',
    images: [{ publicId: 'demo-3', secureUrl: '/images/gold-earrings.jpg' }],
    availability: 'Made to Order',
    featured: false,
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    const products = await Product.insertMany(demoProducts);
    console.log(`🌱 Seeded ${products.length} demo products`);

    await mongoose.disconnect();
    console.log('✅ Done!');
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
}

seed();
