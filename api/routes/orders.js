const express = require('express');
const router = express.Router();
const Order = require('../../models/Order');

/**
 * POST /api/orders
 * Create a new order
 */
router.post('/', async (req, res) => {
  try {
    const { customerName, phone, address, city, pincode, landmark, items, paymentMethod } = req.body;

    // Validate required fields
    if (!customerName || !phone || !address || !pincode || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: customerName, phone, address, pincode, items',
      });
    }

    // Validate phone (10 digits)
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number. Must be a 10-digit Indian mobile number.',
      });
    }

    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid pincode. Must be 6 digits.',
      });
    }

    // Generate orderId
    const orderId = `DJW-${Date.now()}`;

    const order = new Order({
      orderId,
      customerName,
      phone,
      address,
      city: city || 'Bhiwadi',
      pincode,
      landmark: landmark || '',
      items,
      paymentMethod: paymentMethod || 'COD',
      status: 'pending',
    });

    await order.save();

    res.status(201).json({
      success: true,
      orderId: order.orderId,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create order. Please try again.',
    });
  }
});

/**
 * GET /api/orders/:id
 * Get order by orderId (not MongoDB _id)
 */
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.id });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch order',
    });
  }
});

module.exports = router;
