import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

/* PATCH /api/admin/orders/[id]/status — Update order status */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();

  try {
    await connectDB();
    const Order = (await import('@/models/Order')).default;
    const { id } = await params;
    const { status } = await req.json();

    const validStatuses = ['pending', 'confirmed', 'dispatched', 'delivered'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ success: false, error: 'Invalid status' }, { status: 400 });
    }

    const order = await Order.findOneAndUpdate({ orderId: id }, { status }, { new: true });
    if (!order) return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    return NextResponse.json({ success: true, order });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to update status' }, { status: 500 });
  }
}
