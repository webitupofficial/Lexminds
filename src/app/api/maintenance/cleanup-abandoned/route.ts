import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { reportAndCleanupAbandonedPendingRows } from '@/lib/maintenance';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Validates the caller using the server's CRON_SECRET.
 * Vercel Crons send `Authorization: Bearer <CRON_SECRET>`.
 * Manual curl / webhook calls can provide either `Authorization: Bearer <CRON_SECRET>`
 * or the `x-cron-secret` header.
 */
function isAuthorized(req: Request): boolean {
  const serverSecret = process.env.CRON_SECRET;
  if (!serverSecret || serverSecret.trim() === '') {
    // Fail closed: If CRON_SECRET is unconfigured on the server, reject all requests.
    return false;
  }

  const authHeader = req.headers.get('authorization');
  const cronHeader = req.headers.get('x-cron-secret');

  let providedSecret = '';
  if (authHeader && authHeader.startsWith('Bearer ')) {
    providedSecret = authHeader.slice(7).trim();
  } else if (cronHeader) {
    providedSecret = cronHeader.trim();
  }

  if (!providedSecret || providedSecret.length !== serverSecret.length) {
    return false;
  }

  try {
    return crypto.timingSafeEqual(Buffer.from(providedSecret, 'utf8'), Buffer.from(serverSecret, 'utf8'));
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  if (!isAuthorized(req)) {
    console.warn('[Maintenance API]: Unauthorized maintenance trigger attempt rejected (Missing or invalid CRON_SECRET).');
    return NextResponse.json(
      { error: 'Unauthorized: A valid CRON_SECRET is required to execute maintenance cleanup.' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(req.url);
    const maxAgeHours = parseInt(searchParams.get('maxAgeHours') || '24', 10);

    const report = await reportAndCleanupAbandonedPendingRows(maxAgeHours);
    return NextResponse.json({ success: true, report });
  } catch (err: any) {
    console.error('[Maintenance API Error]:', err.message || err);
    return NextResponse.json({ error: err.message || 'Error executing cleanup.' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  return POST(req);
}
