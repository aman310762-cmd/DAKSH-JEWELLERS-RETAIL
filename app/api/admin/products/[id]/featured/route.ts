import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyAdmin, unauthorized } from '@/lib/adminAuth';
import Product from '@/models/Product';

/* PATCH /api/admin/products/[id]/featured — Toggle featured */
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) return unauthorized();

  try {
    await connectDB();
    const { id } = await params;
    const product = await Product.findById(id);
    if (!product) return NextResponse.json({ success: false, error: 'Product not found' }, { status: 404 });
    product.featured = !product.featured;
    await product.save();
    return NextResponse.json({ success: true, featured: product.featured });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to toggle featured' }, { status: 500 });
  }
}
