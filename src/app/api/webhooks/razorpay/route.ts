import { NextResponse } from 'next/server';
import { processRazorpayWebhook } from '@/lib/payment-service';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signatureHeader = req.headers.get('x-razorpay-signature');

    const result = await processRazorpayWebhook(rawBody, signatureHeader);

    return NextResponse.json({
      received: true,
      event: result.event,
      message: result.message,
    });
  } catch (err: any) {
    console.error('[Razorpay Webhook Error]:', err.message || err);
    return NextResponse.json(
      { error: err.message || 'Webhook verification failed.' },
      { status: 400 }
    );
  }
}
