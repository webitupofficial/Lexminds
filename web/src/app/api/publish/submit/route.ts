import { NextResponse } from 'next/server';
import { verifyUserAuth } from '@/lib/firebase-admin';
import { createPendingSubmissionOrder } from '@/lib/payment-service';
import { sanitizeHtml } from '@/lib/sanitize';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    // 1. Mandatory Firebase Google Authentication
    const verifiedUser = await verifyUserAuth(req);
    if (!verifiedUser || !verifiedUser.email) {
      return NextResponse.json(
        {
          error: 'Authentication required. Please sign in with your Google account before submitting a manuscript.',
        },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      authorName,
      designation,
      institution,
      authorBio,
      signatureLine,
      title,
      category,
      keywords,
      abstract,
      content,
      originalityDeclaration,
      consentToPublish,
    } = body;

    // 2. Validate Required Manuscript Fields
    if (!authorName || typeof authorName !== 'string' || !authorName.trim()) {
      return NextResponse.json({ error: 'Author name is required.' }, { status: 400 });
    }

    if (!institution || typeof institution !== 'string' || !institution.trim()) {
      return NextResponse.json({ error: 'Institution/affiliation is required.' }, { status: 400 });
    }

    if (!title || typeof title !== 'string' || !title.trim()) {
      return NextResponse.json({ error: 'Treatise/article title is required.' }, { status: 400 });
    }

    if (!abstract || typeof abstract !== 'string' || abstract.trim().length < 50) {
      return NextResponse.json({ error: 'Abstract must be at least 50 characters.' }, { status: 400 });
    }

    if (!content || typeof content !== 'string' || content.trim().length < 10) {
      return NextResponse.json({ error: 'A valid manuscript Drive link (URL) is required.' }, { status: 400 });
    }

    if (!originalityDeclaration || !consentToPublish) {
      return NextResponse.json({ error: 'Originality declaration and publication consent are required.' }, { status: 400 });
    }

    const cleanContent = sanitizeHtml(content.trim());

    // 3. Create Pending Submission Row in Google Sheets & Authoritative Razorpay Order
    const result = await createPendingSubmissionOrder({
      productKey: 'article_submission',
      firebaseUid: verifiedUser.uid,
      verifiedEmail: verifiedUser.email,
      formData: {
        authorName: authorName.trim(),
        designation: designation || 'Author',
        institution: institution.trim(),
        authorBio: authorBio || '',
        signatureLine: signatureLine || `${authorName.trim()}, Author`,
        title: title.trim(),
        category: category || 'Data Privacy & Tech Law',
        keywords: keywords || [],
        abstract: abstract.trim(),
        content: cleanContent,
        originalityDeclaration: Boolean(originalityDeclaration),
        consentToPublish: Boolean(consentToPublish),
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
    console.error('[Publish Submit API Error]:', err.message || err);
    return NextResponse.json(
      { error: err.message || 'Error processing manuscript submission.' },
      { status: 400 }
    );
  }
}
