const mongoose = require('mongoose');

const productImageSchema = new mongoose.Schema({
  publicId: { type: String },
  secureUrl: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'Gold Chains', 'Gold Rings', 'Gold Earrings', 'Gold Bangles',
      'Gold Necklaces', 'Bridal Jewellery', 'Pendants', 'Kids Jewellery',
    ],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
  },
  purity: {
    type: String,
    required: true,
    enum: ['18K', '22K', '24K'],
    default: '22K',
  },
  makingCharges: { type: String, default: '' },
  images: [productImageSchema],
  availability: {
    type: String,
    enum: ['In Stock', 'Made to Order'],
    default: 'In Stock',
  },
  featured: { type: Boolean, default: false },
  stock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

productSchema.index({ category: 1 });
productSchema.index({ featured: 1 });
productSchema.index({ name: 'text' });

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);
