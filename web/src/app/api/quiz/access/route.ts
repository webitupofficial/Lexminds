import { NextResponse } from 'next/server';
import { verifyUserAuth } from '@/lib/firebase-admin';
import { checkUserQuizAccess } from '@/lib/payment-service';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(req: Request) {
  return handleAccessCheck(req);
}

export async function POST(req: Request) {
  return handleAccessCheck(req);
}

async function handleAccessCheck(req: Request) {
  try {
    const verifiedUser = await verifyUserAuth(req);
    const body = await req.json().catch(() => ({}));
    const referenceId = typeof body.referenceId === 'string' ? body.referenceId.trim() : '';
    const lookupEmail = typeof body.email === 'string' ? body.email.trim() : '';

    // If authenticated via Google ID token
    if (verifiedUser && verifiedUser.email) {
      const accessResult = await checkUserQuizAccess(verifiedUser.uid, verifiedUser.email, referenceId);
      return NextResponse.json({
        success: true,
        ...accessResult,
      });
    }

    // Direct Docket Reference lookup fallback (for users whose browsers block Google sign-in popups)
    if (referenceId && referenceId.length >= 6) {
      const accessResult = await checkUserQuizAccess('', lookupEmail, referenceId);
      if (accessResult.hasAccess) {
        return NextResponse.json({
          success: true,
          ...accessResult,
        });
      }
    }

    // Direct email lookup if provided
    if (lookupEmail && lookupEmail.includes('@')) {
      const accessResult = await checkUserQuizAccess('', lookupEmail, referenceId);
      if (accessResult.hasAccess) {
        return NextResponse.json({
          success: true,
          ...accessResult,
        });
      }
    }

    return NextResponse.json(
      {
        hasAccess: false,
        error: 'Authentication or valid Registration Docket ID required to access candidate portal.',
      },
      { status: 401 }
    );
  } catch (err: any) {
    console.error('[Quiz Access API Error]:', err.message || err);
    return NextResponse.json(
      {
        hasAccess: false,
        error: err.message || 'Error verifying quiz candidate access.',
      },
      { status: 500 }
    );
  }
}
