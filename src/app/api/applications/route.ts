import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data-store';

export async function GET() {
  return NextResponse.json({
    applications: dataStore.getApplications(),
    internships: dataStore.getInternships()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.internshipId || !body.fullName || !body.email) {
      return NextResponse.json({ error: 'Missing required applicant fields' }, { status: 400 });
    }

    const newApp = {
      id: `app-${Date.now()}`,
      internshipId: body.internshipId,
      internshipTitle: body.internshipTitle || 'Legal Internship',
      fullName: body.fullName,
      email: body.email,
      phone: body.phone || '',
      collegeName: body.collegeName || 'National Law University',
      yearOfStudy: body.yearOfStudy || '4th Year',
      cgpa: body.cgpa || '8.0/10',
      linkedinUrl: body.linkedinUrl || '',
      resumeUrl: body.resumeUrl || 'https://drive.google.com/sample-resume',
      sop: body.sop || '',
      paymentStatus: (body.paymentStatus || 'submitted') as any,
      paymentId: body.paymentId || `pay_app_${Date.now()}`,
      amountPaid: body.amountPaid || 299,
      createdAt: new Date().toISOString()
    };

    dataStore.addApplication(newApp);
    return NextResponse.json({ success: true, application: newApp });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { applicationId, status } = body;

    if (!applicationId || !status) {
      return NextResponse.json({ error: 'Missing applicationId or status' }, { status: 400 });
    }

    const updated = dataStore.updateApplicationStatus(applicationId, status);
    if (!updated) {
      return NextResponse.json({ error: 'Application not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, status, applications: dataStore.getApplications() });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
