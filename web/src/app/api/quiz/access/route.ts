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
    // 1. Mandatory Firebase Auth verification
    const verifiedUser = await verifyUserAuth(req);
    if (!verifiedUser || !verifiedUser.email) {
      return NextResponse.json(
        {
          hasAccess: false,
          error: 'Authentication required. Please sign in with your verified Google account to check quiz access.',
        },
        { status: 401 }
      );
    }

    // 2. Query Authoritative Quiz Access & Payment Status
    const accessResult = await checkUserQuizAccess(verifiedUser.uid, verifiedUser.email);

    return NextResponse.json({
      success: true,
      ...accessResult,
    });
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
