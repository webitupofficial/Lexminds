import { NextResponse } from 'next/server';

/**
 * Legacy Applications Endpoint.
 * Disallowed to prevent unauthenticated data exposure or spoofed applications.
 * Authorized admin access is routed through /api/admin/applications.
 * Student enrollment is routed through /api/payment/create-order and /api/payment/verify.
 */
export async function GET() {
  return NextResponse.json(
    { error: 'Unauthorized access. Application registry requires administrative authorization via /api/admin/applications.' },
    { status: 403 }
  );
}

export async function POST() {
  return NextResponse.json(
    { error: 'Direct application submission rejected. Enrollment requires verified Razorpay checkout.' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Unauthorized. Status updates must be authenticated via /api/admin/applications.' },
    { status: 403 }
  );
}
