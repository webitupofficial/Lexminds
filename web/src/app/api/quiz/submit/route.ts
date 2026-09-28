import { NextResponse } from 'next/server';
import { verifyUserAuth } from '@/lib/firebase-admin';
import { createPendingSubmissionOrder } from '@/lib/payment-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // 1. Mandatory Firebase Google Authentication
    const verifiedUser = await verifyUserAuth(req);
    if (!verifiedUser || !verifiedUser.email) {
      return NextResponse.json(
        {
          error: 'Authentication required. Please sign in with your verified Google account before registering for the quiz.',
        },
        { status: 401 }
      );
    }

    const body = await req.json().catch(() => ({}));
    const { fullName, phone, collegeName, yearOfStudy, declaration, quizKey } = body;

    // 2. Validate Required Participant Fields
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json({ error: 'Full legal name is required.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().replace(/\D/g, '').length < 10) {
      return NextResponse.json({ error: 'A valid 10-digit WhatsApp phone number is required.' }, { status: 400 });
    }

    if (!collegeName || typeof collegeName !== 'string' || !collegeName.trim()) {
      return NextResponse.json({ error: 'College / Institution name is required.' }, { status: 400 });
    }

    if (!yearOfStudy || typeof yearOfStudy !== 'string' || !yearOfStudy.trim()) {
      return NextResponse.json({ error: 'Year of study or academic eligibility is required.' }, { status: 400 });
    }

    if (!declaration) {
      return NextResponse.json(
        { error: 'You must confirm the information provided and accept the quiz rules to proceed.' },
        { status: 400 }
      );
    }

    // 3. Create Pending Registration in Google Sheets & Authoritative Razorpay Order (₹19 / 1900 paise)
    const result = await createPendingSubmissionOrder({
      productKey: 'quiz_registration',
      firebaseUid: verifiedUser.uid,
      verifiedEmail: verifiedUser.email,
      formData: {
        participantName: fullName.trim(),
        phone: phone.trim(),
        institution: collegeName.trim(),
        yearOfStudy: yearOfStudy.trim(),
        quizKey: quizKey || 'lexminds-virtual-quiz-2026',
        declaration: true,
      },
    });

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      referenceId: result.internalReference,
      paymentRecordId: result.paymentRecordId,
      amount: result.amountPaise,
      currency: result.currency,
      sessionToken: result.sessionToken,
      paymentUrl: result.paymentUrl,
    });
  } catch (err: any) {
    console.error('[Quiz Registration API Error]:', err.message || err);
    return NextResponse.json(
      { error: err.message || 'Error processing quiz registration.' },
      { status: 400 }
    );
  }
}
