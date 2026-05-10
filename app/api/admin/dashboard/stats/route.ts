import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';
import Product from '@/models/Product';

export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();

  try {
    await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Dynamic import Order to avoid issues if model not registered
    const Order = (await import('@/models/Order')).default;

    const [totalProducts, totalOrders, pendingOrders, todayOrders, recentOrders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: 'pending' }),
      Order.countDocuments({ createdAt: { $gte: today } }),
      Order.find().sort({ createdAt: -1 }).limit(10).lean(),
    ]);

    return NextResponse.json({
      success: true,
      stats: { totalProducts, totalOrders, pendingOrders, todayOrders },
      recentOrders,
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ success: false, error: 'Failed to load dashboard' }, { status: 500 });
  }
}
