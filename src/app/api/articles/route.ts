import { NextResponse } from 'next/server';
import { dataStore } from '@/lib/data-store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeAll = searchParams.get('all') === 'true';
  const submissionsOnly = searchParams.get('submissions') === 'true';

  if (submissionsOnly) {
    return NextResponse.json({ submissions: dataStore.getSubmissions() });
  }

  if (includeAll) {
    return NextResponse.json({
      articles: dataStore.getAllArticles(),
      submissions: dataStore.getSubmissions(),
      metrics: dataStore.getMetrics()
    });
  }

  return NextResponse.json({ articles: dataStore.getArticles() });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Check if this is a submission from the "Publish with us" page
    if (body.type === 'submission' || body.authorEmail) {
      const newSubmission = {
        id: `sub-${Date.now()}`,
        authorName: body.authorName,
        authorEmail: body.authorEmail,
        authorPhone: body.authorPhone || '',
        authorInstitution: body.authorInstitution || 'Law Student / Independent Scholar',
        authorDesignation: body.authorDesignation || 'Scholar',
        title: body.title,
        category: body.category || 'Corporate & M&A',
        abstract: body.abstract,
        content: body.content,
        keywords: Array.isArray(body.keywords) ? body.keywords : (body.keywords || '').split(',').map((k: string) => k.trim()),
        paymentStatus: (body.paymentStatus || 'paid') as 'pending_payment' | 'paid',
        paymentId: body.paymentId || `pay_sub_${Date.now()}`,
        amountPaid: body.amountPaid || 499,
        status: 'draft' as const,
        editorialFeedback: 'Article submitted successfully. Plagiarism analysis and initial peer assessment queued.',
        submittedAt: new Date().toISOString()
      };

      dataStore.addSubmission(newSubmission);
      return NextResponse.json({ success: true, submission: newSubmission });
    }

    return NextResponse.json({ error: 'Invalid submission format' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { submissionId, status, feedback } = body;

    if (!submissionId || !status) {
      return NextResponse.json({ error: 'Missing submissionId or status' }, { status: 400 });
    }

    const updated = dataStore.updateSubmissionStatus(submissionId, status, feedback);
    if (!updated) {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      status,
      submissions: dataStore.getSubmissions(),
      articles: dataStore.getArticles()
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
