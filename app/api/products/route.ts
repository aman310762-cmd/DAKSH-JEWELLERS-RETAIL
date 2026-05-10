import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Product from '@/models/Product';

/* GET /api/products — Public product listing for shop page */
export async function GET(req: NextRequest) {
  try {
    const db = await connectDB();
    if (!db) {
      return NextResponse.json({ success: false, products: [], total: 0, totalPages: 0 });
    }

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get('page') || '1');
    const category = searchParams.get('category');
    const purity = searchParams.get('purity');
    const sort = searchParams.get('sort') || 'newest';
    const limit = 12;
    const skip = (page - 1) * limit;

    const filter: Record<string, unknown> = {};
    if (category) {
      const cats = category.split(',');
      filter.category = { $in: cats };
    }
    if (purity) {
      const purities = purity.split(',');
      filter.purity = { $in: purities };
    }

    let sortObj: Record<string, 1 | -1> = { createdAt: -1 };
    if (sort === 'weight_asc') sortObj = { weight: 1 };
    if (sort === 'weight_desc') sortObj = { weight: -1 };

    const [products, total] = await Promise.all([
      Product.find(filter).sort(sortObj).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);

    return NextResponse.json({ success: true, products, total, totalPages: Math.ceil(total / limit) });
  } catch {
    return NextResponse.json({ success: false, products: [], total: 0, totalPages: 0 });
  }
}
