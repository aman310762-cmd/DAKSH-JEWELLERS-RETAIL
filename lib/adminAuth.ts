import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function verifyAdmin(req: NextRequest): boolean {
  try {
    const token =
      req.cookies.get('adminToken')?.value ||
      (req.headers.get('authorization')?.startsWith('Bearer ')
        ? req.headers.get('authorization')!.slice(7)
        : null);

    if (!token) return false;

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret') as { role: string };
    return decoded.role === 'admin';
  } catch {
    return false;
  }
}

export function unauthorized() {
  return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
}
