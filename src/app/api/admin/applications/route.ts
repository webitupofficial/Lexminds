import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/firebase-admin';
import { getTabRows, findRowById, updateRowById } from '@/lib/google-sheets';
import { InternshipApplication, InternshipApplicationStatus } from '@/lib/types';

const ALLOWED_STATUSES: InternshipApplicationStatus[] = [
  'payment_pending',
  'paid',
  'under_review',
  'accepted',
  'waitlisted',
  'rejected',
  'completed',
  'certificate_issued',
  'cancelled',
];

export async function GET(req: Request) {
  try {
    const adminUser = await verifyAdminAuth(req);
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Forbidden: Administrator privileges required.' },
        { status: 403 }
      );
    }

    const rows = await getTabRows('Applications');
    const applications: InternshipApplication[] = rows.map((r) => ({
      applicationId: r[0] || '',
      firebaseUid: r[1] || '',
      verifiedEmail: r[2] || '',
      applicantName: r[3] || '',
      phone: r[4] || '',
      institution: r[5] || '',
      yearOfStudy: r[6] || '',
      academicScore: r[7] || '',
      internshipKey: r[8] || '',
      status: (r[9] || 'paid') as InternshipApplicationStatus,
      paymentRecordId: r[10] || '',
      adminNotes: r[11] || '',
      createdAt: r[12] || '',
      updatedAt: r[13] || '',
    }));

    return NextResponse.json({ success: true, applications });
  } catch (err: any) {
    console.error('[Admin Applications GET Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to retrieve applications.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const adminUser = await verifyAdminAuth(req);
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Forbidden: Administrator privileges required.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { applicationId, status, adminNotes } = body;

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: 'Missing required parameters: applicationId and status.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status "${status}". Allowed: ${ALLOWED_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const existing = await findRowById('Applications', 0, applicationId);
    if (!existing) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }

    const now = new Date().toISOString();
    const updatedRow = [...existing.row];

    updatedRow[9] = status; // Status
    if (adminNotes !== undefined) updatedRow[11] = adminNotes;
    updatedRow[13] = now; // Updated At

    await updateRowById('Applications', 0, applicationId, updatedRow);

    return NextResponse.json({
      success: true,
      applicationId,
      status,
      timestamp: now,
    });
  } catch (err: any) {
    console.error('[Admin Applications PATCH Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to update application status.' },
      { status: 500 }
    );
  }
}
