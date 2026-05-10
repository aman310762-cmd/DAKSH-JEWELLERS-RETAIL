import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';

/* GET /api/admin/orders — List with filters */
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();

  try {
    await connectDB();
    const Order = (await import('@/models/Order')).default;

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = Number(searchParams.get('page') || '1');
    const limit = 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
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

    return NextResponse.json({ success: true, orders, total, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}
