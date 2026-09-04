import { NextResponse } from 'next/server';
import { getTabRows } from '@/lib/google-sheets';
import { validateRazorpayCredentials } from '@/lib/payment-service';
import { verifyFirebaseIdToken, lastVerificationError } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const testToken = searchParams.get('testToken');

  const diagnostics: Record<string, any> = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    checks: {},
  };

  // 1. Google Sheets Check
  try {
    const sheetId = process.env.GOOGLE_SHEET_ID;
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const hasKey = Boolean(process.env.GOOGLE_PRIVATE_KEY);

    diagnostics.checks.googleSheets = {
      sheetIdConfigured: Boolean(sheetId),
      serviceAccountConfigured: Boolean(email),
      privateKeyConfigured: hasKey,
    };

    if (sheetId && email && hasKey) {
      // Test read from Payments tab
      const rows = await getTabRows('Payments');
      diagnostics.checks.googleSheets.liveConnection = 'connected';
      diagnostics.checks.googleSheets.paymentsRowCount = rows.length;
    }
  } catch (err: any) {
    diagnostics.status = 'degraded';
    diagnostics.checks.googleSheets = {
      liveConnection: 'failed',
      error: err.message || String(err),
    };
  }

  // 2. Firebase Admin Check
  try {
    const projId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const hasKey = Boolean(process.env.FIREBASE_PRIVATE_KEY);

    diagnostics.checks.firebaseAdmin = {
      projectId: projId || 'missing',
      clientEmailConfigured: Boolean(clientEmail),
      privateKeyConfigured: hasKey,
    };

    if (testToken) {
      const user = await verifyFirebaseIdToken(testToken);
      diagnostics.checks.firebaseAdmin.tokenTest = user
        ? { verified: true, email: user.email }
        : { verified: false, error: lastVerificationError };
    }
  } catch (err: any) {
    diagnostics.status = 'degraded';
    diagnostics.checks.firebaseAdmin = {
      error: err.message || String(err),
    };
  }

  // 3. Razorpay Check
  try {
    const { keyId } = validateRazorpayCredentials();
    diagnostics.checks.razorpay = {
      keyIdPrefix: keyId.slice(0, 8),
      configured: true,
    };
  } catch (err: any) {
    diagnostics.status = 'degraded';
    diagnostics.checks.razorpay = {
      configured: false,
      error: err.message || String(err),
    };
  }

  return NextResponse.json(diagnostics, { status: 200 });
}
