import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: { type: String },
  name: { type: String, required: true },
  weight: { type: String },
  purity: { type: String },
  category: { type: String },
  qty: { type: Number, required: true, default: 1 },
});

const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  customerName: {
    type: String,
    required: [true, 'Customer name is required'],
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
  },
  city: {
    type: String,
    required: true,
    default: 'Bhiwadi',
  },
  pincode: {
    type: String,
    required: [true, 'Pincode is required'],
  },
  landmark: {
    type: String,
    default: '',
  },
  items: [orderItemSchema],
  paymentMethod: {
    type: String,
    default: 'COD',
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'dispatched', 'delivered'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
orderSchema.index({ orderId: 1 });
orderSchema.index({ status: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
export default Order;
