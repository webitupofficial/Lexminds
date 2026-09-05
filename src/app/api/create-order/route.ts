import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      return NextResponse.json(
        { error: 'Razorpay API credentials are not configured on the server.' },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { amount, currency = 'INR', receipt, notes } = body;

    const parsedAmount = Number(amount);

    // Minimum amount validation: 100 paise (₹1.00)
    if (isNaN(parsedAmount) || parsedAmount < 100) {
      return NextResponse.json(
        { error: 'Invalid amount. Minimum amount is 100 paise (₹1.00).' },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(parsedAmount),
      currency: (currency || 'INR').toUpperCase(),
      receipt: receipt || `rcpt_${Date.now()}`,
      notes: notes || {},
    });

    return NextResponse.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: keyId,
    });
  } catch (err: any) {
    console.error('[Razorpay Create Order Error]:', err);
    const statusCode = err?.statusCode || 500;
    return NextResponse.json(
      {
        error:
          err?.error?.description ||
          err?.message ||
          'Failed to create order with Razorpay API.',
      },
      { status: statusCode }
    );
  }
}
