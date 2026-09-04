import { NextResponse } from 'next/server';
import { appendToSheet } from '@/lib/google-sheets';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

// Email validation regex (standard RFC 5322 compliant simplified)
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, institution, category, subject, message, hp_website } = body;

    // 1. Anti-spam honeypot detection: bots automatically fill hidden fields
    if (hp_website) {
      // Silently succeed to trick automated spam bots
      return NextResponse.json({
        success: true,
        ticketId: `TKT-SPAM-${Date.now().toString(36).toUpperCase()}`,
        message: 'Inquiry received.',
      });
    }

    // 2. Validate Required Fields
    if (!name || typeof name !== 'string' || !name.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }

    if (!subject || typeof subject !== 'string' || !subject.trim()) {
      return NextResponse.json({ error: 'Inquiry subject line is required.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Inquiry message must be at least 10 characters long.' },
        { status: 400 }
      );
    }

    // 3. Construct clean ticket metadata
    const timestamp = new Date().toISOString();
    const ticketId = `TKT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const fullSubject = category && category.trim() 
      ? `[${category.trim()}] ${subject.trim()}`
      : subject.trim();

    // Row mapping matching SHEET_TAB_HEADERS.ContactTickets:
    // ['Ticket ID', 'Verified Email', 'Name', 'Phone', 'Institution', 'Subject', 'Message', 'Status', 'Created At']
    const ticketRow = [
      ticketId,
      email.trim().toLowerCase(),
      name.trim(),
      phone && typeof phone === 'string' ? phone.trim() : 'N/A',
      institution && typeof institution === 'string' ? institution.trim() : 'N/A',
      fullSubject,
      message.trim(),
      'new',
      timestamp,
    ];

    // 4. Append to ContactTickets tab in Google Sheets
    await appendToSheet('ContactTickets', ticketRow);

    return NextResponse.json({
      success: true,
      ticketId,
      message: 'Your inquiry has been successfully registered in the LexMinds ContactTickets registry.',
      createdAt: timestamp,
    });
  } catch (err: any) {
    console.error('[Contact Submit API Error]:', err.message || err);
    return NextResponse.json(
      { error: err.message || 'An unexpected error occurred while logging your inquiry.' },
      { status: 400 }
    );
  }
}
