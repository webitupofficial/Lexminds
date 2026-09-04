import { NextResponse } from 'next/server';
import { verifyPaymentSessionToken } from '@/lib/payment-token';
import { PRODUCT_CATALOG } from '@/lib/payment-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, token } = body;

    if (!token || typeof token !== 'string') {
      return NextResponse.json({ error: 'Missing or invalid session token.' }, { status: 400 });
    }

    const payload = verifyPaymentSessionToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Payment session has expired or is invalid. Please restart your submission.' },
        { status: 401 }
      );
    }

    if (orderId && payload.orderId !== orderId) {
      return NextResponse.json({ error: 'Order ID mismatch.' }, { status: 400 });
    }

    const product = PRODUCT_CATALOG[payload.productKey];

    return NextResponse.json({
      success: true,
      orderId: payload.orderId,
      referenceId: payload.referenceId,
      productKey: payload.productKey,
      productName: product?.name || 'LexMinds Official Service',
      amountPaise: payload.amountPaise,
      currency: payload.currency,
      email: payload.email,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '',
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Error fetching session information.' },
      { status: 400 }
    );
  }
}
