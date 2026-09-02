import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (keySecret && razorpay_order_id && razorpay_signature) {
      const generatedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest('hex');

      if (generatedSignature !== razorpay_signature) {
        return NextResponse.json({ verified: false, error: 'Invalid payment signature' }, { status: 400 });
      }
    }

    return NextResponse.json({
      verified: true,
      paymentId: razorpay_payment_id || `pay_verified_${Date.now()}`,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json({ verified: false, error: error.message }, { status: 500 });
  }
}
