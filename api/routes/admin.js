const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const adminAuth = require('../middleware/adminAuth');
const Product = require('../../models/Product');
const Order = require('../../models/Order');

/* ━━ LOGIN ━━━━━━━━━━━━━━━━━━━━━━━ */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== process.env.ADMIN_EMAIL) {
      return res.status(401).json({ success: false, error: 'Incorrect email or password' });
    }

    const isMatch = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Incorrect email or password' });
    }

    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.cookie('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

/* ━━ DASHBOARD STATS ━━━━━━━━━━━━━ */
router.get('/dashboard/stats', adminAuth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [totalProducts, totalOrders, pendingOrders, todayOrders, recentOrders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.find().sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    res.json({
      success: true,
      stats: { totalProducts, totalOrders, pendingOrders, todayOrders },
      recentOrders,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, error: 'Failed to load dashboard' });
  }
});

/* ━━ PRODUCTS CRUD ━━━━━━━━━━━━━━━ */
router.get('/products', adminAuth, async (req, res) => {
  try {
    const { page = 1, category, search } = req.query;
    const limit = 20;
    const skip = (Number(page) - 1) * limit;
    const filter = {};

    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    res.json({ success: true, products, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

router.post('/products', adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.put('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.delete('/products/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete product' });
  }
});

router.patch('/products/:id/featured', adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
    product.featured = !product.featured;
    await product.save();
    res.json({ success: true, featured: product.featured });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to toggle featured' });
  }
});

/* ━━ IMAGE UPLOAD ━━━━━━━━━━━━━━━━ */
router.post('/upload', adminAuth, async (req, res) => {
  try {
    // For Cloudinary direct upload — returns signed params
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const timestamp = Math.round(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder: 'daksh-jewellers/products', transformation: 'q_auto,f_auto' },
      process.env.CLOUDINARY_API_SECRET
    );

    res.json({
      success: true,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      timestamp,
      signature,
      folder: 'daksh-jewellers/products',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Upload setup failed' });
  }
});

/* ━━ ORDERS ━━━━━━━━━━━━━━━━━━━━━━ */
router.get('/orders', adminAuth, async (req, res) => {
  try {
    const { status, search, page = 1 } = req.query;
    const limit = 20;
    const skip = (Number(page) - 1) * limit;
    const filter = {};

    if (status && status !== 'all') filter.status = status;
    if (search) {
      filter.$or = [
        { orderId: { $regex: search, $options: 'i' } },
        { customerName: { $regex: search, $options: 'i' } },
      ];
    }

    const [orders, total] = await Promise.all([
      Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Order.countDocuments(filter),
    ]);

    res.json({ success: true, orders, total, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

router.get('/orders/:id', adminAuth, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch order' });
  }
});

router.patch('/orders/:id/status', adminAuth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'dispatched', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const order = await Order.findOneAndUpdate(
      { orderId: req.params.id },
      { status },
      { new: true }
    );
    if (!order) return res.status(404).json({ success: false, error: 'Order not found' });
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update status' });
  }
});

module.exports = router;
