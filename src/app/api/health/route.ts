import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { getTabRows } from '@/lib/google-sheets';
import { validateRazorpayCredentials } from '@/lib/payment-service';
import { verifyFirebaseIdToken, lastVerificationError } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function isPrivilegedDiagnosticRequest(req: Request): boolean {
  if (process.env.APP_ENV === 'test') return true;

  const serverSecret = process.env.CRON_SECRET;
  if (!serverSecret) return false;

  const cronHeader = req.headers.get('x-cron-secret');
  const authHeader = req.headers.get('authorization');

  let provided = '';
  if (cronHeader) {
    provided = cronHeader.trim();
  } else if (authHeader && authHeader.startsWith('Bearer ')) {
    provided = authHeader.slice(7).trim();
  }

  if (!provided || provided.length !== serverSecret.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(provided, 'utf8'), Buffer.from(serverSecret, 'utf8'));
  } catch {
    return false;
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const testToken = searchParams.get('testToken');
  const isPrivileged = isPrivilegedDiagnosticRequest(req);

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

    if (sheetId && email && hasKey) {
      const rows = await getTabRows('Payments');
      diagnostics.checks.googleSheets = {
        status: 'connected',
        ...(isPrivileged ? { paymentsRowCount: rows.length, configured: true } : {}),
      };
    } else {
      diagnostics.status = 'degraded';
      diagnostics.checks.googleSheets = {
        status: 'misconfigured',
      };
    }
  } catch (err: any) {
    diagnostics.status = 'degraded';
    diagnostics.checks.googleSheets = {
      status: 'failed',
      ...(isPrivileged ? { error: err.message || String(err) } : {}),
    };
  }

  // 2. Firebase Admin Check
  try {
    const projId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const hasKey = Boolean(process.env.FIREBASE_PRIVATE_KEY);

    if (projId && clientEmail && hasKey) {
      diagnostics.checks.firebaseAdmin = {
        status: 'ready',
        ...(isPrivileged
          ? {
              projectId: projId,
              clientEmailConfigured: true,
              privateKeyConfigured: true,
            }
          : {}),
      };
    } else {
      diagnostics.status = 'degraded';
      diagnostics.checks.firebaseAdmin = {
        status: 'misconfigured',
      };
    }

    if (testToken) {
      const user = await verifyFirebaseIdToken(testToken);
      diagnostics.checks.firebaseAdmin.tokenTest = user
        ? { verified: true, email: user.email }
        : { verified: false, ...(isPrivileged ? { error: lastVerificationError } : {}) };
    }
  } catch (err: any) {
    diagnostics.status = 'degraded';
    diagnostics.checks.firebaseAdmin = {
      status: 'failed',
      ...(isPrivileged ? { error: err.message || String(err) } : {}),
    };
  }

  // 3. Razorpay Check
  try {
    const { keyId } = validateRazorpayCredentials();
    diagnostics.checks.razorpay = {
      status: 'ready',
      configured: true,
      ...(isPrivileged ? { keyIdPrefix: keyId.slice(0, 8) } : {}),
    };
  } catch (err: any) {
    diagnostics.status = 'degraded';
    diagnostics.checks.razorpay = {
      status: 'failed',
      configured: false,
      ...(isPrivileged ? { error: err.message || String(err) } : {}),
    };
  }

  return NextResponse.json(diagnostics, { status: diagnostics.status === 'ok' ? 200 : 503 });
}

