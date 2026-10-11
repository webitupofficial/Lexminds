import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(_req: Request) {
  return NextResponse.json(
    {
      error:
        'Registrations for the Legal Awareness Quiz Competition are now closed. If you have already registered, please access the Candidate Desk.',
    },
    { status: 403 }
  );
}
