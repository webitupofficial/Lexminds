import { NextResponse } from 'next/server';
import { verifyUserAuth } from '@/lib/firebase-admin';
import { createAuthoritativeOrder } from '@/lib/payment-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // 1. Mandatory Firebase Authentication
    const verifiedUser = await verifyUserAuth(req);
    if (!verifiedUser || !verifiedUser.email) {
      return NextResponse.json(
        {
          error: 'Authentication required. Please sign in with your Google account before initiating enrollment or submission.',
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { productKey, metadata } = body;

    if (!productKey) {
      return NextResponse.json(
        { error: 'Missing required "productKey" parameter.' },
        { status: 400 }
      );
    }

    // Security Gate: Reject if client attempts to submit custom "amount"
    if (body.amount !== undefined || body.amountPaid !== undefined) {
      console.warn('[Security Gate]: Client attempted to dictate payment amount. Ignored; using server catalog.');
    }

    // 2. Authoritative Order Creation with Server-Priced Fee
    const order = await createAuthoritativeOrder({
      productKey,
      firebaseUid: verifiedUser.uid,
      verifiedEmail: verifiedUser.email,
      metadata: metadata || {},
    });

    return NextResponse.json({
      success: true,
      id: order.orderId,
      amount: order.amountPaise,
      currency: order.currency,
      key: order.keyId,
      paymentRecordId: order.paymentRecordId,
      referenceId: order.internalReference,
    });
  } catch (err: any) {
    console.error('[Create Order API Error]:', err.message || err);
    return NextResponse.json(
      { error: err.message || 'Error while creating payment order.' },
      { status: 400 }
    );
  }
}
