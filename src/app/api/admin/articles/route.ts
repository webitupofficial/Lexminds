import { NextResponse } from 'next/server';
import { verifyAdminAuth } from '@/lib/firebase-admin';
import { getTabRows, findRowById, updateRowById } from '@/lib/google-sheets';
import { ArticleSubmission, ArticleSubmissionStatus, Article } from '@/lib/types';
import { addPublishedArticle } from '@/lib/data-store';
import { sanitizeHtml } from '@/lib/sanitize';

const ALLOWED_STATUSES: ArticleSubmissionStatus[] = [
  'payment_pending',
  'paid_submitted',
  'under_review',
  'revision_requested',
  'approved',
  'published',
  'rejected',
  'refunded',
  'withdrawn',
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

    const rows = await getTabRows('ArticleSubmissions');
    const submissions: ArticleSubmission[] = rows.map((r) => ({
      submissionId: r[0] || '',
      firebaseUid: r[1] || '',
      verifiedEmail: r[2] || '',
      authorName: r[3] || '',
      designation: r[4] || '',
      institution: r[5] || '',
      authorBio: r[6] || '',
      signatureLine: r[7] || '',
      title: r[8] || '',
      category: r[9] || 'General Law',
      keywords: (r[10] || '').split(',').map((k) => k.trim()).filter(Boolean),
      abstract: r[11] || '',
      content: r[12] || '',
      originalityDeclaration: r[13] === 'true',
      consentToPublish: r[14] === 'true',
      paymentRecordId: r[15] || '',
      status: (r[16] || 'paid_submitted') as ArticleSubmissionStatus,
      reviewerNotes: r[17] || '',
      plagiarismNotes: r[18] || '',
      aiReviewNotes: r[19] || '',
      publicationUrl: r[20] || '',
      createdAt: r[21] || '',
      reviewedAt: r[22] || '',
      publishedAt: r[23] || '',
      reviewerEmail: r[24] || '',
    }));

    return NextResponse.json({ success: true, submissions });
  } catch (err: any) {
    console.error('[Admin Articles GET Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to retrieve article submissions.' },
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
    const { submissionId, status, reviewerNotes, plagiarismNotes, aiReviewNotes } = body;

    if (!submissionId || !status) {
      return NextResponse.json(
        { error: 'Missing required parameters: submissionId and status.' },
        { status: 400 }
      );
    }

    if (!ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status "${status}". Allowed: ${ALLOWED_STATUSES.join(', ')}` },
        { status: 400 }
      );
    }

    const existing = await findRowById('ArticleSubmissions', 0, submissionId);
    if (!existing) {
      return NextResponse.json({ error: 'Article submission not found.' }, { status: 404 });
    }

    const now = new Date().toISOString();
    const updatedRow = [...existing.row];

    updatedRow[16] = status; // Status
    if (reviewerNotes !== undefined) updatedRow[17] = reviewerNotes;
    if (plagiarismNotes !== undefined) updatedRow[18] = plagiarismNotes;
    if (aiReviewNotes !== undefined) updatedRow[19] = aiReviewNotes;
    updatedRow[22] = now; // Reviewed At
    updatedRow[24] = adminUser.email; // Reviewer Email

    // If marked published, generate slug and publish to content adapter with sanitized HTML
    if (status === 'published') {
      const title = existing.row[8] || 'Legal Treatise';
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const publicationUrl = `/articles/${slug}`;
      updatedRow[20] = publicationUrl;
      updatedRow[23] = now; // Published At

      const authorName = existing.row[3] || 'Author';
      const sanitizedContent = sanitizeHtml(existing.row[12] || '');
      const sanitizedAbstract = sanitizeHtml(existing.row[11] || '');

      const newArticle: Article = {
        id: `art-${submissionId.toLowerCase()}`,
        slug,
        title: sanitizeHtml(title),
        author: {
          name: authorName,
          title: existing.row[4] || 'Legal Scholar',
          institution: existing.row[5] || 'LexMinds Law Review',
          bio: existing.row[6] || `Published author in LexMinds Law Review.`,
        },
        category: existing.row[9] || 'Corporate & M&A',
        abstract: sanitizedAbstract,
        content: sanitizedContent,
        readTime: `${Math.max(3, Math.ceil(sanitizedContent.length / 800))} min read`,
        publishedAt: now.split('T')[0],
        views: 1,
        citationsCount: 0,
        status: 'published',
        citationFormat: {
          bluebook: `${authorName}, ${title}, 4 LEXMINDS L. REV. (2026).`,
          oscola: `${authorName}, ‘${title}’ (2026) 4 LexMinds Law Review.`,
          indian: `${authorName}, ${title}, (2026) 4 LMLR.`,
        },
        keywords: (existing.row[10] || 'Law, Research').split(',').map((k) => k.trim()),
      };

      addPublishedArticle(newArticle);
    }

    await updateRowById('ArticleSubmissions', 0, submissionId, updatedRow);

    return NextResponse.json({
      success: true,
      submissionId,
      status,
      reviewerEmail: adminUser.email,
      timestamp: now,
    });
  } catch (err: any) {
    console.error('[Admin Articles PATCH Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to update article status.' },
      { status: 500 }
    );
  }
}
