import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';
import Product from '@/models/Product';

/* GET /api/admin/products — List with search/category/pagination */
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();

  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') || '1');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const limit = 20;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: 'i' };

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({ success: true, products, total, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch products' }, { status: 500 });
  }
}

/* POST /api/admin/products — Create new product */
export async function POST(req: NextRequest) {
  if (!verifyAdmin(req)) return unauthorized();

  try {
    await connectDB();
    const body = await req.json();
    const product = new Product(body);
    await product.save();
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : 'Failed to create product';
    return NextResponse.json({ success: false, error: msg }, { status: 400 });
  }
}
