import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/firebase-admin';

export async function GET(req: Request) {
  const adminUser = await verifyAdminAuth(req);
  if (!adminUser) {
    return NextResponse.json(
      { authorized: false, error: 'Unauthorized. Admin credentials required.' },
      { status: 403 }
    );
  }

  return NextResponse.json({
    authorized: true,
    email: adminUser.email,
    name: adminUser.name,
  });
}
