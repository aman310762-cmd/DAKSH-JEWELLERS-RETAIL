import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    // Check against env vars
    if (email !== process.env.ADMIN_EMAIL) {
      return NextResponse.json({ success: false, error: 'Incorrect email or password' }, { status: 401 });
    }

    const hash = process.env.ADMIN_PASSWORD_HASH || '';
    const isMatch = await bcrypt.compare(password, hash);
    if (!isMatch) {
      return NextResponse.json({ success: false, error: 'Incorrect email or password' }, { status: 401 });
    }

    const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET || 'fallback-secret', { expiresIn: '7d' });

    const response = NextResponse.json({ success: true, token });
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}
