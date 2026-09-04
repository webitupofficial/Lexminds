import { NextResponse } from 'next/server';
import { reportAndCleanupAbandonedPendingRows } from '@/lib/maintenance';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const maxAgeHours = parseInt(searchParams.get('maxAgeHours') || '24', 10);

    const report = await reportAndCleanupAbandonedPendingRows(maxAgeHours);
    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error executing cleanup.' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
