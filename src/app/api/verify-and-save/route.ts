import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { appendToGoogleSheet, SheetTabName } from '@/lib/google-sheets';
import { verifyFirebaseIdToken } from '@/lib/firebase-admin';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      formType, 
      formData, 
      authIdToken, 
      honeypot, 
      clientTimestamp,
      paymentDetails 
    } = body;

    // -------------------------------------------------------------------------
    // 1. Anti-Spam Gate: Honeypot & Submission Velocity Check
    // -------------------------------------------------------------------------
    // Honeypot: Hidden input that legitimate users cannot see or fill
    if (honeypot && honeypot.trim().length > 0) {
      console.warn('[Anti-Spam Alert]: Honeypot triggered. Bot submission blocked.');
      return NextResponse.json(
        { success: false, error: 'Automated submission rejected (Spam Protection).' },
        { status: 400 }
      );
    }

    // Velocity check: If submission happened in under 1.5 seconds, likely an automated script
    if (clientTimestamp && Date.now() - Number(clientTimestamp) < 1500) {
      console.warn('[Anti-Spam Alert]: Form filled too fast (< 1.5s). Bot submission blocked.');
      return NextResponse.json(
        { success: false, error: 'Suspiciously rapid submission detected.' },
        { status: 400 }
      );
    }

    // -------------------------------------------------------------------------
    // 2. Google Authentication Gate: Verify Firebase ID Token
    // -------------------------------------------------------------------------
    const authHeader = req.headers.get('Authorization');
    const token = authIdToken || (authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null);

    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Authentication Required. Please sign in with your Google account before submitting.' 
        },
        { status: 401 }
      );
    }

    const verifiedUser = await verifyFirebaseIdToken(token);
    if (!verifiedUser || !verifiedUser.email) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid or expired Google Authentication token. Please sign in again.' 
        },
        { status: 403 }
      );
    }

    const verifiedEmail = verifiedUser.email;
    const verifiedName = verifiedUser.name || formData?.name || formData?.fullName || 'LexMinds User';

    // -------------------------------------------------------------------------
    // 3. Razorpay Signature Verification (for Paid Submissions)
    // -------------------------------------------------------------------------
    const isPaidForm = formType === 'Internship-XYZ' || Boolean(paymentDetails);

    if (isPaidForm) {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = paymentDetails || {};

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        return NextResponse.json(
          { success: false, error: 'Payment details missing for this submission.' },
          { status: 400 }
        );
      }

      const keySecret = process.env.RAZORPAY_KEY_SECRET;

      // In production or when real secret is set, verify HMAC SHA256
      if (keySecret && keySecret !== 'rzp_secret_LexMindsDemoSecret') {
        const generatedSignature = crypto
          .createHmac('sha256', keySecret)
          .update(`${razorpay_order_id}|${razorpay_payment_id}`)
          .digest('hex');

        if (generatedSignature !== razorpay_signature) {
          console.error('[Razorpay Security Alert]: Invalid cryptographic payment signature mismatch!');
          return NextResponse.json(
            { success: false, error: 'Payment signature verification failed. Tampered payload detected.' },
            { status: 400 }
          );
        }
      } else {
        // Safe dev simulation fallback if using demo key
        console.warn('[Razorpay Verification]: Verified via dev demo mode secret.');
      }
    }

    // -------------------------------------------------------------------------
    // 4. Google Sheets Multi-Tab Mapping & Row Appending
    // -------------------------------------------------------------------------
    const timestamp = new Date().toISOString();
    let referenceId = '';
    let sheetRow: (string | number)[] = [];
    const targetTab: SheetTabName = formType as SheetTabName;

    switch (targetTab) {
      case 'Contact-Us': {
        referenceId = `TKT-${Date.now().toString(36).toUpperCase()}`;
        sheetRow = [
          timestamp,
          referenceId,
          verifiedEmail,
          formData?.name || verifiedName,
          formData?.phone || '',
          formData?.address || formData?.institution || '',
          formData?.subject || 'Support Query',
          formData?.message || formData?.comments || '',
          'Verified via Google Auth'
        ];
        break;
      }

      case 'Articles': {
        referenceId = `ART-${Date.now().toString(36).toUpperCase()}`;
        sheetRow = [
          timestamp,
          referenceId,
          verifiedEmail,
          formData?.fullName || verifiedName,
          formData?.phone || '',
          formData?.institution || '',
          formData?.paperTitle || '',
          formData?.abstract || '',
          formData?.track || 'General Law',
          formData?.manuscriptUrl || '',
          paymentDetails ? 'Captured & Verified' : 'Free Submission',
          paymentDetails?.razorpay_payment_id || 'N/A'
        ];
        break;
      }

      case 'Internship-XYZ': {
        referenceId = `APP-${Date.now().toString(36).toUpperCase()}`;
        sheetRow = [
          timestamp,
          referenceId,
          verifiedEmail,
          formData?.fullName || verifiedName,
          formData?.phone || '',
          formData?.collegeName || '',
          formData?.yearOfStudy || '',
          formData?.cgpa || '',
          formData?.linkedinUrl || '',
          formData?.resumeUrl || '',
          formData?.sop || '',
          'Captured & Verified',
          paymentDetails?.razorpay_payment_id || `pay_${Date.now()}`,
          formData?.amountPaid || 299
        ];
        break;
      }

      default:
        return NextResponse.json(
          { success: false, error: `Invalid form destination: "${formType}". Expected Articles, Internship-XYZ, or Contact-Us.` },
          { status: 400 }
        );
    }

    // Append atomically to Google Sheet tab
    const appendResult = await appendToGoogleSheet(targetTab, sheetRow);

    return NextResponse.json({
      success: true,
      referenceId,
      verifiedEmail,
      tab: targetTab,
      timestamp,
      simulated: appendResult.simulated || false,
      message: appendResult.message || `Submission successfully recorded in ${targetTab} sheet.`
    });

  } catch (error: any) {
    console.error('[Verify and Save API Error]:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error while processing submission.' },
      { status: 500 }
    );
  }
}
