import { NextResponse } from 'next/server';
import { fetchArticlesFromCMS, fetchArticleBySlugFromCMS } from '@/lib/data-store';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

/**
 * Public Articles Read API (Sanity CMS Headless Boundary).
 * Strictly returns peer-reviewed published articles only.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (slug) {
    const article = await fetchArticleBySlugFromCMS(slug);
    if (!article) {
      return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
    }
    return NextResponse.json({ article });
  }

  const articles = await fetchArticlesFromCMS();
  return NextResponse.json({ articles });
}

// Disallow direct submission on read-only public route
export async function POST() {
  return NextResponse.json(
    { error: 'Direct submission to this endpoint is deprecated. Submissions must be initiated via /api/publish/submit with verified payment.' },
    { status: 405 }
  );
}
