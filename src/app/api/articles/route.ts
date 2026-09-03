import { NextResponse } from 'next/server';
import { getPublishedArticles, getArticleBySlug } from '@/lib/data-store';

/**
 * Public Articles Read API (Sanity CMS Adapter Boundary).
 * Strictly returns published articles only.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const article = getArticleBySlug(slug);
    if (!article) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }
    return NextResponse.json({ article });
  }

  const articles = getPublishedArticles();
  return NextResponse.json({ articles });
}

// Disallow unauthenticated mutation endpoints on this public route
export async function POST() {
  return NextResponse.json(
    { error: 'Direct submission to this endpoint is deprecated. Submissions must be initiated via the Publish With Us page with verified payment.' },
    { status: 405 }
  );
}

export async function PATCH() {
  return NextResponse.json(
    { error: 'Unauthorized. Editorial status updates must be performed via authenticated /api/admin/articles endpoint.' },
    { status: 403 }
  );
}
