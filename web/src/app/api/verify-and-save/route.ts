import { NextResponse } from 'next/server';

/**
 * Deprecated multi-form endpoint.
 * Superseded by:
 * - /api/payment/create-order
 * - /api/payment/verify
 * - /api/webhooks/razorpay
 */
export async function POST() {
  return NextResponse.json(
    {
      error: 'This endpoint is deprecated. Submissions must use /api/payment/create-order and /api/payment/verify.',
    },
    { status: 410 }
  );
}
