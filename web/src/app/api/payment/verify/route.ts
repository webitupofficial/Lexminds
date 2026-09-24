import { NextResponse } from 'next/server';
import { verifyUserAuth } from '@/lib/firebase-admin';
import { reconcilePaymentAndFulfill, verifySessionAndFulfill } from '@/lib/payment-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      productKey,
      payload,
      sessionToken,
      token,
      honeypot,
    } = body;

    // Honeypot bot protection
    if (honeypot && honeypot.trim().length > 0) {
      return NextResponse.json({ error: 'Automated request rejected.' }, { status: 400 });
    }

    // Required Razorpay signature parameters check
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json(
        { error: 'Missing Razorpay signature verification parameters (order_id, payment_id, signature).' },
        { status: 400 }
      );
    }

    const effectiveToken = sessionToken || token;

    // 1. Session Token Flow: No Firebase auth required in React state
    if (effectiveToken) {
      const result = await verifySessionAndFulfill({
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        sessionToken: effectiveToken,
      });

      return NextResponse.json({
        success: true,
        verified: true,
        paymentRecordId: result.paymentRecordId,
        referenceId: result.referenceId,
        alreadyProcessed: result.alreadyProcessed || false,
        timestamp: new Date().toISOString(),
      });
    }

    // 2. Direct / Authenticated Header Flow (Fallback / Direct API invocation)
    const verifiedUser = await verifyUserAuth(req);
    if (!verifiedUser || !verifiedUser.email) {
      return NextResponse.json(
        {
          error: 'Authentication required. Please sign in with your Google account or provide a valid payment session token.',
        },
        { status: 401 }
      );
    }

    if (!productKey) {
      return NextResponse.json({ error: 'Missing productKey parameter.' }, { status: 400 });
    }

    const result = await reconcilePaymentAndFulfill({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      productKey,
      firebaseUid: verifiedUser.uid,
      verifiedEmail: verifiedUser.email,
      payload: payload || {},
    });

    return NextResponse.json({
      success: true,
      verified: true,
      paymentRecordId: result.paymentRecordId,
      referenceId: result.referenceId,
      alreadyProcessed: result.alreadyProcessed || false,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('[Payment Verification API Error]:', err.message || err);
    return NextResponse.json(
      { verified: false, error: err.message || 'Payment signature verification failed.' },
      { status: 400 }
    );
  }
}
