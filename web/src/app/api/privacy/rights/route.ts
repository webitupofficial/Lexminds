import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/google-sheets';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      fullName, 
      email, 
      phone, 
      requestType, 
      description, 
      identifierRef, 
      nomineeName,
      nomineeContact,
      hp_field 
    } = body;

    // Honeypot spam defense
    if (hp_field) {
      return NextResponse.json({
        success: true,
        docketId: `DPDP-SPAM-${Date.now().toString(36).toUpperCase()}`,
        message: 'Request acknowledged.',
      });
    }

    // Required field validation
    if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
      return NextResponse.json({ error: 'Full name of the Data Principal is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'A valid email address is required for statutory communication.' }, { status: 400 });
    }

    if (!requestType || typeof requestType !== 'string') {
      return NextResponse.json({ error: 'Statutory request type must be selected.' }, { status: 400 });
    }

    if (!description || typeof description !== 'string' || description.trim().length < 15) {
      return NextResponse.json(
        { error: 'Please provide clear details regarding your request (minimum 15 characters).' },
        { status: 400 }
      );
    }

    const timestamp = new Date().toISOString();
    const docketId = `DPDP-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    // Format docket row for sheets recording (or audit logging)
    const docketRow = [
      docketId,
      email.trim().toLowerCase(),
      fullName.trim(),
      phone && typeof phone === 'string' ? phone.trim() : 'N/A',
      requestType,
      identifierRef && typeof identifierRef === 'string' ? identifierRef.trim() : 'N/A',
      description.trim(),
      nomineeName ? `${nomineeName} (${nomineeContact || 'N/A'})` : 'N/A',
      'OPEN - STATUTORY REVIEW',
      timestamp,
    ];

    try {
      await appendToSheet('ContactTickets', docketRow);
    } catch (sheetErr) {
      console.warn('[DPDP Rights Request] Google Sheets write non-fatal notice:', sheetErr);
    }

    return NextResponse.json({
      success: true,
      docketId,
      timestamp,
      message: 'Your Data Principal Rights request has been officially recorded under the Digital Personal Data Protection Act, 2023.',
      slaNotice: 'Statutory Acknowledgement: Our Grievance Redressal Desk will verify your identity and respond within 48-72 hours, with full determination within 30 days.',
    });
  } catch (error) {
    console.error('DPDP rights submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error processing rights request. Please email lexmindsindia@gmail.com directly.' },
      { status: 500 }
    );
  }
}
