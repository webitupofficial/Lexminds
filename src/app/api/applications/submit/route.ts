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
          error: 'Authentication required. Please sign in with your Google account before submitting an application.',
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { fullName, phone, collegeName, yearOfStudy, academicScore, sop, declaration, internshipKey } = body;

    // 2. Validate Required Applicant Fields
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 10) {
      return NextResponse.json({ error: 'A valid 10-digit phone number is required.' }, { status: 400 });
    }

    if (!collegeName || typeof collegeName !== 'string' || !collegeName.trim()) {
      return NextResponse.json({ error: 'Institution/college name is required.' }, { status: 400 });
    }

    if (!sop || typeof sop !== 'string' || sop.trim().length < 30) {
      return NextResponse.json({ error: 'Statement of purpose must be at least 30 characters.' }, { status: 400 });
    }

    if (!declaration) {
      return NextResponse.json({ error: 'You must accept the honor declaration to proceed.' }, { status: 400 });
    }

    // 3. Create Pending Submission Row in Google Sheets & Authoritative Razorpay Order
    const result = await createPendingSubmissionOrder({
      productKey: 'internship_enrollment',
      firebaseUid: verifiedUser.uid,
      verifiedEmail: verifiedUser.email,
      formData: {
        applicantName: fullName.trim(),
        phone: phone.trim(),
        institution: collegeName.trim(),
        yearOfStudy: yearOfStudy || '4th Year (5-Year B.A. LL.B)',
        academicScore: academicScore || '',
        sop: sop.trim(),
        internshipKey: internshipKey || 'legal-research-fellowship',
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
    console.error('[Applications Submit API Error]:', err.message || err);
    return NextResponse.json(
      { error: err.message || 'Error processing application submission.' },
      { status: 400 }
    );
  }
}
