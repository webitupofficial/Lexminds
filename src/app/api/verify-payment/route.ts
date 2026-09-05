import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret) {
      return NextResponse.json(
        { error: 'Server configuration error: RAZORPAY_KEY_SECRET is not set.' },
        { status: 500 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const orderId = body.razorpay_order_id || body.order_id;
    const paymentId = body.razorpay_payment_id || body.payment_id;
    const signature = body.razorpay_signature || body.signature;

    // Validate required fields
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        {
          error:
            'Missing required parameters. razorpay_order_id, razorpay_payment_id, and razorpay_signature are required.',
        },
        { status: 400 }
      );
    }

    // Compute HMAC-SHA256(order_id + "|" + payment_id, KEY_SECRET)
    const payload = `${orderId}|${paymentId}`;
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');

    // Secure timing-safe signature comparison
    let isAuthentic = false;
    try {
      const generatedBuf = Buffer.from(generatedSignature, 'utf-8');
      const signatureBuf = Buffer.from(String(signature), 'utf-8');

      if (generatedBuf.length === signatureBuf.length) {
        isAuthentic = crypto.timingSafeEqual(generatedBuf, signatureBuf);
      }
    } catch {
      isAuthentic = false;
    }

    if (!isAuthentic) {
      return NextResponse.json(
        {
          success: false,
          error: 'Payment verification failed: Signature mismatch.',
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully.',
      order_id: orderId,
      payment_id: paymentId,
    });
  } catch (err: any) {
    console.error('[Razorpay Verify Payment Error]:', err);
    return NextResponse.json(
      {
        error: err?.message || 'Internal server error while verifying payment signature.',
      },
      { status: 500 }
    );
  }
}
