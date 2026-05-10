import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';

/* POST /api/orders — Create new order (public) */
export async function POST(req: NextRequest) {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: false, error: 'Database not available' }, { status: 503 });
    }

    const Order = (await import('@/models/Order')).default;
    const body = await req.json();

    // Generate order ID
    const count = await Order.countDocuments();
    const orderId = `DJ${String(count + 1).padStart(5, '0')}`;

    const order = new Order({ ...body, orderId });
    await order.save();

    return NextResponse.json({ success: true, order, orderId }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to create order';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
