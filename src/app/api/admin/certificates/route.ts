import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/firebase-admin';
import { findRowById, updateRowById, appendToSheet } from '@/lib/google-sheets';
import { CertificateRecord } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const adminUser = await verifyAdminAuth(req);
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Forbidden: Administrator privileges required.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { applicationId, mentor, completionDate } = body;

    if (!applicationId) {
      return NextResponse.json({ error: 'Missing applicationId.' }, { status: 400 });
    }

    // 1. Look up application
    const appRecord = await findRowById('Applications', 0, applicationId);
    if (!appRecord) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }

    const [
      ,
      ,
      ,
      applicantName,
      ,
      ,
      ,
      ,
      internshipKey,
      currentStatus,
    ] = appRecord.row;

    // 2. Strict Requirement Check: Never issue certificate simply because payment succeeded.
    // Must have status 'completed'
    if (currentStatus !== 'completed') {
      return NextResponse.json(
        {
          error: `Cannot issue certificate: Application status is "${currentStatus}". A participant must have completed all assigned research milestones before certificate generation.`,
        },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    const certificateId = `CERT-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
    const verificationUrl = `/verify-certificate/${certificateId}`;
    const studentName = applicantName || 'Scholar';
    const finalMentor = mentor || 'LexMinds Editorial Board & Senior Advocate Chambers';
    const finalDate = completionDate || now.split('T')[0];

    // 3. Append to Certificates tab:
    // [Certificate ID, Linked Application ID, Student Name, Internship Title, Mentor, Completion Date, Verification URL, Issued Status, Issued At]
    const certRow = [
      certificateId,
      applicationId,
      studentName,
      internshipKey,
      finalMentor,
      finalDate,
      verificationUrl,
      'issued',
      now,
    ];

    await appendToSheet('Certificates', certRow);

    // 4. Update application status to certificate_issued
    const updatedAppRow = [...appRecord.row];
    updatedAppRow[9] = 'certificate_issued';
    updatedAppRow[13] = now;
    await updateRowById('Applications', 0, applicationId, updatedAppRow);

    return NextResponse.json({
      success: true,
      certificate: {
        certificateId,
        applicationId,
        studentName,
        internshipTitle: internshipKey,
        mentor: finalMentor,
        completionDate: finalDate,
        verificationUrl,
        issuedStatus: 'issued',
        issuedAt: now,
      },
    });
  } catch (err: any) {
    console.error('[Admin Certificates POST Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to issue certificate.' },
      { status: 500 }
    );
  }
}
